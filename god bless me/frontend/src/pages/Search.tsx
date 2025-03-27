
import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Search as SearchIcon, Filter, FileText, GitCommit, Code, User, Clock, ArrowRight } from 'lucide-react';

type SearchResultType = 'file' | 'commit' | 'function' | 'srs';

interface SearchResult {
  id: string;
  type: SearchResultType;
  title: string;
  description: string;
  path?: string;
  language?: string;
  date?: string;
  author?: string;
}

const typeIcons: Record<SearchResultType, React.ReactNode> = {
  file: <FileText className="h-4 w-4" />,
  commit: <GitCommit className="h-4 w-4" />,
  function: <Code className="h-4 w-4" />,
  srs: <FileText className="h-4 w-4" />,
};

const typeColors: Record<SearchResultType, string> = {
  file: 'bg-blue-500/10 text-blue-500',
  commit: 'bg-green-500/10 text-green-500',
  function: 'bg-purple-500/10 text-purple-500',
  srs: 'bg-amber-500/10 text-amber-500',
};

const Search: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilters, setActiveFilters] = useState<SearchResultType[]>(['file', 'commit', 'function', 'srs']);
  const [isSearching, setIsSearching] = useState(false);

  const sampleResults: SearchResult[] = [
    {
      id: '1',
      type: 'file',
      title: 'CommitTimeline.tsx',
      description: 'Component for displaying the commit timeline on the dashboard.',
      path: 'src/components/CommitTimeline.tsx',
      language: 'TypeScript',
    },
    {
      id: '2',
      type: 'commit',
      title: 'Implement commit timeline component',
      description: 'Added functionality to display commits in a chronological timeline with filtering options.',
      date: '2 days ago',
      author: 'Alex Morgan',
    },
    {
      id: '3',
      type: 'function',
      title: 'getCommitHistory()',
      description: 'Function that fetches commit history from the GitHub API and formats it for the timeline component.',
      path: 'src/api/commits.ts',
      language: 'TypeScript',
    },
    {
      id: '4',
      type: 'file',
      title: 'DependencyGraph.tsx',
      description: 'Component for visualizing project dependencies and module relationships.',
      path: 'src/components/DependencyGraph.tsx',
      language: 'TypeScript',
    },
    {
      id: '5',
      type: 'srs',
      title: 'REQ-VIS-001: Dependency Visualization',
      description: 'The system shall provide graphical visualizations of module dependencies and project architecture.',
      date: 'Updated 1 week ago',
    },
  ];

  const toggleFilter = (type: SearchResultType) => {
    if (activeFilters.includes(type)) {
      setActiveFilters(activeFilters.filter(t => t !== type));
    } else {
      setActiveFilters([...activeFilters, type]);
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    
    setIsSearching(true);
    
    // Simulate search delay
    setTimeout(() => {
      setIsSearching(false);
    }, 800);
  };
  
  const filteredResults = sampleResults.filter(result => activeFilters.includes(result.type));

  return (
    <div className="container mx-auto px-4 py-6 animate-fade-in">
      <div className="text-center max-w-3xl mx-auto mb-10">
        <h1 className="text-3xl font-bold mb-4">Search Your Project</h1>
        <p className="text-muted-foreground mb-6">
          Find code, commits, functions, and SRS requirements using AI-powered contextual search
        </p>
        
        <form onSubmit={handleSearch} className="relative">
          <SearchIcon className="h-5 w-5 absolute top-3.5 left-4 text-muted-foreground" />
          <input
            type="search"
            placeholder="Search for code, commits, functions, or SRS requirements..."
            className="w-full pl-12 pr-4 py-3 rounded-lg bg-secondary/50 border-0 text-lg focus:outline-none focus:ring-2 focus:ring-primary/20"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <Button 
            type="submit" 
            className="absolute right-2 top-2"
            disabled={isSearching || !searchQuery.trim()}
          >
            {isSearching ? (
              <div className="flex items-center">
                <div className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                Searching...
              </div>
            ) : (
              <div className="flex items-center">
                <SearchIcon className="h-4 w-4 mr-2" />
                Search
              </div>
            )}
          </Button>
        </form>
      </div>

      <div className="flex items-center justify-center gap-2 mb-8">
        <div className="flex flex-wrap gap-2 justify-center">
          {(['file', 'commit', 'function', 'srs'] as SearchResultType[]).map(type => (
            <Button
              key={type}
              variant={activeFilters.includes(type) ? 'default' : 'outline'}
              size="sm"
              onClick={() => toggleFilter(type)}
              className="transitions-all"
            >
              <div className={cn(
                "p-1 rounded-full mr-2",
                activeFilters.includes(type) ? 'bg-white/20' : typeColors[type]
              )}>
                {typeIcons[type]}
              </div>
              <span className="capitalize">{type}s</span>
            </Button>
          ))}
        </div>
      </div>

      <div className="max-w-5xl mx-auto">
        <div className="glass-card p-6">
          <h2 className="text-xl font-bold mb-6">Search Results</h2>
          
          {filteredResults.length === 0 ? (
            <div className="text-center py-12">
              <SearchIcon className="h-12 w-12 text-muted-foreground mx-auto mb-4 opacity-50" />
              <h3 className="text-lg font-medium mb-2">No results found</h3>
              <p className="text-muted-foreground mb-6">
                Try adjusting your search terms or filters
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredResults.map(result => (
                <div 
                  key={result.id} 
                  className="p-4 border rounded-md hover:shadow-md transitions-all hover:bg-secondary/30 cursor-pointer"
                >
                  <div className="flex">
                    <div className={cn("p-2 rounded-full mr-3 self-start", typeColors[result.type])}>
                      {typeIcons[result.type]}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="font-medium">
                            {result.title}
                          </h3>
                          <p className="text-muted-foreground text-sm mt-1">
                            {result.description}
                          </p>
                        </div>
                        <Button variant="ghost" size="icon" className="ml-2">
                          <ArrowRight className="h-4 w-4" />
                        </Button>
                      </div>
                      
                      <div className="flex flex-wrap items-center mt-2 text-xs text-muted-foreground">
                        {result.path && (
                          <div className="bg-secondary px-2 py-0.5 rounded mr-3 font-mono">
                            {result.path}
                          </div>
                        )}
                        
                        {result.language && (
                          <div className="flex items-center mr-3">
                            <Code className="h-3 w-3 mr-1" />
                            <span>{result.language}</span>
                          </div>
                        )}
                        
                        {result.author && (
                          <div className="flex items-center mr-3">
                            <User className="h-3 w-3 mr-1" />
                            <span>{result.author}</span>
                          </div>
                        )}
                        
                        {result.date && (
                          <div className="flex items-center">
                            <Clock className="h-3 w-3 mr-1" />
                            <span>{result.date}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Search;
