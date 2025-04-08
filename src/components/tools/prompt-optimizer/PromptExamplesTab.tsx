
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Copy } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { toast } from 'sonner';

const PromptExamplesTab: React.FC = () => {
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text).then(() => {
      toast.success('Copied to clipboard!');
    }).catch(() => {
      toast.error('Failed to copy text');
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Example Prompts</CardTitle>
        <CardDescription>
          Study these examples to understand effective prompt patterns
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="border rounded-md p-4">
          <h3 className="text-lg font-medium mb-2">Weak Prompt:</h3>
          <p className="p-3 bg-gray-100 rounded mb-4">Tell me about climate change.</p>
          
          <h3 className="text-lg font-medium mb-2">Strong Prompt:</h3>
          <p className="p-3 bg-green-50 rounded">Please provide a comprehensive explanation of climate change, including its main causes, three major impacts, and the most promising solutions currently being developed. Include specific data points and organize the information in sections with headers. Keep the explanation at a high school reading level.</p>
          <Button 
            variant="outline" 
            size="sm" 
            className="mt-2"
            onClick={() => copyToClipboard("Please provide a comprehensive explanation of climate change, including its main causes, three major impacts, and the most promising solutions currently being developed. Include specific data points and organize the information in sections with headers. Keep the explanation at a high school reading level.")}
          >
            <Copy className="mr-2 h-3 w-3" />
            Copy Example
          </Button>
        </div>
        
        <Separator />
        
        <div className="border rounded-md p-4">
          <h3 className="text-lg font-medium mb-2">Weak Prompt:</h3>
          <p className="p-3 bg-gray-100 rounded mb-4">Write code for a website.</p>
          
          <h3 className="text-lg font-medium mb-2">Strong Prompt:</h3>
          <p className="p-3 bg-green-50 rounded">Please write HTML, CSS, and JavaScript code for a responsive landing page for a fictional coffee shop called "Mountain Brew." The page should include: a navigation bar with links to Menu, About, and Contact sections; a hero section with a high-quality image and tagline; a featured products section showing 3 coffee types with descriptions and prices; and a footer with contact information. Use modern CSS practices and ensure the design is mobile-friendly. Add comments in the code to explain key functionality.</p>
          <Button 
            variant="outline" 
            size="sm" 
            className="mt-2"
            onClick={() => copyToClipboard("Please write HTML, CSS, and JavaScript code for a responsive landing page for a fictional coffee shop called \"Mountain Brew.\" The page should include: a navigation bar with links to Menu, About, and Contact sections; a hero section with a high-quality image and tagline; a featured products section showing 3 coffee types with descriptions and prices; and a footer with contact information. Use modern CSS practices and ensure the design is mobile-friendly. Add comments in the code to explain key functionality.")}
          >
            <Copy className="mr-2 h-3 w-3" />
            Copy Example
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default PromptExamplesTab;
