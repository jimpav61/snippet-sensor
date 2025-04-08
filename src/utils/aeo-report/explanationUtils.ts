
/**
 * Utility functions for generating detailed explanations and action items for AEO reports
 */

/**
 * Returns a detailed explanation for a specific score type
 */
export function getDetailedExplanation(type: string): string {
  if (type === 'keywordRelevance') {
    return "Keyword relevance measures how well your content uses relevant terms and phrases related to your topic. AI engines analyze semantic relationships between words to understand the context and relevance of your content. Higher scores indicate better topical coverage and semantic richness.";
  } else if (type === 'readability') {
    return "Readability evaluates how easy your content is to read and understand. This includes sentence length, paragraph structure, transition phrases, and language complexity. AI engines favor clear, well-structured content that follows a logical flow and provides a good user experience.";
  } else if (type === 'snippetOptimization') {
    return "Snippet optimization assesses how likely your content is to be featured in AI-generated snippets and featured answers. This includes having clear definitions, concise explanations, properly formatted lists, tables, and direct answers to common questions about your topic.";
  } else if (type === 'structuredData') {
    return "Structured data helps AI systems understand your content by providing explicit signals about your content's meaning and organization. This includes Schema.org markup, clear entity relationships, metadata, and properly formatted headings that create a logical content hierarchy.";
  }
  return "";
}

/**
 * Returns action items for a specific score type, value, and content type
 */
export function getActionItems(type: string, score: number, contentType: string = 'content'): string[] {
  const actionItems = [];
  
  // Customize recommendations based on content type
  const contentTypeLabel = contentType === 'blog' ? 'blog post' : 
                           contentType === 'webpage' ? 'webpage' : 
                           contentType === 'product' ? 'product description' : 'content';
  
  if (type === 'keywordRelevance') {
    if (score < 50) {
      actionItems.push(`Perform comprehensive keyword research specifically for your ${contentTypeLabel} topic`);
      actionItems.push(`Expand your ${contentTypeLabel} with more semantically related terms and concepts`);
      actionItems.push("Analyze competitor content to identify topic gaps you should address");
    } else if (score < 80) {
      actionItems.push(`Enhance your ${contentTypeLabel} with more topic-specific terminology and phrases`);
      actionItems.push("Include natural language variations of key terms throughout your content");
      actionItems.push("Add sections addressing related questions and subtopics your audience might have");
    } else {
      actionItems.push("Maintain your excellent keyword coverage while keeping content natural");
      actionItems.push("Regularly update content with emerging terminology in your field");
    }
  } else if (type === 'readability') {
    if (score < 50) {
      actionItems.push("Significantly shorten sentences and paragraphs throughout your content");
      actionItems.push("Add more descriptive subheadings to break up long sections of text");
      actionItems.push("Reduce technical jargon or provide clear explanations when it's necessary");
    } else if (score < 80) {
      actionItems.push("Improve content flow with better transition phrases between paragraphs");
      actionItems.push("Use more bullet points and numbered lists to organize information");
      actionItems.push("Ensure your introduction clearly sets up what readers will learn");
    } else {
      actionItems.push("Maintain your excellent readability while ensuring depth of content");
      actionItems.push("Consider adding visual elements to complement your well-structured text");
    }
  } else if (type === 'snippetOptimization') {
    if (score < 50) {
      actionItems.push(`Restructure your ${contentTypeLabel} to directly answer common questions in your first paragraph`);
      actionItems.push("Create dedicated definition sections with clear, concise explanations");
      actionItems.push("Add properly formatted lists for steps, examples, or features");
    } else if (score < 80) {
      actionItems.push("Include more 'what is' and 'how to' sections with concise answers");
      actionItems.push("Format key statistics, facts, and quotes in an easily extractable way");
      actionItems.push("Add a summary section that encapsulates your main points concisely");
    } else {
      actionItems.push("Keep tracking featured snippet opportunities in your topic area");
      actionItems.push("Test different formats (paragraphs vs. lists vs. tables) for key information");
    }
  } else if (type === 'structuredData') {
    if (score < 50) {
      actionItems.push(`Implement basic Schema.org markup appropriate for your ${contentTypeLabel}`);
      actionItems.push("Add clear metadata for author, date, and content classification");
      actionItems.push("Ensure your heading structure follows a logical H1 → H2 → H3 hierarchy");
    } else if (score < 80) {
      actionItems.push("Expand your Schema.org markup to include more detailed entity relationships");
      actionItems.push("Add markup for specific content elements like FAQs, how-to steps, or product details");
      actionItems.push("Include entity information for people, places, or organizations mentioned");
    } else {
      actionItems.push("Consider implementing advanced structured data formats like JSON-LD");
      actionItems.push("Test your structured data implementation with testing tools regularly");
    }
  }
  
  // Customize based on content type
  if (contentType === 'blog' && type === 'keywordRelevance' && score < 80) {
    actionItems.push("Include more personal insights and unique perspectives on your topic");
  } else if (contentType === 'webpage' && type === 'structuredData' && score < 80) {
    actionItems.push("Ensure your navigation structure is properly marked up for better indexing");
  } else if (contentType === 'product' && type === 'snippetOptimization' && score < 80) {
    actionItems.push("Add a clear feature comparison table to highlight your product's advantages");
  }
  
  return actionItems;
}
