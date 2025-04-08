
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import SavePromptModal from './SavePromptModal';
import { Wand2, Copy, Save } from 'lucide-react';
import { toast } from 'sonner';

interface PromptOptimizerContentProps {
  initialPrompt?: string;
  onSavePrompt?: () => void;
}

const PromptOptimizerContent: React.FC<PromptOptimizerContentProps> = ({ 
  initialPrompt = '',
  onSavePrompt 
}) => {
  const [originalPrompt, setOriginalPrompt] = useState(initialPrompt);
  const [optimizedPrompt, setOptimizedPrompt] = useState('');
  const [isOptimizing, setIsOptimizing] = useState(false);
  const [showSaveModal, setShowSaveModal] = useState(false);
  
  // Update original prompt when initialPrompt prop changes
  useEffect(() => {
    if (initialPrompt) {
      setOriginalPrompt(initialPrompt);
    }
  }, [initialPrompt]);

  const optimizePrompt = async () => {
    if (!originalPrompt.trim()) {
      toast.error('Please enter a prompt to optimize');
      return;
    }
    
    setIsOptimizing(true);
    
    try {
      // In a real implementation, this would call an API
      // For now, we'll simulate an API call with a timeout
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Simple optimization logic for demonstration
      let optimized = originalPrompt;
      
      // Add specific details request if not present
      if (!optimized.toLowerCase().includes('specific') && !optimized.toLowerCase().includes('detail')) {
        optimized += '\n\nPlease be specific and provide detailed information in your response.';
      }
      
      // Add examples request if not present
      if (!optimized.toLowerCase().includes('example')) {
        optimized += '\n\nInclude relevant examples to illustrate key points.';
      }
      
      // Add format request if not present
      if (!optimized.toLowerCase().includes('format')) {
        optimized += '\n\nPlease format your response with clear headings, bullet points, and numbered lists where appropriate for readability.';
      }
      
      setOptimizedPrompt(optimized);
      toast.success('Prompt optimized successfully');
    } catch (error) {
      console.error('Error optimizing prompt:', error);
      toast.error('Failed to optimize prompt');
    } finally {
      setIsOptimizing(false);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
      .then(() => {
        toast.success('Copied to clipboard');
      })
      .catch(() => {
        toast.error('Failed to copy to clipboard');
      });
  };

  const handleSavePrompt = () => {
    setShowSaveModal(true);
  };

  const handleSaveComplete = () => {
    setShowSaveModal(false);
    if (onSavePrompt) {
      onSavePrompt();
    }
    toast.success('Prompt saved successfully');
  };

  return (
    <>
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Enter Your Prompt</CardTitle>
          <CardDescription>
            Write your prompt here or select a template to get started
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Textarea
            placeholder="Write your prompt here..."
            className="min-h-[200px] mb-4"
            value={originalPrompt}
            onChange={(e) => setOriginalPrompt(e.target.value)}
          />
          <Button 
            onClick={optimizePrompt} 
            className="w-full"
            disabled={isOptimizing || !originalPrompt.trim()}
          >
            {isOptimizing ? (
              <span className="flex items-center">
                <span className="animate-spin mr-2">◌</span> Optimizing...
              </span>
            ) : (
              <span className="flex items-center">
                <Wand2 className="mr-2 h-4 w-4" /> Optimize Prompt
              </span>
            )}
          </Button>
        </CardContent>
      </Card>

      {optimizedPrompt && (
        <Card>
          <CardHeader>
            <CardTitle>Optimized Prompt</CardTitle>
            <CardDescription>
              Your optimized prompt is ready to use
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Textarea
              readOnly
              className="min-h-[200px] mb-4"
              value={optimizedPrompt}
            />
            <div className="flex gap-2">
              <Button 
                variant="outline" 
                onClick={() => copyToClipboard(optimizedPrompt)}
                className="flex-1"
              >
                <Copy className="mr-2 h-4 w-4" /> Copy
              </Button>
              <Button 
                onClick={handleSavePrompt}
                className="flex-1"
              >
                <Save className="mr-2 h-4 w-4" /> Save Prompt
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      <SavePromptModal
        isOpen={showSaveModal}
        onClose={() => setShowSaveModal(false)}
        onSave={handleSaveComplete}
        originalPrompt={originalPrompt}
        optimizedPrompt={optimizedPrompt}
      />
    </>
  );
};

export default PromptOptimizerContent;
