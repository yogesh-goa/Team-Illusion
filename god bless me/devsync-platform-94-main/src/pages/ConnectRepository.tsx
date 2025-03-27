
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Github, GitBranch, Search, ChevronRight, Plus, Check, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { mockRepositories } from '@/services/api';
import { toast } from '@/hooks/use-toast';

const ConnectRepository: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [selectedRepo, setSelectedRepo] = useState<string | null>(null);
  const navigate = useNavigate();

  // Filter repositories based on search query
  const filteredRepos = mockRepositories.filter(repo => 
    repo.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    repo.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleRefresh = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      toast({
        title: "Repositories refreshed",
        description: "Your repository list has been updated."
      });
    }, 1500);
  };

  const handleConnect = () => {
    if (!selectedRepo) {
      toast({
        title: "No repository selected",
        description: "Please select a repository to connect.",
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      toast({
        title: "Repository connected",
        description: `Successfully connected to ${selectedRepo}.`
      });
      navigate('/dashboard');
    }, 2000);
  };

  const handleCreateNew = () => {
    toast({
      title: "Create New Repository",
      description: "This feature is coming soon!"
    });
  };

  return (
    <div className="container mx-auto px-4 py-6 animate-fade-in">
      <div className="flex flex-col md:flex-row justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Connect Repository</h1>
          <p className="text-muted-foreground mt-1">
            Select a GitHub repository to analyze and map to SRS requirements
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-[1fr_300px] gap-6">
        <Card>
          <CardHeader>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <CardTitle className="flex items-center">
                  <Github className="mr-2 h-5 w-5" />
                  Your Repositories
                </CardTitle>
                <CardDescription>
                  Select a repository to connect with PS8 Platform
                </CardDescription>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" onClick={handleRefresh} disabled={isLoading}>
                  <RefreshCw className={`h-4 w-4 mr-2 ${isLoading ? 'animate-spin' : ''}`} />
                  Refresh
                </Button>
                <Button variant="default" size="sm" onClick={handleCreateNew}>
                  <Plus className="h-4 w-4 mr-2" />
                  New Repo
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="relative mb-4">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search repositories..."
                className="pl-9"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            
            {filteredRepos.length > 0 ? (
              <div className="space-y-2">
                {filteredRepos.map((repo) => (
                  <div
                    key={repo.id}
                    className={`flex items-start p-3 rounded-md cursor-pointer hover:bg-secondary transition-colors ${
                      selectedRepo === repo.name ? 'bg-primary/10 border border-primary/20' : 'border border-transparent'
                    }`}
                    onClick={() => setSelectedRepo(repo.name)}
                  >
                    <GitBranch className="h-5 w-5 mt-0.5 mr-3 text-muted-foreground" />
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <h3 className="font-medium">{repo.name}</h3>
                        {selectedRepo === repo.name && (
                          <Check className="h-4 w-4 text-primary" />
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">{repo.description}</p>
                      <div className="flex items-center mt-2 text-xs text-muted-foreground">
                        <span className="flex items-center">
                          <span className={`w-2 h-2 rounded-full mr-1 ${
                            repo.language === 'TypeScript' ? 'bg-blue-500' : 'bg-yellow-500'
                          }`}></span>
                          {repo.language}
                        </span>
                        <span className="mx-2">•</span>
                        <span>Updated {repo.lastUpdated}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <SearchIcon className="mx-auto h-12 w-12 text-muted-foreground opacity-50" />
                <h3 className="mt-4 text-lg font-medium">No repositories found</h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  We couldn't find any repositories matching your search.
                </p>
              </div>
            )}
          </CardContent>
          <CardFooter>
            <Button 
              className="w-full" 
              onClick={handleConnect} 
              disabled={!selectedRepo || isLoading}
            >
              {isLoading ? (
                <span className="flex items-center">
                  <span className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                  Connecting...
                </span>
              ) : (
                <span className="flex items-center">
                  Connect Repository
                  <ChevronRight className="ml-2 h-4 w-4" />
                </span>
              )}
            </Button>
          </CardFooter>
        </Card>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Connect with PS8</CardTitle>
              <CardDescription>
                Why connect your repository?
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                  <span className="text-sm">Map SRS requirements to code automatically</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                  <span className="text-sm">Generate interactive documentation</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                  <span className="text-sm">Visualize code dependencies</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                  <span className="text-sm">Track project progress against SRS</span>
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

// Simple search icon component
const SearchIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="11" cy="11" r="8" />
    <path d="m21 21-4.3-4.3" />
  </svg>
);

export default ConnectRepository;
