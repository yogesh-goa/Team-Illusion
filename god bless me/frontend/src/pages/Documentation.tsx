
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { FileText, Download, Copy, ChevronRight, ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';

interface DocSectionProps {
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
}

const DocSection: React.FC<DocSectionProps> = ({ title, children, defaultOpen = false }) => {
  const [isOpen, setIsOpen] = React.useState(defaultOpen);

  return (
    <div className="border rounded-lg mb-4 overflow-hidden">
      <button
        className="w-full flex items-center justify-between p-4 text-left font-medium hover:bg-muted/50 transitions-all"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span>{title}</span>
        {isOpen ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
      </button>
      {isOpen && (
        <div className="p-4 pt-0 border-t">
          {children}
        </div>
      )}
    </div>
  );
};

const Documentation: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-6 animate-fade-in">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold">Documentation</h1>
          <p className="text-muted-foreground mt-1">Auto-generated from your codebase</p>
        </div>
        <div className="mt-4 md:mt-0 flex gap-3">
          <Button size="sm" variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
          <Button size="sm">
            <FileText className="h-4 w-4 mr-2" />
            Generate
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-1">
          <div className="glass-card p-4 sticky top-20">
            <h3 className="font-medium mb-3">Table of Contents</h3>
            <nav className="space-y-1">
              {['Introduction', 'Getting Started', 'API Reference', 'Components', 'Utilities', 'Examples'].map((item) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase().replace(' ', '-')}`}
                  className="block px-3 py-2 text-sm rounded-md hover:bg-muted transitions-all"
                >
                  {item}
                </a>
              ))}
            </nav>
          </div>
        </div>

        <div className="lg:col-span-3">
          <Tabs defaultValue="docs">
            <TabsList className="mb-4">
              <TabsTrigger value="docs">Documentation</TabsTrigger>
              <TabsTrigger value="api">API</TabsTrigger>
              <TabsTrigger value="srs">SRS Mapping</TabsTrigger>
            </TabsList>
            
            <TabsContent value="docs" className="animate-scale-in">
              <div className="glass-card p-6">
                <section id="introduction" className="mb-8">
                  <h2 className="text-2xl font-bold mb-4">Introduction</h2>
                  <p className="text-muted-foreground mb-4">
                    This documentation is automatically generated from your code, comments, and commit history. It provides an overview of your project structure, functionality, and how to get started with development.
                  </p>
                  
                  <DocSection title="Project Overview" defaultOpen={true}>
                    <p className="mb-3">
                      The Project Development & Assistance Platform (PS8) is a comprehensive tool designed to help developers understand, navigate, and contribute to projects more effectively.
                    </p>
                    <p className="mb-3">
                      Key features include:
                    </p>
                    <ul className="list-disc pl-5 space-y-1 text-muted-foreground">
                      <li>SRS-to-Code Mapping</li>
                      <li>Intelligent Project Navigation</li>
                      <li>Interactive Documentation Generation</li>
                      <li>Guided Onboarding for Developers</li>
                      <li>AI-powered Search & Insights</li>
                    </ul>
                  </DocSection>
                  
                  <DocSection title="Technology Stack">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <h4 className="font-medium mb-2">Frontend</h4>
                        <ul className="list-disc pl-5 space-y-1 text-muted-foreground">
                          <li>Next.js</li>
                          <li>TypeScript</li>
                          <li>TailwindCSS</li>
                          <li>React Query</li>
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-medium mb-2">APIs & Services</h4>
                        <ul className="list-disc pl-5 space-y-1 text-muted-foreground">
                          <li>GitHub API</li>
                          <li>NextAuth.js</li>
                          <li>React Flow</li>
                          <li>Marked.js</li>
                        </ul>
                      </div>
                    </div>
                  </DocSection>
                </section>
                
                <section id="getting-started" className="mb-8">
                  <h2 className="text-2xl font-bold mb-4">Getting Started</h2>
                  
                  <DocSection title="Installation">
                    <div className="bg-secondary/80 p-3 rounded-md font-mono text-sm mb-3 relative group">
                      <Button 
                        size="icon" 
                        variant="ghost" 
                        className="absolute top-2 right-2 h-6 w-6 opacity-0 group-hover:opacity-100 transitions-all"
                      >
                        <Copy className="h-3 w-3" />
                      </Button>
                      <pre>git clone https://github.com/your-org/ps8-platform.git
cd ps8-platform
npm install</pre>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      This will clone the repository and install all dependencies.
                    </p>
                  </DocSection>
                  
                  <DocSection title="Configuration">
                    <p className="mb-3">
                      Create a <code className="bg-secondary/80 px-1 py-0.5 rounded text-sm">.env.local</code> file in the root directory with the following variables:
                    </p>
                    <div className="bg-secondary/80 p-3 rounded-md font-mono text-sm mb-3 relative group">
                      <Button 
                        size="icon" 
                        variant="ghost" 
                        className="absolute top-2 right-2 h-6 w-6 opacity-0 group-hover:opacity-100 transitions-all"
                      >
                        <Copy className="h-3 w-3" />
                      </Button>
                      <pre>NEXT_PUBLIC_API_URL=http://localhost:3001/api
NEXT_PUBLIC_GITHUB_CLIENT_ID=your_github_client_id
NEXTAUTH_SECRET=your_nextauth_secret
NEXTAUTH_URL=http://localhost:3000</pre>
                    </div>
                  </DocSection>
                  
                  <DocSection title="Running the Application">
                    <div className="bg-secondary/80 p-3 rounded-md font-mono text-sm mb-3 relative group">
                      <Button 
                        size="icon" 
                        variant="ghost" 
                        className="absolute top-2 right-2 h-6 w-6 opacity-0 group-hover:opacity-100 transitions-all"
                      >
                        <Copy className="h-3 w-3" />
                      </Button>
                      <pre>npm run dev</pre>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      The application will be available at <code className="bg-secondary/80 px-1 py-0.5 rounded text-sm">http://localhost:3000</code>.
                    </p>
                  </DocSection>
                </section>
                
                {/* Additional sections would go here */}
              </div>
            </TabsContent>
            
            <TabsContent value="api" className="animate-scale-in">
              <div className="glass-card p-6">
                <h2 className="text-2xl font-bold mb-4">API Reference</h2>
                <p className="text-muted-foreground mb-4">
                  This section provides detailed information about the API endpoints available in the PS8 Platform.
                </p>
                
                <DocSection title="Authentication API" defaultOpen={true}>
                  <div className="space-y-4">
                    <div className="border-l-4 border-primary pl-4">
                      <h4 className="font-medium">POST /api/auth/login</h4>
                      <p className="text-sm text-muted-foreground mb-2">
                        Authenticates a user and returns a JWT token.
                      </p>
                      <div className="flex gap-2">
                        <span className="px-2 py-0.5 bg-blue-500 text-white text-xs rounded">POST</span>
                        <span className="px-2 py-0.5 bg-secondary text-muted-foreground text-xs rounded">
                          Requires: username, password
                        </span>
                      </div>
                    </div>
                    
                    <div className="border-l-4 border-primary pl-4">
                      <h4 className="font-medium">GET /api/auth/user</h4>
                      <p className="text-sm text-muted-foreground mb-2">
                        Returns the currently authenticated user.
                      </p>
                      <div className="flex gap-2">
                        <span className="px-2 py-0.5 bg-green-500 text-white text-xs rounded">GET</span>
                        <span className="px-2 py-0.5 bg-secondary text-muted-foreground text-xs rounded">
                          Requires: Authorization header
                        </span>
                      </div>
                    </div>
                  </div>
                </DocSection>
                
                <DocSection title="Repository API">
                  <div className="space-y-4">
                    <div className="border-l-4 border-primary pl-4">
                      <h4 className="font-medium">GET /api/repos</h4>
                      <p className="text-sm text-muted-foreground mb-2">
                        Returns a list of repositories for the authenticated user.
                      </p>
                      <div className="flex gap-2">
                        <span className="px-2 py-0.5 bg-green-500 text-white text-xs rounded">GET</span>
                        <span className="px-2 py-0.5 bg-secondary text-muted-foreground text-xs rounded">
                          Requires: Authorization header
                        </span>
                      </div>
                    </div>
                    
                    <div className="border-l-4 border-primary pl-4">
                      <h4 className="font-medium">GET /api/repos/:id</h4>
                      <p className="text-sm text-muted-foreground mb-2">
                        Returns details for a specific repository.
                      </p>
                      <div className="flex gap-2">
                        <span className="px-2 py-0.5 bg-green-500 text-white text-xs rounded">GET</span>
                        <span className="px-2 py-0.5 bg-secondary text-muted-foreground text-xs rounded">
                          Requires: Authorization header
                        </span>
                      </div>
                    </div>
                  </div>
                </DocSection>
                
                {/* Additional API documentation would go here */}
              </div>
            </TabsContent>
            
            <TabsContent value="srs" className="animate-scale-in">
              <div className="glass-card p-6">
                <h2 className="text-2xl font-bold mb-4">SRS to Code Mapping</h2>
                <p className="text-muted-foreground mb-4">
                  This section shows how software requirements are mapped to specific code implementations.
                </p>
                
                <DocSection title="User Authentication Requirements" defaultOpen={true}>
                  <div className="space-y-4">
                    <div className="border rounded-md p-4">
                      <div className="flex items-start gap-4">
                        <div className="bg-primary/10 text-primary p-2 rounded">
                          <FileText className="h-5 w-5" />
                        </div>
                        <div>
                          <h4 className="font-medium">REQ-AUTH-001: User Login</h4>
                          <p className="text-sm text-muted-foreground mb-2">
                            The system shall provide a secure login mechanism using username/password and OAuth.
                          </p>
                          <div className="mt-3 space-y-2">
                            <div className="flex items-center text-sm">
                              <span className="text-muted-foreground mr-2">Implemented in:</span>
                              <span className="bg-secondary px-2 py-0.5 rounded font-mono text-xs">
                                src/components/auth/LoginForm.tsx
                              </span>
                            </div>
                            <div className="flex items-center text-sm">
                              <span className="text-muted-foreground mr-2">API Endpoint:</span>
                              <span className="bg-secondary px-2 py-0.5 rounded font-mono text-xs">
                                /api/auth/login
                              </span>
                            </div>
                            <div className="text-sm">
                              <span className="text-muted-foreground mr-2">Completed by:</span>
                              <span>Alex Morgan on June 15, 2023</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="border rounded-md p-4">
                      <div className="flex items-start gap-4">
                        <div className="bg-primary/10 text-primary p-2 rounded">
                          <FileText className="h-5 w-5" />
                        </div>
                        <div>
                          <h4 className="font-medium">REQ-AUTH-002: Password Recovery</h4>
                          <p className="text-sm text-muted-foreground mb-2">
                            The system shall provide a mechanism for users to recover their passwords.
                          </p>
                          <div className="mt-3 space-y-2">
                            <div className="flex items-center text-sm">
                              <span className="text-muted-foreground mr-2">Implemented in:</span>
                              <span className="bg-secondary px-2 py-0.5 rounded font-mono text-xs">
                                src/components/auth/PasswordRecovery.tsx
                              </span>
                            </div>
                            <div className="flex items-center text-sm">
                              <span className="text-muted-foreground mr-2">API Endpoint:</span>
                              <span className="bg-secondary px-2 py-0.5 rounded font-mono text-xs">
                                /api/auth/recover
                              </span>
                            </div>
                            <div className="text-sm">
                              <span className="text-muted-foreground mr-2">Completed by:</span>
                              <span>Jordan Lee on June 18, 2023</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </DocSection>
                
                {/* Additional SRS mappings would go here */}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default Documentation;
