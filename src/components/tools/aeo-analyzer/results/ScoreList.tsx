
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
}

const ScoreList: React.FC<ScoreListProps> = ({ scores, detailedView }) => {
  // Get score descriptions based on values
  const getScoreDescription = (type: string, score: number) => {
    if (type === 'keywordRelevance') {
      return score >= 80 
        ? "Good keyword usage with relevant terms and phrases." 
        : "Improve keyword usage with more relevant terms.";
    } else if (type === 'readability') {
      return score >= 80 
        ? "Your content is easy to read and well-structured." 
        : "Content could be more readable with better structure.";
    } else if (type === 'snippetOptimization') {
      return score >= 80 
        ? "Well-optimized for AI-generated snippets." 
        : "Needs improvement to be featured in AI-generated snippets.";
    } else if (type === 'structuredData') {
      return score >= 80 
        ? "Good structured data implementation." 
        : "Add more structured data to help AI systems.";
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
        <DetailedExplanation type="keywordRelevance" score={scores.keywordRelevance} />
      )}
      
      <ScoreItem 
        label="Readability"
        score={scores.readability}
        description={getScoreDescription('readability', scores.readability)}
      />
      
      {detailedView && (
        <DetailedExplanation type="readability" score={scores.readability} />
      )}
      
      <ScoreItem 
        label="Snippet Optimization"
        score={scores.snippetOptimization}
        description={getScoreDescription('snippetOptimization', scores.snippetOptimization)}
      />
      
      {detailedView && (
        <DetailedExplanation type="snippetOptimization" score={scores.snippetOptimization} />
      )}
      
      <ScoreItem 
        label="Structured Data"
        score={scores.structuredData}
        description={getScoreDescription('structuredData', scores.structuredData)}
      />
      
      {detailedView && (
        <DetailedExplanation type="structuredData" score={scores.structuredData} />
      )}
    </div>
  );
};

export default ScoreList;
