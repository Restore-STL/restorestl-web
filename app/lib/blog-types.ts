export type PillarSlug =
  | 'neighborhood-stories'
  | 'seller-education'
  | 'market-data'
  | 'culture-local-life'
  | 'homeowner-help'
  | 'behind-the-scenes';

export const PILLARS: {
  slug: PillarSlug;
  label: string;
  badgeClass: 'neighborhood' | 'seller' | 'market' | 'culture' | 'homeowner' | 'behind';
  color: string;
}[] = [
  { slug: 'neighborhood-stories', label: 'Neighborhood Stories', badgeClass: 'neighborhood', color: '#FFC200' },
  { slug: 'seller-education', label: 'Seller Education', badgeClass: 'seller', color: '#1E3A8A' },
  { slug: 'market-data', label: 'Market Data', badgeClass: 'market', color: '#0D9488' },
  { slug: 'culture-local-life', label: 'Culture & Local Life', badgeClass: 'culture', color: '#0F172A' },
  { slug: 'homeowner-help', label: 'Homeowner Help', badgeClass: 'homeowner', color: '#B45309' },
  { slug: 'behind-the-scenes', label: 'Behind the Scenes', badgeClass: 'behind', color: '#E8E0D1' },
];

export type HOLCGrade = 'A' | 'B' | 'C' | 'D';

export interface PostSource {
  num: number;
  title: string;
  author?: string;
  year?: number;
  url?: string;
}

export interface PostFrontmatter {
  title: string;
  description: string;
  author: string;
  published_at: string;
  updated_at?: string;
  tags: string[];
  related_neighborhoods?: string[];
  hero_image: string;
  hero_alt: string;
  pillar?: PillarSlug;
  read_time_minutes?: number;
  featured?: boolean;
  draft?: boolean;
  sources?: PostSource[];
}

export interface Post {
  slug: string;
  frontmatter: PostFrontmatter;
  body: string;
  readMinutes: number;
}

export interface NeighborhoodSummary {
  slug: string;
  name: string;
  display_name: string;
  holc_grade?: HOLCGrade | null;
  zips: string[];
  buy_box_zone?: string | null;
  city_or_county?: string | null;
  total_knowledge_chunks?: number;
}

export interface NeighborhoodDetail extends NeighborhoodSummary {
  historic_district?: string | null;
  signature_trait?: string | null;
  median_home_price?: number | null;
  dominant_housing_type?: string | null;
  tax_credit_eligible?: boolean | null;
  topics_covered?: string[];
  blog_angles?: string[];
  named_for?: string | null;
  founded?: number | null;
}
