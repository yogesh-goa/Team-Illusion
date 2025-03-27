
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { GitBranch, Code, GitCommit, FileText, Users, ArrowRight, Github } from 'lucide-react';
import { cn } from '@/lib/utils';

const featureItems = [
  {
    icon: <Code className="h-6 w-6 text-primary" />,
    title: 'SRS-to-Code Mapping',
    description: 'Associate SRS features and requirements with specific code files, modules, and functions.',
  },
  {
    icon: <GitBranch className="h-6 w-6 text-primary" />,
    title: 'Intelligent Project Navigation',
    description: 'Structured project view showcasing how different components interact.',
  },
  {
    icon: <FileText className="h-6 w-6 text-primary" />,
    title: 'Interactive Documentation',
    description: 'Auto-generate documentation from commit history, function comments, and SRS mappings.',
  },
  {
    icon: <GitCommit className="h-6 w-6 text-primary" />,
    title: 'Guided Onboarding',
    description: 'Step-by-step guide to project setup and key feature implementations.',
  },
  {
    icon: <Users className="h-6 w-6 text-primary" />,
    title: 'AI-powered Search',
    description: 'Contextual search to locate relevant code by feature, function, or commit.',
  },
];

const Index: React.FC = () => {
  return (
    <div className="animate-fade-in">
      {/* Hero section */}
      <section className="py-20 px-4 text-center">
        <div className="max-w-4xl mx-auto">
          <div className="inline-block mb-4 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium">
            Project Development & Assistance Platform
          </div>
          <h1 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight">
            Understand your codebase<br />
            <span className="text-primary">faster than ever</span>
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Automatically map SRS features to code, visualize dependencies, and generate interactive documentation for your projects.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button size="lg" asChild>
              <Link to="/dashboard">
                Get Started
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <a href="https://github.com" target="_blank" rel="noopener noreferrer">
                <Github className="mr-2 h-4 w-4" />
                Connect GitHub
              </a>
            </Button>
          </div>
        </div>
      </section>

      {/* Features section */}
      <section className="py-16 px-4 bg-muted/30">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Key Features</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featureItems.map((feature, index) => (
              <div 
                key={index} 
                className="glass-card p-6 transitions-all hover:shadow-md hover:translate-y-[-4px]"
              >
                <div className="mb-4 p-3 rounded-full bg-primary/10 inline-block">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA section */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to transform your development workflow?</h2>
          <p className="text-xl text-muted-foreground mb-8">
            Connect your GitHub repository and start mapping your SRS requirements to your codebase today.
          </p>
          <Button size="lg" asChild>
            <Link to="/dashboard">
              Explore the Dashboard
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Index;
