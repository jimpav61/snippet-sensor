
/**
 * Utility functions for formatting content/source data in AEO reports
 */

/**
 * Formats the source information for display in the PDF
 */
export function formatSourceText(source: string): { 
  sourceText: string; 
  formattedSource: string 
} {
  let sourceText = '';
  let formattedSource = '';
  
  // Check if the source is a URL and handle it specially
  if (source && source.startsWith('http')) {
    try {
      // For URLs, display the domain and truncate with ellipsis if needed
      const urlObj = new URL(source);
      const domain = urlObj.hostname;
      const path = urlObj.pathname.length > 30 ? 
        urlObj.pathname.substring(0, 30) + '...' : 
        urlObj.pathname;
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
  
  return { sourceText, formattedSource };
}

/**
 * Formats the input content for display in the PDF
 */
export function formatContent(content: string): string {
  if (content.startsWith('http')) {
    return `URL: ${content}`;
  } else if (content.length > 500) {
    return content.substring(0, 500) + '...';
  }
  return content;
}
