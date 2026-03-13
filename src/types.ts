export interface Env {
  KV: KVNamespace;
  AI: Ai;
  OPENAI_API_KEY?: string;
  ANTHROPIC_API_KEY?: string;
}

export interface Project {
  id: string;
  name: string;
  description: string;
  createdAt: number;
  updatedAt: number;
  artifacts: Artifact[];
}

export interface ProjectSummary {
  id: string;
  name: string;
  description: string;
  createdAt: number;
  artifactCount: number;
}

export interface Artifact {
  id: string;
  type: string;
  title: string;
  content: string;
  inputs: Record<string, string>;
  createdAt: number;
}

export interface AIRequest {
  projectId?: string;
  [key: string]: unknown;
}

export type ToolId =
  | 'validate-idea'
  | 'persona'
  | 'prd'
  | 'user-stories'
  | 'mvp'
  | 'tech-stack'
  | 'launch-checklist'
  | 'marketing'
  | 'growth'
  | 'competitors'
  | 'prioritize'
  | 'chat';
