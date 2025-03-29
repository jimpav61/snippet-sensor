
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { ArrowRightLeft, Copy, Sparkles, Wand2 } from 'lucide-react';
import { toast } from 'sonner';

const PromptOptimizer = () => {
  const [originalPrompt, setOriginalPrompt] = useState('');
  const [optimizedPrompt, setOptimizedPrompt] = useState('');
  const [isOptimizing, setIsOptimizing] = useState(false);
  const [activeTab, setActiveTab] = useState('write');

  const optimizePrompt = () => {
    if (!originalPrompt.trim()) {
      toast.error('Please enter a prompt to optimize');
      return;
    }

    setIsOptimizing(true);
    
    // Simulate optimization process with setTimeout
    setTimeout(() => {
      // Apply optimization rules
      let improved = originalPrompt;
      
      // Rule 1: Add specificity
      if (!improved.toLowerCase().includes('specific') && !improved.toLowerCase().includes('detailed')) {
        improved = improved.trim() + '. Be specific and detailed in your response.';
      }
      
      // Rule 2: Add context for better understanding
      if (!improved.toLowerCase().includes('context')) {
        improved = improved.trim() + ' Provide context and examples where relevant.';
      }
      
      // Rule 3: Clarify output format if not specified
      if (!improved.toLowerCase().includes('format')) {
        improved = improved.trim() + ' Format your response in a clear, organized manner.';
      }
      
      // Rule 4: Request conciseness if not mentioned
      if (!improved.toLowerCase().includes('concise') && !improved.toLowerCase().includes('brief')) {
        improved = improved.trim() + ' Be concise and to the point.';
      }
      
      // Rule 5: Add politeness if missing
      if (!improved.toLowerCase().includes('please') && !improved.toLowerCase().includes('thank')) {
        improved = 'Please ' + improved.trim().toLowerCase()[0] + improved.slice(1).trim() + '. Thank you.';
      }
      
      setOptimizedPrompt(improved);
      setIsOptimizing(false);
      toast.success('Prompt optimized successfully!');
    }, 1500);
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text).then(() => {
      toast.success('Copied to clipboard!');
    }).catch(() => {
      toast.error('Failed to copy text');
    });
  };

  const clearFields = () => {
    setOriginalPrompt('');
    setOptimizedPrompt('');
  };

  const handleTabChange = (value: string) => {
    setActiveTab(value);
  };

  const tipsList = [
    "Be specific and detailed about what you want",
    "Provide context about your task or goal",
    "Break complex requests into clear steps",
    "Specify your desired output format",
    "Include examples of what you're looking for",
    "Set clear constraints and limitations",
    "Ask for a specific level of detail or complexity",
    "Use polite, clear language"
  ];

  return (
    <div className="w-full max-w-5xl mx-auto">
      <Tabs defaultValue="write" onValueChange={handleTabChange}>
        <TabsList className="w-full mb-6">
          <TabsTrigger value="write" className="flex-1">Write & Optimize</TabsTrigger>
          <TabsTrigger value="tips" className="flex-1">Prompt Writing Tips</TabsTrigger>
          <TabsTrigger value="examples" className="flex-1">Example Prompts</TabsTrigger>
        </TabsList>
        
        <TabsContent value="write" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="h-full">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Wand2 className="h-5 w-5 mr-2" />
                  Original Prompt
                </CardTitle>
                <CardDescription>
                  Enter your prompt text that you want to optimize
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Textarea 
                  placeholder="Enter your original prompt here..."
                  className="min-h-[200px] mb-4" 
                  value={originalPrompt}
                  onChange={(e) => setOriginalPrompt(e.target.value)}
                />
                <div className="flex justify-between">
                  <Button 
                    variant="outline" 
                    onClick={clearFields}
                  >
                    Clear
                  </Button>
                  <Button 
                    onClick={optimizePrompt}
                    disabled={isOptimizing || !originalPrompt.trim()}
                    className="bg-aeo hover:bg-aeo-600"
                  >
                    {isOptimizing ? 'Optimizing...' : 'Optimize Prompt'} <ArrowRightLeft className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
            
            <Card className="h-full">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Sparkles className="h-5 w-5 mr-2" />
                  Optimized Prompt
                </CardTitle>
                <CardDescription>
                  Enhanced version of your prompt
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Textarea 
                  placeholder="Your optimized prompt will appear here..."
                  className="min-h-[200px] mb-4" 
                  value={optimizedPrompt}
                  readOnly
                />
                <div className="flex justify-end">
                  <Button
                    variant="outline"
                    onClick={() => copyToClipboard(optimizedPrompt)}
                    disabled={!optimizedPrompt}
                  >
                    <Copy className="mr-2 h-4 w-4" />
                    Copy to Clipboard
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <Card>
            <CardHeader>
              <CardTitle>Optimization Applied</CardTitle>
              <CardDescription>
                Here's how we improved your prompt
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <span className="bg-green-100 text-green-800 rounded-full w-6 h-6 flex items-center justify-center mr-2 mt-0.5">✓</span>
                  <span>Added specificity and detail requirements</span>
                </li>
                <li className="flex items-start">
                  <span className="bg-green-100 text-green-800 rounded-full w-6 h-6 flex items-center justify-center mr-2 mt-0.5">✓</span>
                  <span>Enhanced with context requests</span>
                </li>
                <li className="flex items-start">
                  <span className="bg-green-100 text-green-800 rounded-full w-6 h-6 flex items-center justify-center mr-2 mt-0.5">✓</span>
                  <span>Added output format specifications</span>
                </li>
                <li className="flex items-start">
                  <span className="bg-green-100 text-green-800 rounded-full w-6 h-6 flex items-center justify-center mr-2 mt-0.5">✓</span>
                  <span>Improved clarity and conciseness</span>
                </li>
                <li className="flex items-start">
                  <span className="bg-green-100 text-green-800 rounded-full w-6 h-6 flex items-center justify-center mr-2 mt-0.5">✓</span>
                  <span>Added politeness markers</span>
                </li>
              </ul>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="tips">
          <Card>
            <CardHeader>
              <CardTitle>Effective Prompt Writing Tips</CardTitle>
              <CardDescription>
                Use these guidelines to create better prompts for AI systems
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {tipsList.map((tip, index) => (
                  <div key={index} className="flex items-start p-4 border rounded-md">
                    <span className="bg-aeo-100 text-aeo-800 rounded-full w-6 h-6 flex items-center justify-center mr-2 mt-0.5">{index + 1}</span>
                    <span>{tip}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="examples">
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
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default PromptOptimizer;
