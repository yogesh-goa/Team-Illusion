
import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Search, Github, Sun, Moon, User, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import SearchBar from '@/components/shared/SearchBar';
import { useToast } from '@/hooks/use-toast';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';

const Navbar: React.FC = () => {
  const [darkMode, setDarkMode] = useState(false);
  const location = useLocation();
  const { toast } = useToast();
  const navigate = useNavigate();

  const toggleDarkMode = () => {
    if (darkMode) {
      document.documentElement.classList.remove('dark');
    } else {
      document.documentElement.classList.add('dark');
    }
    setDarkMode(!darkMode);
    toast({
      title: `${darkMode ? 'Light' : 'Dark'} mode activated`,
      duration: 1500,
    });
  };

  const handleSignOut = () => {
    toast({
      title: "Signed out successfully",
      duration: 2000,
    });
    // This would normally clear auth state and redirect
    // navigate("/sign-in");
  };

  const paths: { [key: string]: string } = {
    '/': 'PS8 Platform',
    '/dashboard': 'Dashboard',
    '/documentation': 'Documentation',
    '/structure': 'Project Structure',
    '/commits': 'Commit History',
    '/search': 'Search',
    '/dependencies': 'Dependencies',
    '/settings': 'Settings',
    '/srs-mapping': 'SRS Mapping',
    '/connect-repository': 'Connect Repository',
  };

  return (
    <header className="sticky top-0 z-40 glass-card m-2 backdrop-blur-md animate-fade-in">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <SidebarTrigger className="md:hidden" />
            <h1 className="text-xl font-semibold tracking-tight">
              {paths[location.pathname] || 'PS8 Platform'}
            </h1>
          </div>

          <div className="hidden md:flex flex-1 max-w-md mx-10">
            <SearchBar />
          </div>

          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" onClick={toggleDarkMode}>
              {darkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </Button>
            <Button variant="ghost" size="icon" asChild>
              <a href="https://github.com" target="_blank" rel="noopener noreferrer">
                <Github className="h-5 w-5" />
              </a>
            </Button>
            <Button variant="outline" size="sm" className="hidden md:flex" asChild>
              <Link to="/connect-repository">
                Connect Repository
              </Link>
            </Button>
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button size="sm" className="gap-2">
                  <User className="h-4 w-4" />
                  <span className="hidden sm:inline">Account</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem asChild>
                  <Link to="/settings" className="cursor-pointer">
                    <User className="h-4 w-4 mr-2" />
                    Settings
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleSignOut} className="cursor-pointer">
                  <LogOut className="h-4 w-4 mr-2" />
                  Sign out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
