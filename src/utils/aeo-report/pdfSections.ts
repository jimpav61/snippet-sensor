
import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';
import { getScoreStatus, getRecommendations } from './scoreUtils';
import { getDetailedExplanation, getActionItems } from './explanationUtils';

interface ScoreData {
  keywordRelevance: number;
  readability: number;
  snippetOptimization: number;
  structuredData: number;
  finalScore: number;
}

/**
 * Adds the header section to the PDF
 */
export function addHeaderSection(doc: jsPDF, currentDate: string): void {
  // Add header
  doc.setFontSize(20);
  doc.setTextColor(246, 82, 40); // AEO color
  doc.text('AI Engine Optimization Report', 105, 20, { align: 'center' });
  
  doc.setFontSize(12);
  doc.setTextColor(100);
  doc.text(`Generated on: ${currentDate}`, 105, 30, { align: 'center' });
}

/**
 * Adds the source information section to the PDF
 */
export function addSourceSection(doc: jsPDF, sourceText: string): void {
  doc.setFontSize(11);
  doc.setTextColor(80);
  
  // Ensure the text fits within the page width
  const maxWidth = 170;
  if (doc.getTextWidth(sourceText) > maxWidth) {
    const lines = doc.splitTextToSize(sourceText, maxWidth);
    doc.text(lines, 20, 38);
  } else {
    doc.text(sourceText, 105, 38, { align: 'center' });
  }
}

/**
 * Adds the overall score section to the PDF
 */
export function addOverallScoreSection(doc: jsPDF, finalScore: number): void {
  doc.setFillColor(246, 246, 246);
  doc.roundedRect(20, 45, 170, 40, 3, 3, 'F');
  
  doc.setFontSize(16);
  doc.setTextColor(60);
  doc.text('Overall AEO Score', 105, 58, { align: 'center' });
  
  doc.setFontSize(30);
  doc.setTextColor(246, 82, 40);
  doc.text(`${finalScore}`, 105, 75, { align: 'center' });
  doc.setFontSize(12);
  doc.text('/100', 122, 75);
}

/**
 * Adds the score breakdown table to the PDF
 */
export function addScoreBreakdownTable(doc: jsPDF, scores: ScoreData): number {
  doc.setFontSize(16);
  doc.setTextColor(60);
  doc.text('Score Breakdown', 20, 105);
  
  // Use auto table with adjusted column widths
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
      0: { cellWidth: 60 },
      1: { cellWidth: 40, halign: 'center' },
      2: { cellWidth: 50, halign: 'center' }
    },
    styles: { overflow: 'linebreak' },
  });
  
  // Return the Y position where the table ends
  return (doc as any).lastAutoTable.finalY;
}

/**
 * Adds the recommendations section to the PDF
 */
export function addRecommendationsSection(
  doc: jsPDF, 
  scores: ScoreData, 
  startYPosition: number,
  contentType: string = 'content'
): number {
  doc.setFontSize(16);
  doc.setTextColor(60);
  doc.text('Key Recommendations', 20, startYPosition + 20);
  
  doc.setFontSize(12);
  doc.setTextColor(80);
  
  const recommendations = getRecommendations(scores, contentType);
  let yPosition = startYPosition + 30;
  
  recommendations.forEach((recommendation, index) => {
    // Check if we need to add a new page for recommendations
    if (yPosition > 260) {
      doc.addPage();
      yPosition = 20;
    }
    
    doc.text(`${index + 1}. ${recommendation.title}`, 20, yPosition);
    doc.setTextColor(120);
    doc.text(recommendation.description, 20, yPosition + 8);
    doc.setTextColor(80);
    yPosition += 20;
  });
  
  return yPosition;
}

/**
 * Adds the detailed analysis section to the PDF
 */
export function addDetailedAnalysisSection(
  doc: jsPDF, 
  scores: ScoreData,
  contentType: string = 'content'
): void {
  doc.addPage();
  doc.setFontSize(16);
  doc.setTextColor(60);
  doc.text('Detailed Analysis', 20, 20);
  
  const scoreTypes = [
    { key: 'keywordRelevance', label: 'Keyword Relevance' },
    { key: 'readability', label: 'Readability' },
    { key: 'snippetOptimization', label: 'Snippet Optimization' },
    { key: 'structuredData', label: 'Structured Data' }
  ];
  
  let detailsYPosition = 35;
  
  scoreTypes.forEach(scoreType => {
    // Add section header
    doc.setFontSize(14);
    doc.setTextColor(60);
    doc.text(scoreType.label, 20, detailsYPosition);
    detailsYPosition += 10;
    
    // Add score
    const score = scores[scoreType.key as keyof typeof scores] as number;
    doc.setFontSize(12);
    doc.setTextColor(246, 82, 40);
    doc.text(`Score: ${score}/100 - ${getScoreStatus(score)}`, 20, detailsYPosition);
    detailsYPosition += 10;
    
    // Add explanation
    doc.setFontSize(11);
    doc.setTextColor(80);
    const explanation = getDetailedExplanation(scoreType.key);
    const explanationLines = doc.splitTextToSize(explanation, 170);
    doc.text(explanationLines, 20, detailsYPosition);
    detailsYPosition += explanationLines.length * 6 + 8;
    
    // Add action items
    doc.setFontSize(11);
    doc.setTextColor(60);
    doc.text('Action Items:', 20, detailsYPosition);
    detailsYPosition += 8;
    
    const actionItems = getActionItems(scoreType.key, score, contentType);
    actionItems.forEach(actionItem => {
      const bulletLines = doc.splitTextToSize(`• ${actionItem}`, 165);
      doc.setTextColor(80);
      doc.text(bulletLines, 25, detailsYPosition);
      detailsYPosition += bulletLines.length * 6 + 4;
    });
    
    detailsYPosition += 8;
    
    // Check if we need a new page
    if (detailsYPosition > 260 && scoreType.key !== 'structuredData') {
      doc.addPage();
      detailsYPosition = 20;
    }
  });
}

/**
 * Adds the analyzed content section to the PDF
 */
export function addAnalyzedContentSection(doc: jsPDF, formattedContent: string): void {
  doc.addPage();
  doc.setFontSize(16);
  doc.setTextColor(60);
  doc.text('Analyzed Content', 20, 20);
  
  doc.setFontSize(11);
  doc.setTextColor(80);
  
  // Add the content as a text block with wrapping
  const splitText = doc.splitTextToSize(formattedContent, 170);
  doc.text(splitText, 20, 30);
}

/**
 * Adds the footer to all pages of the PDF
 */
export function addFooter(doc: jsPDF): void {
  const pageCount = doc.getNumberOfPages();
  doc.setFontSize(10);
  doc.setTextColor(150);
  
  for (let i = 1; i <= pageCount; i++) {
    doc.setPage(i);
    doc.text('AI Engine Optimization Report - Generated with AEO Analyzer Tool', 105, 285, { align: 'center' });
  }
}
