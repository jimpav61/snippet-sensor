
import { useState } from 'react';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';

export interface AnalysisScores {
  keywordRelevance: number;
  readability: number;
  snippetOptimization: number;
  structuredData: number;
  finalScore: number;
}

export interface AnalysisState {
  isAnalyzing: boolean;
  analysisComplete: boolean;
  detailedView: boolean;
  analyzedContent: string;
  originalContent: string;
  scores: AnalysisScores;
  recommendations: string[];
}

export const initialScores: AnalysisScores = {
  keywordRelevance: 78,
  readability: 85,
  snippetOptimization: 62,
  structuredData: 70,
  finalScore: 74,
};

export function useAEOAnalysis() {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisComplete, setAnalysisComplete] = useState(false);
  const [detailedView, setDetailedView] = useState(false);
  const [analyzedContent, setAnalyzedContent] = useState('');
  const [originalContent, setOriginalContent] = useState('');
  const [scores, setScores] = useState<AnalysisScores>(initialScores);
  const [recommendations, setRecommendations] = useState<string[]>([]);

  const analyzeContent = async (contentToAnalyze: string, contentType: string, contentSource: string) => {
    setIsAnalyzing(true);
    
    try {
      // Store the original input
      setOriginalContent(contentToAnalyze);
      
      // Set the analyzed content description for display
      setAnalyzedContent(contentSource);

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

      // Format recommendations
      const formattedRecommendations = data.recommendations.map((rec: string) => {
        // If recommendation already has a colon, it's already formatted correctly
        if (rec.includes(':')) return rec;
        
        // Extract first few words as the title
        const words = rec.split(' ');
        const title = words.slice(0, 3).join(' ');
        const description = words.slice(3).join(' ');
        
        return `${title}: ${description}`;
      });

      setScores(data.scores);
      setRecommendations(formattedRecommendations || []);
      setAnalysisComplete(true);
      toast.success('Analysis completed!');
      return true;
    } catch (error) {
      console.error('Error analyzing content:', error);
      toast.error('Failed to analyze content. Please try again.');
      return false;
    } finally {
      setIsAnalyzing(false);
    }
  };

  const toggleDetailedView = () => {
    setDetailedView(!detailedView);
    toast.success(detailedView ? 'Hiding detailed analysis' : 'Showing detailed analysis');
  };

  const resetAnalysis = () => {
    setAnalysisComplete(false);
    setDetailedView(false);
  };

  return {
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
  };
}
