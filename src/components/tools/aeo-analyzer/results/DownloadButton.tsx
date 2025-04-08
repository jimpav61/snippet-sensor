
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
  handleDownloadReport: () => void;
}

const DownloadButton: React.FC<DownloadButtonProps> = ({ 
  scores, 
  originalContent, 
  analysisSource = 'Content analysis',
  handleDownloadReport 
}) => {
  const downloadPdfReport = (e: React.MouseEvent) => {
    e.preventDefault(); // Prevent page navigation/refresh
    
    try {
      // Generate and download PDF
      const doc = generateAEOReport(scores, originalContent || analysisSource);
      doc.save('aeo-analysis-report.pdf');
      
      // Call the handler to show toast notification
      handleDownloadReport();
    } catch (error) {
      console.error('Error generating PDF:', error);
    }
  };

  return (
    <Button 
      onClick={downloadPdfReport} 
      variant="outline" 
      size="sm"
    >
      <Download className="mr-2 h-4 w-4" /> Download Report
    </Button>
  );
};

export default DownloadButton;
