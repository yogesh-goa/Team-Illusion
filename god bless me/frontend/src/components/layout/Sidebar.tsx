
import React, { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import {
  Home,
  LayoutDashboard,
  FileText,
  GitBranch,
  GitCommit,
  Search,
  Network,
  Settings,
  X,
  ChevronLeft,
  ChevronRight,
  Github,
  Code,
  List
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';

interface SidebarProps {
  isOpen: boolean;
  closeSidebar: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, closeSidebar }) => {
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

  // Close sidebar on route change for mobile
  useEffect(() => {
    if (window.innerWidth < 768) {
      closeSidebar();
    }
  }, [location.pathname, closeSidebar]);

  return (
    <>
      {/* Mobile overlay to close sidebar when clicked outside */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-40 bg-background/80 backdrop-blur-sm md:hidden"
          onClick={closeSidebar}
        />
      )}

      {/* Sidebar Toggle Button (visible when sidebar is closed) */}
      <button
        className={cn(
          "fixed z-40 top-1/2 transform -translate-y-1/2 bg-primary text-primary-foreground rounded-r-md p-1.5 shadow-md transition-all duration-300 hidden md:flex items-center justify-center",
          isOpen ? "left-64" : "left-0"
        )}
        onClick={closeSidebar}
        aria-label="Toggle sidebar"
      >
        {isOpen ? (
          <ChevronLeft className="h-4 w-4" />
        ) : (
          <ChevronRight className="h-4 w-4" />
        )}
      </button>

      {/* Sidebar */}
      <div 
        className={cn(
          "fixed inset-y-0 left-0 z-50 w-72 bg-sidebar text-sidebar-foreground border-r border-sidebar-border transition-transform duration-300 md:transition-transform md:duration-300 transform md:translate-x-0",
          isOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="h-full flex flex-col">
          <div className="p-4 flex items-center justify-between">
            <Link to="/" className="flex items-center space-x-2">
              <Network className="h-6 w-6 text-primary" />
              <span className="font-semibold text-lg">PS8 Platform</span>
            </Link>
            <div className="flex items-center">
              <Button
                variant="ghost"
                size="icon"
                onClick={closeSidebar}
                className="md:hidden"
              >
                <X className="h-5 w-5" />
              </Button>
            </div>
          </div>

          <Separator className="my-2" />

          <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
            {links.map((link) => {
              const isActive = location.pathname === link.path;
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className={cn(
                    "flex items-center gap-3 px-3 py-2 rounded-md transition-all hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
                    isActive ? "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground" : ""
                  )}
                >
                  <link.icon className="h-5 w-5" />
                  <span>{link.name}</span>
                </Link>
              );
            })}
          </nav>

          <div className="p-4 space-y-3 mt-auto">
            <Button variant="outline" className="w-full justify-start" asChild>
              <Link to="/connect-repository">
                <Github className="h-5 w-5 mr-2" />
                Connect Repository
              </Link>
            </Button>
            
            <Button variant="outline" className="w-full justify-start" asChild>
              <Link to="/settings">
                <Settings className="h-5 w-5 mr-2" />
                Settings
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
