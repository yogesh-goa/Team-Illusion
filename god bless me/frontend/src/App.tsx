import { useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import Navbar from "@/components/layout/Navbar";
import ApplicationSidebar from "@/components/layout/ApplicationSidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import Index from "@/pages/Index";
import Dashboard from "@/pages/Dashboard";
import Documentation from "@/pages/Documentation";
import Structure from "@/pages/Structure";
import Commits from "@/pages/Commits";
import Search from "@/pages/Search";
import Dependencies from "@/pages/Dependencies";
import NotFound from "@/pages/NotFound";
import SignIn from "@/pages/SignIn";
import Settings from "@/pages/Settings";
import SrsMapping from "@/pages/SrsMapping";
import ConnectRepository from "@/pages/ConnectRepository";

const queryClient = new QueryClient();

const App = () => {
  // State to track if user is authenticated
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(true); // Set to true for demo purposes

  // Auth wrapper component
  const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
    if (!isAuthenticated) {
      return <Navigate to="/sign-in" replace />;
    }
    return <>{children}</>;
  };

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <SidebarProvider>
            <div className="min-h-screen flex flex-col relative w-full">
              {isAuthenticated && <Navbar />}
              <div className="flex flex-1 w-full relative"> {/* Make this relative to position the sidebar absolutely */}
                {isAuthenticated && <ApplicationSidebar />} {/* Sidebar will now be below the Navbar */}
                <main className="flex-1 transition-all duration-300 ml-64"> {/* Adjust margin-left based on Sidebar width if needed */}
                  <Routes>
                    {/* Public routes */}
                    <Route path="/sign-in" element={<SignIn />} />
                    
                    {/* Protected routes */}
                    <Route path="/" element={<ProtectedRoute><Index /></ProtectedRoute>} />
                    <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
                    <Route path="/documentation" element={<ProtectedRoute><Documentation /></ProtectedRoute>} />
                    <Route path="/structure" element={<ProtectedRoute><Structure /></ProtectedRoute>} />
                    <Route path="/commits" element={<ProtectedRoute><Commits /></ProtectedRoute>} />
                    <Route path="/search" element={<ProtectedRoute><Search /></ProtectedRoute>} />
                    <Route path="/dependencies" element={<ProtectedRoute><Dependencies /></ProtectedRoute>} />
                    <Route path="/settings" element={<ProtectedRoute><Settings /></ProtectedRoute>} />
                    <Route path="/srs-mapping" element={<ProtectedRoute><SrsMapping /></ProtectedRoute>} />
                    <Route path="/connect-repository" element={<ProtectedRoute><ConnectRepository /></ProtectedRoute>} />
                    
                    {/* Catch all */}
                    <Route path="*" element={<NotFound />} />
                  </Routes>
                </main>
              </div>
            </div>
          </SidebarProvider>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;