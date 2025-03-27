
import React from 'react';
import ProjectOverview from '@/components/dashboard/ProjectOverview';
import ActivityFeed from '@/components/dashboard/ActivityFeed';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { GitBranch, GitCommit, FileCode, Box, BarChart, BookOpen } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ProjectCardProps {
  name: string;
  description: string;
  language: string;
  lastUpdated: string;
  className?: string;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ name, description, language, lastUpdated, className }) => {
  return (
    <div className={cn("glass-card p-5 transitions-all hover:shadow-md", className)}>
      <h3 className="font-medium">{name}</h3>
      <p className="text-muted-foreground text-sm mt-1 line-clamp-2">{description}</p>
      <div className="flex items-center justify-between mt-4">
        <div className="flex items-center gap-2">
          <div className="h-3 w-3 rounded-full bg-primary" />
          <span className="text-xs text-muted-foreground">{language}</span>
        </div>
        <span className="text-xs text-muted-foreground">Updated {lastUpdated}</span>
      </div>
    </div>
  );
};

const Dashboard: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-6 animate-fade-in">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold">Project Dashboard</h1>
          <p className="text-muted-foreground mt-1">Overview of your projects and activities</p>
        </div>
        <div className="mt-4 md:mt-0 flex gap-3">
          <Button size="sm" variant="outline">
            <GitBranch className="h-4 w-4 mr-2" />
            New Branch
          </Button>
          <Button size="sm">
            <Box className="h-4 w-4 mr-2" />
            New Project
          </Button>
        </div>
      </div>

      <ProjectOverview />

      <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Tabs defaultValue="projects">
            <TabsList className="mb-4">
              <TabsTrigger value="projects">Projects</TabsTrigger>
              <TabsTrigger value="commits">Recent Commits</TabsTrigger>
              <TabsTrigger value="analytics">Analytics</TabsTrigger>
            </TabsList>
            
            <TabsContent value="projects" className="animate-scale-in">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <ProjectCard 
                  name="E-Commerce Backend" 
                  description="RESTful API for an e-commerce application with user management, product catalog, and order processing."
                  language="TypeScript"
                  lastUpdated="2 days ago"
                />
                <ProjectCard 
                  name="Customer Portal" 
                  description="Web interface for customers to manage their accounts, view order history, and track shipments."
                  language="TypeScript + React"
                  lastUpdated="5 days ago"
                />
                <ProjectCard 
                  name="Inventory Management System" 
                  description="System for tracking product inventory, managing suppliers, and generating reports."
                  language="Python"
                  lastUpdated="1 week ago"
                />
                <ProjectCard 
                  name="Mobile App" 
                  description="Cross-platform mobile application built with React Native for iOS and Android."
                  language="JavaScript + React Native"
                  lastUpdated="2 weeks ago"
                />
              </div>
            </TabsContent>
            
            <TabsContent value="commits" className="animate-scale-in">
              <div className="glass-card p-5">
                <div className="space-y-4">
                  {Array.from({ length: 5 }).map((_, index) => (
                    <div key={index} className="flex items-start space-x-4 transitions-all hover:bg-secondary/50 p-2 rounded-md">
                      <div className="p-2 rounded-full bg-blue-500/10 text-blue-500">
                        <GitCommit className="h-4 w-4" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-sm">Fix authentication middleware</p>
                        <p className="text-sm text-muted-foreground truncate">Resolved issue with token validation and expiration</p>
                        <div className="flex items-center mt-1 text-xs text-muted-foreground">
                          <img 
                            src={`https://i.pravatar.cc/100?img=${index + 1}`} 
                            alt="User avatar" 
                            className="h-4 w-4 rounded-full mr-1" 
                          />
                          <span>Dev User {index + 1}</span>
                          <span className="mx-1">•</span>
                          <span>{index + 1} days ago</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="analytics" className="animate-scale-in">
              <div className="glass-card p-5">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-medium">Commit Activity</h3>
                  <Button variant="outline" size="sm">
                    <BarChart className="h-4 w-4 mr-2" />
                    View Details
                  </Button>
                </div>
                <div className="h-64 flex items-center justify-center bg-muted/40 rounded-md">
                  <div className="text-center p-4">
                    <BarChart className="h-8 w-8 mx-auto text-muted-foreground mb-2" />
                    <p className="text-muted-foreground">Commit activity visualization would go here</p>
                    <p className="text-xs text-muted-foreground mt-1">(Using a chart library)</p>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
        
        <div>
          <ActivityFeed />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
