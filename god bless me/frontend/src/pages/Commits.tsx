
import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { GitCommit, Calendar, User, Clock, Search, Filter, ChevronRight, ChevronDown, FileCode } from 'lucide-react';

interface CommitItemProps {
  hash: string;
  message: string;
  author: string;
  date: string;
  changes: {
    additions: number;
    deletions: number;
  };
}

const CommitItem: React.FC<CommitItemProps> = ({ hash, message, author, date, changes }) => {
  const [expanded, setExpanded] = useState(false);
  
  return (
    <div className="border rounded-md mb-4 overflow-hidden transitions-all hover:shadow-md">
      <div 
        className="p-4 hover:bg-secondary/30 transitions-all cursor-pointer"
        onClick={() => setExpanded(!expanded)}
      >
        <div className="flex items-start justify-between">
          <div className="flex items-start space-x-3">
            <div className="p-2 rounded-full bg-primary/10 text-primary mt-1">
              <GitCommit className="h-4 w-4" />
            </div>
            <div>
              <h3 className="font-medium">{message}</h3>
              <div className="flex items-center text-xs text-muted-foreground mt-1">
                <span className="font-mono bg-secondary/80 px-1.5 py-0.5 rounded">{hash.substring(0, 7)}</span>
                <span className="mx-2">•</span>
                <User className="h-3 w-3 mr-1" />
                <span>{author}</span>
                <span className="mx-2">•</span>
                <Calendar className="h-3 w-3 mr-1" />
                <span>{date}</span>
              </div>
            </div>
          </div>
          <div className="flex items-center text-xs font-medium">
            <span className="text-green-500 mr-2">+{changes.additions}</span>
            <span className="text-red-500 mr-4">-{changes.deletions}</span>
            {expanded ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
          </div>
        </div>
      </div>
      
      {expanded && (
        <div className="p-4 border-t bg-secondary/10">
          <div className="bg-secondary/50 rounded-md p-3 text-sm font-mono overflow-x-auto">
            <pre className="text-muted-foreground">
{`diff --git a/src/components/CommitTimeline.tsx b/src/components/CommitTimeline.tsx
index c3d7f8a..d8e92f1 100644
--- a/src/components/CommitTimeline.tsx
+++ b/src/components/CommitTimeline.tsx
@@ -3,7 +3,7 @@ import { GitCommit } from 'lucide-react';

 const CommitTimeline = () => {
-  // TODO: Implement commit timeline
+  // Implementation of commit timeline
   return (
     <div className="commit-timeline">
       <GitCommit />
@@ -11,6 +11,10 @@ const CommitTimeline = () => {
     </div>
   );
 };
+
+// Add new functionality
+const getCommitHistory = async () => {
+  // Fetch commit history from API
+};

 export default CommitTimeline;`}
            </pre>
          </div>
          
          <div className="mt-4 flex gap-2">
            <Button size="sm" variant="outline">
              <FileCode className="h-4 w-4 mr-2" />
              View Files
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

const Commits: React.FC = () => {
  const commits: CommitItemProps[] = [
    {
      hash: '3a7bd45c9b8e1f6a2d3c4b5e6f7a8b9c0d1e2f3',
      message: 'Implement commit timeline component',
      author: 'Alex Morgan',
      date: '2 days ago',
      changes: { additions: 15, deletions: 3 }
    },
    {
      hash: '2b7cd45e9f8a1b6c2d3e4f5a6b7c8d9e0f1a2b3',
      message: 'Fix authentication issue in GitHub integration',
      author: 'Jordan Lee',
      date: '3 days ago',
      changes: { additions: 7, deletions: 4 }
    },
    {
      hash: '1c8de45f9a0b1c2d3e4f5a6b7c8d9e0f1a2b3c4',
      message: 'Add SRS mapping functionality',
      author: 'Taylor Swift',
      date: '5 days ago',
      changes: { additions: 124, deletions: 0 }
    },
    {
      hash: '8d9e0f1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7',
      message: 'Update documentation generation',
      author: 'Kim Parker',
      date: '1 week ago',
      changes: { additions: 42, deletions: 18 }
    },
    {
      hash: '7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2b3c4d5e6',
      message: 'Refactor dependency visualization',
      author: 'Jamie Rodriguez',
      date: '1 week ago',
      changes: { additions: 56, deletions: 32 }
    },
  ];

  return (
    <div className="container mx-auto px-4 py-6 animate-fade-in">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold">Commit History</h1>
          <p className="text-muted-foreground mt-1">View and explore recent commits</p>
        </div>
        <div className="mt-4 md:mt-0 flex flex-wrap gap-3">
          <div className="relative">
            <Search className="h-4 w-4 absolute top-2.5 left-3 text-muted-foreground" />
            <input
              type="search"
              placeholder="Search commits..."
              className="pl-9 pr-4 py-2 rounded-md bg-secondary/50 border-0 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 w-full md:w-64"
            />
          </div>
          <Button size="sm" variant="outline">
            <Filter className="h-4 w-4 mr-2" />
            Filter
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-1">
          <div className="glass-card p-4 sticky top-20">
            <h3 className="font-medium mb-3">Timeline</h3>
            <div className="space-y-4">
              <div className="relative pl-6 pb-8 border-l-2 border-primary/30">
                <div className="absolute left-[-8px] top-0 h-4 w-4 rounded-full bg-primary" />
                <div className="text-sm font-medium">This Week</div>
                <div className="text-xs text-muted-foreground">5 commits</div>
              </div>
              
              <div className="relative pl-6 pb-8 border-l-2 border-muted/50">
                <div className="absolute left-[-5px] top-0 w-2.5 h-2.5 rounded-full bg-muted" />
                <div className="text-sm font-medium">Last Week</div>
                <div className="text-xs text-muted-foreground">12 commits</div>
              </div>
              
              <div className="relative pl-6 pb-8 border-l-2 border-muted/50">
                <div className="absolute left-[-5px] top-0 w-2.5 h-2.5 rounded-full bg-muted" />
                <div className="text-sm font-medium">2 Weeks Ago</div>
                <div className="text-xs text-muted-foreground">8 commits</div>
              </div>
              
              <div className="relative pl-6">
                <div className="absolute left-[-5px] top-0 w-2.5 h-2.5 rounded-full bg-muted" />
                <div className="text-sm font-medium">3 Weeks Ago</div>
                <div className="text-xs text-muted-foreground">15 commits</div>
              </div>
            </div>
            
            <div className="mt-8">
              <h3 className="font-medium mb-3">Contributors</h3>
              <div className="space-y-2">
                {['Alex Morgan', 'Jordan Lee', 'Taylor Swift', 'Kim Parker', 'Jamie Rodriguez'].map((name, index) => (
                  <div key={index} className="flex items-center justify-between text-sm py-1 px-2 rounded-md hover:bg-secondary/80 transitions-all cursor-pointer">
                    <div className="flex items-center">
                      <img 
                        src={`https://i.pravatar.cc/100?img=${index + 1}`}
                        alt={name}
                        className="h-6 w-6 rounded-full mr-2"
                      />
                      <span>{name}</span>
                    </div>
                    <span className="text-xs text-muted-foreground">{10 - index} commits</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-3">
          <div className="glass-card p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold">Recent Commits</h2>
              <div className="text-sm text-muted-foreground flex items-center">
                <Clock className="h-4 w-4 mr-1" />
                Last updated: 5 minutes ago
              </div>
            </div>
            
            <div className="space-y-4">
              {commits.map((commit, index) => (
                <CommitItem key={index} {...commit} />
              ))}
            </div>
            
            <div className="mt-6 flex justify-center">
              <Button variant="outline">
                Load More Commits
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Commits;
