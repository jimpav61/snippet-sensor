
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { toast } from 'sonner';
import InputForm from './aeo-analyzer/InputForm';
import InfoTabs from './aeo-analyzer/InfoTabs';
import LoadingView from './aeo-analyzer/LoadingView';
import ResultsView from './aeo-analyzer/ResultsView';
import { generateAEOReport } from '@/utils/pdfGenerator';
import { supabase } from '@/integrations/supabase/client';

const AEOAnalyzer = () => {
  const [activeTab, setActiveTab] = useState('url');
  const [analysisTab, setAnalysisTab] = useState('input');
  const [url, setUrl] = useState('');
  const [content, setContent] = useState('');
  const [contentType, setContentType] = useState('blog');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisComplete, setAnalysisComplete] = useState(false);
  const [detailedView, setDetailedView] = useState(false);
  const [analyzedContent, setAnalyzedContent] = useState('');
  const [scores, setScores] = useState({
    keywordRelevance: 78,
    readability: 85,
    snippetOptimization: 62,
    structuredData: 70,
    finalScore: 74,
  });
  const [recommendations, setRecommendations] = useState<string[]>([]);

  // Function to fetch content from URL - now actually stores the content
  const fetchContentFromUrl = async (urlToFetch: string) => {
    try {
      // In a real implementation, this would call a backend service to fetch the content
      // For now, we'll just simulate it but store the actual URL
      return new Promise<string>((resolve) => {
        setTimeout(() => {
          // For demo purposes, we'll return a simulated content string
          // but we'll store the actual URL for the analysis
          const dummyContent = `Content fetched from ${urlToFetch} for analysis.
          This content would be processed for AI Engine Optimization factors
          including keyword relevance, readability, snippet optimization, and structured data.`;
          
          // Store the URL as the analyzed content
          setAnalyzedContent(urlToFetch);
          resolve(dummyContent);
        }, 1000);
      });
    } catch (error) {
      console.error('Error fetching content:', error);
      toast.error('Failed to fetch content from URL');
      throw error;
    }
  };

  // Function to analyze content using Groq API via Supabase Edge Function
  const analyzeWithGroq = async (contentToAnalyze: string, contentType: string) => {
    try {
      console.log('Calling Supabase Edge Function for analysis');
      
      const { data, error } = await supabase.functions.invoke('analyze-content', {
        body: {
          content: contentToAnalyze,
          contentType: contentType
        }
      });
      
      if (error) {
        console.error('Error calling analyze-content function:', error);
        throw new Error(error.message || 'Failed to analyze content');
      }
      
      if (!data) {
        throw new Error('No data returned from analysis');
      }
      
      return data;
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
    
    setIsAnalyzing(true);
    setAnalysisTab('loading');
    
    try {
      let contentToAnalyze = '';
      
      // If URL is provided, fetch content from URL
      if (activeTab === 'url') {
        contentToAnalyze = await fetchContentFromUrl(url);
        // URL is already stored in analyzedContent
      } else {
        contentToAnalyze = content;
        // Store the content for display in the results
        setAnalyzedContent(content.length > 150 ? content.substring(0, 150) + '...' : content);
      }
      
      // Use Supabase Edge Function for analysis
      const analysisResults = await analyzeWithGroq(contentToAnalyze, contentType);
      
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
    // Generate and download the PDF report with the actual analyzed content
    const doc = generateAEOReport(
      scores,
      analyzedContent || (activeTab === 'url' ? url : 'Content analysis')
    );
    doc.save('aeo-analysis-report.pdf');
    toast.success('AEO Report generated and downloaded');
  };

  const handleFullAnalysis = () => {
    // Toggle the detailed view state
    setDetailedView(!detailedView);
    toast.success(detailedView ? 'Hiding detailed analysis' : 'Showing detailed analysis');
  };

  const resetAnalysis = () => {
    setAnalysisTab('input');
    setAnalysisComplete(false);
    setDetailedView(false);
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
            recommendations={recommendations}
            handleDownloadReport={handleDownloadReport}
            handleFullAnalysis={handleFullAnalysis}
            resetAnalysis={resetAnalysis}
            analysisSource={analyzedContent || (activeTab === 'url' ? url : 'Content analysis')}
            detailedView={detailedView}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AEOAnalyzer;
