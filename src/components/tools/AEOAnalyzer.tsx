
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { toast } from 'sonner';
import InputForm from './aeo-analyzer/InputForm';
import InfoTabs from './aeo-analyzer/InfoTabs';
import LoadingView from './aeo-analyzer/LoadingView';
import ResultsView from './aeo-analyzer/ResultsView';

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
          />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AEOAnalyzer;
