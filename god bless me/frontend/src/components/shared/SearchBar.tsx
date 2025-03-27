
import React, { useState, useRef, useEffect } from 'react';
import { Search, X, File, GitCommit, Code } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useNavigate } from 'react-router-dom';

type SearchResult = {
  id: string;
  type: 'file' | 'commit' | 'function' | 'feature';
  title: string;
  description: string;
  path?: string;
};

// This would normally come from an API
const mockSearchResults: SearchResult[] = [
  {
    id: '1',
    type: 'file',
    title: 'index.tsx',
    description: 'Main entry point for the application',
    path: '/structure'
  },
  {
    id: '2',
    type: 'commit',
    title: 'Add authentication',
    description: 'Implemented OAuth login with GitHub',
    path: '/commits'
  },
  {
    id: '3',
    type: 'function',
    title: 'fetchRepositoryData',
    description: 'API function to retrieve repository information',
    path: '/search'
  },
  {
    id: '4',
    type: 'feature',
    title: 'User Authentication',
    description: 'REQ-001: Secure login with GitHub OAuth',
    path: '/documentation'
  }
];

const getIconForType = (type: SearchResult['type']) => {
  switch (type) {
    case 'file':
      return <File className="h-4 w-4 text-blue-500" />;
    case 'commit':
      return <GitCommit className="h-4 w-4 text-green-500" />;
    case 'function':
    case 'feature':
      return <Code className="h-4 w-4 text-amber-500" />;
  }
};

const SearchBar: React.FC = () => {
  const [focused, setFocused] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [showResults, setShowResults] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  // Handle click outside to close dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowResults(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Search functionality (using mock data for now)
  useEffect(() => {
    if (searchQuery.trim().length > 0) {
      // This would be an API call in a real application
      const filteredResults = mockSearchResults.filter(
        result => result.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                  result.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setResults(filteredResults);
      setShowResults(true);
    } else {
      setResults([]);
      setShowResults(false);
    }
  }, [searchQuery]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      // Navigate to search page with query
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
      setShowResults(false);
    }
  };

  const handleResultClick = (result: SearchResult) => {
    if (result.path) {
      navigate(result.path);
    }
    setShowResults(false);
    setSearchQuery('');
  };

  const clearSearch = () => {
    setSearchQuery('');
    setResults([]);
    setShowResults(false);
  };

  return (
    <div 
      className={cn(
        "w-full relative transitions-all",
        focused ? "ring-2 ring-primary/20" : ""
      )}
      ref={searchRef}
    >
      <form onSubmit={handleSearchSubmit}>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-4 w-4 text-muted-foreground" />
          </div>
          <input
            type="search"
            placeholder="Search for code, features, or commits..."
            className="w-full py-2 pl-10 pr-10 rounded-md bg-secondary/80 border-0 text-sm focus:outline-none focus:ring-0"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
          />
          {searchQuery && (
            <button
              type="button"
              onClick={clearSearch}
              className="absolute inset-y-0 right-0 pr-3 flex items-center"
            >
              <X className="h-4 w-4 text-muted-foreground hover:text-foreground" />
            </button>
          )}
        </div>
      </form>
      
      {/* Search results dropdown */}
      {showResults && results.length > 0 && (
        <div className="absolute mt-1 w-full bg-background border border-border rounded-md shadow-lg z-10 max-h-80 overflow-y-auto">
          <div className="p-2">
            <h4 className="text-xs font-medium text-muted-foreground mb-2 px-2">Search Results</h4>
            <ul>
              {results.map((result) => (
                <li key={result.id}>
                  <button
                    className="w-full text-left px-3 py-2 hover:bg-secondary rounded-md flex items-start gap-2 transitions-all"
                    onClick={() => handleResultClick(result)}
                  >
                    <div className="mt-0.5">{getIconForType(result.type)}</div>
                    <div>
                      <div className="font-medium text-sm">{result.title}</div>
                      <div className="text-xs text-muted-foreground">{result.description}</div>
                    </div>
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
      
      {showResults && searchQuery && results.length === 0 && (
        <div className="absolute mt-1 w-full bg-background border border-border rounded-md shadow-lg z-10 p-4 text-center">
          <p className="text-sm text-muted-foreground">No results found for "{searchQuery}"</p>
        </div>
      )}
    </div>
  );
};

export default SearchBar;
