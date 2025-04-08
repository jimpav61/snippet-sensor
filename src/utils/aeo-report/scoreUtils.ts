
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
 * Generates recommendations based on scores
 */
export function getRecommendations(scores: {
  keywordRelevance: number;
  readability: number;
  snippetOptimization: number;
  structuredData: number;
  finalScore: number;
}): Array<{title: string, description: string}> {
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
