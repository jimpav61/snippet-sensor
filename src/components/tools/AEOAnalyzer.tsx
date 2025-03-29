
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { toast } from 'sonner';
import InputForm from './aeo-analyzer/InputForm';
import InfoTabs from './aeo-analyzer/InfoTabs';
import LoadingView from './aeo-analyzer/LoadingView';
import ResultsView from './aeo-analyzer/ResultsView';
import { Link } from 'react-router-dom';

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

  // Function to simulate real content analysis
  // In a production environment, this would be replaced with an actual API call
  const analyzeContent = async (contentToAnalyze: string, type: string) => {
    // Simulate API call
    return new Promise<{
      keywordRelevance: number;
      readability: number;
      snippetOptimization: number;
      structuredData: number;
      finalScore: number;
    }>((resolve) => {
      // This is where you would normally make an API call to analyze the content
      // For now, we'll generate some random-ish scores based on the content length
      setTimeout(() => {
        // Generate somewhat realistic scores based on content length
        const contentLength = contentToAnalyze.length;
        const base = Math.min(contentLength / 100, 85); // Cap at 85
        
        const keywordRelevance = Math.min(Math.floor(base + Math.random() * 15), 100);
        const readability = Math.min(Math.floor(base - 5 + Math.random() * 20), 100);
        const snippetOptimization = Math.min(Math.floor(base - 15 + Math.random() * 15), 100);
        const structuredData = Math.min(Math.floor(base - 10 + Math.random() * 10), 100);
        
        const finalScore = Math.floor(
          (keywordRelevance + readability + snippetOptimization + structuredData) / 4
        );
        
        resolve({
          keywordRelevance,
          readability,
          snippetOptimization,
          structuredData,
          finalScore,
        });
      }, 2500);
    });
  };

  // Function to fetch content from URL
  // In a production environment, this would fetch the actual content
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

  const handleAnalyze = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if ((activeTab === 'url' && !url) || (activeTab === 'content' && !content)) {
      toast.error('Please provide content to analyze');
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
      
      // Analyze the content
      const analysisResults = await analyzeContent(contentToAnalyze, contentType);
      
      // Update scores with analysis results
      setScores(analysisResults);
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
    toast.success('AEO Report generated and downloaded');
  };

  const handleFullAnalysis = () => {
    window.location.href = "/aeo/analyze";
  };

  const resetAnalysis = () => {
    setAnalysisTab('input');
    setAnalysisComplete(false);
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
