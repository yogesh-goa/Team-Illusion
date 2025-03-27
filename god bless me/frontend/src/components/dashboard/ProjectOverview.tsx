
import React from 'react';
import { cn } from '@/lib/utils';
import { GitBranch, GitCommit, FileCode, Users, Clock } from 'lucide-react';

interface ProjectStatsProps {
  label: string;
  value: string | number;
  icon: React.ReactNode;
  change?: string;
  positive?: boolean;
}

const ProjectStat: React.FC<ProjectStatsProps> = ({ label, value, icon, change, positive }) => {
  return (
    <div className="glass-card p-4 transitions-all hover:shadow-md group">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-muted-foreground">{label}</p>
          <p className="text-2xl font-medium mt-1">{value}</p>
          {change && (
            <p className={cn(
              "text-xs mt-1",
              positive ? "text-green-500" : "text-red-500"
            )}>
              {change}
            </p>
          )}
        </div>
        <div className="p-3 rounded-full bg-primary/10 group-hover:bg-primary/20 transitions-all">
          {icon}
        </div>
      </div>
    </div>
  );
};

const ProjectOverview: React.FC = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <ProjectStat 
        label="Active Branches" 
        value={8} 
        icon={<GitBranch className="h-5 w-5 text-primary" />}
        change="+2 this week"
        positive={true}
      />
      <ProjectStat 
        label="Recent Commits" 
        value={24} 
        icon={<GitCommit className="h-5 w-5 text-primary" />}
        change="+15 this week"
        positive={true}
      />
      <ProjectStat 
        label="Code Files" 
        value={156} 
        icon={<FileCode className="h-5 w-5 text-primary" />}
        change="+3 this week"
        positive={true}
      />
      <ProjectStat 
        label="Contributors" 
        value={5} 
        icon={<Users className="h-5 w-5 text-primary" />}
      />
    </div>
  );
};

export default ProjectOverview;
