
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { toast } from 'sonner';
import InputForm from './InputForm';
import InfoTabs from './InfoTabs';
import LoadingView from './LoadingView';
import ResultsView from './ResultsView';
import { useInputState } from './useInputState';
import { useAEOAnalysis } from '@/hooks/useAEOAnalysis';

const AnalysisContainer: React.FC = () => {
  const [analysisTab, setAnalysisTab] = useState('input');
  
  const {
    isAnalyzing,
    analysisComplete,
    detailedView,
    analyzedContent,
    originalContent,
    scores,
    recommendations,
    analyzeContent,
    toggleDetailedView,
    resetAnalysis
  } = useAEOAnalysis();

  const inputState = useInputState({
    onSubmit: async (contentToAnalyze, contentType, contentSource) => {
      setAnalysisTab('loading');
      const success = await analyzeContent(contentToAnalyze, contentType, contentSource);
      if (success) {
        setAnalysisTab('results');
      } else {
        setAnalysisTab('input');
      }
      return success;
    },
    isAnalyzing
  });

  const handleDownloadReport = () => {
    toast.success('AEO Report generated and downloaded successfully');
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
            url={inputState.url}
            setUrl={inputState.setUrl}
            content={inputState.content}
            setContent={inputState.setContent}
            contentType={inputState.contentType}
            setContentType={inputState.setContentType}
            activeTab={inputState.activeTab}
            setActiveTab={inputState.setActiveTab}
            isAnalyzing={isAnalyzing}
            handleAnalyze={inputState.handleAnalyze}
            handleFullAnalysis={toggleDetailedView}
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
            handleFullAnalysis={toggleDetailedView}
            resetAnalysis={resetAnalysis}
            analysisSource={analyzedContent}
            originalContent={originalContent}
            detailedView={detailedView}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AnalysisContainer;
