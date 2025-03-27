
import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Search, FolderTree, File, ChevronRight, ChevronDown, Code, Eye, Download } from 'lucide-react';

interface FileTreeItemProps {
  name: string;
  type: 'folder' | 'file';
  level: number;
  children?: React.ReactNode;
}

const FileTreeItem: React.FC<FileTreeItemProps> = ({ name, type, level, children }) => {
  const [isOpen, setIsOpen] = useState(false);

  const hasChildren = React.Children.count(children) > 0;
  
  return (
    <div>
      <div 
        className={cn(
          "flex items-center py-1 px-2 rounded-md hover:bg-secondary/80 transitions-all cursor-pointer",
          level === 0 ? "font-medium" : ""
        )}
        style={{ paddingLeft: `${level * 12 + 8}px` }}
        onClick={() => hasChildren && setIsOpen(!isOpen)}
      >
        {hasChildren ? (
          isOpen ? <ChevronDown className="h-4 w-4 mr-1" /> : <ChevronRight className="h-4 w-4 mr-1" />
        ) : (
          <div className="w-4 mr-1" />
        )}
        
        {type === 'folder' ? (
          <FolderTree className="h-4 w-4 mr-2 text-amber-500" />
        ) : (
          <File className="h-4 w-4 mr-2 text-blue-500" />
        )}
        
        <span className={cn(
          "text-sm",
          type === 'file' ? "text-muted-foreground" : ""
        )}>
          {name}
        </span>
      </div>
      
      {isOpen && children}
    </div>
  );
};

const Structure: React.FC = () => {
  const [viewMode, setViewMode] = useState<'tree' | 'structure'>('tree');
  
  return (
    <div className="container mx-auto px-4 py-6 animate-fade-in">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold">Project Structure</h1>
          <p className="text-muted-foreground mt-1">Explore your codebase organization</p>
        </div>
        <div className="mt-4 md:mt-0 flex gap-3">
          <div className="flex border rounded-md overflow-hidden">
            <Button 
              variant={viewMode === 'tree' ? 'default' : 'ghost'} 
              size="sm"
              onClick={() => setViewMode('tree')}
              className="rounded-none"
            >
              <FolderTree className="h-4 w-4 mr-2" />
              File Tree
            </Button>
            <Button 
              variant={viewMode === 'structure' ? 'default' : 'ghost'} 
              size="sm"
              onClick={() => setViewMode('structure')}
              className="rounded-none"
            >
              <Code className="h-4 w-4 mr-2" />
              Component Structure
            </Button>
          </div>
          <Button size="sm" variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-1">
          <div className="glass-card p-4 sticky top-20">
            <div className="mb-4">
              <div className="relative">
                <Search className="h-4 w-4 absolute top-2.5 left-3 text-muted-foreground" />
                <input
                  type="search"
                  placeholder="Search files..."
                  className="w-full pl-9 pr-4 py-2 rounded-md bg-secondary/50 border-0 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
                />
              </div>
            </div>
            
            <h3 className="font-medium mb-3">Project Files</h3>
            <div className="max-h-[500px] overflow-y-auto pr-2">
              <FileTreeItem name="ps8-frontend" type="folder" level={0}>
                <FileTreeItem name="components" type="folder" level={1}>
                  <FileTreeItem name="Navbar.tsx" type="file" level={2} />
                  <FileTreeItem name="Sidebar.tsx" type="file" level={2} />
                  <FileTreeItem name="SearchBar.tsx" type="file" level={2} />
                  <FileTreeItem name="CodeViewer.tsx" type="file" level={2} />
                  <FileTreeItem name="CommitTimeline.tsx" type="file" level={2} />
                  <FileTreeItem name="TreeView.tsx" type="file" level={2} />
                </FileTreeItem>
                <FileTreeItem name="pages" type="folder" level={1}>
                  <FileTreeItem name="index.tsx" type="file" level={2} />
                  <FileTreeItem name="dashboard.tsx" type="file" level={2} />
                  <FileTreeItem name="docs.tsx" type="file" level={2} />
                  <FileTreeItem name="commits.tsx" type="file" level={2} />
                  <FileTreeItem name="structure.tsx" type="file" level={2} />
                  <FileTreeItem name="search.tsx" type="file" level={2} />
                  <FileTreeItem name="dependencies.tsx" type="file" level={2} />
                </FileTreeItem>
                <FileTreeItem name="api" type="folder" level={1}>
                  <FileTreeItem name="auth.ts" type="file" level={2} />
                  <FileTreeItem name="repo.ts" type="file" level={2} />
                  <FileTreeItem name="commits.ts" type="file" level={2} />
                  <FileTreeItem name="docs.ts" type="file" level={2} />
                  <FileTreeItem name="search.ts" type="file" level={2} />
                  <FileTreeItem name="dependencies.ts" type="file" level={2} />
                </FileTreeItem>
                <FileTreeItem name=".env.local" type="file" level={1} />
                <FileTreeItem name="next.config.js" type="file" level={1} />
                <FileTreeItem name="tsconfig.json" type="file" level={1} />
                <FileTreeItem name="package.json" type="file" level={1} />
              </FileTreeItem>
            </div>
          </div>
        </div>

        <div className="lg:col-span-3">
          {viewMode === 'tree' ? (
            <div className="glass-card p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold">File Tree Structure</h2>
                <div className="flex items-center gap-2">
                  <Button size="sm" variant="outline">
                    <Eye className="h-4 w-4 mr-2" />
                    Preview
                  </Button>
                </div>
              </div>
              
              <div className="bg-secondary/50 p-4 rounded-md">
                <pre className="text-sm overflow-x-auto whitespace-pre-wrap">
{`ps8-frontend/
├── components/
│   ├── Navbar.tsx
│   ├── Sidebar.tsx
│   ├── SearchBar.tsx
│   ├── CodeViewer.tsx
│   ├── CommitTimeline.tsx
│   └── TreeView.tsx
├── pages/
│   ├── index.tsx
│   ├── dashboard.tsx
│   ├── docs.tsx
│   ├── commits.tsx
│   ├── structure.tsx
│   ├── search.tsx
│   └── dependencies.tsx
├── api/
│   ├── auth.ts
│   ├── repo.ts
│   ├── commits.ts
│   ├── docs.ts
│   ├── search.ts
│   └── dependencies.ts
├── .env.local
├── next.config.js
├── tsconfig.json
└── package.json`}
                </pre>
              </div>
              
              <div className="mt-8">
                <h3 className="text-lg font-medium mb-4">File Structure Explanation</h3>
                <div className="space-y-4">
                  <div className="p-4 border rounded-md">
                    <h4 className="font-medium mb-2">components/</h4>
                    <p className="text-muted-foreground text-sm">
                      Contains all the reusable UI components for the application.
                      These components are used across multiple pages to maintain consistency.
                    </p>
                  </div>
                  
                  <div className="p-4 border rounded-md">
                    <h4 className="font-medium mb-2">pages/</h4>
                    <p className="text-muted-foreground text-sm">
                      Contains the main page components that correspond to different routes in the application.
                      Next.js uses file-based routing, so each file in this directory represents a route.
                    </p>
                  </div>
                  
                  <div className="p-4 border rounded-md">
                    <h4 className="font-medium mb-2">api/</h4>
                    <p className="text-muted-foreground text-sm">
                      Contains API-related utilities and functions for making requests to the backend.
                      Each file corresponds to a specific API domain.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="glass-card p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold">Component Structure</h2>
                <div className="flex items-center gap-2">
                  <Button size="sm" variant="outline">
                    <Eye className="h-4 w-4 mr-2" />
                    Preview Relationships
                  </Button>
                </div>
              </div>
              
              <div className="relative h-[500px] bg-secondary/30 rounded-md flex items-center justify-center mb-6">
                <div className="text-center">
                  <Code className="h-10 w-10 text-muted-foreground mx-auto mb-3" />
                  <p className="text-muted-foreground">Component relationship visualization would go here</p>
                  <p className="text-xs text-muted-foreground mt-1">(Using React Flow or D3.js)</p>
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-medium mb-4">Component Relationships</h3>
                <div className="space-y-4">
                  <div className="p-4 border rounded-md">
                    <h4 className="font-medium mb-2">App Component</h4>
                    <p className="text-muted-foreground text-sm mb-2">
                      The main application component that serves as the entry point.
                    </p>
                    <div className="bg-secondary/50 p-3 rounded-md text-sm">
                      <p><span className="text-primary">Imports:</span> Navbar, Sidebar, Router</p>
                      <p><span className="text-primary">Used by:</span> Root</p>
                    </div>
                  </div>
                  
                  <div className="p-4 border rounded-md">
                    <h4 className="font-medium mb-2">Navbar Component</h4>
                    <p className="text-muted-foreground text-sm mb-2">
                      The top navigation bar component that appears on all pages.
                    </p>
                    <div className="bg-secondary/50 p-3 rounded-md text-sm">
                      <p><span className="text-primary">Imports:</span> SearchBar, UserMenu</p>
                      <p><span className="text-primary">Used by:</span> App</p>
                    </div>
                  </div>
                  
                  <div className="p-4 border rounded-md">
                    <h4 className="font-medium mb-2">Dashboard Page</h4>
                    <p className="text-muted-foreground text-sm mb-2">
                      The main dashboard page that shows project stats and activity.
                    </p>
                    <div className="bg-secondary/50 p-3 rounded-md text-sm">
                      <p><span className="text-primary">Imports:</span> ProjectStats, ActivityFeed, RecentCommits</p>
                      <p><span className="text-primary">API calls:</span> getProjectStats, getRecentActivity</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Structure;
