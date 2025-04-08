
import { jsPDF } from 'jspdf';
import { format } from 'date-fns';
import { formatSourceText, formatContent } from './aeo-report/contentFormatter';
import { 
  addHeaderSection, 
  addSourceSection, 
  addOverallScoreSection, 
  addScoreBreakdownTable,
  addRecommendationsSection, 
  addDetailedAnalysisSection,
  addAnalyzedContentSection,
  addFooter
} from './aeo-report/pdfSections';

interface ScoreData {
  keywordRelevance: number;
  readability: number;
  snippetOptimization: number;
  structuredData: number;
  finalScore: number;
}

export const generateAEOReport = (
  scores: ScoreData, 
  source: string = 'Content analysis',
  contentType: string = 'content'
) => {
  const doc = new jsPDF();
  const currentDate = format(new Date(), 'MMMM d, yyyy');
  
  // Format the source information
  const { sourceText, formattedSource } = formatSourceText(source);
  
  // Add report sections
  addHeaderSection(doc, currentDate);
  addSourceSection(doc, sourceText);
  addOverallScoreSection(doc, scores.finalScore);
  
  // Add score breakdown table and get the ending Y position
  const tableEndY = addScoreBreakdownTable(doc, scores);
  
  // Add recommendations
  addRecommendationsSection(doc, scores, tableEndY, contentType);
  
  // Always add detailed analysis section (regardless of UI state)
  addDetailedAnalysisSection(doc, scores, contentType);
  
  // Add analyzed content on a new page if relevant
  if (formattedSource && formattedSource !== 'Content analysis') {
    const formattedContent = formatContent(formattedSource);
    addAnalyzedContentSection(doc, formattedContent);
  }
  
  // Add footer to all pages
  addFooter(doc);
  
  return doc;
};
