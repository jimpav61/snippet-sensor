
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
  
  // Add analyzed content information with proper handling of long URLs
  doc.setFontSize(11);
  doc.setTextColor(80);
  
  // Format the source text to ensure it fits on the page
  let sourceText = '';
  let formattedSource = '';
  
  // Check if the source is a URL and handle it specially
  if (source && source.startsWith('http')) {
    try {
      // For URLs, display the domain and truncate with ellipsis if needed
      const urlObj = new URL(source);
      const domain = urlObj.hostname;
      const path = urlObj.pathname.length > 30 ? urlObj.pathname.substring(0, 30) + '...' : urlObj.pathname;
      sourceText = `Analyzed URL: ${domain}${path}`;
      formattedSource = source; // Keep the full URL for content page
    } catch (e) {
      // If invalid URL, just use as text
      sourceText = `Analyzed content: ${source.substring(0, 70)}${source.length > 70 ? '...' : ''}`;
      formattedSource = source;
    }
  } else if (source) {
    // For text content, truncate with ellipsis if too long
    sourceText = `Analyzed content: ${source.substring(0, 70)}${source.length > 70 ? '...' : ''}`;
    formattedSource = source;
  } else {
    sourceText = 'Content analysis';
    formattedSource = 'Content analysis';
  }
  
  // Ensure the text fits within the page width
  const maxWidth = 170;
  if (doc.getTextWidth(sourceText) > maxWidth) {
    const lines = doc.splitTextToSize(sourceText, maxWidth);
    doc.text(lines, 20, 38);
  } else {
    doc.text(sourceText, 105, 38, { align: 'center' });
  }
  
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
  
  // Add detailed analysis section (always included regardless of UI state)
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
    
    const actionItems = getActionItems(scoreType.key, score);
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
  
  // Add analyzed content on a new page
  if (formattedSource && formattedSource !== 'Content analysis') {
    doc.addPage();
    doc.setFontSize(16);
    doc.setTextColor(60);
    doc.text('Analyzed Content', 20, 20);
    
    doc.setFontSize(11);
    doc.setTextColor(80);
    
    // Format the input content for display
    let content = formattedSource;
    if (formattedSource.startsWith('http')) {
      content = `URL: ${formattedSource}`;
    } else if (formattedSource.length > 500) {
      content = formattedSource.substring(0, 500) + '...';
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

// Helper functions for detailed analysis
function getDetailedExplanation(type: string): string {
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
}

function getActionItems(type: string, score: number): string[] {
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
  } else if (score >= 80) {
    actionItems.push("Continue monitoring for AI engine updates and adjust content accordingly");
    actionItems.push("Expand content with additional related topics to strengthen relevance");
  }
  
  return actionItems;
}
