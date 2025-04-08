
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowRightLeft, Copy, Save, Info } from 'lucide-react';
import { toast } from 'sonner';
import SavePromptModal from './SavePromptModal';
import { SavedPrompt } from '@/utils/promptStorage';

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

interface PromptOptimizerContentProps {
  onSavePrompt: () => void;
}

const PromptOptimizerContent: React.FC<PromptOptimizerContentProps> = ({
  onSavePrompt
}) => {
  const [originalPrompt, setOriginalPrompt] = useState('');
  const [optimizedPrompt, setOptimizedPrompt] = useState('');
  const [isOptimizing, setIsOptimizing] = useState(false);
  const [improvementNotes, setImprovementNotes] = useState<string[]>([]);
  const [promptScore, setPromptScore] = useState<number | null>(null);
  const [isSaveModalOpen, setIsSaveModalOpen] = useState(false);

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

  const handleLoadSavedPrompt = (prompt: SavedPrompt) => {
    setOriginalPrompt(prompt.originalPrompt);
    setOptimizedPrompt(prompt.optimizedPrompt);
    setPromptScore(prompt.score || null);
    
    // If there's an optimized prompt, recreate the improvement notes
    if (prompt.optimizedPrompt) {
      const { improvements } = analyzePrompt(prompt.originalPrompt);
      setImprovementNotes(improvements);
    } else {
      setImprovementNotes([]);
    }
    
    toast.success(`Loaded prompt: ${prompt.name}`);
  };

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="h-full">
          <CardHeader>
            <CardTitle className="flex items-center">
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
            <div className="flex justify-between">
              <Button
                variant="outline"
                onClick={() => setIsSaveModalOpen(true)}
                disabled={!optimizedPrompt}
              >
                <Save className="mr-2 h-4 w-4" />
                Save Prompt
              </Button>
              <Button
                variant="outline"
                onClick={() => copyToClipboard(optimizedPrompt)}
                disabled={!optimizedPrompt}
              >
                <Copy className="mr-2 h-4 w-4" />
                Copy
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
      
      {promptScore !== null && (
        <Card className="mt-6">
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
                    <span className="bg-yellow-100 text-yellow-800 rounded-full w-6 h-6 flex items-center justify-center mr-2 mt-0.5">
                      <Info className="h-4 w-4" />
                    </span>
                    <span>{note}</span>
                  </li>
                ))}
              </ul>
            </div>
          </CardContent>
        </Card>
      )}

      <SavePromptModal
        isOpen={isSaveModalOpen}
        onClose={() => setIsSaveModalOpen(false)}
        originalPrompt={originalPrompt}
        optimizedPrompt={optimizedPrompt}
        score={promptScore}
        onSave={onSavePrompt}
      />
    </>
  );
};

export default PromptOptimizerContent;
