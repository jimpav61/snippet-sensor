import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { ArrowRightLeft, Copy, Sparkles, Wand2, Info, Check, AlertTriangle } from 'lucide-react';
import { toast } from 'sonner';

// Common prompter patterns to identify
const PROMPT_PATTERNS = {
  VAGUE: {
    pattern: /^(tell me|explain|what is|how to|can you).{1,15}$/i,
    improvement: "Be specific about what aspect you want to know and why you need it"
  },
  NO_CONTEXT: {
    pattern: /^(write|create|make|generate|give me).{1,30}$/i,
    improvement: "Add context about your purpose, audience, and specific requirements"
  },
  NO_FORMAT: {
    pattern: /^(list|show|find).{1,40}$/i,
    improvement: "Specify your desired output format (bullet points, table, paragraphs, etc.)"
  }
};

// AI prompt style patterns
const PROMPT_STYLES = {
  STEP_BY_STEP: {
    name: "Step-by-Step Instructions",
    template: "I need a step-by-step guide on [TOPIC]. For each step, please:\n1. Explain what to do\n2. Why it's important\n3. Include any warnings or tips\nThe guide should be appropriate for someone with [EXPERIENCE_LEVEL] experience."
  },
  COMPARISON: {
    name: "Comparison Analysis",
    template: "Compare and contrast [ITEM1] and [ITEM2] in terms of:\n- Key features\n- Pros and cons\n- Best use cases\n- Cost considerations\nPlease format your response in a structured way with clear headings and bullet points."
  },
  EXPERT_ROLE: {
    name: "Expert Role Play",
    template: "As an expert in [FIELD], please explain [TOPIC] to me. Include:\n- Key concepts I should understand\n- Common misconceptions\n- Practical applications\nAssume I have [BACKGROUND_LEVEL] background knowledge."
  },
  DECISION_HELP: {
    name: "Decision Helper",
    template: "I'm trying to decide between [OPTION1] and [OPTION2] for [PURPOSE]. My priorities are:\n1. [PRIORITY1]\n2. [PRIORITY2]\n3. [PRIORITY3]\nPlease analyze both options based on these priorities and recommend the best choice with your reasoning."
  },
  ARTICLE_WRITING: {
    name: "Article Content Creation",
    template: "Write a comprehensive article about [TOPIC] for [TARGET_AUDIENCE]. The article should:\n- Have an engaging headline that captures attention\n- Include an introduction that hooks the reader\n- Cover these key points: [KEY_POINT_1], [KEY_POINT_2], [KEY_POINT_3]\n- Be approximately [WORD_COUNT] words\n- Use a [FORMAL/CONVERSATIONAL/EDUCATIONAL] tone\n- Include a call-to-action encouraging readers to [DESIRED_ACTION]\n\nThe article should position our brand as [BRAND_POSITIONING] and align with our value proposition of [VALUE_PROPOSITION]."
  },
  COLD_EMAIL: {
    name: "Cold Email Outreach",
    template: "Write a cold email to [TARGET_PERSONA] at [COMPANY_TYPE] companies. The email should:\n- Have a compelling subject line that achieves [GOAL_OF_SUBJECT_LINE]\n- Open with a personalized hook related to [RECIPIENT_PAIN_POINT/ACHIEVEMENT]\n- Briefly introduce our [PRODUCT/SERVICE] as a solution to [SPECIFIC_PROBLEM]\n- Include 1-2 relevant social proof points or statistics\n- Have a clear, low-friction call-to-action asking for [SPECIFIC_NEXT_STEP]\n- Be under 200 words\n\nThe tone should be [PROFESSIONAL/FRIENDLY/DIRECT] and avoid sounding generic or sales-heavy."
  },
  FOLLOW_UP_EMAIL: {
    name: "Follow-up Email",
    template: "Write a follow-up email to [RECIPIENT_NAME] who [CONTEXT_OF_PREVIOUS_INTERACTION] about [TOPIC/PRODUCT/SERVICE] on [DATE_OF_LAST_CONTACT]. In this follow-up:\n- Reference our previous conversation\n- Provide [NEW_VALUE/INFORMATION] that wasn't covered before\n- Gently remind them about [KEY_BENEFIT] they showed interest in\n- Ask if they've made progress on [DECISION/NEXT_STEP_PREVIOUSLY_DISCUSSED]\n- Suggest a specific next step or offer assistance with [POTENTIAL_OBSTACLE]\n\nKeep the email concise (3-4 short paragraphs) and maintain a [HELPFUL/PROFESSIONAL/FRIENDLY] tone without being pushy."
  },
  SOCIAL_MEDIA_POST: {
    name: "Social Media Content",
    template: "Create a series of [PLATFORM] posts about [TOPIC/PRODUCT/ANNOUNCEMENT] targeting [TARGET_AUDIENCE]. Each post should:\n- Have an attention-grabbing opener\n- Communicate [KEY_MESSAGE] clearly and concisely\n- Include relevant hashtags like [HASHTAG1], [HASHTAG2]\n- End with an engaging question or clear call-to-action\n\nThe posts should align with our brand voice which is [BRAND_VOICE_CHARACTERISTICS] and should be optimized for [PLATFORM]'s best practices. Consider incorporating [TRENDING_TOPIC/CURRENT_EVENT] if relevant."
  },
  PRODUCT_DESCRIPTION: {
    name: "Product Description",
    template: "Write a compelling product description for [PRODUCT_NAME], a [BRIEF_PRODUCT_DESCRIPTION] that helps [TARGET_CUSTOMER] with [PAIN_POINT/NEED]. Include:\n- An attention-grabbing headline\n- 2-3 paragraphs highlighting the key features and benefits\n- Bullet points listing technical specifications: [SPEC1], [SPEC2], [SPEC3]\n- At least three benefit statements that connect features to customer outcomes\n- Social proof element (awards, testimonials, ratings)\n- Clear pricing information and purchase options\n\nThe tone should be [PROFESSIONAL/CONVERSATIONAL/LUXURY/TECHNICAL] and should emphasize our unique selling proposition of [USP]."
  },
  AD_COPY: {
    name: "Advertising Copy",
    template: "Create [PLATFORM] ad copy for our [PRODUCT/SERVICE] targeting [TARGET_AUDIENCE] with [PAIN_POINT/DESIRE]. The ad should:\n- Have a headline under [CHARACTER_LIMIT] characters that creates urgency or curiosity\n- Include [VALUE_PROPOSITION] clearly in the first few lines\n- Highlight [PRIMARY_BENEFIT] and [SECONDARY_BENEFIT]\n- Address common objection: [OBJECTION]\n- End with a clear call-to-action: [CTA]\n\nIncorporate these keywords naturally: [KEYWORD1], [KEYWORD2]. The overall tone should be [URGENT/FRIENDLY/PROFESSIONAL/CONVERSATIONAL] and align with our campaign goal of [CAMPAIGN_GOAL]."
  },
  SALES_PITCH: {
    name: "Sales Pitch Script",
    template: "Create a sales pitch script for [PRODUCT/SERVICE] when speaking with [DECISION_MAKER_TITLE] at [COMPANY_TYPE] companies. The pitch should:\n- Open with a compelling hook about [INDUSTRY_CHALLENGE/TREND]\n- Transition to how our solution addresses [SPECIFIC_PAIN_POINT]\n- Include these key differentiators: [DIFFERENTIATOR1], [DIFFERENTIATOR2]\n- Incorporate customer success story about [SIMILAR_CUSTOMER] who achieved [SPECIFIC_RESULT]\n- Include responses to these common objections: [OBJECTION1], [OBJECTION2]\n- End with a clear next step question that is easy to say yes to\n\nThe pitch should be conversational, last approximately [TIME_LENGTH] minutes, and focus on business outcomes rather than just features."
  },
  CASE_STUDY: {
    name: "Case Study Framework",
    template: "Create an outline for a case study about how [CLIENT_NAME], a [CLIENT_DESCRIPTION], used our [PRODUCT/SERVICE] to solve [PROBLEM/CHALLENGE]. The case study should include:\n- A compelling title that highlights the primary result\n- Company background section (1 paragraph)\n- Challenge section detailing [SPECIFIC_CHALLENGE] and its business impact\n- Solution section explaining why they chose us over [COMPETITOR/ALTERNATIVE] and the implementation process\n- Results section with specific metrics: [METRIC1], [METRIC2], [METRIC3]\n- 1-2 direct quotes from [STAKEHOLDER_TITLE] about the experience\n- Conclusion with future plans or additional benefits discovered\n\nThe tone should be factual and professional while telling a compelling story that similar prospects would relate to."
  },
  NEWSLETTER: {
    name: "Email Newsletter",
    template: "Create an email newsletter for [AUDIENCE_SEGMENT] focused on [NEWSLETTER_THEME]. The newsletter should include:\n- An engaging subject line that promises specific value\n- Personal greeting and brief introduction (2-3 sentences)\n- Main content section covering: [TOPIC1], [TOPIC2], [TOPIC3]\n- A 'featured content' section highlighting [RECENT_ARTICLE/RESOURCE/PRODUCT]\n- An industry insight or tip section providing actionable advice about [RELEVANT_TOPIC]\n- Clear call-to-action for [DESIRED_NEXT_STEP]\n- Brief company news or update section (optional)\n\nThe newsletter should be scannable with clear headings, maintain a [FRIENDLY/PROFESSIONAL/EDUCATIONAL] tone, and provide genuine value while subtly promoting our [PRODUCT/SERVICE/BRAND]."
  }
};

const PromptOptimizer = () => {
  const [originalPrompt, setOriginalPrompt] = useState('');
  const [optimizedPrompt, setOptimizedPrompt] = useState('');
  const [isOptimizing, setIsOptimizing] = useState(false);
  const [activeTab, setActiveTab] = useState('write');
  const [improvementNotes, setImprovementNotes] = useState<string[]>([]);
  const [promptScore, setPromptScore] = useState<number | null>(null);

  const analyzePrompt = (prompt: string): { score: number; improvements: string[] } => {
    const improvements: string[] = [];
    let score = 100; // Start with perfect score and deduct based on issues

    // Check length - too short prompts are often vague
    if (prompt.length < 15) {
      improvements.push("Your prompt is very short. Consider adding more details for better results.");
      score -= 30;
    }

    // Check for common patterns that indicate low-quality prompts
    Object.entries(PROMPT_PATTERNS).forEach(([key, { pattern, improvement }]) => {
      if (pattern.test(prompt)) {
        improvements.push(improvement);
        score -= 15;
      }
    });

    // Check for specificity - look for specific nouns, numbers, etc.
    const specificityMarkers = [
      /\d+/g, // numbers
      /\b(specifically|precisely|exactly)\b/gi, // specificity words
      /"([^"]+)"/g, // quoted terms
      /\b(steps?|points?|sections?|parts?|categories|format|structure)\b/gi, // structure words
    ];
    
    let hasSpecificityMarkers = false;
    for (const marker of specificityMarkers) {
      if (marker.test(prompt)) {
        hasSpecificityMarkers = true;
        break;
      }
    }
    
    if (!hasSpecificityMarkers) {
      improvements.push("Add specific details, quantities, or requirements to get more precise results.");
      score -= 20;
    }

    // Check for context
    if (!prompt.toLowerCase().includes("context") && 
        !prompt.toLowerCase().includes("background") &&
        !prompt.toLowerCase().includes("purpose") &&
        !prompt.toLowerCase().includes("need")) {
      improvements.push("Include context about why you need this information or what it will be used for.");
      score -= 15;
    }

    // Cap score between 0-100
    score = Math.max(0, Math.min(100, score));
    
    // If no improvements were found but score is perfect, add a positive note
    if (improvements.length === 0 && score > 90) {
      improvements.push("Your prompt is already well-structured!");
    }
    
    // If no improvements found but score isn't perfect, add generic advice
    if (improvements.length === 0 && score <= 90) {
      improvements.push("Consider adding more specific requirements and context for better results.");
    }

    return { score, improvements };
  };

  const optimizePrompt = () => {
    if (!originalPrompt.trim()) {
      toast.error('Please enter a prompt to optimize');
      return;
    }

    setIsOptimizing(true);
    
    // Apply optimization with a small delay to simulate processing
    setTimeout(() => {
      // Analyze the original prompt
      const { score, improvements } = analyzePrompt(originalPrompt.trim());
      setImprovementNotes(improvements);
      setPromptScore(score);
      
      // Start with the original prompt
      let improved = originalPrompt.trim();
      
      // Apply intelligent improvements based on the analysis
      if (score < 50) {
        // For weak prompts, add structure and specificity
        improved = applyDeepOptimization(improved);
      } else if (score < 80) {
        // For decent prompts, enhance with clarity and context
        improved = applyMediumOptimization(improved);
      } else {
        // For good prompts, make minor refinements
        improved = applyLightOptimization(improved);
      }
      
      setOptimizedPrompt(improved);
      setIsOptimizing(false);
      toast.success('Prompt optimized successfully!');
    }, 800);
  };

  const applyDeepOptimization = (prompt: string): string => {
    // For weak prompts, apply stronger restructuring
    let optimized = prompt;
    
    // Add structure if missing
    if (!prompt.includes("\n") && prompt.length > 20) {
      optimized = prompt.replace(/\./g, ".\n\n");
    }
    
    // Add specificity marker
    if (!prompt.toLowerCase().includes("specific") && 
        !prompt.toLowerCase().includes("detail")) {
      optimized += "\n\nPlease be specific and detailed in your response.";
    }
    
    // Add context request
    if (!prompt.toLowerCase().includes("context") && 
        !prompt.toLowerCase().includes("example")) {
      optimized += " Provide relevant context and examples where appropriate.";
    }
    
    // Add format specification
    if (!prompt.toLowerCase().includes("format")) {
      optimized += "\n\nFormat your response as a structured breakdown with clear sections.";
    }
    
    // Add scope clarification
    optimized += "\n\nFocus only on the most important aspects rather than covering everything superficially.";
    
    return optimized;
  };

  const applyMediumOptimization = (prompt: string): string => {
    // For medium-quality prompts, enhance clarity and structure
    let optimized = prompt;
    
    // Add clarity if needed
    if (!prompt.includes("clear") && !prompt.includes("concise")) {
      optimized += " Please provide a clear and concise response.";
    }
    
    // Add structure suggestion if not present
    if (!prompt.includes("structure") && !prompt.includes("organize") && 
        !prompt.includes("bullet") && !prompt.includes("numbered")) {
      optimized += " Consider organizing your response with appropriate headings or bullet points.";
    }
    
    return optimized;
  };

  const applyLightOptimization = (prompt: string): string => {
    // For already good prompts, make minor refinements
    let optimized = prompt;
    
    // Add politeness if missing
    if (!prompt.toLowerCase().includes("please") && 
        !prompt.toLowerCase().includes("thank")) {
      optimized = "Please " + optimized.charAt(0).toLowerCase() + optimized.slice(1);
      optimized += " Thank you.";
    }
    
    return optimized;
  };

  const getPromptScoreColor = (score: number | null): string => {
    if (score === null) return 'bg-gray-200';
    if (score >= 80) return 'bg-green-500';
    if (score >= 50) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  const applyPromptTemplate = (templateKey: keyof typeof PROMPT_STYLES) => {
    setOriginalPrompt(PROMPT_STYLES[templateKey].template);
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text).then(() => {
      toast.success('Copied to clipboard!');
    }).catch(() => {
      toast.error('Failed to copy text');
    });
  };

  const clearFields = () => {
    setOriginalPrompt('');
    setOptimizedPrompt('');
    setImprovementNotes([]);
    setPromptScore(null);
  };

  const handleTabChange = (value: string) => {
    setActiveTab(value);
  };

  const tipsList = [
    "Be specific and detailed about what you want",
    "Provide context about your task or goal",
    "Break complex requests into clear steps",
    "Specify your desired output format",
    "Include examples of what you're looking for",
    "Set clear constraints and limitations",
    "Ask for a specific level of detail or complexity",
    "Use polite, clear language"
  ];

  return (
    <div className="w-full max-w-5xl mx-auto">
      <Tabs defaultValue="write" onValueChange={handleTabChange}>
        <TabsList className="w-full mb-6">
          <TabsTrigger value="write" className="flex-1">Write & Optimize</TabsTrigger>
          <TabsTrigger value="templates" className="flex-1">Prompt Templates</TabsTrigger>
          <TabsTrigger value="tips" className="flex-1">Prompt Writing Tips</TabsTrigger>
          <TabsTrigger value="examples" className="flex-1">Example Prompts</TabsTrigger>
        </TabsList>
        
        <TabsContent value="write" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="h-full">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Wand2 className="h-5 w-5 mr-2" />
                  Original Prompt
                </CardTitle>
                <CardDescription>
                  Enter your prompt text that you want to optimize
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Textarea 
                  placeholder="Enter your original prompt here..."
                  className="min-h-[200px] mb-4" 
                  value={originalPrompt}
                  onChange={(e) => setOriginalPrompt(e.target.value)}
                />
                <div className="flex justify-between">
                  <Button 
                    variant="outline" 
                    onClick={clearFields}
                  >
                    Clear
                  </Button>
                  <Button 
                    onClick={optimizePrompt}
                    disabled={isOptimizing || !originalPrompt.trim()}
                    className="bg-aeo hover:bg-aeo-600"
                  >
                    {isOptimizing ? 'Optimizing...' : 'Optimize Prompt'} <ArrowRightLeft className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
            
            <Card className="h-full">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Sparkles className="h-5 w-5 mr-2" />
                  Optimized Prompt
                </CardTitle>
                <CardDescription>
                  Enhanced version of your prompt
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Textarea 
                  placeholder="Your optimized prompt will appear here..."
                  className="min-h-[200px] mb-4" 
                  value={optimizedPrompt}
                  readOnly
                />
                <div className="flex justify-end">
                  <Button
                    variant="outline"
                    onClick={() => copyToClipboard(optimizedPrompt)}
                    disabled={!optimizedPrompt}
                  >
                    <Copy className="mr-2 h-4 w-4" />
                    Copy to Clipboard
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
          
          {promptScore !== null && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>Prompt Analysis</span>
                  <div className="flex items-center">
                    <span className="mr-2">Score:</span>
                    <span className={`${getPromptScoreColor(promptScore)} text-white px-2 py-1 rounded-md`}>
                      {promptScore}/100
                    </span>
                  </div>
                </CardTitle>
                <CardDescription>
                  Here's our analysis of your original prompt
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Improvement Suggestions:</h3>
                  <ul className="space-y-2">
                    {improvementNotes.map((note, index) => (
                      <li key={index} className="flex items-start">
                        {note.includes("already well") ? (
                          <span className="bg-green-100 text-green-800 rounded-full w-6 h-6 flex items-center justify-center mr-2 mt-0.5">
                            <Check className="h-4 w-4" />
                          </span>
                        ) : (
                          <span className="bg-yellow-100 text-yellow-800 rounded-full w-6 h-6 flex items-center justify-center mr-2 mt-0.5">
                            <Info className="h-4 w-4" />
                          </span>
                        )}
                        <span>{note}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="templates">
          <Card>
            <CardHeader>
              <CardTitle>Prompt Templates</CardTitle>
              <CardDescription>
                Use these templates as starting points for common prompt types
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {Object.entries(PROMPT_STYLES).map(([key, { name, template }]) => (
                  <Card key={key} className="border">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg">{name}</CardTitle>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <p className="text-sm bg-slate-50 p-3 rounded mb-3 whitespace-pre-line">{template}</p>
                      <Button
                        size="sm"
                        onClick={() => applyPromptTemplate(key as keyof typeof PROMPT_STYLES)}
                        className="w-full"
                      >
                        Use This Template
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="tips">
          <Card>
            <CardHeader>
              <CardTitle>Effective Prompt Writing Tips</CardTitle>
              <CardDescription>
                Use these guidelines to create better prompts for AI systems
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {tipsList.map((tip, index) => (
                  <div key={index} className="flex items-start p-4 border rounded-md">
                    <span className="bg-aeo-100 text-aeo-800 rounded-full w-6 h-6 flex items-center justify-center mr-2 mt-0.5">{index + 1}</span>
                    <span>{tip}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="examples">
          <Card>
            <CardHeader>
              <CardTitle>Example Prompts</CardTitle>
              <CardDescription>
                Study these examples to understand effective prompt patterns
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="border rounded-md p-4">
                <h3 className="text-lg font-medium mb-2">Weak Prompt:</h3>
                <p className="p-3 bg-gray-100 rounded mb-4">Tell me about climate change.</p>
                
                <h3 className="text-lg font-medium mb-2">Strong Prompt:</h3>
                <p className="p-3 bg-green-50 rounded">Please provide a comprehensive explanation of climate change, including its main causes, three major impacts, and the most promising solutions currently being developed. Include specific data points and organize the information in sections with headers. Keep the explanation at a high school reading level.</p>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="mt-2"
                  onClick={() => copyToClipboard("Please provide a comprehensive explanation of climate change, including its main causes, three major impacts, and the most promising solutions currently being developed. Include specific data points and organize the information in sections with headers. Keep the explanation at a high school reading level.")}
                >
                  <Copy className="mr-2 h-3 w-3" />
                  Copy Example
                </Button>
              </div>
              
              <Separator />
              
              <div className="border rounded-md p-4">
                <h3 className="text-lg font-medium mb-2">Weak Prompt:</h3>
                <p className="p-3 bg-gray-100 rounded mb-4">Write code for a website.</p>
                
                <h3 className="text-lg font-medium mb-2">Strong Prompt:</h3>
                <p className="p-3 bg-green-50 rounded">Please write HTML, CSS, and JavaScript code for a responsive landing page for a fictional coffee shop called "Mountain Brew." The page should include: a navigation bar with links to Menu, About, and Contact sections; a hero section with a high-quality image and tagline; a featured products section showing 3 coffee types with descriptions and prices; and a footer with contact information. Use modern CSS practices and ensure the design is mobile-friendly. Add comments in the code to explain key functionality.</p>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="mt-2"
                  onClick={() => copyToClipboard("Please write HTML, CSS, and JavaScript code for a responsive landing page for a fictional coffee shop called \"Mountain Brew.\" The page should include: a navigation bar with links to Menu, About, and Contact sections; a hero section with a high-quality image and tagline; a featured products section showing 3 coffee types with descriptions and prices; and a footer with contact information. Use modern CSS practices and ensure the design is mobile-friendly. Add comments in the code to explain key functionality.")}
                >
                  <Copy className="mr-2 h-3 w-3" />
                  Copy Example
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default PromptOptimizer;
