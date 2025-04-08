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

  const fetchContentFromUrl = async (urlToFetch: string) => {
    try {
      return new Promise<string>((resolve) => {
        setTimeout(() => {
          const dummyContent = `Content fetched from ${urlToFetch} for analysis.
          This content would be processed for AI Engine Optimization factors
          including keyword relevance, readability, snippet optimization, and structured data.`;
          
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
      const contentToAnalyze = activeTab === 'url' ? url : content;
      setAnalyzedContent(contentToAnalyze);

      const { data, error } = await supabase.functions.invoke('analyze-content', {
        body: {
          content: contentToAnalyze,
          contentType: contentType
        }
      });

      if (error) {
        throw new Error(error.message);
      }

      if (!data || !data.scores) {
        throw new Error('Invalid response from analysis');
      }

      setScores(data.scores);
      setRecommendations(data.recommendations || []);
      setAnalysisComplete(true);
      setAnalysisTab('results');
      toast.success('Analysis completed!');
    } catch (error) {
      console.error('Error analyzing content:', error);
      toast.error('Failed to analyze content. Please try again.');
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleDownloadReport = () => {
    const doc = generateAEOReport(scores, analyzedContent);
    doc.save('aeo-analysis-report.pdf');
    toast.success('AEO Report generated and downloaded');
  };

  const handleFullAnalysis = () => {
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
