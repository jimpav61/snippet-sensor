
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { content, contentType } = await req.json();
    const groqApiKey = Deno.env.get('GROQ_API_KEY');

    if (!groqApiKey) {
      console.error('GROQ_API_KEY is not set in environment variables');
      return new Response(
        JSON.stringify({ error: 'API key configuration error' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    if (!content) {
      return new Response(
        JSON.stringify({ error: 'Content is required' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Log for debugging
    console.log(`Analyzing content with type: ${contentType}, length: ${content.length}`);

    // Create a prompt for the Groq API
    const prompt = `
      You are an AI Engine Optimization (AEO) expert. Analyze the following ${contentType} content:

      ${content}

      Evaluate the content based on:
      1. Keyword relevance (how well it uses relevant terms)
      2. Readability (sentence structure, paragraph organization)
      3. Snippet optimization (how well it can be featured in AI snippets)
      4. Structured data (organization and clarity)

      For each category, provide a score from 0-100.
      Also provide 3-5 specific recommendations to improve the content for AI engines.
      Format your response as a JSON object with "scores" (containing the category scores and finalScore) and "recommendations" (an array of strings).
    `;

    // Call Groq API
    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${groqApiKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: 'llama3-8b-8192',
        messages: [
          { role: 'system', content: 'You are an AI content optimization expert.' },
          { role: 'user', content: prompt }
        ],
        temperature: 0.2,
        max_tokens: 1000
      })
    });

    if (!response.ok) {
      const errorData = await response.text();
      console.error('Groq API error:', errorData);
      return new Response(
        JSON.stringify({ error: 'Failed to analyze content with Groq API' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const groqResponse = await response.json();
    const analysisText = groqResponse.choices[0].message.content;
    
    // Parse the JSON response from Groq
    let analysisResult;
    try {
      // Try to parse the response as JSON
      analysisResult = JSON.parse(analysisText);
    } catch (e) {
      console.log('Failed to parse Groq response as JSON, using fallback parsing logic');
      
      // Fallback: extract scores and recommendations using regex
      const keywordMatch = analysisText.match(/keyword relevance:?\s*(\d+)/i);
      const readabilityMatch = analysisText.match(/readability:?\s*(\d+)/i);
      const snippetMatch = analysisText.match(/snippet optimization:?\s*(\d+)/i);
      const structuredMatch = analysisText.match(/structured data:?\s*(\d+)/i);
      const finalMatch = analysisText.match(/final score:?\s*(\d+)/i);
      
      // Extract recommendations
      const recommendationsMatch = analysisText.match(/recommendations:[\s\S]*?1\.([\s\S]*?)(?:2\.|$)/);
      const recommendations = [];
      
      if (recommendationsMatch && recommendationsMatch[1]) {
        recommendations.push(recommendationsMatch[1].trim());
      }
      
      // Add more recommendation matches as needed
      for (let i = 2; i <= 5; i++) {
        const recMatch = analysisText.match(new RegExp(`${i}\\.([\\s\\S]*?)(?:${i+1}\\.|$)`));
        if (recMatch && recMatch[1]) {
          recommendations.push(recMatch[1].trim());
        }
      }
      
      analysisResult = {
        scores: {
          keywordRelevance: parseInt(keywordMatch?.[1] || '75'),
          readability: parseInt(readabilityMatch?.[1] || '80'),
          snippetOptimization: parseInt(snippetMatch?.[1] || '65'),
          structuredData: parseInt(structuredMatch?.[1] || '70'),
          finalScore: parseInt(finalMatch?.[1] || '73')
        },
        recommendations: recommendations.length > 0 ? recommendations : [
          "Improve keyword usage by including more semantically related terms.",
          "Enhance content structure with clear headings and concise paragraphs.",
          "Include direct answers to common questions in your niche."
        ]
      };
    }

    // Ensure the results have the expected shape
    const validatedResult = {
      scores: {
        keywordRelevance: Number(analysisResult.scores?.keywordRelevance || 75),
        readability: Number(analysisResult.scores?.readability || 80),
        snippetOptimization: Number(analysisResult.scores?.snippetOptimization || 65),
        structuredData: Number(analysisResult.scores?.structuredData || 70),
        finalScore: Number(analysisResult.scores?.finalScore || 73)
      },
      recommendations: Array.isArray(analysisResult.recommendations) 
        ? analysisResult.recommendations 
        : ["Improve keyword usage", "Enhance content structure", "Include direct answers to questions"]
    };

    return new Response(
      JSON.stringify(validatedResult),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Error in analyze-content function:', error);
    return new Response(
      JSON.stringify({ error: error.message || 'Internal server error' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
