
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { toast } from 'sonner';
import InputForm from './aeo-analyzer/InputForm';
import InfoTabs from './aeo-analyzer/InfoTabs';
import LoadingView from './aeo-analyzer/LoadingView';
import ResultsView from './aeo-analyzer/ResultsView';
import { analyzeContent } from '@/utils/contentAnalyzer';
import { generateAEOReport } from '@/utils/pdfGenerator';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Info } from 'lucide-react';

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
  const [recommendations, setRecommendations] = useState<string[]>([]);
  const [groqApiKey, setGroqApiKey] = useState('');
  const [showApiInput, setShowApiInput] = useState(false);

  // Function to fetch content from URL
  const fetchContentFromUrl = async (urlToFetch: string) => {
    // Simulate fetching content from URL
    return new Promise<string>((resolve) => {
      // This is where you would normally make a request to the backend
      // which would then scrape the URL and return the content
      setTimeout(() => {
        // For now, generate a dummy content based on the URL
        const dummyContent = `This is a simulation of content from ${urlToFetch}. 
        In a production environment, this would be the actual content fetched from the URL.
        The content would then be analyzed for AI Engine Optimization.
        Long-form content with proper structure tends to perform better in AI engines.
        Key factors include keyword relevance, readability, snippet optimization, and structured data.`;
        
        resolve(dummyContent);
      }, 1000);
    });
  };

  // Function to analyze content using Groq API
  const analyzeWithGroq = async (contentToAnalyze: string, contentType: string) => {
    if (!groqApiKey) {
      setShowApiInput(true);
      throw new Error('Groq API key is required');
    }

    try {
      // This would be a real API call to Groq in production
      console.log('Analyzing with Groq API, content length:', contentToAnalyze.length);

      // In a production environment, this would be an actual fetch call to Groq API
      // For now, we'll use the existing analysis function
      // TODO: Replace with actual Groq API integration in production
      const analysisResults = await analyzeContent(contentToAnalyze, contentType);
      
      return analysisResults;
    } catch (error) {
      console.error('Error analyzing with Groq:', error);
      throw error;
    }
  };

  const handleAnalyze = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if ((activeTab === 'url' && !url) || (activeTab === 'content' && !content)) {
      toast.error('Please provide content to analyze');
      return;
    }
    
    if (!groqApiKey && !showApiInput) {
      setShowApiInput(true);
      toast.info('Please enter your Groq API key to continue');
      return;
    }
    
    setIsAnalyzing(true);
    setAnalysisTab('loading');
    
    try {
      let contentToAnalyze = '';
      
      // If URL is provided, fetch content from URL
      if (activeTab === 'url') {
        contentToAnalyze = await fetchContentFromUrl(url);
      } else {
        contentToAnalyze = content;
      }
      
      // Use Groq for analysis if API key is provided
      let analysisResults;
      if (groqApiKey) {
        analysisResults = await analyzeWithGroq(contentToAnalyze, contentType);
      } else {
        // Fallback to local analysis
        analysisResults = await analyzeContent(contentToAnalyze, contentType);
      }
      
      // Update scores with analysis results
      setScores(analysisResults.scores);
      setRecommendations(analysisResults.recommendations);
      setIsAnalyzing(false);
      setAnalysisComplete(true);
      setAnalysisTab('results');
      toast.success('Analysis completed!');
    } catch (error) {
      console.error('Error analyzing content:', error);
      toast.error('Failed to analyze content. Please try again.');
      setIsAnalyzing(false);
      setAnalysisTab('input');
    }
  };

  const handleDownloadReport = () => {
    // Generate and download the PDF report
    const doc = generateAEOReport(
      scores,
      activeTab === 'url' ? url : 'Content analysis'
    );
    doc.save('aeo-analysis-report.pdf');
    toast.success('AEO Report generated and downloaded');
  };

  const handleFullAnalysis = () => {
    window.location.href = "/aeo/analyze";
  };

  const resetAnalysis = () => {
    setAnalysisTab('input');
    setAnalysisComplete(false);
  };

  const handleApiKeySubmit = () => {
    if (groqApiKey) {
      // Store API key in localStorage (temporary solution - not recommended for production)
      localStorage.setItem('groq_api_key', groqApiKey);
      setShowApiInput(false);
      toast.success('API key saved');
    } else {
      toast.error('Please enter a valid API key');
    }
  };

  return (
    <div className="space-y-6">
      {showApiInput && (
        <div className="bg-yellow-50 border border-yellow-200 rounded-md p-4 mb-4">
          <div className="flex items-start">
            <Info className="h-5 w-5 text-yellow-500 mt-0.5 mr-2" />
            <div>
              <h4 className="text-sm font-medium text-yellow-800 mb-1">Groq API Key Required</h4>
              <p className="text-sm text-yellow-700 mb-3">
                Enter your Groq API key to enable enhanced content analysis. 
                This is stored locally in your browser and never sent to our servers.
              </p>
              <div className="flex flex-col space-y-2">
                <Label htmlFor="apiKey" className="text-sm">
                  Groq API Key
                </Label>
                <Input
                  id="apiKey"
                  type="password"
                  value={groqApiKey}
                  onChange={(e) => setGroqApiKey(e.target.value)}
                  placeholder="Enter your Groq API key"
                />
                <div className="flex space-x-2 mt-2">
                  <Button 
                    onClick={handleApiKeySubmit} 
                    size="sm"
                    variant="default" 
                    className="bg-aeo hover:bg-aeo-600"
                  >
                    Save Key
                  </Button>
                  <Button 
                    onClick={() => setShowApiInput(false)} 
                    size="sm"
                    variant="outline"
                  >
                    Use Default Analysis
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

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
          <InputForm
            url={url}
            setUrl={setUrl}
            content={content}
            setContent={setContent}
            contentType={contentType}
            setContentType={setContentType}
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            isAnalyzing={isAnalyzing}
            handleAnalyze={handleAnalyze}
            handleFullAnalysis={handleFullAnalysis}
          />
          
          <InfoTabs />
        </TabsContent>
        
        <TabsContent value="loading">
          <LoadingView />
        </TabsContent>
        
        <TabsContent value="results">
          <ResultsView
            scores={scores}
            recommendations={recommendations}
            handleDownloadReport={handleDownloadReport}
            handleFullAnalysis={handleFullAnalysis}
            resetAnalysis={resetAnalysis}
            analysisSource={activeTab === 'url' ? url : 'Content analysis'}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AEOAnalyzer;
