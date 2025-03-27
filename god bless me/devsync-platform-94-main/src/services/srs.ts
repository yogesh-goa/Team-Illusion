
import { toast } from '@/hooks/use-toast';

// Types for SRS Mapping
export interface SrsRequirement {
  id: string;
  srsId: string;
  title: string;
  description: string;
  children?: SrsRequirement[];
  filePath?: string;
  functionName?: string;
  lastCommit?: string;
  timestamp?: string;
  snippet?: string;
  status: 'implemented' | 'partial' | 'pending';
}

// Base API URL
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

// Get SRS Mappings
export const getSRSMappings = (repoId: string) => 
  apiRequest<SrsRequirement[]>(`/repositories/${repoId}/srs-mapping`);

// Mock SRS Mapping data for development
export const mockSrsMappings: SrsRequirement[] = [
  {
    id: "1",
    srsId: "REQ-001",
    title: "User Authentication",
    description: "The system shall provide user authentication via GitHub OAuth.",
    status: "implemented",
    children: [
      {
        id: "1.1",
        srsId: "REQ-001.1",
        title: "Login Component",
        description: "Implement login UI with GitHub button",
        status: "implemented",
        filePath: "src/components/auth/Login.tsx",
        functionName: "LoginComponent",
        lastCommit: "a3b45c7 (Alex Smith): Implement GitHub OAuth",
        timestamp: "2 days ago",
        snippet: `function LoginComponent() {
  const handleGitHubLogin = async () => {
    // OAuth logic
    await signInWithGitHub();
  };

  return (
    <div className="auth-container">
      <h2>Sign in to Platform</h2>
      <button onClick={handleGitHubLogin}>
        Continue with GitHub
      </button>
    </div>
  );
}`
      },
      {
        id: "1.2",
        srsId: "REQ-001.2",
        title: "Authentication Provider",
        description: "Implement auth context provider",
        status: "implemented",
        filePath: "src/contexts/AuthContext.tsx",
        functionName: "AuthProvider",
        lastCommit: "a3b45c7 (Alex Smith): Implement GitHub OAuth",
        timestamp: "2 days ago",
        snippet: `const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState<User | null>(null);
  
  const signInWithGitHub = async () => {
    // Implementation details
  };
  
  const signOut = async () => {
    // Implementation details
  };
  
  return (
    <AuthContext.Provider value={{ user, signInWithGitHub, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}`
      }
    ]
  },
  {
    id: "2",
    srsId: "REQ-002",
    title: "Repository Integration",
    description: "The system shall integrate with GitHub repositories.",
    status: "partial",
    children: [
      {
        id: "2.1",
        srsId: "REQ-002.1",
        title: "Repository Selection",
        description: "Allow users to select repositories to connect",
        status: "implemented",
        filePath: "src/components/repositories/RepoSelector.tsx",
        functionName: "RepoSelector",
        lastCommit: "b4c56d8 (Jamie Lee): Add repository selection UI",
        timestamp: "4 days ago",
        snippet: `const RepoSelector = () => {
  const [repositories, setRepositories] = useState([]);
  const [selectedRepo, setSelectedRepo] = useState(null);
  
  useEffect(() => {
    // Fetch user repositories
    fetchUserRepositories().then(data => {
      setRepositories(data);
    });
  }, []);
  
  return (
    <div className="repo-selector">
      <h3>Select a Repository</h3>
      <ul className="repo-list">
        {repositories.map(repo => (
          <li key={repo.id} onClick={() => setSelectedRepo(repo)}>
            {repo.name}
          </li>
        ))}
      </ul>
    </div>
  );
};`
      },
      {
        id: "2.2",
        srsId: "REQ-002.2",
        title: "Repository Sync",
        description: "Implement background syncing of repositories",
        status: "pending",
        filePath: "",
        functionName: "",
        lastCommit: "",
        timestamp: ""
      }
    ]
  },
  {
    id: "3",
    srsId: "REQ-003",
    title: "Code-SRS Mapping",
    description: "The system shall map SRS requirements to code implementations.",
    status: "implemented",
    children: [
      {
        id: "3.1",
        srsId: "REQ-003.1",
        title: "Mapping Algorithm",
        description: "Implement algorithm to map SRS IDs to code",
        status: "implemented",
        filePath: "src/services/mapping.ts",
        functionName: "generateSrsCodeMapping",
        lastCommit: "c5d67e9 (Taylor Kim): Implement SRS-code mapping algorithm",
        timestamp: "1 week ago",
        snippet: `function generateSrsCodeMapping(srsRequirements, codebase) {
  const mappings = [];
  
  // Iterate through requirements
  for (const req of srsRequirements) {
    // Search codebase for matching implementation
    const implementations = findImplementations(req, codebase);
    
    // Create mapping
    mappings.push({
      srsId: req.id,
      implementations
    });
  }
  
  return mappings;
}`
      },
      {
        id: "3.2",
        srsId: "REQ-003.2",
        title: "Mapping Visualization",
        description: "Create UI for visualizing SRS-code mappings",
        status: "implemented",
        filePath: "src/pages/SrsMapping.tsx",
        functionName: "SrsMappingPage",
        lastCommit: "d6e78f0 (Jordan Chen): Add SRS mapping visualization UI",
        timestamp: "5 days ago",
        snippet: `function SrsMappingPage() {
  const [mappings, setMappings] = useState([]);
  
  useEffect(() => {
    // Fetch SRS-code mappings
    fetchSrsMappings().then(data => {
      setMappings(data);
    });
  }, []);
  
  return (
    <div className="srs-mapping-page">
      <h1>SRS-Code Mappings</h1>
      <div className="mapping-container">
        {/* Mapping visualization components */}
        <MappingTree mappings={mappings} />
        <CodePreview />
      </div>
    </div>
  );
}`
      }
    ]
  },
  {
    id: "4",
    srsId: "REQ-004",
    title: "Documentation Generation",
    description: "The system shall generate documentation from code and SRS.",
    status: "pending",
    children: []
  }
];

// For development purposes, return mock data instead of API call
export const getSRSMappingsMock = () => {
  return Promise.resolve(mockSrsMappings);
};

// Replace this function with the actual implementation when backend is ready
export const getSRSMapping = getSRSMappingsMock;

