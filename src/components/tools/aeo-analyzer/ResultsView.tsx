import React from 'react';
import { Button } from '@/components/ui/button';
import { Download } from 'lucide-react';
import ScoreItem from './ScoreItem';
import { generateAEOReport } from '@/utils/pdfGenerator';
import { Separator } from '@/components/ui/separator';

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
  detailedView?: boolean;
}

const ResultsView: React.FC<ResultsViewProps> = ({ 
  scores, 
  recommendations,
  handleDownloadReport, 
  handleFullAnalysis, 
  resetAnalysis,
  analysisSource = 'Content analysis',
  detailedView = false
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

  // Get detailed explanation for each score
  const getDetailedExplanation = (type: string) => {
    if (type === 'keywordRelevance') {
      return "Keyword relevance measures how well your content uses relevant terms and phrases related to your topic. AI engines analyze semantic relationships between words to understand the context and relevance of your content.";
    } else if (type === 'readability') {
      return "Readability evaluates how easy your content is to read and understand. Factors include sentence length, paragraph structure, and language complexity. Clear, well-structured content is favored by AI engines.";
    } else if (type === 'snippetOptimization') {
      return "Snippet optimization assesses how likely your content is to be featured in AI-generated snippets. This includes having clear answers to questions, concise information, and proper formatting.";
    } else if (type === 'structuredData') {
      return "Structured data helps AI systems understand your content by providing explicit signals about your content's meaning using formats like Schema.org markup.";
    }
    return "";
  };

  const downloadPdfReport = () => {
    const doc = generateAEOReport(scores, analysisSource);
    doc.save('aeo-analysis-report.pdf');
    handleDownloadReport(); // Call the original handler to show toast notification
  };

  // Get action items based on scores
  const getActionItems = (type: string, score: number) => {
    const actionItems = [];
    
    if (type === 'keywordRelevance' && score < 80) {
      actionItems.push("Conduct keyword research to identify primary and related terms");
      actionItems.push("Include semantically related phrases throughout your content");
      actionItems.push("Use natural language patterns rather than keyword stuffing");
    } else if (type === 'readability' && score < 80) {
      actionItems.push("Break long paragraphs into shorter ones (3-4 sentences max)");
      actionItems.push("Use more subheadings to organize content sections");
      actionItems.push("Simplify complex sentences and reduce jargon");
    } else if (type === 'snippetOptimization' && score < 80) {
      actionItems.push("Format key information in lists or bullet points");
      actionItems.push("Include direct answers to common questions in your content");
      actionItems.push("Use descriptive subheadings in question format when appropriate");
    } else if (type === 'structuredData' && score < 80) {
      actionItems.push("Implement Schema.org markup for your content type");
      actionItems.push("Include entity information for people, places, or organizations mentioned");
      actionItems.push("Add metadata for author, date, and content classification");
    }
    
    return actionItems;
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
      
      <div className="space-y-6">
        {/* Content Source Information */}
        <div className="bg-gray-50 p-4 rounded-lg text-sm text-gray-600">
          <p><strong>Analyzed Content:</strong> {analysisSource}</p>
        </div>

        <ScoreItem 
          label="Keyword Relevance"
          score={scores.keywordRelevance}
          description={getScoreDescription('keywordRelevance', scores.keywordRelevance)}
        />
        
        {detailedView && (
          <div className="pl-4 border-l-2 border-gray-200 ml-2 text-sm">
            <p className="text-gray-600 mb-2">{getDetailedExplanation('keywordRelevance')}</p>
            <h4 className="font-medium text-gray-800 mt-3 mb-1">Action Items:</h4>
            <ul className="list-disc pl-5 space-y-1 text-gray-600">
              {getActionItems('keywordRelevance', scores.keywordRelevance).map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>
        )}
        
        <ScoreItem 
          label="Readability"
          score={scores.readability}
          description={getScoreDescription('readability', scores.readability)}
        />
        
        {detailedView && (
          <div className="pl-4 border-l-2 border-gray-200 ml-2 text-sm">
            <p className="text-gray-600 mb-2">{getDetailedExplanation('readability')}</p>
            <h4 className="font-medium text-gray-800 mt-3 mb-1">Action Items:</h4>
            <ul className="list-disc pl-5 space-y-1 text-gray-600">
              {getActionItems('readability', scores.readability).map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>
        )}
        
        <ScoreItem 
          label="Snippet Optimization"
          score={scores.snippetOptimization}
          description={getScoreDescription('snippetOptimization', scores.snippetOptimization)}
        />
        
        {detailedView && (
          <div className="pl-4 border-l-2 border-gray-200 ml-2 text-sm">
            <p className="text-gray-600 mb-2">{getDetailedExplanation('snippetOptimization')}</p>
            <h4 className="font-medium text-gray-800 mt-3 mb-1">Action Items:</h4>
            <ul className="list-disc pl-5 space-y-1 text-gray-600">
              {getActionItems('snippetOptimization', scores.snippetOptimization).map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>
        )}
        
        <ScoreItem 
          label="Structured Data"
          score={scores.structuredData}
          description={getScoreDescription('structuredData', scores.structuredData)}
        />
        
        {detailedView && (
          <div className="pl-4 border-l-2 border-gray-200 ml-2 text-sm">
            <p className="text-gray-600 mb-2">{getDetailedExplanation('structuredData')}</p>
            <h4 className="font-medium text-gray-800 mt-3 mb-1">Action Items:</h4>
            <ul className="list-disc pl-5 space-y-1 text-gray-600">
              {getActionItems('structuredData', scores.structuredData).map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
      
      <Separator className="my-4" />
      
      <div>
        <h3 className="text-lg font-semibold mb-3">Key Recommendations</h3>
        <ul className="space-y-3">
          {recommendations.map((recommendation, index) => (
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
          {detailedView ? "Hide Detailed Analysis" : "Get Detailed Analysis"}
        </Button>
      </div>
    </div>
  );
};

export default ResultsView;
