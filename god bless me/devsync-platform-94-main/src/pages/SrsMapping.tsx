
import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Search, Filter, Code, CheckCircle, AlertCircle, Clock } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { getSRSMappings } from '@/services/srs';
import SrsTreeView from '@/components/srs/SrsTreeView';
import CodeSnippet from '@/components/srs/CodeSnippet';

// Types for SRS Mapping
type SrsEntry = {
  id: string;
  srsId: string;
  title: string;
  description: string;
  children?: SrsEntry[];
  filePath?: string;
  functionName?: string;
  lastCommit?: string;
  timestamp?: string;
  snippet?: string;
  status: 'implemented' | 'partial' | 'pending';
};

const SrsMapping = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedEntry, setSelectedEntry] = useState<SrsEntry | null>(null);
  const [filterStatus, setFilterStatus] = useState<string | null>(null);

  // Fetch SRS Mapping data
  const { data: srsMappings, isLoading, error } = useQuery({
    queryKey: ['srs-mappings'],
    queryFn: () => getSRSMappings('1'), // Assuming repository with ID 1
  });

  // Filter SRS entries based on search and filter
  const filteredEntries = React.useMemo(() => {
    if (!srsMappings) return [];
    
    const filterEntries = (entries: SrsEntry[], query: string, status: string | null): SrsEntry[] => {
      return entries.filter(entry => {
        const matchesQuery = !query || 
          entry.title.toLowerCase().includes(query.toLowerCase()) || 
          entry.description.toLowerCase().includes(query.toLowerCase()) ||
          entry.srsId.toLowerCase().includes(query.toLowerCase());
        
        const matchesStatus = !status || entry.status === status;
        
        let result = matchesQuery && matchesStatus;
        
        if (entry.children && entry.children.length > 0) {
          const filteredChildren = filterEntries(entry.children, query, status);
          if (filteredChildren.length > 0) {
            entry = { ...entry, children: filteredChildren };
            result = true;
          }
        }
        
        return result;
      });
    };
    
    return filterEntries(srsMappings, searchQuery, filterStatus);
  }, [srsMappings, searchQuery, filterStatus]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <div className="relative h-16 w-16 mx-auto">
            <div className="absolute inset-0 flex items-center justify-center animate-spin">
              <Clock className="h-8 w-8 text-primary" />
            </div>
          </div>
          <p className="mt-4 text-muted-foreground">Loading SRS mappings...</p>
        </div>
      </div>
    );
  }

  if (error) {
    toast({
      title: "Error loading SRS mappings",
      description: "Could not load SRS mappings. Please try again later.",
      variant: "destructive",
    });
    
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <AlertCircle className="h-12 w-12 text-destructive mx-auto" />
          <h3 className="mt-4 text-lg font-medium">Failed to load SRS mappings</h3>
          <p className="mt-2 text-sm text-muted-foreground">Please try refreshing the page.</p>
          <Button onClick={() => window.location.reload()} className="mt-4">Retry</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-6 animate-fade-in">
      <div className="flex flex-col md:flex-row justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">SRS to Code Mapping</h1>
          <p className="text-muted-foreground mt-1">
            Visualize how software requirements are implemented in the codebase
          </p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-2 mt-4 md:mt-0">
          <div className="relative w-full md:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search requirements..."
              className="pl-9 w-full"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          <div className="flex gap-2">
            <Button 
              variant={filterStatus === 'implemented' ? 'default' : 'outline'} 
              size="sm"
              onClick={() => setFilterStatus(filterStatus === 'implemented' ? null : 'implemented')}
            >
              <CheckCircle className="h-4 w-4 mr-1" />
              Implemented
            </Button>
            <Button 
              variant={filterStatus === 'pending' ? 'default' : 'outline'} 
              size="sm"
              onClick={() => setFilterStatus(filterStatus === 'pending' ? null : 'pending')}
            >
              <AlertCircle className="h-4 w-4 mr-1" />
              Pending
            </Button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-1 overflow-hidden">
          <CardHeader className="pb-3">
            <CardTitle>SRS Requirements</CardTitle>
            <CardDescription>
              Navigate through all software requirements
            </CardDescription>
          </CardHeader>
          <Separator />
          <CardContent className="p-0 overflow-auto max-h-[70vh]">
            {filteredEntries.length > 0 ? (
              <SrsTreeView 
                entries={filteredEntries} 
                onSelect={setSelectedEntry} 
                selectedId={selectedEntry?.id}
              />
            ) : (
              <div className="flex flex-col items-center justify-center py-12 px-4 text-center">
                <Filter className="h-12 w-12 text-muted-foreground mb-4" />
                <h3 className="text-lg font-medium">No matching requirements</h3>
                <p className="text-sm text-muted-foreground mt-1">
                  Try adjusting your search or filters
                </p>
              </div>
            )}
          </CardContent>
        </Card>

        <Card className="lg:col-span-2">
          {selectedEntry ? (
            <>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-medium px-2 py-1 rounded-md bg-primary/10 text-primary">
                        {selectedEntry.srsId}
                      </span>
                      <span className={`text-xs font-medium px-2 py-1 rounded-md ${
                        selectedEntry.status === 'implemented' 
                          ? 'bg-green-500/10 text-green-600' 
                          : selectedEntry.status === 'partial' 
                            ? 'bg-amber-500/10 text-amber-600' 
                            : 'bg-red-500/10 text-red-600'
                      }`}>
                        {selectedEntry.status.charAt(0).toUpperCase() + selectedEntry.status.slice(1)}
                      </span>
                    </div>
                    <CardTitle className="mt-2">{selectedEntry.title}</CardTitle>
                    <CardDescription className="mt-1">
                      {selectedEntry.description}
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <Separator />
              <CardContent className="pt-6">
                {selectedEntry.filePath && selectedEntry.snippet ? (
                  <>
                    <div className="flex items-center justify-between mb-4">
                      <div className="text-sm font-medium">
                        <span className="text-muted-foreground">File:</span> {selectedEntry.filePath}
                      </div>
                      {selectedEntry.timestamp && (
                        <div className="text-xs text-muted-foreground flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          Last modified {selectedEntry.timestamp}
                        </div>
                      )}
                    </div>
                    
                    <CodeSnippet 
                      code={selectedEntry.snippet} 
                      language="tsx" 
                      fileName={selectedEntry.filePath.split('/').pop() || ''} 
                      functionName={selectedEntry.functionName}
                    />
                    
                    {selectedEntry.lastCommit && (
                      <div className="mt-4 text-sm">
                        <span className="font-medium">Last commit:</span> {selectedEntry.lastCommit}
                      </div>
                    )}
                  </>
                ) : (
                  <div className="flex flex-col items-center justify-center py-8 text-center">
                    <Code className="h-12 w-12 text-muted-foreground mb-4" />
                    <h3 className="text-lg font-medium">No implementation details</h3>
                    <p className="text-sm text-muted-foreground mt-1 max-w-md">
                      This requirement doesn't have implementation details yet.
                      {selectedEntry.status === 'pending' && " It's currently pending implementation."}
                    </p>
                  </div>
                )}
              </CardContent>
            </>
          ) : (
            <div className="flex flex-col items-center justify-center h-full py-16 px-4 text-center">
              <Code className="h-16 w-16 text-muted-foreground mb-6" />
              <h3 className="text-xl font-medium">Select a requirement</h3>
              <p className="text-muted-foreground mt-2 max-w-md">
                Choose a requirement from the list to view its implementation details and code snippets.
              </p>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
};

export default SrsMapping;
