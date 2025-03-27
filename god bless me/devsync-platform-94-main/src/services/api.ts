
import { toast } from '@/hooks/use-toast';

// Types for the API responses
export interface Repository {
  id: string;
  name: string;
  description: string;
  language: string;
  lastUpdated: string;
}

export interface Commit {
  id: string;
  hash: string;
  message: string;
  author: {
    name: string;
    email: string;
    avatar: string;
  };
  date: string;
  changes: {
    additions: number;
    deletions: number;
  };
}

export interface ProjectStats {
  branches: number;
  commits: number;
  files: number;
  contributors: number;
}

export interface RecentActivity {
  id: string;
  type: 'commit' | 'branch' | 'file' | 'pr' | 'issue';
  title: string;
  description: string;
  user: {
    name: string;
    avatar: string;
  };
  time: string;
}

export interface DependencyNode {
  id: string;
  label: string;
  type: 'component' | 'util' | 'hook' | 'api' | 'page';
}

export interface DependencyEdge {
  source: string;
  target: string;
}

export interface DependencyData {
  nodes: DependencyNode[];
  edges: DependencyEdge[];
}

// Base API URL - would be replaced with actual API URL in .env.local
const API_BASE_URL = 'https://api.example.com';

// Helper function to handle API requests
const apiRequest = async <T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> => {
  try {
    const url = `${API_BASE_URL}${endpoint}`;
    const response = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
        // Add authorization headers here when authentication is implemented
      },
      ...options,
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'An error occurred');
    }

    return await response.json();
  } catch (error) {
    const message = error instanceof Error ? error.message : 'An unknown error occurred';
    toast({
      title: 'API Error',
      description: message,
      variant: 'destructive',
    });
    throw error;
  }
};

// API functions for repositories
export const getRepositories = () => 
  apiRequest<Repository[]>('/repositories');

export const getRepository = (id: string) => 
  apiRequest<Repository>(`/repositories/${id}`);

// API functions for commits
export const getCommits = (repoId: string) => 
  apiRequest<Commit[]>(`/repositories/${repoId}/commits`);

export const getCommit = (repoId: string, commitId: string) => 
  apiRequest<Commit>(`/repositories/${repoId}/commits/${commitId}`);

// API functions for project stats
export const getProjectStats = (repoId: string) => 
  apiRequest<ProjectStats>(`/repositories/${repoId}/stats`);

// API functions for recent activity
export const getRecentActivity = (repoId: string) => 
  apiRequest<RecentActivity[]>(`/repositories/${repoId}/activity`);

// API functions for documentation
export const getDocumentation = (repoId: string) => 
  apiRequest<string>(`/repositories/${repoId}/documentation`);

// API functions for SRS mapping
export const getSRSMapping = (repoId: string) => 
  apiRequest<any>(`/repositories/${repoId}/srs-mapping`);

// API functions for dependencies
export const getDependencies = (repoId: string) => 
  apiRequest<DependencyData>(`/repositories/${repoId}/dependencies`);

export const searchCode = (repoId: string, query: string) => 
  apiRequest<any>(`/repositories/${repoId}/search`, {
    method: 'POST',
    body: JSON.stringify({ query }),
  });

// Mock functions for development (these would be removed in production)
export const mockRepositories: Repository[] = [
  {
    id: '1',
    name: 'E-Commerce Backend',
    description: 'RESTful API for an e-commerce application with user management, product catalog, and order processing.',
    language: 'TypeScript',
    lastUpdated: '2 days ago',
  },
  {
    id: '2',
    name: 'Customer Portal',
    description: 'Web interface for customers to manage their accounts, view order history, and track shipments.',
    language: 'TypeScript + React',
    lastUpdated: '5 days ago',
  },
];

export const mockCommits: Commit[] = [
  {
    id: '1',
    hash: '3a7bd45c9b8e1f6a2d3c4b5e6f7a8b9c0d1e2f3',
    message: 'Implement commit timeline component',
    author: {
      name: 'Alex Morgan',
      email: 'alex@example.com',
      avatar: 'https://i.pravatar.cc/100?img=1',
    },
    date: '2 days ago',
    changes: { additions: 15, deletions: 3 },
  },
  {
    id: '2',
    hash: '2b7cd45e9f8a1b6c2d3e4f5a6b7c8d9e0f1a2b3',
    message: 'Fix authentication issue in GitHub integration',
    author: {
      name: 'Jordan Lee',
      email: 'jordan@example.com',
      avatar: 'https://i.pravatar.cc/100?img=2',
    },
    date: '3 days ago',
    changes: { additions: 7, deletions: 4 },
  },
];

export const mockProjectStats: ProjectStats = {
  branches: 8,
  commits: 24,
  files: 156,
  contributors: 5,
};

export const mockRecentActivity: RecentActivity[] = [
  {
    id: '1',
    type: 'commit',
    title: 'Update authentication system',
    description: 'Improved JWT handling and refresh token logic',
    user: {
      name: 'Alex Morgan',
      avatar: 'https://i.pravatar.cc/100?img=1',
    },
    time: '5 min ago',
  },
  {
    id: '2',
    type: 'branch',
    title: 'Created new branch',
    description: 'feature/user-dashboard',
    user: {
      name: 'Jordan Lee',
      avatar: 'https://i.pravatar.cc/100?img=2',
    },
    time: '1 hour ago',
  },
];
