
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Home, 
  LayoutDashboard, 
  FileText, 
  GitBranch, 
  GitCommit, 
  Search, 
  Network, 
  Settings, 
  Github, 
  List 
} from 'lucide-react';

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarSeparator,
  SidebarTrigger,
  SidebarRail
} from "@/components/ui/sidebar";

const ApplicationSidebar = () => {
  const location = useLocation();

  const links = [
    { name: 'Home', path: '/', icon: Home },
    { name: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
    { name: 'Documentation', path: '/documentation', icon: FileText },
    { name: 'Project Structure', path: '/structure', icon: GitBranch },
    { name: 'Commit History', path: '/commits', icon: GitCommit },
    { name: 'Search', path: '/search', icon: Search },
    { name: 'Dependencies', path: '/dependencies', icon: Network },
    { name: 'SRS Mapping', path: '/srs-mapping', icon: List },
  ];

  return (
    <>
      <Sidebar>
        <SidebarHeader className="py-2">
          <div className="flex items-center px-2">
            <Link to="/" className="flex items-center space-x-2">
              <Network className="h-6 w-6 text-primary" />
              <span className="font-semibold text-lg">PS8 Platform</span>
            </Link>
            <div className="flex-1" />
            <SidebarTrigger />
          </div>
        </SidebarHeader>
        
        <SidebarSeparator />
        
        <SidebarContent>
          <SidebarMenu>
            {links.map((link) => {
              const isActive = location.pathname === link.path;
              return (
                <SidebarMenuItem key={link.path}>
                  <SidebarMenuButton 
                    isActive={isActive}
                    asChild
                    tooltip={link.name}
                  >
                    <Link to={link.path}>
                      <link.icon className="h-5 w-5" />
                      <span>{link.name}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              );
            })}
          </SidebarMenu>
        </SidebarContent>
        
        <SidebarFooter>
          <div className="p-2 space-y-2">
            <SidebarMenuButton asChild tooltip="Connect Repository">
              <Link to="/connect-repository">
                <Github className="h-5 w-5" />
                <span>Connect Repository</span>
              </Link>
            </SidebarMenuButton>
            
            <SidebarMenuButton asChild tooltip="Settings">
              <Link to="/settings">
                <Settings className="h-5 w-5" />
                <span>Settings</span>
              </Link>
            </SidebarMenuButton>
          </div>
        </SidebarFooter>
        
        <SidebarRail />
      </Sidebar>
    </>
  );
};

export default ApplicationSidebar;
