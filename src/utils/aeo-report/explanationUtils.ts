
/**
 * Utility functions for generating detailed explanations and action items for AEO reports
 */

/**
 * Returns a detailed explanation for a specific score type
 */
export function getDetailedExplanation(type: string): string {
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

/**
 * Returns action items for a specific score type and value
 */
export function getActionItems(type: string, score: number): string[] {
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
