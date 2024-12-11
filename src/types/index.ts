export interface IdeaInput {
  topic: string;
  description: string;
}

export interface GeneratedIdea {
  id: string;
  content: string;
  sentiment: number;
  upvotes: number;
  downvotes: number;
}

export interface SentimentResult {
  score: number;
  comparative: number;
  tokens: string[];
  positive: string[];
  negative: string[];
}

export interface TextSummary {
  original: string;
  summary: string;
  ratio: number;
}