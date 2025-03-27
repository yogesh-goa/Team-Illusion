
import React, { useState } from 'react';
import { ChevronRight, ChevronDown, CheckCircle, AlertCircle, Clock } from 'lucide-react';
import { cn } from '@/lib/utils';

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
  status: 'implemented' | 'partial' | 'pending';
};

interface SrsTreeViewProps {
  entries: SrsEntry[];
  onSelect: (entry: SrsEntry) => void;
  selectedId: string | undefined;
  level?: number;
}

const SrsTreeView: React.FC<SrsTreeViewProps> = ({ 
  entries, 
  onSelect, 
  selectedId,
  level = 0
}) => {
  const [expandedIds, setExpandedIds] = useState<Record<string, boolean>>({});

  const toggleExpand = (id: string) => {
    setExpandedIds((prev) => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const getStatusIcon = (status: SrsEntry['status']) => {
    switch (status) {
      case 'implemented':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'partial':
        return <Clock className="h-4 w-4 text-amber-500" />;
      case 'pending':
        return <AlertCircle className="h-4 w-4 text-red-500" />;
    }
  };

  return (
    <ul className={cn("pl-0", level > 0 && "pl-4")}>
      {entries.map((entry) => {
        const hasChildren = entry.children && entry.children.length > 0;
        const isExpanded = expandedIds[entry.id];
        const isSelected = entry.id === selectedId;

        return (
          <li key={entry.id} className="select-none">
            <div 
              className={cn(
                "flex items-center py-2 px-3 cursor-pointer hover:bg-secondary group rounded-md",
                isSelected && "bg-primary/10 hover:bg-primary/15"
              )}
            >
              {hasChildren ? (
                <button
                  className="mr-1 p-1 rounded-sm hover:bg-secondary-foreground/10"
                  onClick={() => toggleExpand(entry.id)}
                >
                  {isExpanded ? (
                    <ChevronDown className="h-4 w-4 text-muted-foreground" />
                  ) : (
                    <ChevronRight className="h-4 w-4 text-muted-foreground" />
                  )}
                </button>
              ) : (
                <div className="w-6" />
              )}
              
              <button 
                onClick={() => onSelect(entry)}
                className="flex-1 flex items-start text-left"
              >
                <span className="mr-2 mt-1">{getStatusIcon(entry.status)}</span>
                <div className="flex-1">
                  <div className="flex items-center">
                    <span className="text-xs text-muted-foreground font-mono bg-secondary-foreground/10 px-1.5 py-0.5 rounded">
                      {entry.srsId}
                    </span>
                  </div>
                  <div className="font-medium mt-1">{entry.title}</div>
                  {entry.description && (
                    <p className="text-xs text-muted-foreground mt-1 line-clamp-1">
                      {entry.description}
                    </p>
                  )}
                </div>
              </button>
            </div>
            
            {hasChildren && isExpanded && (
              <SrsTreeView
                entries={entry.children!}
                onSelect={onSelect}
                selectedId={selectedId}
                level={level + 1}
              />
            )}
          </li>
        );
      })}
    </ul>
  );
};

export default SrsTreeView;
