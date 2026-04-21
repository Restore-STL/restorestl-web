/**
 * Typed client for /api/knowledge/* endpoints.
 *
 * Topic-key normalization: the production API returns hyphen-form keys in
 * chunks_by_topic (e.g. "re-history", "housing-stock") while the Firestore
 * topic_id field uses underscores. All data leaving this client uses
 * HYPHEN-form keys; components never see underscores. See TICKET-123
 * backlog for API-side consistency cleanup.
 */
import type {
  KnowledgeChunk,
  NeighborhoodDetail,
  NeighborhoodProfile,
} from '@/app/lib/neighborhood-types';

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL ||
  'https://restorestl-backend-327709678368.us-central1.run.app';
const REVALIDATE_SECONDS = 3600;

function toHyphen(key: string): string {
  return key.replace(/_/g, '-');
}

function normalizeChunksByTopic(
  raw: Record<string, KnowledgeChunk[]> | undefined,
): Record<string, KnowledgeChunk[]> {
  if (!raw) return {};
  const out: Record<string, KnowledgeChunk[]> = {};
  for (const [k, v] of Object.entries(raw)) {
    out[toHyphen(k)] = (v ?? []).map((c) => ({ ...c, topic: toHyphen(c.topic) }));
  }
  return out;
}

async function kbFetch<T>(path: string): Promise<T | null> {
  try {
    const res = await fetch(`${API_BASE_URL}${path}`, {
      next: { revalidate: REVALIDATE_SECONDS },
      headers: { Accept: 'application/json' },
    });
    if (!res.ok) return null;
    return (await res.json()) as T;
  } catch {
    return null;
  }
}

export async function getNeighborhoodDetail(
  slug: string,
): Promise<NeighborhoodDetail | null> {
  const data = await kbFetch<NeighborhoodDetail>(
    `/api/knowledge/neighborhoods/${encodeURIComponent(slug)}`,
  );
  if (!data?.neighborhood) return null;
  return {
    neighborhood: data.neighborhood,
    chunks_by_topic: normalizeChunksByTopic(data.chunks_by_topic),
  };
}

export async function listNeighborhoodSlugs(): Promise<string[]> {
  const data = await kbFetch<{ neighborhoods: NeighborhoodProfile[] }>(
    '/api/knowledge/neighborhoods',
  );
  return (data?.neighborhoods ?? []).map((n) => n.slug).filter(Boolean);
}
