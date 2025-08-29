export interface Prompt {
  id: string;
  title: string;
  content: string;
  category: string;
  tags: string[];
  isFavorite: boolean;
  createdAt: Date;
  updatedAt: Date;
  score?: number;
  improvements?: string[];
}

export interface PromptTemplate {
  id: string;
  title: string;
  description: string;
  content: string;
  category: string;
  tags: string[];
}

export interface Category {
  id: string;
  name: string;
  color: string;
  count: number;
}

export interface AIEnhancement {
  score: number;
  improvements: string[];
  optimizedVersion?: string;
  variations?: string[];
}