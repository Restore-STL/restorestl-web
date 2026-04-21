export interface NeighborhoodProfile {
  slug: string;
  name: string;
  display_name: string;
  zips: string[];
  city_or_county: 'city' | 'county';
  buy_box_zone: string | null;
  total_knowledge_chunks: number;
  topics_covered: string[];
  historic_district: string | null;
  founded: number | null;
  named_for: string | null;
  signature_trait: string | null;
  dominant_housing_type: string | null;
  tax_credit_eligible: boolean | null;
  blog_angles: string[];
}

export interface KnowledgeSource {
  title: string;
  author?: string;
  year?: number | string;
  url?: string;
}

export interface KnowledgeChunk {
  id: string;
  title: string;
  topic: string;
  content_type: string;
  summary?: string;
  body: string;
  word_count: number;
  neighborhoods: string[];
  zips?: string[];
  regions?: string[];
  era_start?: number | null;
  era_end?: number | null;
  era_label?: string | null;
  people?: string[];
  tags?: string[];
  sources?: KnowledgeSource[];
}

export interface NeighborhoodDetail {
  neighborhood: NeighborhoodProfile;
  chunks_by_topic: Record<string, KnowledgeChunk[]>;
}

export interface Citation {
  n: number;
  title: string;
  author?: string;
  year?: number | string;
  url?: string;
}

export function sourceKey(src: KnowledgeSource): string {
  return [src.title, src.author ?? '', src.year ?? ''].join('||');
}
