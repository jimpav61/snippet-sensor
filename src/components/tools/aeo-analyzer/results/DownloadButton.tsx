
import React from 'react';
import { Button } from '@/components/ui/button';
import { Download } from 'lucide-react';
import { generateAEOReport } from '@/utils/pdfGenerator';

interface DownloadButtonProps {
  scores: {
    keywordRelevance: number;
    readability: number;
    snippetOptimization: number;
    structuredData: number;
    finalScore: number;
  };
  originalContent?: string;
  analysisSource?: string;
  contentType?: string;
  handleDownloadReport: () => void;
}

const DownloadButton: React.FC<DownloadButtonProps> = ({ 
  scores, 
  originalContent, 
  analysisSource = 'Content analysis',
  contentType = 'content',
  handleDownloadReport 
}) => {
  const downloadPdfReport = (e: React.MouseEvent) => {
    // Prevent any default actions and stop event propagation
    e.preventDefault();
    e.stopPropagation();
    
    try {
      // Generate and download PDF in an isolated context
      setTimeout(() => {
        const doc = generateAEOReport(scores, originalContent || analysisSource, contentType);
        doc.save('aeo-analysis-report.pdf');
        
        // Call the handler to show toast notification
        handleDownloadReport();
      }, 10);
    } catch (error) {
      console.error('Error generating PDF:', error);
    }
    
    // Return false to ensure no additional events are triggered
    return false;
  };

  return (
    <Button 
      onClick={downloadPdfReport} 
      variant="outline" 
      size="sm"
      type="button" // Explicitly set type to button to avoid form submission behavior
    >
      <Download className="mr-2 h-4 w-4" /> Download Report
    </Button>
  );
};

export default DownloadButton;
