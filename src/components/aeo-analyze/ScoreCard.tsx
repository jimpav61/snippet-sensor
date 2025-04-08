import React from 'react';
import { Button } from '@/components/ui/button';
import { Download } from 'lucide-react';
import { generateAEOReport } from '@/utils/pdfGenerator';

interface ScoreProps {
  keywordRelevance: number;
  readability: number;
  snippetOptimization: number;
  structuredData: number;
  finalScore: number;
  analysisSource: string;
  onDownloadReport: () => void;
}

const ScoreCard: React.FC<ScoreProps> = ({
  keywordRelevance,
  readability,
  snippetOptimization,
  structuredData,
  finalScore,
  analysisSource,
  onDownloadReport
}) => {
  const downloadPdfReport = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    try {
      setTimeout(() => {
        const doc = generateAEOReport(
          { keywordRelevance, readability, snippetOptimization, structuredData, finalScore },
          analysisSource
        );
        doc.save('aeo-analysis-report.pdf');
        onDownloadReport();
      }, 10);
    } catch (error) {
      console.error('Error generating PDF:', error);
    }
    
    return false;
  };

  return (
    <div className="aeo-card p-6 md:p-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold">AEO Analysis Results</h2>
          <p className="text-gray-600">
            {analysisSource} • {new Date().toLocaleDateString()}
          </p>
        </div>
        <Button 
          onClick={downloadPdfReport} 
          variant="outline" 
          className="mt-4 md:mt-0"
          type="button"
        >
          <Download className="mr-2 h-4 w-4" /> Download Report
        </Button>
      </div>
      
      <div className="p-6 bg-gray-50 rounded-lg border border-gray-100 mb-6">
        <div className="flex flex-col items-center">
          <div 
            className="relative h-40 w-40 flex items-center justify-center mb-4 rounded-full"
            style={{
              background: `conic-gradient(#F65228 ${finalScore}%, #E5E7EB ${finalScore}% 100%)`
            }}
          >
            <div className="absolute inset-3 bg-white rounded-full flex items-center justify-center">
              <div className="text-center">
                <span className="text-4xl font-bold text-gray-900">{finalScore}</span>
                <span className="text-lg text-gray-500">/100</span>
              </div>
            </div>
          </div>
          <h3 className="text-xl font-semibold">Overall AEO Score</h3>
          <p className="text-gray-600 mt-1">Your content is performing moderately well for AI engines.</p>
        </div>
      </div>
      
      <div className="space-y-4">
        <h3 className="text-lg font-semibold mb-2">Score Breakdown</h3>
        
        <div className="space-y-5">
          <ScoreItem 
            label="Keyword Relevance"
            score={keywordRelevance}
            description="Good keyword usage, but could be more comprehensive for topic coverage."
          />
          
          <ScoreItem 
            label="Readability"
            score={readability}
            description="Your content is easy to read and well-structured."
          />
          
          <ScoreItem 
            label="Snippet Optimization"
            score={snippetOptimization}
            description="Your content needs improvement to be featured in AI-generated snippets."
          />
          
          <ScoreItem 
            label="Structured Data"
            score={structuredData}
            description="Add more structured data to help AI systems understand your content."
          />
        </div>
      </div>
    </div>
  );
};

interface ScoreItemProps {
  label: string;
  score: number;
  description: string;
}

const ScoreItem: React.FC<ScoreItemProps> = ({ label, score, description }) => (
  <div>
    <div className="flex justify-between items-center mb-1">
      <span className="font-medium">{label}</span>
      <span className="text-gray-700">{score}/100</span>
    </div>
    <div className="w-full bg-gray-100 rounded-full h-2.5">
      <div 
        className="bg-aeo-500 h-2.5 rounded-full" 
        style={{ width: `${score}%` }}
      ></div>
    </div>
    <p className="text-sm text-gray-500 mt-1">
      {description}
    </p>
  </div>
);

export default ScoreCard;
