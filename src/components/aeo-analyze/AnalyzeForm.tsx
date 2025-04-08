
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { ArrowRight, Link2, FileText } from 'lucide-react';
import { toast } from 'sonner';
import { analyzeContent } from '@/utils/contentAnalyzer';

interface AnalyzeFormProps {
  onAnalysisComplete: (scores: {
    keywordRelevance: number;
    readability: number;
    snippetOptimization: number;
    structuredData: number;
    finalScore: number;
  }, recommendations: string[]) => void;
}

const AnalyzeForm: React.FC<AnalyzeFormProps> = ({ onAnalysisComplete }) => {
  const [activeTab, setActiveTab] = useState('url');
  const [url, setUrl] = useState('');
  const [content, setContent] = useState('');
  const [contentType, setContentType] = useState('blog');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  
  const fetchContentFromUrl = async (urlToFetch: string): Promise<string> => {
    // In a production environment, this would use a backend API to fetch content
    // For now, we simulate the content based on the URL
    return new Promise((resolve) => {
      setTimeout(() => {
        const dummyContent = `This is a simulation of content from ${urlToFetch}. 
          In a production environment, this would be the actual content fetched from the URL.
          The content would then be analyzed for AI Engine Optimization.
          Long-form content with proper structure tends to perform better in AI engines.
          Key factors include keyword relevance, readability, snippet optimization, and structured data.
          ${urlToFetch.includes('blog') ? 'This appears to be a blog post about AI technology and its applications in modern business.' : ''}
          ${urlToFetch.includes('product') ? 'This appears to be a product page for an AI-powered solution.' : ''}
          ${urlToFetch.includes('service') ? 'This appears to be a service page offering AI optimization services.' : ''}`;
        
        resolve(dummyContent);
      }, 1000);
    });
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if ((activeTab === 'url' && !url) || (activeTab === 'content' && !content)) {
      toast.error('Please provide content to analyze');
      return;
    }
    
    setIsAnalyzing(true);
    
    try {
      let contentToAnalyze = '';
      
      // If URL is provided, fetch content from URL
      if (activeTab === 'url') {
        toast.info('Fetching content from URL...');
        contentToAnalyze = await fetchContentFromUrl(url);
      } else {
        contentToAnalyze = content;
      }
      
      // Analyze the content
      toast.info('Analyzing content...');
      const { scores, recommendations } = await analyzeContent(contentToAnalyze, contentType);
      
      setIsAnalyzing(false);
      onAnalysisComplete(scores, recommendations);
      toast.success('Analysis completed successfully!');
    } catch (error) {
      console.error('Error analyzing content:', error);
      setIsAnalyzing(false);
      toast.error('Failed to analyze content. Please try again.');
    }
  };

  return (
    <div className="aeo-card p-6 md:p-8">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-2 mb-6">
          <TabsTrigger value="url" className="text-base">
            <Link2 className="mr-2 h-4 w-4" /> Analyze URL
          </TabsTrigger>
          <TabsTrigger value="content" className="text-base">
            <FileText className="mr-2 h-4 w-4" /> Paste Content
          </TabsTrigger>
        </TabsList>
        
        <form onSubmit={handleSubmit}>
          <TabsContent value="url">
            <div className="space-y-4">
              <div>
                <Label htmlFor="url">Enter the URL to analyze</Label>
                <Input 
                  id="url" 
                  placeholder="https://yourwebsite.com/page-to-analyze" 
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  className="mt-1"
                />
              </div>
              
              <div>
                <Label>Content Type</Label>
                <RadioGroup 
                  value={contentType} 
                  onValueChange={setContentType}
                  className="flex flex-wrap gap-4 mt-2"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="blog" id="blog" />
                    <Label htmlFor="blog">Blog Post</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="product" id="product" />
                    <Label htmlFor="product">Product Page</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="service" id="service" />
                    <Label htmlFor="service">Service Page</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="other" id="other" />
                    <Label htmlFor="other">Other</Label>
                  </div>
                </RadioGroup>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="content">
            <div className="space-y-4">
              <div>
                <Label htmlFor="content">Paste your content</Label>
                <Textarea 
                  id="content" 
                  placeholder="Paste your content here to analyze..." 
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  className="mt-1 min-h-[200px]"
                />
              </div>
              
              <div>
                <Label>Content Type</Label>
                <RadioGroup 
                  value={contentType} 
                  onValueChange={setContentType}
                  className="flex flex-wrap gap-4 mt-2"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="blog" id="blog-content" />
                    <Label htmlFor="blog-content">Blog Post</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="product" id="product-content" />
                    <Label htmlFor="product-content">Product Page</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="service" id="service-content" />
                    <Label htmlFor="service-content">Service Page</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="other" id="other-content" />
                    <Label htmlFor="other-content">Other</Label>
                  </div>
                </RadioGroup>
              </div>
            </div>
          </TabsContent>
          
          <div className="mt-6">
            <Button 
              type="submit" 
              className="w-full bg-aeo hover:bg-aeo-600"
              disabled={isAnalyzing}
            >
              {isAnalyzing ? 'Analyzing...' : 'Analyze Content'} {!isAnalyzing && <ArrowRight className="ml-2 h-4 w-4" />}
            </Button>
          </div>
        </form>
      </Tabs>
    </div>
  );
};

export default AnalyzeForm;
