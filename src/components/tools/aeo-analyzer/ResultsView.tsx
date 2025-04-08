
import React from 'react';
import { Button } from '@/components/ui/button';
import { Download } from 'lucide-react';
import ScoreItem from './ScoreItem';
import { generateAEOReport } from '@/utils/pdfGenerator';

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
}

const ResultsView: React.FC<ResultsViewProps> = ({ 
  scores, 
  recommendations,
  handleDownloadReport, 
  handleFullAnalysis, 
  resetAnalysis,
  analysisSource = 'Content analysis'
}) => {
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

  const downloadPdfReport = () => {
    const doc = generateAEOReport(scores, analysisSource);
    doc.save('aeo-analysis-report.pdf');
    handleDownloadReport(); // Call the original handler to show toast notification
  };

  return (
    <div className="space-y-6">
      <div className="p-6 bg-gray-50 rounded-lg border border-gray-100 mb-6">
        <div className="flex flex-col items-center">
          <div 
            className="relative h-32 w-32 flex items-center justify-center mb-4 rounded-full"
            style={{
              background: `conic-gradient(#F65228 ${scores.finalScore}%, #E5E7EB ${scores.finalScore}% 100%)`
            }}
          >
            <div className="absolute inset-3 bg-white rounded-full flex items-center justify-center">
              <div className="text-center">
                <span className="text-3xl font-bold text-gray-900">{scores.finalScore}</span>
                <span className="text-lg text-gray-500">/100</span>
              </div>
            </div>
          </div>
          <h3 className="text-xl font-semibold">Overall AEO Score</h3>
          <p className="text-gray-600 mt-1">
            {scores.finalScore >= 80 
              ? "Your content is well-optimized for AI engines."
              : scores.finalScore >= 60
                ? "Your content is performing moderately well for AI engines."
                : "Your content needs significant improvement for AI engines."}
          </p>
        </div>
      </div>
      
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-semibold">Score Breakdown</h3>
          <Button 
            onClick={downloadPdfReport} 
            variant="outline" 
            size="sm"
          >
            <Download className="mr-2 h-4 w-4" /> Download Report
          </Button>
        </div>
        
        <div className="space-y-4">
          <ScoreItem 
            label="Keyword Relevance"
            score={scores.keywordRelevance}
            description={getScoreDescription('keywordRelevance', scores.keywordRelevance)}
          />
          
          <ScoreItem 
            label="Readability"
            score={scores.readability}
            description={getScoreDescription('readability', scores.readability)}
          />
          
          <ScoreItem 
            label="Snippet Optimization"
            score={scores.snippetOptimization}
            description={getScoreDescription('snippetOptimization', scores.snippetOptimization)}
          />
          
          <ScoreItem 
            label="Structured Data"
            score={scores.structuredData}
            description={getScoreDescription('structuredData', scores.structuredData)}
          />
        </div>
      </div>
      
      <div className="pt-4 border-t">
        <h3 className="text-lg font-semibold mb-3">Key Recommendations</h3>
        <ul className="space-y-3">
          {recommendations.slice(0, 3).map((recommendation, index) => (
            <li key={index} className="flex">
              <div className="flex-shrink-0 h-6 w-6 rounded-full bg-aeo-500 flex items-center justify-center text-white font-medium text-sm">
                {index + 1}
              </div>
              <div className="ml-3">
                <p className="text-gray-800 font-medium">
                  {recommendation.split(':')[0] || recommendation.substring(0, recommendation.indexOf(' ') > 30 ? 30 : recommendation.indexOf(' '))}
                </p>
                <p className="text-gray-600 text-sm">
                  {recommendation.split(':')[1] || recommendation}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </div>
      
      <div className="flex flex-col sm:flex-row gap-3 pt-4">
        <Button 
          onClick={resetAnalysis}
          variant="outline"
          className="sm:flex-1"
        >
          Analyze Another Content
        </Button>
        <Button 
          onClick={handleFullAnalysis}
          className="bg-aeo hover:bg-aeo-600 sm:flex-1"
        >
          Get Detailed Analysis
        </Button>
      </div>
    </div>
  );
};

export default ResultsView;
