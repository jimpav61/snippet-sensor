
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import SavedPromptsList from './SavedPromptsList';
import { getSavedPrompts, deletePrompt, SavedPrompt } from '@/utils/promptStorage';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Download, Upload } from 'lucide-react';

interface SavedPromptsTabProps {
  onLoadPrompt: (prompt: SavedPrompt) => void;
}

const SavedPromptsTab: React.FC<SavedPromptsTabProps> = ({ onLoadPrompt }) => {
  const [savedPrompts, setSavedPrompts] = useState<SavedPrompt[]>([]);

  useEffect(() => {
    loadSavedPrompts();
  }, []);

  const loadSavedPrompts = () => {
    const prompts = getSavedPrompts();
    setSavedPrompts(prompts);
  };

  const handleDeletePrompt = (id: string) => {
    const success = deletePrompt(id);
    if (success) {
      setSavedPrompts(prevPrompts => prevPrompts.filter(prompt => prompt.id !== id));
      toast.success('Prompt deleted');
    } else {
      toast.error('Failed to delete prompt');
    }
  };

  const exportPrompts = () => {
    try {
      const dataStr = JSON.stringify(savedPrompts, null, 2);
      const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
      
      const exportFileDefaultName = `aeo-saved-prompts-${new Date().toISOString().slice(0,10)}.json`;
      
      const linkElement = document.createElement('a');
      linkElement.setAttribute('href', dataUri);
      linkElement.setAttribute('download', exportFileDefaultName);
      linkElement.click();
      
      toast.success('Prompts exported successfully');
    } catch (error) {
      console.error('Failed to export prompts:', error);
      toast.error('Failed to export prompts');
    }
  };

  const importPrompts = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json';
    
    input.onchange = (e: Event) => {
      const target = e.target as HTMLInputElement;
      const file = target.files?.[0];
      
      if (!file) return;
      
      const reader = new FileReader();
      reader.onload = (event) => {
        try {
          const content = event.target?.result as string;
          const importedPrompts = JSON.parse(content) as SavedPrompt[];
          
          // Validate the imported data structure
          if (!Array.isArray(importedPrompts) || 
              !importedPrompts.every(p => p.id && p.name && p.originalPrompt && p.optimizedPrompt && p.createdAt)) {
            throw new Error('Invalid prompt data format');
          }
          
          // Store the imported prompts
          localStorage.setItem('saved_prompts', content);
          loadSavedPrompts();
          toast.success(`Imported ${importedPrompts.length} prompts`);
        } catch (error) {
          console.error('Failed to import prompts:', error);
          toast.error('Failed to import prompts: Invalid file format');
        }
      };
      
      reader.readAsText(file);
    };
    
    input.click();
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <div>
            <CardTitle>Saved Prompts</CardTitle>
            <CardDescription>
              Your locally saved prompts ({savedPrompts.length})
            </CardDescription>
          </div>
          <div className="flex gap-2">
            <Button 
              variant="outline" 
              size="sm" 
              onClick={importPrompts}
              title="Import prompts from a file"
            >
              <Upload className="h-4 w-4 mr-2" />
              Import
            </Button>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={exportPrompts}
              disabled={savedPrompts.length === 0}
              title="Export prompts to a file"
            >
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <SavedPromptsList
          prompts={savedPrompts}
          onLoad={onLoadPrompt}
          onDelete={handleDeletePrompt}
        />
      </CardContent>
    </Card>
  );
};

export default SavedPromptsTab;
