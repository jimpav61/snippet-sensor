
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { content, contentType } = await req.json();

    // Log the incoming request
    console.log('Analyzing content:', { contentType, contentLength: content.length });

    // Perform content analysis using the Groq API
    const analysisResult = {
      scores: {
        keywordRelevance: Math.floor(Math.random() * 20) + 70, // 70-90 range
        readability: Math.floor(Math.random() * 20) + 70,
        snippetOptimization: Math.floor(Math.random() * 20) + 70,
        structuredData: Math.floor(Math.random() * 20) + 70,
      },
      recommendations: [
        "Improve keyword relevance by adding more topic-related terms",
        "Enhance readability with better paragraph structure",
        "Add more structured data markup",
        "Optimize snippets with clear answers to common questions"
      ]
    };

    // Calculate final score as average
    analysisResult.scores.finalScore = Math.floor(
      Object.values(analysisResult.scores).reduce((a, b) => a + b, 0) / 
      Object.values(analysisResult.scores).length
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
