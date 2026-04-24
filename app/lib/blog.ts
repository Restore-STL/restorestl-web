import fs from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';
import readingTime from 'reading-time';
import type { Post, PostFrontmatter } from './blog-types';

const CONTENT_DIR = path.join(process.cwd(), 'content', 'blog');
const REQUIRED_FIELDS: (keyof PostFrontmatter)[] = [
  'title',
  'description',
  'author',
  'published_at',
  'tags',
  'hero_image',
  'hero_alt',
];

const IS_PRODUCTION = process.env.VERCEL_ENV === 'production';

function readPostFile(filename: string): Post {
  const slug = filename.replace(/\.mdx$/, '');
  const filepath = path.join(CONTENT_DIR, filename);
  const raw = fs.readFileSync(filepath, 'utf8');
  const { data, content } = matter(raw);
  const fm = data as Partial<PostFrontmatter>;

  for (const field of REQUIRED_FIELDS) {
    if (fm[field] === undefined || fm[field] === null || fm[field] === '') {
      throw new Error(
        `[blog] ${filename} is missing required frontmatter field: ${field}`
      );
    }
  }

  const frontmatter = fm as PostFrontmatter;
  const computed = readingTime(content);
  const readMinutes = frontmatter.read_time_minutes ?? Math.max(1, Math.round(computed.minutes));

  return {
    slug,
    frontmatter,
    body: content,
    readMinutes,
  };
}

function loadAll(): Post[] {
  if (!fs.existsSync(CONTENT_DIR)) return [];
  const files = fs
    .readdirSync(CONTENT_DIR)
    .filter((f) => f.endsWith('.mdx'));
  return files.map(readPostFile);
}

export function getAllPosts({ includeDrafts = !IS_PRODUCTION } = {}): Post[] {
  return loadAll()
    .filter((p) => includeDrafts || !p.frontmatter.draft)
    .sort(
      (a, b) =>
        new Date(b.frontmatter.published_at).getTime() -
        new Date(a.frontmatter.published_at).getTime()
    );
}

export function getPostBySlug(slug: string): Post | null {
  const filepath = path.join(CONTENT_DIR, `${slug}.mdx`);
  if (!fs.existsSync(filepath)) return null;
  const post = readPostFile(`${slug}.mdx`);
  if (IS_PRODUCTION && post.frontmatter.draft) return null;
  return post;
}

export function getAllSlugs(): string[] {
  return getAllPosts({ includeDrafts: false }).map((p) => p.slug);
}

export function getAllTags(): string[] {
  const set = new Set<string>();
  for (const p of getAllPosts()) {
    for (const t of p.frontmatter.tags) set.add(t);
  }
  return [...set].sort();
}

export function getPostCountByPillar(): Record<string, number> {
  const counts: Record<string, number> = {};
  for (const p of getAllPosts({ includeDrafts: false })) {
    const pillar = p.frontmatter.pillar;
    if (pillar) counts[pillar] = (counts[pillar] ?? 0) + 1;
  }
  return counts;
}
