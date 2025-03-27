
import React from 'react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Network, Download, RefreshCw, Filter, ArrowDownToLine } from 'lucide-react';
import DependencyGraph from '@/components/visualizations/DependencyGraph';
import { cn } from '@/lib/utils';

interface ModuleProps {
  name: string;
  type: 'component' | 'util' | 'hook' | 'api' | 'page';
  dependsOn: string[];
  usedBy: string[];
}

const getModuleColor = (type: string): string => {
  switch (type) {
    case 'component': return 'bg-blue-500/90 text-white';
    case 'page': return 'bg-purple-500/90 text-white';
    case 'api': return 'bg-green-500/90 text-white';
    case 'util': return 'bg-amber-500/90 text-white';
    case 'hook': return 'bg-rose-500/90 text-white';
    default: return 'bg-gray-500/90 text-white';
  }
};

const sampleModules: ModuleProps[] = [
  {
    name: 'Dashboard',
    type: 'page',
    dependsOn: ['API Client', 'useRepository', 'ProjectStats', 'ActivityFeed'],
    usedBy: ['Router']
  },
  {
    name: 'ProjectStats',
    type: 'component',
    dependsOn: ['API Client'],
    usedBy: ['Dashboard']
  },
  {
    name: 'ActivityFeed',
    type: 'component',
    dependsOn: ['API Client'],
    usedBy: ['Dashboard']
  },
  {
    name: 'API Client',
    type: 'api',
    dependsOn: ['Auth', 'Storage'],
    usedBy: ['Dashboard', 'Documentation', 'ProjectStats', 'ActivityFeed']
  },
  {
    name: 'useRepository',
    type: 'hook',
    dependsOn: ['API Client'],
    usedBy: ['Dashboard', 'Structure']
  },
];

const Dependencies: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-6 animate-fade-in">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold">Dependency Visualization</h1>
          <p className="text-muted-foreground mt-1">Explore module relationships and architecture</p>
        </div>
        <div className="mt-4 md:mt-0 flex gap-3">
          <Button size="sm" variant="outline">
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh
          </Button>
          <Button size="sm" variant="outline">
            <Filter className="h-4 w-4 mr-2" />
            Filter
          </Button>
          <Button size="sm">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      <Tabs defaultValue="graph">
        <TabsList className="mb-6">
          <TabsTrigger value="graph">Graph View</TabsTrigger>
          <TabsTrigger value="list">List View</TabsTrigger>
          <TabsTrigger value="matrix">Dependency Matrix</TabsTrigger>
        </TabsList>
        
        <TabsContent value="graph" className="animate-scale-in">
          <DependencyGraph />
        </TabsContent>
        
        <TabsContent value="list" className="animate-scale-in">
          <div className="glass-card p-6">
            <h2 className="text-xl font-bold mb-6">Module Dependencies</h2>
            
            <div className="grid gap-4">
              {sampleModules.map((module) => (
                <div key={module.name} className="border rounded-md p-4 hover:shadow-md transitions-all">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center">
                      <div className={cn("px-3 py-1 rounded-md mr-3", getModuleColor(module.type))}>
                        <span className="text-sm capitalize">{module.type}</span>
                      </div>
                      <h3 className="font-medium text-lg">{module.name}</h3>
                    </div>
                    <Button variant="ghost" size="sm">
                      <ArrowDownToLine className="h-4 w-4 mr-2" />
                      Details
                    </Button>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <h4 className="text-sm font-medium mb-2">Depends On</h4>
                      {module.dependsOn.length > 0 ? (
                        <div className="flex flex-wrap gap-2">
                          {module.dependsOn.map((dep) => (
                            <div key={dep} className="px-2 py-1 bg-secondary rounded-md text-xs">
                              {dep}
                            </div>
                          ))}
                        </div>
                      ) : (
                        <p className="text-sm text-muted-foreground">No dependencies</p>
                      )}
                    </div>
                    <div>
                      <h4 className="text-sm font-medium mb-2">Used By</h4>
                      {module.usedBy.length > 0 ? (
                        <div className="flex flex-wrap gap-2">
                          {module.usedBy.map((dep) => (
                            <div key={dep} className="px-2 py-1 bg-secondary rounded-md text-xs">
                              {dep}
                            </div>
                          ))}
                        </div>
                      ) : (
                        <p className="text-sm text-muted-foreground">Not used by any module</p>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="matrix" className="animate-scale-in">
          <div className="glass-card p-6">
            <h2 className="text-xl font-bold mb-6">Dependency Matrix</h2>
            
            <div className="overflow-x-auto">
              <table className="min-w-full border-collapse">
                <thead>
                  <tr>
                    <th className="p-3 border bg-secondary/50 text-left">Module</th>
                    {sampleModules.map(module => (
                      <th key={module.name} className="p-3 border bg-secondary/50 text-center">
                        {module.name}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {sampleModules.map(module => (
                    <tr key={module.name}>
                      <td className="p-3 border font-medium bg-secondary/30">
                        {module.name}
                      </td>
                      {sampleModules.map(dep => (
                        <td key={dep.name} className="p-3 border text-center">
                          {module.dependsOn.includes(dep.name) ? (
                            <Network className="h-4 w-4 text-primary mx-auto" />
                          ) : module.name === dep.name ? (
                            <div className="h-4 w-4 bg-muted/50 rounded-full mx-auto" />
                          ) : null}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Dependencies;
