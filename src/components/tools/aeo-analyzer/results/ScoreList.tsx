
import React from 'react';
import ScoreItem from '../ScoreItem';
import DetailedExplanation from './DetailedExplanation';

interface ScoreListProps {
  scores: {
    keywordRelevance: number;
    readability: number;
    snippetOptimization: number;
    structuredData: number;
  };
  detailedView: boolean;
  contentType?: string;
}

const ScoreList: React.FC<ScoreListProps> = ({ 
  scores, 
  detailedView,
  contentType = 'content'
}) => {
  // Get score descriptions based on values
  const getScoreDescription = (type: string, score: number) => {
    if (type === 'keywordRelevance') {
      if (score >= 80) return "Good keyword usage with comprehensive topic coverage.";
      if (score >= 60) return "Adequate keyword usage, but could improve semantic relevance.";
      return "Limited keyword relevance. Consider expanding your topic coverage.";
    } else if (type === 'readability') {
      if (score >= 80) return "Your content is easy to read with excellent structure.";
      if (score >= 60) return "Readability is acceptable but could be improved.";
      return "Content is difficult to read. Consider simplifying.";
    } else if (type === 'snippetOptimization') {
      if (score >= 80) return "Well-optimized for AI-generated snippets and featured results.";
      if (score >= 60) return "Partially optimized for AI snippets, but needs improvement.";
      return "Poor snippet optimization. Restructure for better AI visibility.";
    } else if (type === 'structuredData') {
      if (score >= 80) return "Excellent structured data implementation for AI comprehension.";
      if (score >= 60) return "Basic structured data present, but could be more comprehensive.";
      return "Minimal structured data. Add more signals for AI systems.";
    }
    return "Score needs improvement.";
  };

  return (
    <div className="space-y-6">
      <ScoreItem 
        label="Keyword Relevance"
        score={scores.keywordRelevance}
        description={getScoreDescription('keywordRelevance', scores.keywordRelevance)}
      />
      
      {detailedView && (
        <DetailedExplanation 
          type="keywordRelevance" 
          score={scores.keywordRelevance} 
          contentType={contentType}
        />
      )}
      
      <ScoreItem 
        label="Readability"
        score={scores.readability}
        description={getScoreDescription('readability', scores.readability)}
      />
      
      {detailedView && (
        <DetailedExplanation 
          type="readability" 
          score={scores.readability} 
          contentType={contentType}
        />
      )}
      
      <ScoreItem 
        label="Snippet Optimization"
        score={scores.snippetOptimization}
        description={getScoreDescription('snippetOptimization', scores.snippetOptimization)}
      />
      
      {detailedView && (
        <DetailedExplanation 
          type="snippetOptimization" 
          score={scores.snippetOptimization}
          contentType={contentType}
        />
      )}
      
      <ScoreItem 
        label="Structured Data"
        score={scores.structuredData}
        description={getScoreDescription('structuredData', scores.structuredData)}
      />
      
      {detailedView && (
        <DetailedExplanation 
          type="structuredData" 
          score={scores.structuredData}
          contentType={contentType}
        />
      )}
    </div>
  );
};

export default ScoreList;
