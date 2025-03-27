
import React from 'react';
import { cn } from '@/lib/utils';
import { GitCommit, GitBranch, FileText, GitPullRequest, AlertCircle } from 'lucide-react';

type ActivityType = 'commit' | 'branch' | 'file' | 'pr' | 'issue';

interface ActivityItem {
  id: number;
  type: ActivityType;
  title: string;
  description: string;
  user: {
    name: string;
    avatar: string;
  };
  time: string;
}

const activityIcons: Record<ActivityType, React.ReactNode> = {
  commit: <GitCommit className="h-4 w-4" />,
  branch: <GitBranch className="h-4 w-4" />,
  file: <FileText className="h-4 w-4" />,
  pr: <GitPullRequest className="h-4 w-4" />,
  issue: <AlertCircle className="h-4 w-4" />,
};

const activityColors: Record<ActivityType, string> = {
  commit: 'bg-blue-500/10 text-blue-500',
  branch: 'bg-purple-500/10 text-purple-500',
  file: 'bg-green-500/10 text-green-500',
  pr: 'bg-orange-500/10 text-orange-500',
  issue: 'bg-red-500/10 text-red-500',
};

const sampleActivities: ActivityItem[] = [
  {
    id: 1,
    type: 'commit',
    title: 'Update authentication system',
    description: 'Improved JWT handling and refresh token logic',
    user: {
      name: 'Alex Morgan',
      avatar: 'https://i.pravatar.cc/100?img=1',
    },
    time: '5 min ago'
  },
  {
    id: 2,
    type: 'branch',
    title: 'Created new branch',
    description: 'feature/user-dashboard',
    user: {
      name: 'Jordan Lee',
      avatar: 'https://i.pravatar.cc/100?img=2',
    },
    time: '1 hour ago'
  },
  {
    id: 3,
    type: 'file',
    title: 'Updated API documentation',
    description: 'Added endpoints for user management',
    user: {
      name: 'Taylor Swift',
      avatar: 'https://i.pravatar.cc/100?img=3',
    },
    time: '2 hours ago'
  },
  {
    id: 4,
    type: 'pr',
    title: 'Pull request opened',
    description: 'Merge feature/auth-redesign into develop',
    user: {
      name: 'Kim Parker',
      avatar: 'https://i.pravatar.cc/100?img=4',
    },
    time: '3 hours ago'
  },
  {
    id: 5,
    type: 'issue',
    title: 'Issue reported',
    description: 'Login screen not working in Safari',
    user: {
      name: 'Jamie Rodriguez',
      avatar: 'https://i.pravatar.cc/100?img=5',
    },
    time: '5 hours ago'
  },
];

const ActivityFeed: React.FC = () => {
  return (
    <div className="glass-card p-5 animate-fade-in">
      <h3 className="font-medium mb-4">Recent Activity</h3>
      <div className="space-y-4">
        {sampleActivities.map((activity) => (
          <div key={activity.id} className="flex items-start space-x-4 transitions-all hover:bg-secondary/50 p-2 rounded-md">
            <div className={cn("p-2 rounded-full", activityColors[activity.type])}>
              {activityIcons[activity.type]}
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-medium text-sm">{activity.title}</p>
              <p className="text-sm text-muted-foreground truncate">{activity.description}</p>
              <div className="flex items-center mt-1 text-xs text-muted-foreground">
                <img 
                  src={activity.user.avatar} 
                  alt={activity.user.name} 
                  className="h-4 w-4 rounded-full mr-1" 
                />
                <span>{activity.user.name}</span>
                <span className="mx-1">•</span>
                <span>{activity.time}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ActivityFeed;
