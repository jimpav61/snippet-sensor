import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { Copy, Code, FileJson, Check, ExternalLink, Zap } from 'lucide-react';
import { toast } from 'sonner';
import { 
  Form, 
  FormControl, 
  FormDescription, 
  FormField, 
  FormItem, 
  FormLabel, 
  FormMessage 
} from '@/components/ui/form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

const schemaFormSchema = z.object({
  contentType: z.string().min(1, "Content type is required"),
  name: z.string().min(2, "Name must be at least 2 characters").max(100),
  description: z.string().min(10, "Description must be at least 10 characters").optional(),
  url: z.string().url("Must be a valid URL").or(z.literal("")),
  author: z.string().optional(),
  datePublished: z.string().optional(),
  price: z.string().optional(),
  currency: z.string().optional(),
  availability: z.string().optional(),
  questions: z.array(
    z.object({
      question: z.string().min(5, "Question must be at least 5 characters"),
      answer: z.string().min(5, "Answer must be at least 5 characters"),
    })
  ).optional(),
});

interface FAQItem {
  question: string;
  answer: string;
}

const SchemaGenerator = () => {
  const [generatedSchema, setGeneratedSchema] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [faqItems, setFaqItems] = useState<FAQItem[]>([{ question: '', answer: '' }]);
  const [copied, setCopied] = useState(false);
  const [aeoScore, setAeoScore] = useState(0);
  
  const form = useForm<z.infer<typeof schemaFormSchema>>({
    resolver: zodResolver(schemaFormSchema),
    defaultValues: {
      contentType: '',
      name: '',
      description: '',
      url: '',
      author: '',
      datePublished: '',
      price: '',
      currency: 'USD',
      availability: 'InStock',
      questions: [{ question: '', answer: '' }],
    },
  });
  
  const contentType = form.watch('contentType');
  
  const addFaqItem = () => {
    setFaqItems([...faqItems, { question: '', answer: '' }]);
  };
  
  const removeFaqItem = (index: number) => {
    const updatedItems = [...faqItems];
    updatedItems.splice(index, 1);
    setFaqItems(updatedItems);
  };
  
  const updateFaqItem = (index: number, field: 'question' | 'answer', value: string) => {
    const updatedItems = [...faqItems];
    updatedItems[index][field] = value;
    setFaqItems(updatedItems);
  };

  const clearFields = () => {
    form.reset();
    setFaqItems([{ question: '', answer: '' }]);
    setGeneratedSchema('');
    setAeoScore(0);
  };

  const onSubmit = (data: z.infer<typeof schemaFormSchema>) => {
    setIsGenerating(true);
    
    setTimeout(() => {
      let schema = {};
      let score = 0;
      
      if (data.contentType === 'article') {
        schema = {
          "@context": "https://schema.org",
          "@type": "Article",
          "headline": data.name,
          "description": data.description,
          "author": {
            "@type": "Person",
            "name": data.author
          },
          "datePublished": data.datePublished,
          "url": data.url,
          "publisher": {
            "@type": "Organization",
            "name": "Publisher Name",
            "logo": {
              "@type": "ImageObject",
              "url": "https://example.com/logo.png"
            }
          }
        };
        score = calculateAeoScore('article', data);
      } else if (data.contentType === 'product') {
        schema = {
          "@context": "https://schema.org",
          "@type": "Product",
          "name": data.name,
          "description": data.description,
          "url": data.url,
          "offers": {
            "@type": "Offer",
            "price": data.price || "0",
            "priceCurrency": data.currency || "USD",
            "availability": `https://schema.org/${data.availability || "InStock"}`
          }
        };
        score = calculateAeoScore('product', data);
      } else if (data.contentType === 'faq') {
        const mainEntity = faqItems.map(item => ({
          "@type": "Question",
          "name": item.question,
          "acceptedAnswer": {
            "@type": "Answer",
            "text": item.answer
          }
        }));
        
        schema = {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          "mainEntity": mainEntity
        };
        score = calculateAeoScore('faq', data, faqItems);
      }
      
      setGeneratedSchema(JSON.stringify(schema, null, 2));
      setAeoScore(score);
      setIsGenerating(false);
      toast.success('Schema generated successfully!');
    }, 1000);
  };

  const calculateAeoScore = (type: string, data: any, faqItems?: FAQItem[]) => {
    let score = 60;
    
    if (data.name && data.name.length > 5) score += 5;
    if (data.description && data.description.length > 20) score += 10;
    if (data.url && data.url.includes('https://')) score += 5;
    
    if (type === 'article') {
      if (data.author) score += 5;
      if (data.datePublished) score += 5;
      score += 10;
    } else if (type === 'product') {
      if (data.price) score += 5;
      if (data.currency) score += 5;
      if (data.availability) score += 5;
    } else if (type === 'faq') {
      if (faqItems && faqItems.length > 0) {
        const validPairs = faqItems.filter(item => 
          item.question.length > 10 && item.answer.length > 20
        );
        score += Math.min(validPairs.length * 5, 15);
      }
    }
    
    return Math.min(score, 100);
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      toast.success('Copied to clipboard!');
      
      setTimeout(() => {
        setCopied(false);
      }, 2000);
    }).catch(() => {
      toast.error('Failed to copy text');
    });
  };

  const openSchemaValidator = () => {
    window.open('https://validator.schema.org/', '_blank');
  };
  
  const openRichResultsTest = () => {
    window.open('https://search.google.com/test/rich-results', '_blank');
  };

  return (
    <div className="w-full max-w-5xl mx-auto">
      <Tabs defaultValue="generate">
        <TabsList className="w-full mb-6">
          <TabsTrigger value="generate" className="flex-1">Generate Schema</TabsTrigger>
          <TabsTrigger value="about" className="flex-1">About Schemas</TabsTrigger>
          <TabsTrigger value="examples" className="flex-1">Examples</TabsTrigger>
          <TabsTrigger value="aeo" className="flex-1">AEO Impact</TabsTrigger>
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
              <CardContent>
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                    <FormField
                      control={form.control}
                      name="contentType"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Content Type</FormLabel>
                          <Select 
                            onValueChange={field.onChange} 
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select content type" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="article">Article</SelectItem>
                              <SelectItem value="product">Product</SelectItem>
                              <SelectItem value="faq">FAQ Page</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Name/Title</FormLabel>
                          <FormControl>
                            <Input placeholder="Enter name or title" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="description"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Description</FormLabel>
                          <FormControl>
                            <Textarea 
                              placeholder="Enter description"
                              className="min-h-[80px]"
                              {...field} 
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="url"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>URL</FormLabel>
                          <FormControl>
                            <Input 
                              placeholder="https://example.com/your-content" 
                              {...field} 
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    {contentType === 'article' && (
                      <>
                        <FormField
                          control={form.control}
                          name="author"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Author</FormLabel>
                              <FormControl>
                                <Input placeholder="Author name" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={form.control}
                          name="datePublished"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Date Published</FormLabel>
                              <FormControl>
                                <Input type="date" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </>
                    )}
                    
                    {contentType === 'product' && (
                      <>
                        <FormField
                          control={form.control}
                          name="price"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Price</FormLabel>
                              <FormControl>
                                <Input placeholder="29.99" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={form.control}
                          name="currency"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Currency</FormLabel>
                              <Select 
                                onValueChange={field.onChange} 
                                defaultValue={field.value}
                              >
                                <FormControl>
                                  <SelectTrigger>
                                    <SelectValue placeholder="Select currency" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  <SelectItem value="USD">USD</SelectItem>
                                  <SelectItem value="EUR">EUR</SelectItem>
                                  <SelectItem value="GBP">GBP</SelectItem>
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={form.control}
                          name="availability"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Availability</FormLabel>
                              <Select 
                                onValueChange={field.onChange} 
                                defaultValue={field.value}
                              >
                                <FormControl>
                                  <SelectTrigger>
                                    <SelectValue placeholder="Select availability" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  <SelectItem value="InStock">In Stock</SelectItem>
                                  <SelectItem value="OutOfStock">Out of Stock</SelectItem>
                                  <SelectItem value="PreOrder">Pre-Order</SelectItem>
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </>
                    )}
                    
                    {contentType === 'faq' && (
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <h4 className="text-sm font-medium">FAQ Items</h4>
                          <Button 
                            type="button" 
                            variant="outline" 
                            size="sm" 
                            onClick={addFaqItem}
                          >
                            Add Question
                          </Button>
                        </div>
                        
                        {faqItems.map((item, index) => (
                          <div key={index} className="space-y-3 p-3 border rounded-md">
                            <div className="flex justify-between items-center">
                              <h5 className="text-sm font-medium">Question {index + 1}</h5>
                              {index > 0 && (
                                <Button 
                                  type="button" 
                                  variant="ghost" 
                                  size="sm"
                                  onClick={() => removeFaqItem(index)}
                                >
                                  Remove
                                </Button>
                              )}
                            </div>
                            
                            <div className="space-y-2">
                              <Label>Question</Label>
                              <Input 
                                placeholder="Enter question"
                                value={item.question}
                                onChange={(e) => updateFaqItem(index, 'question', e.target.value)}
                              />
                            </div>
                            
                            <div className="space-y-2">
                              <Label>Answer</Label>
                              <Textarea 
                                placeholder="Enter answer"
                                value={item.answer}
                                onChange={(e) => updateFaqItem(index, 'answer', e.target.value)}
                              />
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                    
                    <div className="flex justify-between pt-4">
                      <Button 
                        type="button"
                        variant="outline" 
                        onClick={clearFields}
                      >
                        Clear
                      </Button>
                      <Button 
                        type="submit"
                        disabled={isGenerating || !contentType}
                        className="bg-aeo hover:bg-aeo-600"
                      >
                        {isGenerating ? 'Generating...' : 'Generate Schema'}
                      </Button>
                    </div>
                  </form>
                </Form>
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
                  className="min-h-[280px] font-mono text-sm" 
                  value={generatedSchema}
                  readOnly
                />
                
                {generatedSchema && (
                  <div className="mt-4 space-y-4">
                    <div className="p-3 bg-aeo-50 rounded-md">
                      <h4 className="font-medium flex items-center mb-1">
                        <Zap className="h-4 w-4 mr-1 text-aeo-500" />
                        AEO Score: {aeoScore}/100
                      </h4>
                      <p className="text-sm text-gray-600">
                        {aeoScore >= 80 ? 
                          'Excellent! This schema is well-optimized for AI engines.' : 
                          aeoScore >= 60 ? 
                            'Good schema structure. Consider adding more details for better AI understanding.' : 
                            'Basic schema. Add more structured data to improve AI engine optimization.'}
                      </p>
                    </div>
                    
                    <div className="flex flex-col sm:flex-row gap-2 justify-between">
                      <Button
                        variant="outline"
                        onClick={() => copyToClipboard(generatedSchema)}
                        className="flex-1"
                      >
                        {copied ? 
                          <Check className="mr-2 h-4 w-4" /> : 
                          <Copy className="mr-2 h-4 w-4" />}
                        {copied ? 'Copied!' : 'Copy to Clipboard'}
                      </Button>
                      
                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          onClick={openSchemaValidator}
                          size="icon"
                          title="Validate Schema"
                        >
                          <FileJson className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="outline"
                          onClick={openRichResultsTest}
                          size="icon"
                          title="Test Rich Results"
                        >
                          <ExternalLink className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                )}
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
        
        <TabsContent value="aeo">
          <Card>
            <CardHeader>
              <CardTitle>Schema.org for AI Engine Optimization</CardTitle>
              <CardDescription>
                How structured data improves AI understanding and visibility
              </CardDescription>
            </CardHeader>
            <CardContent className="prose max-w-none">
              <h3>Why Schema.org Matters for AI Engines</h3>
              <p>
                AI engines rely heavily on structured data to properly understand, categorize, and prioritize content. Unlike humans who can infer meaning from context, AI systems benefit from explicit metadata that precisely defines content elements.
              </p>
              
              <div className="my-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="border rounded-lg p-4">
                  <h4 className="text-lg font-medium mb-2">Without Schema</h4>
                  <p className="text-sm text-gray-600 mb-3">
                    AI must guess at content purpose, relationships, and key entities.
                  </p>
                  <pre className="bg-slate-100 p-3 rounded-md overflow-auto text-xs">
                    {`<div>
  <h1>Understanding AI Engine Optimization</h1>
  <p>Published: March 15, 2023</p>
  <p>By John Smith</p>
  <p>Learn how to optimize your content...</p>
</div>`}
                  </pre>
                </div>
                
                <div className="border rounded-lg p-4">
                  <h4 className="text-lg font-medium mb-2">With Schema</h4>
                  <p className="text-sm text-gray-600 mb-3">
                    AI clearly understands content type, author, date, and more.
                  </p>
                  <pre className="bg-slate-100 p-3 rounded-md overflow-auto text-xs">
                    {`<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "Understanding AI Engine Optimization",
  "datePublished": "2023-03-15",
  "author": {
    "@type": "Person",
    "name": "John Smith"
  }
}
</script>`}
                  </pre>
                </div>
              </div>
              
              <h3>AEO Benefits of Schema Implementation</h3>
              <ul>
                <li><strong>Enhanced Content Visibility:</strong> AI systems prioritize content with clear structured data</li>
                <li><strong>Topical Authority:</strong> Properly marked connections between entities help establish expertise</li>
                <li><strong>Context Preservation:</strong> When AI generates summaries, schema ensures accurate representation</li>
                <li><strong>Hierarchical Understanding:</strong> Schema clarifies important relationships between content elements</li>
                <li><strong>Feature Eligibility:</strong> Content with structured data is more likely to qualify for AI-powered features</li>
              </ul>
              
              <h3>Strategic Schema Types for AEO</h3>
              <p>
                While all schema types help AI engines, these particular types have outsized benefits for AI Engine Optimization:
              </p>
              
              <ul>
                <li><strong>Article</strong> - Properly attributes authorship and publication details</li>
                <li><strong>FAQ</strong> - Provides explicit question/answer pairs that AI can directly utilize</li>
                <li><strong>HowTo</strong> - Clearly structures steps in a process for AI understanding</li>
                <li><strong>Product</strong> - Precisely defines product attributes, pricing, and availability</li>
                <li><strong>BreadcrumbList</strong> - Helps AI understand content hierarchy and relationships</li>
                <li><strong>WebPage</strong> - Defines the purpose and primary subject of a page</li>
                <li><strong>Dataset</strong> - Describes data collections with relevant attributes</li>
              </ul>
              
              <h3>Implementation Best Practices</h3>
              <ol>
                <li>Use JSON-LD format (preferred by most AI engines)</li>
                <li>Place schema in the <code>&lt;head&gt;</code> section of your HTML</li>
                <li>Be comprehensive - include all relevant properties</li>
                <li>Nest schemas appropriately to show relationships</li>
                <li>Validate your schema with Schema.org and Google's Rich Results Test</li>
                <li>Use schema consistently across your entire site</li>
              </ol>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SchemaGenerator;
