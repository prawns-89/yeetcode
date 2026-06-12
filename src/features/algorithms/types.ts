export type SnippetDifficulty = 1 | 2 | 3;

export interface AlgorithmSnippet {
  id: string;
  title: string;
  difficulty: SnippetDifficulty;
  code: string;
  explanation?: string;
}

export interface AlgorithmChapter {
  id: string;
  title: string;
  topic: string;
  estimatedMinutes: number;
  snippets: AlgorithmSnippet[];
}

export interface AlgorithmTrack {
  id: string;
  name: string;
  description: string;
  order: number;
  chapters: AlgorithmChapter[];
  language?: string;
}

export interface SnippetAttempt {
  completedAt: string;
  netWpm: number;
  accuracy: number;
}
