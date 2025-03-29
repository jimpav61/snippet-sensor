
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Link2, FileText, ArrowRight, Info, Lightbulb, Download } from 'lucide-react';
import { toast } from 'sonner';
import { Skeleton } from '@/components/ui/skeleton';

const AEOAnalyzer = () => {
  const [activeTab, setActiveTab] = useState('url');
  const [analysisTab, setAnalysisTab] = useState('input');
  const [url, setUrl] = useState('');
  const [content, setContent] = useState('');
  const [contentType, setContentType] = useState('blog');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisComplete, setAnalysisComplete] = useState(false);
  const [scores, setScores] = useState({
    keywordRelevance: 78,
    readability: 85,
    snippetOptimization: 62,
    structuredData: 70,
    finalScore: 74,
  });

  const handleAnalyze = (e: React.FormEvent) => {
    e.preventDefault();
    
    if ((activeTab === 'url' && !url) || (activeTab === 'content' && !content)) {
      toast.error('Please provide content to analyze');
      return;
    }
    
    setIsAnalyzing(true);
    setAnalysisTab('loading');
    
    // Simulate API call with sample scores
    setTimeout(() => {
      setIsAnalyzing(false);
      setAnalysisComplete(true);
      setAnalysisTab('results');
      toast.success('Analysis completed!');
    }, 2500);
  };

  const handleDownloadReport = () => {
    toast.success('AEO Report is being generated and will download shortly');
  };

  const handleFullAnalysis = () => {
    window.location.href = "/aeo/analyze";
  };

  return (
    <div className="space-y-6">
      <Tabs defaultValue="input" value={analysisTab} onValueChange={setAnalysisTab} className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="input" disabled={isAnalyzing}>
            Input
          </TabsTrigger>
          <TabsTrigger value="loading" disabled={!isAnalyzing}>
            Analyzing
          </TabsTrigger>
          <TabsTrigger value="results" disabled={!analysisComplete}>
            Results
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="input" className="space-y-6">
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
          
          <Tabs defaultValue="about" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="about">
                <Info className="mr-2 h-4 w-4" /> About This Tool
              </TabsTrigger>
              <TabsTrigger value="tips">
                <Lightbulb className="mr-2 h-4 w-4" /> AEO Tips
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="about" className="mt-4 space-y-4">
              <p>
                The AEO Analyzer evaluates how well your content is optimized for AI systems like ChatGPT and Google's Bard. 
                It checks factors like:
              </p>
              <ul className="list-disc pl-5 space-y-1">
                <li>Keyword relevance and topic coverage</li>
                <li>Content readability and structure</li>
                <li>Snippet optimization potential</li>
                <li>Structured data implementation</li>
              </ul>
              <p>
                For a more comprehensive analysis with detailed recommendations, use our 
                <Link href="/aeo/analyze" className="text-aeo-600 hover:underline ml-1">full analysis tool</Link>.
              </p>
            </TabsContent>
            
            <TabsContent value="tips" className="mt-4 space-y-4">
              <p className="font-medium">Quick tips to improve your AEO score:</p>
              <ul className="list-disc pl-5 space-y-2">
                <li>
                  <span className="font-medium">Enhance readability:</span> Use clear headings, short paragraphs, and simple language.
                </li>
                <li>
                  <span className="font-medium">Include structured data:</span> Implement Schema.org markup to help AI systems understand your content.
                </li>
                <li>
                  <span className="font-medium">Answer questions directly:</span> Provide clear, concise answers to common questions related to your topic.
                </li>
                <li>
                  <span className="font-medium">Cover related topics:</span> Address subtopics and questions that users might have about your main topic.
                </li>
              </ul>
            </TabsContent>
          </Tabs>
        </TabsContent>
        
        <TabsContent value="loading" className="py-10">
          <div className="flex flex-col items-center justify-center space-y-4">
            <div className="relative h-20 w-20">
              <div className="absolute inset-0 rounded-full border-4 border-gray-200"></div>
              <div className="absolute inset-0 rounded-full border-4 border-aeo-500 border-t-transparent animate-spin"></div>
            </div>
            <p className="text-lg font-medium">Analyzing your content...</p>
            <p className="text-gray-500">This typically takes 10-15 seconds</p>
            <div className="w-full max-w-md space-y-3 mt-6">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-11/12" />
              <Skeleton className="h-4 w-10/12" />
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="results" className="space-y-6">
          <div className="p-6 bg-gray-50 rounded-lg border border-gray-100 mb-6">
            <div className="flex flex-col items-center">
              <div 
                className="relative h-32 w-32 flex items-center justify-center mb-4 rounded-full"
                style={{
                  background: `conic-gradient(#F65228 ${scores.finalScore}%, #E5E7EB ${scores.finalScore}% 100%)`
                }}
              >
                <div className="absolute inset-3 bg-white rounded-full flex items-center justify-center">
                  <div className="text-center">
                    <span className="text-3xl font-bold text-gray-900">{scores.finalScore}</span>
                    <span className="text-lg text-gray-500">/100</span>
                  </div>
                </div>
              </div>
              <h3 className="text-xl font-semibold">Overall AEO Score</h3>
              <p className="text-gray-600 mt-1">Your content is performing moderately well for AI engines.</p>
            </div>
          </div>
          
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold">Score Breakdown</h3>
              <Button 
                onClick={handleDownloadReport} 
                variant="outline" 
                size="sm"
              >
                <Download className="mr-2 h-4 w-4" /> Download Report
              </Button>
            </div>
            
            <div className="space-y-4">
              <ScoreItem 
                label="Keyword Relevance"
                score={scores.keywordRelevance}
                description="Good keyword usage, but could be more comprehensive."
              />
              
              <ScoreItem 
                label="Readability"
                score={scores.readability}
                description="Your content is easy to read and well-structured."
              />
              
              <ScoreItem 
                label="Snippet Optimization"
                score={scores.snippetOptimization}
                description="Needs improvement to be featured in AI-generated snippets."
              />
              
              <ScoreItem 
                label="Structured Data"
                score={scores.structuredData}
                description="Add more structured data to help AI systems."
              />
            </div>
          </div>
          
          <div className="pt-4 border-t">
            <h3 className="text-lg font-semibold mb-3">Key Recommendations</h3>
            <ul className="space-y-3">
              <li className="flex">
                <div className="flex-shrink-0 h-6 w-6 rounded-full bg-aeo-500 flex items-center justify-center text-white font-medium text-sm">
                  1
                </div>
                <div className="ml-3">
                  <p className="text-gray-800 font-medium">Improve snippet optimization</p>
                  <p className="text-gray-600 text-sm">
                    Include clear answers to common questions related to your topic.
                  </p>
                </div>
              </li>
              <li className="flex">
                <div className="flex-shrink-0 h-6 w-6 rounded-full bg-aeo-500 flex items-center justify-center text-white font-medium text-sm">
                  2
                </div>
                <div className="ml-3">
                  <p className="text-gray-800 font-medium">Enhance structured data</p>
                  <p className="text-gray-600 text-sm">
                    Implement Schema.org markup to provide clear signals to AI systems.
                  </p>
                </div>
              </li>
            </ul>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-3 pt-4">
            <Button 
              onClick={() => {
                setAnalysisTab('input');
                setAnalysisComplete(false);
              }}
              variant="outline"
              className="sm:flex-1"
            >
              Analyze Another Content
            </Button>
            <Button 
              onClick={handleFullAnalysis}
              className="bg-aeo hover:bg-aeo-600 sm:flex-1"
            >
              Get Detailed Analysis
            </Button>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

interface ScoreItemProps {
  label: string;
  score: number;
  description: string;
}

const ScoreItem: React.FC<ScoreItemProps> = ({ label, score, description }) => (
  <div>
    <div className="flex justify-between items-center mb-1">
      <span className="font-medium">{label}</span>
      <span className="text-gray-700">{score}/100</span>
    </div>
    <div className="w-full bg-gray-100 rounded-full h-2.5">
      <div 
        className="bg-aeo-500 h-2.5 rounded-full" 
        style={{ width: `${score}%` }}
      ></div>
    </div>
    <p className="text-sm text-gray-500 mt-1">
      {description}
    </p>
  </div>
);

export default AEOAnalyzer;
