
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Link2, FileText, ArrowRight } from 'lucide-react';

interface InputFormProps {
  url: string;
  setUrl: (url: string) => void;
  content: string;
  setContent: (content: string) => void;
  contentType: string;
  setContentType: (type: string) => void;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  isAnalyzing: boolean;
  handleAnalyze: (e: React.FormEvent) => void;
  handleFullAnalysis: () => void;
}

const InputForm: React.FC<InputFormProps> = ({
  url,
  setUrl,
  content,
  setContent,
  contentType,
  setContentType,
  activeTab,
  setActiveTab,
  isAnalyzing,
  handleAnalyze,
  handleFullAnalysis
}) => {
  return (
    <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
      <TabsList className="grid w-full grid-cols-2 mb-6">
        <TabsTrigger value="url" className="text-base">
          <Link2 className="mr-2 h-4 w-4" /> Analyze URL
        </TabsTrigger>
        <TabsTrigger value="content" className="text-base">
          <FileText className="mr-2 h-4 w-4" /> Paste Content
        </TabsTrigger>
      </TabsList>
      
      <form onSubmit={handleAnalyze}>
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
        
        <div className="mt-6 flex flex-col space-y-4">
          <Button 
            type="submit" 
            className="w-full bg-aeo hover:bg-aeo-600"
            disabled={isAnalyzing}
          >
            {isAnalyzing ? 'Analyzing...' : 'Analyze Content'} {!isAnalyzing && <ArrowRight className="ml-2 h-4 w-4" />}
          </Button>
          
          <Button 
            type="button" 
            variant="outline"
            onClick={handleFullAnalysis}
          >
            Go to Full Analysis Page
          </Button>
        </div>
      </form>
    </Tabs>
  );
};

export default InputForm;
