
import React, { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';

interface NodeData {
  id: string;
  label: string;
  type: 'component' | 'util' | 'hook' | 'api' | 'page';
}

interface EdgeData {
  source: string;
  target: string;
}

interface GraphData {
  nodes: NodeData[];
  edges: EdgeData[];
}

// Sample data for the visualization
const sampleGraphData: GraphData = {
  nodes: [
    { id: 'app', label: 'App', type: 'component' },
    { id: 'router', label: 'Router', type: 'component' },
    { id: 'dashboard', label: 'Dashboard', type: 'page' },
    { id: 'structure', label: 'Structure', type: 'page' },
    { id: 'docs', label: 'Documentation', type: 'page' },
    { id: 'api', label: 'API Client', type: 'api' },
    { id: 'auth', label: 'Auth', type: 'util' },
    { id: 'storage', label: 'Storage', type: 'util' },
    { id: 'graph', label: 'Graph Util', type: 'util' },
    { id: 'useRepo', label: 'useRepository', type: 'hook' },
    { id: 'useAuth', label: 'useAuth', type: 'hook' },
  ],
  edges: [
    { source: 'app', target: 'router' },
    { source: 'router', target: 'dashboard' },
    { source: 'router', target: 'structure' },
    { source: 'router', target: 'docs' },
    { source: 'dashboard', target: 'api' },
    { source: 'dashboard', target: 'useRepo' },
    { source: 'structure', target: 'useRepo' },
    { source: 'docs', target: 'api' },
    { source: 'api', target: 'auth' },
    { source: 'api', target: 'storage' },
    { source: 'structure', target: 'graph' },
    { source: 'auth', target: 'useAuth' },
  ]
};

// This is a simplified visualization that doesn't use D3.js or React Flow
// In a real implementation, you would use one of those libraries for better visualization
const DependencyGraph: React.FC = () => {
  const [selectedNode, setSelectedNode] = useState<string | null>(null);
  
  const getNodeSize = (nodeType: string): string => {
    switch (nodeType) {
      case 'component': return 'h-16 w-16';
      case 'page': return 'h-14 w-14';
      case 'api': return 'h-12 w-12';
      case 'util': return 'h-10 w-10';
      case 'hook': return 'h-10 w-10';
      default: return 'h-12 w-12';
    }
  };
  
  const getNodeColor = (nodeType: string): string => {
    switch (nodeType) {
      case 'component': return 'bg-blue-500/90 dark:bg-blue-600/90';
      case 'page': return 'bg-purple-500/90 dark:bg-purple-600/90';
      case 'api': return 'bg-green-500/90 dark:bg-green-600/90';
      case 'util': return 'bg-amber-500/90 dark:bg-amber-600/90';
      case 'hook': return 'bg-rose-500/90 dark:bg-rose-600/90';
      default: return 'bg-gray-500/90 dark:bg-gray-600/90';
    }
  };
  
  const isRelated = (nodeId: string) => {
    if (!selectedNode) return false;
    
    // Check if there's a connection between selected node and this node
    return sampleGraphData.edges.some(
      edge => (edge.source === selectedNode && edge.target === nodeId) || 
              (edge.target === selectedNode && edge.source === nodeId)
    );
  };

  return (
    <div className="glass-card p-5 h-[600px] relative overflow-hidden animate-fade-in">
      <h3 className="font-medium mb-4">Project Dependencies</h3>
      
      <div className="absolute inset-y-16 inset-x-5 bg-muted/40 rounded-lg overflow-hidden">
        <div className="relative h-full w-full">
          {/* Simplified visual representation */}
          <div className="absolute inset-0 flex items-center justify-center">
            {sampleGraphData.nodes.map((node) => {
              const isActive = selectedNode === node.id;
              const isConnected = isRelated(node.id);
              
              const positionStyles = {
                left: `${Math.random() * 70 + 15}%`,
                top: `${Math.random() * 70 + 15}%`,
                transform: 'translate(-50%, -50%)'
              };
              
              return (
                <div 
                  key={node.id}
                  className={cn(
                    "absolute rounded-full flex items-center justify-center text-white transitions-all cursor-pointer shadow-lg",
                    getNodeSize(node.type),
                    getNodeColor(node.type),
                    isActive ? "ring-4 ring-white dark:ring-black z-20" : "",
                    selectedNode && !isActive && !isConnected ? "opacity-30" : "opacity-100",
                    "hover:scale-110"
                  )}
                  style={positionStyles}
                  onClick={() => setSelectedNode(isActive ? null : node.id)}
                >
                  <span className="text-xs font-medium">{node.label}</span>
                </div>
              );
            })}
            
            {/* Simple "edges" as background decoration */}
            <div className="absolute inset-0 opacity-20 pointer-events-none">
              {Array.from({ length: 20 }).map((_, i) => (
                <div 
                  key={i}
                  className="absolute h-px bg-foreground/70"
                  style={{
                    width: `${Math.random() * 30 + 10}%`,
                    left: `${Math.random() * 80}%`,
                    top: `${Math.random() * 80}%`,
                    transform: `rotate(${Math.random() * 360}deg)`
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
      
      <div className="absolute bottom-4 right-4 flex gap-3">
        <div className="bg-white dark:bg-gray-800 rounded-md p-3 shadow-md">
          <div className="text-xs font-medium mb-2">Legend</div>
          <div className="flex flex-col gap-1.5">
            {['component', 'page', 'api', 'util', 'hook'].map(type => (
              <div key={type} className="flex items-center gap-2">
                <div className={cn(
                  "h-3 w-3 rounded-full",
                  getNodeColor(type)
                )} />
                <span className="text-xs capitalize">{type}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DependencyGraph;
