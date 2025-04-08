
/**
 * Utility functions for handling score-related operations in AEO reports
 */

/**
 * Determines the status text for a given score
 */
export function getScoreStatus(score: number): string {
  if (score >= 80) return 'Good';
  if (score >= 60) return 'Needs Improvement';
  return 'Poor';
}

/**
 * Generates recommendations based on scores and content type
 */
export function getRecommendations(
  scores: {
    keywordRelevance: number;
    readability: number;
    snippetOptimization: number;
    structuredData: number;
    finalScore: number;
  }, 
  contentType: string = 'content'
): Array<{title: string, description: string}> {
  const recommendations = [];
  
  // Format friendly content type label
  const contentTypeLabel = contentType === 'blog' ? 'blog post' : 
                           contentType === 'webpage' ? 'webpage' : 
                           contentType === 'product' ? 'product description' : 'content';
  
  // Prioritize recommendations for the lowest scores
  const scoreTypes = [
    { key: 'keywordRelevance', label: 'Keyword Relevance', score: scores.keywordRelevance },
    { key: 'readability', label: 'Readability', score: scores.readability },
    { key: 'snippetOptimization', label: 'Snippet Optimization', score: scores.snippetOptimization },
    { key: 'structuredData', label: 'Structured Data', score: scores.structuredData }
  ].sort((a, b) => a.score - b.score); // Sort by score ascending (worst first)
  
  // Get the three worst scoring areas
  const priorityScores = scoreTypes.slice(0, 3);
  
  // Generate specific recommendations for each priority area
  priorityScores.forEach(({ key, score }) => {
    if (key === 'keywordRelevance' && score < 80) {
      if (score < 60) {
        recommendations.push({
          title: `Expand ${contentTypeLabel} topic coverage`,
          description: `Your ${contentTypeLabel} needs more semantically related terms and natural language phrases that AI engines associate with your topic.`
        });
      } else {
        recommendations.push({
          title: 'Enhance semantic relevance',
          description: 'Add more contextually relevant terminology and address related subtopics to strengthen topical authority.'
        });
      }
    }
    
    if (key === 'readability' && score < 80) {
      if (score < 60) {
        recommendations.push({
          title: 'Improve content structure',
          description: 'Significantly shorten paragraphs, simplify sentences, and add more descriptive subheadings to improve readability.'
        });
      } else {
        recommendations.push({
          title: 'Refine content flow',
          description: 'Add better transitions between paragraphs and use more bullet points to organize information in a scanner-friendly format.'
        });
      }
    }
    
    if (key === 'snippetOptimization' && score < 80) {
      if (score < 60) {
        recommendations.push({
          title: 'Restructure for AI snippets',
          description: `Format your ${contentTypeLabel} to directly answer common questions with concise, extractable definitions and clear explanations.`
        });
      } else {
        recommendations.push({
          title: 'Enhance featured answer potential',
          description: 'Include more "what is" and "how to" sections with clear, direct answers to improve snippet selection.'
        });
      }
    }
    
    if (key === 'structuredData' && score < 80) {
      if (score < 60) {
        recommendations.push({
          title: 'Implement structured data markup',
          description: `Add basic Schema.org markup appropriate for your ${contentTypeLabel} type to help AI systems better understand your content.`
        });
      } else {
        recommendations.push({
          title: 'Expand semantic structure',
          description: 'Enhance your existing markup with more detailed entity relationships and specialized content schema types.'
        });
      }
    }
  });
  
  // Content type specific recommendations
  if (contentType === 'blog' && recommendations.length < 3) {
    recommendations.push({
      title: 'Optimize for narrative engagement',
      description: 'Add more personal insights and unique perspectives to differentiate your content and increase reader engagement.'
    });
  } else if (contentType === 'webpage' && recommendations.length < 3) {
    recommendations.push({
      title: 'Enhance page hierarchy signals',
      description: 'Ensure your navigation structure and internal linking provide clear context about content relationships and importance.'
    });
  } else if (contentType === 'product' && recommendations.length < 3) {
    recommendations.push({
      title: 'Strengthen value proposition',
      description: 'Clearly articulate unique selling points and add comparison elements to highlight advantages over alternatives.'
    });
  }
  
  // If all scores are good, provide general recommendation
  if (recommendations.length === 0) {
    recommendations.push({
      title: 'Maintain content quality',
      description: 'Your content is well-optimized. Continue monitoring AI engine updates for future improvements.'
    });
    
    recommendations.push({
      title: 'Create complementary content',
      description: 'Develop related content pieces that link to this one to strengthen your topical authority cluster.'
    });
    
    recommendations.push({
      title: 'Consider multimedia expansion',
      description: 'Add supporting images, videos, or interactive elements to enhance engagement and dwell time.'
    });
  }
  
  // Ensure we have exactly 3 recommendations
  return recommendations.slice(0, 3);
}
