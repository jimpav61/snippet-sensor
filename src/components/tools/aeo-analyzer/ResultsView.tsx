
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
  handleDownloadReport: () => void;
  handleFullAnalysis: () => void;
  resetAnalysis: () => void;
  analysisSource?: string;
}

const ResultsView: React.FC<ResultsViewProps> = ({ 
  scores, 
  handleDownloadReport, 
  handleFullAnalysis, 
  resetAnalysis,
  analysisSource = 'Content analysis'
}) => {
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
          <p className="text-gray-600 mt-1">Your content is performing moderately well for AI engines.</p>
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
            description="Good keyword usage, but could be more comprehensive."
          />
          
          <ScoreItem 
            label="Readability"
            score={scores.readability}
            description="Your content is easy to read and well-structured."
          />
          
          <ScoreItem 
            label="Snippet Optimization"
            score={scores.snippetOptimization}
            description="Needs improvement to be featured in AI-generated snippets."
          />
          
          <ScoreItem 
            label="Structured Data"
            score={scores.structuredData}
            description="Add more structured data to help AI systems."
          />
        </div>
      </div>
      
      <div className="pt-4 border-t">
        <h3 className="text-lg font-semibold mb-3">Key Recommendations</h3>
        <ul className="space-y-3">
          <li className="flex">
            <div className="flex-shrink-0 h-6 w-6 rounded-full bg-aeo-500 flex items-center justify-center text-white font-medium text-sm">
              1
            </div>
            <div className="ml-3">
              <p className="text-gray-800 font-medium">Improve snippet optimization</p>
              <p className="text-gray-600 text-sm">
                Include clear answers to common questions related to your topic.
              </p>
            </div>
          </li>
          <li className="flex">
            <div className="flex-shrink-0 h-6 w-6 rounded-full bg-aeo-500 flex items-center justify-center text-white font-medium text-sm">
              2
            </div>
            <div className="ml-3">
              <p className="text-gray-800 font-medium">Enhance structured data</p>
              <p className="text-gray-600 text-sm">
                Implement Schema.org markup to provide clear signals to AI systems.
              </p>
            </div>
          </li>
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
