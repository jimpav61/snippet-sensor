
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { Copy, Code, FileJson } from 'lucide-react';
import { toast } from 'sonner';

const SchemaGenerator = () => {
  const [contentType, setContentType] = useState('');
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [url, setUrl] = useState('');
  const [author, setAuthor] = useState('');
  const [datePublished, setDatePublished] = useState('');
  const [generatedSchema, setGeneratedSchema] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);

  const generateSchema = () => {
    if (!contentType) {
      toast.error('Please select a content type');
      return;
    }

    if (!name.trim()) {
      toast.error('Please enter a name for your content');
      return;
    }

    setIsGenerating(true);
    
    // Simulate schema generation
    setTimeout(() => {
      let schema = {};
      
      if (contentType === 'article') {
        schema = {
          "@context": "https://schema.org",
          "@type": "Article",
          "headline": name,
          "description": description,
          "author": {
            "@type": "Person",
            "name": author
          },
          "datePublished": datePublished,
          "url": url
        };
      } else if (contentType === 'product') {
        schema = {
          "@context": "https://schema.org",
          "@type": "Product",
          "name": name,
          "description": description,
          "url": url,
          "offers": {
            "@type": "Offer",
            "price": "0",
            "priceCurrency": "USD",
            "availability": "https://schema.org/InStock"
          }
        };
      } else if (contentType === 'faq') {
        schema = {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          "mainEntity": [{
            "@type": "Question",
            "name": "Example Question",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "This is an example answer. Add your real FAQ content here."
            }
          }]
        };
      }
      
      setGeneratedSchema(JSON.stringify(schema, null, 2));
      setIsGenerating(false);
      toast.success('Schema generated successfully!');
    }, 1000);
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text).then(() => {
      toast.success('Copied to clipboard!');
    }).catch(() => {
      toast.error('Failed to copy text');
    });
  };

  const clearFields = () => {
    setContentType('');
    setName('');
    setDescription('');
    setUrl('');
    setAuthor('');
    setDatePublished('');
    setGeneratedSchema('');
  };

  return (
    <div className="w-full max-w-5xl mx-auto">
      <Tabs defaultValue="generate">
        <TabsList className="w-full mb-6">
          <TabsTrigger value="generate" className="flex-1">Generate Schema</TabsTrigger>
          <TabsTrigger value="about" className="flex-1">About Schemas</TabsTrigger>
          <TabsTrigger value="examples" className="flex-1">Examples</TabsTrigger>
        </TabsList>
        
        <TabsContent value="generate" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="h-full">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <FileJson className="h-5 w-5 mr-2" />
                  Schema Information
                </CardTitle>
                <CardDescription>
                  Enter the details for your content
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="contentType">Content Type</Label>
                  <Select value={contentType} onValueChange={setContentType}>
                    <SelectTrigger id="contentType">
                      <SelectValue placeholder="Select content type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="article">Article</SelectItem>
                      <SelectItem value="product">Product</SelectItem>
                      <SelectItem value="faq">FAQ Page</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="name">Name/Title</Label>
                  <Input 
                    id="name"
                    placeholder="Enter name or title"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea 
                    id="description"
                    placeholder="Enter description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="url">URL</Label>
                  <Input 
                    id="url"
                    placeholder="https://example.com/your-content"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                  />
                </div>
                
                {contentType === 'article' && (
                  <>
                    <div className="space-y-2">
                      <Label htmlFor="author">Author</Label>
                      <Input 
                        id="author"
                        placeholder="Author name"
                        value={author}
                        onChange={(e) => setAuthor(e.target.value)}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="datePublished">Date Published</Label>
                      <Input 
                        id="datePublished"
                        type="date"
                        value={datePublished}
                        onChange={(e) => setDatePublished(e.target.value)}
                      />
                    </div>
                  </>
                )}
                
                <div className="flex justify-between pt-4">
                  <Button 
                    variant="outline" 
                    onClick={clearFields}
                  >
                    Clear
                  </Button>
                  <Button 
                    onClick={generateSchema}
                    disabled={isGenerating || !contentType || !name.trim()}
                    className="bg-aeo hover:bg-aeo-600"
                  >
                    {isGenerating ? 'Generating...' : 'Generate Schema'}
                  </Button>
                </div>
              </CardContent>
            </Card>
            
            <Card className="h-full">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Code className="h-5 w-5 mr-2" />
                  Generated Schema
                </CardTitle>
                <CardDescription>
                  Ready-to-use structured data markup
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Textarea 
                  placeholder="Your generated schema will appear here..."
                  className="min-h-[350px] font-mono text-sm" 
                  value={generatedSchema}
                  readOnly
                />
                <div className="flex justify-end mt-4">
                  <Button
                    variant="outline"
                    onClick={() => copyToClipboard(generatedSchema)}
                    disabled={!generatedSchema}
                  >
                    <Copy className="mr-2 h-4 w-4" />
                    Copy to Clipboard
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="about">
          <Card>
            <CardHeader>
              <CardTitle>Understanding Structured Data Schemas</CardTitle>
              <CardDescription>
                What schemas are and why they help AI systems understand your content
              </CardDescription>
            </CardHeader>
            <CardContent className="prose max-w-none">
              <h3>What are Structured Data Schemas?</h3>
              <p>
                Structured data schemas are standardized formats that help search engines and AI systems understand the content of your webpages. By adding schema markup to your HTML, you're providing explicit clues about the meaning of a page to these systems.
              </p>
              
              <h3>Why are they important for AI?</h3>
              <p>
                With the rise of AI-powered search and content discovery, structured data has become increasingly important:
              </p>
              <ul>
                <li><strong>Improved AI Understanding:</strong> AI systems can better comprehend your content's purpose, topic, and key information</li>
                <li><strong>Enhanced Visibility:</strong> Content with proper schema markup is more likely to be featured in AI-generated summaries and recommendations</li>
                <li><strong>Rich Results:</strong> Many search engines use schema data to create enhanced search listings with additional information</li>
                <li><strong>Voice Search Optimization:</strong> Voice assistants often prioritize content with clear structured data</li>
              </ul>
              
              <h3>Schema.org</h3>
              <p>
                Schema.org is a collaborative, community-based project that creates, maintains, and promotes schemas for structured data on the internet. It was founded by Google, Microsoft, Yahoo, and Yandex to establish common standards.
              </p>
              
              <h3>Implementation</h3>
              <p>
                Schema markup can be added to a webpage using JSON-LD (JavaScript Object Notation for Linked Data), which is the recommended format. The generated schemas from this tool are in JSON-LD format, which you can add to the <code>&lt;head&gt;</code> section of your HTML.
              </p>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="examples">
          <Card>
            <CardHeader>
              <CardTitle>Example Schemas</CardTitle>
              <CardDescription>
                Reference examples of common schema types
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="text-lg font-medium mb-2">Article Schema</h3>
                <pre className="bg-slate-100 p-4 rounded-md overflow-auto text-sm">
                  {`{
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "Understanding AI Engine Optimization",
  "description": "Learn how to optimize your content for AI systems.",
  "author": {
    "@type": "Person",
    "name": "Jane Smith"
  },
  "datePublished": "2023-06-15",
  "url": "https://example.com/ai-optimization"
}`}
                </pre>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="mt-2"
                  onClick={() => copyToClipboard(`{
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "Understanding AI Engine Optimization",
  "description": "Learn how to optimize your content for AI systems.",
  "author": {
    "@type": "Person",
    "name": "Jane Smith"
  },
  "datePublished": "2023-06-15",
  "url": "https://example.com/ai-optimization"
}`)}
                >
                  <Copy className="mr-2 h-3 w-3" />
                  Copy Example
                </Button>
              </div>
              
              <Separator />
              
              <div>
                <h3 className="text-lg font-medium mb-2">Product Schema</h3>
                <pre className="bg-slate-100 p-4 rounded-md overflow-auto text-sm">
                  {`{
  "@context": "https://schema.org",
  "@type": "Product",
  "name": "AI Content Analyzer Pro",
  "description": "Professional tool for analyzing and optimizing content for AI systems.",
  "url": "https://example.com/products/ai-analyzer",
  "offers": {
    "@type": "Offer",
    "price": "99.99",
    "priceCurrency": "USD",
    "availability": "https://schema.org/InStock"
  }
}`}
                </pre>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="mt-2"
                  onClick={() => copyToClipboard(`{
  "@context": "https://schema.org",
  "@type": "Product",
  "name": "AI Content Analyzer Pro",
  "description": "Professional tool for analyzing and optimizing content for AI systems.",
  "url": "https://example.com/products/ai-analyzer",
  "offers": {
    "@type": "Offer",
    "price": "99.99",
    "priceCurrency": "USD",
    "availability": "https://schema.org/InStock"
  }
}`)}
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

export default SchemaGenerator;
