import type { NeighborhoodDetail, NeighborhoodSummary } from './blog-types';

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL ||
  'https://restorestl-backend-327709678368.us-central1.run.app';

const REVALIDATE_SECONDS = 3600;

async function kbFetch<T>(path: string): Promise<T | null> {
  try {
    const res = await fetch(`${API_BASE_URL}${path}`, {
      next: { revalidate: REVALIDATE_SECONDS },
      headers: {
        'Accept': 'application/json',
      },
    });
    if (!res.ok) return null;
    return (await res.json()) as T;
  } catch {
    return null;
  }
}

export async function getNeighborhoodList(): Promise<NeighborhoodSummary[]> {
  const data = await kbFetch<{ count: number; neighborhoods: NeighborhoodSummary[] }>(
    '/api/knowledge/neighborhoods'
  );
  return data?.neighborhoods ?? [];
}

export async function getNeighborhood(slug: string): Promise<{
  detail: NeighborhoodDetail;
  summary: NeighborhoodSummary | null;
} | null> {
  const [detailRes, listRes] = await Promise.all([
    kbFetch<{ neighborhood: NeighborhoodDetail }>(
      `/api/knowledge/neighborhoods/${encodeURIComponent(slug)}`
    ),
    getNeighborhoodList(),
  ]);
  if (!detailRes?.neighborhood) return null;
  const summary = listRes.find((n) => n.slug === slug) ?? null;
  return { detail: detailRes.neighborhood, summary };
}

export async function validateNeighborhoodSlugs(slugs: string[]): Promise<{
  valid: string[];
  invalid: string[];
}> {
  if (slugs.length === 0) return { valid: [], invalid: [] };
  const list = await getNeighborhoodList();
  const known = new Set(list.map((n) => n.slug));
  const valid: string[] = [];
  const invalid: string[] = [];
  for (const s of slugs) {
    (known.has(s) ? valid : invalid).push(s);
  }
  return { valid, invalid };
}
