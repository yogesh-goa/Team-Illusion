
import React, { useEffect, useRef } from 'react';
import { Copy, Check, File } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { toast } from '@/hooks/use-toast';

interface CodeSnippetProps {
  code: string;
  language: string;
  fileName?: string;
  functionName?: string;
}

const CodeSnippet: React.FC<CodeSnippetProps> = ({ 
  code, 
  language,
  fileName,
  functionName
}) => {
  const [copied, setCopied] = React.useState(false);
  const codeRef = useRef<HTMLPreElement>(null);

  // Simple syntax highlighting (in a real app, we'd use Prism.js or similar)
  const highlightSyntax = (code: string) => {
    // This is a very simple highlighting just for demo
    // In a real app, use a proper syntax highlighter like Prism.js
    return code
      .replace(/\/\/(.*)/g, '<span class="text-yellow-500">$&</span>') // Comments
      .replace(/function|const|let|var|return|if|else|for|while|import|export|from|default/g, 
               '<span class="text-purple-500">$&</span>') // Keywords
      .replace(/['"`].*?['"`]/g, '<span class="text-green-500">$&</span>') // Strings
      .replace(/(\w+)(?=\()/g, '<span class="text-blue-500">$&</span>'); // Functions
  };

  const copyToClipboard = async () => {
    if (codeRef.current) {
      const textContent = codeRef.current.textContent || '';
      try {
        await navigator.clipboard.writeText(textContent);
        setCopied(true);
        toast({ title: "Code copied to clipboard", duration: 2000 });
        
        setTimeout(() => {
          setCopied(false);
        }, 2000);
      } catch (err) {
        toast({ 
          title: "Failed to copy", 
          description: "Please try again or copy manually", 
          variant: "destructive" 
        });
      }
    }
  };

  return (
    <div className="relative">
      <div className="bg-muted rounded-t-md py-2 px-4 flex items-center justify-between">
        <div className="flex items-center">
          <File className="h-4 w-4 mr-2 text-muted-foreground" />
          <span className="text-sm font-medium truncate">
            {fileName}
            {functionName && <span className="text-muted-foreground ml-1">→ {functionName}()</span>}
          </span>
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={copyToClipboard}
          className="h-8 w-8 p-0"
        >
          {copied ? (
            <Check className="h-4 w-4 text-green-500" />
          ) : (
            <Copy className="h-4 w-4" />
          )}
        </Button>
      </div>
      <div className="relative">
        <pre 
          ref={codeRef}
          className={cn(
            "p-4 overflow-x-auto rounded-b-md text-sm font-mono max-h-[400px] whitespace-pre bg-muted/50"
          )}
        >
          <code 
            className={`language-${language}`}
            dangerouslySetInnerHTML={{ __html: highlightSyntax(code) }}
          />
        </pre>
      </div>
    </div>
  );
};

export default CodeSnippet;
