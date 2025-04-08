
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { toast } from 'sonner';
import AnalyzeForm from '@/components/aeo-analyze/AnalyzeForm';
import ScoreCard from '@/components/aeo-analyze/ScoreCard';
import RecommendationsCard from '@/components/aeo-analyze/RecommendationsCard';
import { supabase } from '@/integrations/supabase/client';

const AEOAnalyzePage = () => {
  const [activeTab, setActiveTab] = useState('url');
  const [url, setUrl] = useState('');
  const [showResults, setShowResults] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [scores, setScores] = useState({
    keywordRelevance: 78,
    readability: 85,
    snippetOptimization: 62,
    structuredData: 70,
    finalScore: 74,
  });
  const [recommendations, setRecommendations] = useState<string[]>([
    "Improve snippet optimization by including clear answers to common questions.",
    "Enhance structured data to provide clear signals to AI systems.",
    "Expand topic coverage to address related subtopics and questions."
  ]);
  const [analysisSource, setAnalysisSource] = useState('');
  
  const handleAnalysisComplete = async (content: string, contentType: string) => {
    try {
      setIsAnalyzing(true);
      
      // Save the analysis source (url or text snippet)
      if (contentType === 'url') {
        setAnalysisSource(content);
      } else {
        // For text content, use a preview (first 50 chars)
        setAnalysisSource(content.substring(0, 50) + (content.length > 50 ? '...' : ''));
      }
      
      // Call Supabase Edge Function for analysis
      const { data, error } = await supabase.functions.invoke('analyze-content', {
        body: {
          content,
          contentType
        }
      });
      
      if (error) {
        console.error('Error calling analyze-content function:', error);
        toast.error('Failed to analyze content. Please try again.');
        return;
      }
      
      console.log('Analysis results:', data);
      
      // Update state with analysis results
      setScores(data.scores);
      setRecommendations(data.recommendations);
      setShowResults(true);
      
    } catch (error) {
      console.error('Error analyzing content:', error);
      toast.error('Failed to analyze content. Please try again.');
    } finally {
      setIsAnalyzing(false);
    }
  };
  
  const handleDownloadReport = () => {
    toast.success('AEO Report is being generated and will download shortly');
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
            <AnalyzeForm 
              onAnalysisComplete={handleAnalysisComplete} 
              isProcessing={isAnalyzing} 
            />
          ) : (
            <div className="space-y-6">
              <ScoreCard 
                {...scores} 
                analysisSource={analysisSource}
                onDownloadReport={handleDownloadReport}
              />
              
              <RecommendationsCard recommendations={recommendations} />
              
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
