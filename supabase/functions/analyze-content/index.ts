
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const GROQ_API_KEY = Deno.env.get('GROQ_API_KEY');

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { content, contentType } = await req.json();

    // Log the incoming request
    console.log('Analyzing content:', { contentType, contentLength: content.length });

    // For now, we'll use simulated analysis while we integrate with Groq API
    // In a production environment, this would call the Groq API

    // Generate simulated scores with more variance for demonstration
    const keywordScore = Math.floor(Math.random() * 20) + 70; // 70-90 range
    const readabilityScore = Math.floor(Math.random() * 20) + 70;
    const snippetScore = Math.floor(Math.random() * 20) + 70;
    const structuredDataScore = Math.floor(Math.random() * 20) + 70;

    // Create properly formatted recommendations
    const recommendations = [
      "Improve keyword relevance: Include more semantically related terms and natural language phrases around your topic.",
      "Enhance content readability: Use shorter paragraphs, more subheadings, and simpler sentence structures.",
      "Optimize for AI snippets: Include clear answers to common questions related to your topic, using concise formats.",
      "Add structured data markup: Implement Schema.org markup to provide clear signals to AI systems about your content."
    ];

    // Select only recommendations relevant to scores below 80
    const filteredRecommendations = [];
    if (keywordScore < 80) filteredRecommendations.push(recommendations[0]);
    if (readabilityScore < 80) filteredRecommendations.push(recommendations[1]);
    if (snippetScore < 80) filteredRecommendations.push(recommendations[2]);
    if (structuredDataScore < 80) filteredRecommendations.push(recommendations[3]);

    // If all scores are good, provide a general recommendation
    const finalRecommendations = filteredRecommendations.length > 0 
      ? filteredRecommendations 
      : ["Maintain content quality: Your content is well-optimized. Continue monitoring AI engine updates."];

    const analysisResult = {
      scores: {
        keywordRelevance: keywordScore,
        readability: readabilityScore,
        snippetOptimization: snippetScore,
        structuredData: structuredDataScore,
      },
      recommendations: finalRecommendations,
      analyzedContent: content // Include the actual analyzed content
    };

    // Calculate final score as average
    analysisResult.scores.finalScore = Math.floor(
      Object.values(analysisResult.scores).reduce((a, b, index, array) => 
        // Skip finalScore in calculation
        index < array.length - 1 ? a + b : a, 0) / 
      (Object.values(analysisResult.scores).length - 1)
    );

    console.log('Analysis completed:', analysisResult);

    return new Response(JSON.stringify(analysisResult), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error in analyze-content function:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
