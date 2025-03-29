
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { ArrowRight, ExternalLink, Link2, FileText, Download } from 'lucide-react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { toast } from 'sonner';

const AEOAnalyzePage = () => {
  const [activeTab, setActiveTab] = useState('url');
  const [url, setUrl] = useState('');
  const [content, setContent] = useState('');
  const [contentType, setContentType] = useState('blog');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [showResults, setShowResults] = useState(false);
  
  // Simulated scores (in a real app, these would come from API)
  const scores = {
    keywordRelevance: 78,
    readability: 85,
    snippetOptimization: 62,
    structuredData: 70,
    finalScore: 74,
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if ((activeTab === 'url' && !url) || (activeTab === 'content' && !content)) {
      toast.error('Please provide content to analyze');
      return;
    }
    
    setIsAnalyzing(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsAnalyzing(false);
      setShowResults(true);
      toast.success('Analysis completed successfully!');
    }, 2500);
  };
  
  const handleDownloadReport = () => {
    toast.success('AEO Report is being generated and will download shortly');
    // In a real app, this would trigger a PDF download
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow py-10 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-10">
            <h1 className="heading-lg mb-4 text-gray-900">Get Your <span className="text-aeo">AEO Score</span></h1>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Analyze your content to see how it performs with AI-driven search systems and get actionable recommendations.
            </p>
          </div>
          
          {!showResults ? (
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
          ) : (
            <div className="space-y-6">
              <div className="aeo-card p-6 md:p-8">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
                  <div>
                    <h2 className="text-2xl font-bold">AEO Analysis Results</h2>
                    <p className="text-gray-600">
                      {activeTab === 'url' ? url : 'Content analysis'} • {new Date().toLocaleDateString()}
                    </p>
                  </div>
                  <Button 
                    onClick={handleDownloadReport} 
                    variant="outline" 
                    className="mt-4 md:mt-0"
                  >
                    <Download className="mr-2 h-4 w-4" /> Download Report
                  </Button>
                </div>
                
                <div className="p-6 bg-gray-50 rounded-lg border border-gray-100 mb-6">
                  <div className="flex flex-col items-center">
                    <div 
                      className="relative h-40 w-40 flex items-center justify-center mb-4"
                      style={{
                        background: `conic-gradient(#F65228 ${scores.finalScore}%, #E5E7EB ${scores.finalScore}% 100%)`
                      }}
                      className="rounded-full"
                    >
                      <div className="absolute inset-3 bg-white rounded-full flex items-center justify-center">
                        <div className="text-center">
                          <span className="text-4xl font-bold text-gray-900">{scores.finalScore}</span>
                          <span className="text-lg text-gray-500">/100</span>
                        </div>
                      </div>
                    </div>
                    <h3 className="text-xl font-semibold">Overall AEO Score</h3>
                    <p className="text-gray-600 mt-1">Your content is performing moderately well for AI engines.</p>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold mb-2">Score Breakdown</h3>
                  
                  <div className="space-y-5">
                    <div>
                      <div className="flex justify-between items-center mb-1">
                        <span className="font-medium">Keyword Relevance</span>
                        <span className="text-gray-700">{scores.keywordRelevance}/100</span>
                      </div>
                      <div className="w-full bg-gray-100 rounded-full h-2.5">
                        <div 
                          className="bg-aeo-500 h-2.5 rounded-full" 
                          style={{ width: `${scores.keywordRelevance}%` }}
                        ></div>
                      </div>
                      <p className="text-sm text-gray-500 mt-1">
                        Good keyword usage, but could be more comprehensive for topic coverage.
                      </p>
                    </div>
                    
                    <div>
                      <div className="flex justify-between items-center mb-1">
                        <span className="font-medium">Readability</span>
                        <span className="text-gray-700">{scores.readability}/100</span>
                      </div>
                      <div className="w-full bg-gray-100 rounded-full h-2.5">
                        <div 
                          className="bg-aeo-500 h-2.5 rounded-full" 
                          style={{ width: `${scores.readability}%` }}
                        ></div>
                      </div>
                      <p className="text-sm text-gray-500 mt-1">
                        Your content is easy to read and well-structured.
                      </p>
                    </div>
                    
                    <div>
                      <div className="flex justify-between items-center mb-1">
                        <span className="font-medium">Snippet Optimization</span>
                        <span className="text-gray-700">{scores.snippetOptimization}/100</span>
                      </div>
                      <div className="w-full bg-gray-100 rounded-full h-2.5">
                        <div 
                          className="bg-aeo-500 h-2.5 rounded-full" 
                          style={{ width: `${scores.snippetOptimization}%` }}
                        ></div>
                      </div>
                      <p className="text-sm text-gray-500 mt-1">
                        Your content needs improvement to be featured in AI-generated snippets.
                      </p>
                    </div>
                    
                    <div>
                      <div className="flex justify-between items-center mb-1">
                        <span className="font-medium">Structured Data</span>
                        <span className="text-gray-700">{scores.structuredData}/100</span>
                      </div>
                      <div className="w-full bg-gray-100 rounded-full h-2.5">
                        <div 
                          className="bg-aeo-500 h-2.5 rounded-full" 
                          style={{ width: `${scores.structuredData}%` }}
                        ></div>
                      </div>
                      <p className="text-sm text-gray-500 mt-1">
                        Add more structured data to help AI systems understand your content.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="aeo-card p-6 md:p-8">
                <h3 className="text-xl font-semibold mb-4">Key Recommendations</h3>
                
                <ul className="space-y-4">
                  <li className="flex">
                    <div className="flex-shrink-0 h-6 w-6 rounded-full bg-aeo-500 flex items-center justify-center text-white font-medium text-sm">
                      1
                    </div>
                    <div className="ml-3">
                      <p className="text-gray-800 font-medium">Improve snippet optimization</p>
                      <p className="text-gray-600 mt-1">
                        Include clear, concise answers to common questions related to your topic. Format key information in lists and use descriptive subheadings.
                      </p>
                    </div>
                  </li>
                  
                  <li className="flex">
                    <div className="flex-shrink-0 h-6 w-6 rounded-full bg-aeo-500 flex items-center justify-center text-white font-medium text-sm">
                      2
                    </div>
                    <div className="ml-3">
                      <p className="text-gray-800 font-medium">Enhance structured data</p>
                      <p className="text-gray-600 mt-1">
                        Implement Schema.org markup to provide clear signals to AI systems about your content's purpose and structure.
                      </p>
                    </div>
                  </li>
                  
                  <li className="flex">
                    <div className="flex-shrink-0 h-6 w-6 rounded-full bg-aeo-500 flex items-center justify-center text-white font-medium text-sm">
                      3
                    </div>
                    <div className="ml-3">
                      <p className="text-gray-800 font-medium">Expand topic coverage</p>
                      <p className="text-gray-600 mt-1">
                        Address related subtopics and questions to provide comprehensive coverage that AI systems prefer.
                      </p>
                    </div>
                  </li>
                </ul>
                
                <Separator className="my-6" />
                
                <div className="text-center">
                  <h3 className="text-lg font-medium mb-3">Want a detailed action plan?</h3>
                  <p className="text-gray-600 mb-4">
                    Schedule a consultation with our AEO experts to get personalized recommendations.
                  </p>
                  <Button className="bg-aeo hover:bg-aeo-600">
                    Schedule a Consultation
                  </Button>
                </div>
              </div>
              
              <div className="text-center mt-6">
                <Button 
                  variant="outline" 
                  onClick={() => setShowResults(false)}
                >
                  Analyze Another Content
                </Button>
              </div>
            </div>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default AEOAnalyzePage;
