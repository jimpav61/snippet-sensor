
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { format } from 'date-fns';

interface ScoreData {
  keywordRelevance: number;
  readability: number;
  snippetOptimization: number;
  structuredData: number;
  finalScore: number;
}

export const generateAEOReport = (scores: ScoreData, source: string = 'Content analysis') => {
  const doc = new jsPDF();
  const currentDate = format(new Date(), 'MMMM d, yyyy');
  
  // Add header
  doc.setFontSize(20);
  doc.setTextColor(246, 82, 40); // AEO color
  doc.text('AI Engine Optimization Report', 105, 20, { align: 'center' });
  
  doc.setFontSize(12);
  doc.setTextColor(100);
  doc.text(`Generated on: ${currentDate}`, 105, 30, { align: 'center' });
  
  // Add analyzed content information
  doc.setFontSize(11);
  doc.setTextColor(80);
  
  // Format the source text to ensure it fits on the page
  const maxLineWidth = 170; // Maximum width available for text on the page
  let sourceText = `Analyzed content: ${source}`;
  
  // Check if the source text is too long and truncate it if needed
  if (doc.getTextWidth(sourceText) > maxLineWidth) {
    // If source is a URL, display as much as possible
    if (source.startsWith('http')) {
      const urlParts = source.split('/');
      const domain = urlParts[2] || 'website';
      sourceText = `Analyzed URL: ${domain}/...`;
    } else {
      // For text content, truncate with ellipsis
      let truncatedSource = source;
      while (doc.getTextWidth(`Analyzed text: ${truncatedSource}...`) > maxLineWidth && truncatedSource.length > 10) {
        truncatedSource = truncatedSource.substring(0, truncatedSource.length - 5);
      }
      sourceText = `Analyzed text: ${truncatedSource}...`;
    }
  }
  
  doc.text(sourceText, 105, 38, { align: 'center' });
  
  // Add overall score section
  doc.setFillColor(246, 246, 246);
  doc.roundedRect(20, 45, 170, 40, 3, 3, 'F');
  
  doc.setFontSize(16);
  doc.setTextColor(60);
  doc.text('Overall AEO Score', 105, 58, { align: 'center' });
  
  doc.setFontSize(30);
  doc.setTextColor(246, 82, 40);
  doc.text(`${scores.finalScore}`, 105, 75, { align: 'center' });
  doc.setFontSize(12);
  doc.text('/100', 122, 75);
  
  // Add score breakdown
  doc.setFontSize(16);
  doc.setTextColor(60);
  doc.text('Score Breakdown', 20, 105);
  
  // Fix column width issues by reducing the first column width
  autoTable(doc, {
    startY: 110,
    head: [['Score Category', 'Score', 'Status']],
    body: [
      ['Keyword Relevance', `${scores.keywordRelevance}/100`, getScoreStatus(scores.keywordRelevance)],
      ['Readability', `${scores.readability}/100`, getScoreStatus(scores.readability)],
      ['Snippet Opt.', `${scores.snippetOptimization}/100`, getScoreStatus(scores.snippetOptimization)],
      ['Structured Data', `${scores.structuredData}/100`, getScoreStatus(scores.structuredData)]
    ],
    theme: 'grid',
    headStyles: { 
      fillColor: [246, 82, 40],
      textColor: [255, 255, 255],
      fontStyle: 'bold' 
    },
    columnStyles: {
      0: { cellWidth: 60 }, // Reduced from 80 to avoid width issues
      1: { cellWidth: 40, halign: 'center' },
      2: { cellWidth: 50, halign: 'center' }
    },
  });
  
  // Add recommendations section
  const tableEndY = (doc as any).lastAutoTable.finalY;
  
  doc.setFontSize(16);
  doc.setTextColor(60);
  doc.text('Key Recommendations', 20, tableEndY + 20);
  
  doc.setFontSize(12);
  doc.setTextColor(80);
  
  const recommendations = getRecommendations(scores);
  let yPosition = tableEndY + 30;
  
  recommendations.forEach((recommendation, index) => {
    doc.text(`${index + 1}. ${recommendation.title}`, 20, yPosition);
    doc.setTextColor(120);
    doc.text(recommendation.description, 20, yPosition + 8);
    doc.setTextColor(80);
    yPosition += 20;
  });
  
  // Add user input section if available
  if (source && source !== 'Content analysis') {
    doc.addPage();
    doc.setFontSize(16);
    doc.setTextColor(60);
    doc.text('Analyzed Content', 20, 20);
    
    doc.setFontSize(11);
    doc.setTextColor(80);
    
    // Format the input content for display
    let content = source;
    if (source.startsWith('http')) {
      content = `URL: ${source}`;
    } else if (source.length > 500) {
      content = source.substring(0, 500) + '...';
    }
    
    // Add the content as a text block with wrapping
    const splitText = doc.splitTextToSize(content, 170);
    doc.text(splitText, 20, 30);
  }
  
  // Add footer
  const pageCount = doc.getNumberOfPages();
  doc.setFontSize(10);
  doc.setTextColor(150);
  
  for (let i = 1; i <= pageCount; i++) {
    doc.setPage(i);
    doc.text('AI Engine Optimization Report - Generated with AEO Analyzer Tool', 105, 285, { align: 'center' });
  }
  
  return doc;
};

function getScoreStatus(score: number): string {
  if (score >= 80) return 'Good';
  if (score >= 60) return 'Needs Improvement';
  return 'Poor';
}

function getRecommendations(scores: ScoreData): Array<{title: string, description: string}> {
  const recommendations = [];
  
  if (scores.keywordRelevance < 80) {
    recommendations.push({
      title: 'Improve keyword relevance',
      description: 'Include more semantically related terms and natural language phrases around your topic.'
    });
  }
  
  if (scores.readability < 80) {
    recommendations.push({
      title: 'Enhance content readability',
      description: 'Use shorter paragraphs, more subheadings, and simpler sentence structures.'
    });
  }
  
  if (scores.snippetOptimization < 80) {
    recommendations.push({
      title: 'Optimize for AI snippets',
      description: 'Include clear answers to common questions related to your topic, using concise formats.'
    });
  }
  
  if (scores.structuredData < 80) {
    recommendations.push({
      title: 'Add structured data markup',
      description: 'Implement Schema.org markup to provide clear signals to AI systems about your content.'
    });
  }
  
  // If all scores are good, provide general recommendation
  if (recommendations.length === 0) {
    recommendations.push({
      title: 'Maintain content quality',
      description: 'Your content is well-optimized. Continue monitoring AI engine updates for future improvements.'
    });
  }
  
  return recommendations;
}
