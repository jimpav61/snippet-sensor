
import React from 'react';
import { Separator } from '@/components/ui/separator';
import OverallScore from './results/OverallScore';
import ScoreList from './results/ScoreList';
import RecommendationList from './results/RecommendationList';
import ActionButtons from './results/ActionButtons';
import ContentSource from './results/ContentSource';
import DownloadButton from './results/DownloadButton';

interface ResultsViewProps {
  scores: {
    keywordRelevance: number;
    readability: number;
    snippetOptimization: number;
    structuredData: number;
    finalScore: number;
  };
  recommendations: string[];
  handleDownloadReport: () => void;
  handleFullAnalysis: () => void;
  resetAnalysis: () => void;
  analysisSource?: string;
  originalContent?: string;
  detailedView?: boolean;
}

const ResultsView: React.FC<ResultsViewProps> = ({ 
  scores, 
  recommendations,
  handleDownloadReport, 
  handleFullAnalysis, 
  resetAnalysis,
  analysisSource = 'Content analysis',
  originalContent,
  detailedView = false
}) => {
  return (
    <div className="space-y-6">
      <OverallScore score={scores.finalScore} />

      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">Score Breakdown</h3>
        <DownloadButton 
          scores={scores} 
          originalContent={originalContent}
          analysisSource={analysisSource}
          handleDownloadReport={handleDownloadReport}
        />
      </div>
      
      <div className="space-y-6">
        {/* Content Source Information */}
        <ContentSource analysisSource={analysisSource} />

        {/* Score List with optional detailed explanations */}
        <ScoreList scores={scores} detailedView={detailedView} />
      </div>
      
      <Separator className="my-4" />
      
      {/* Recommendations Section */}
      <RecommendationList recommendations={recommendations} />
      
      {/* Action Buttons */}
      <ActionButtons 
        resetAnalysis={resetAnalysis}
        handleFullAnalysis={handleFullAnalysis}
        detailedView={detailedView}
      />
    </div>
  );
};

export default ResultsView;
