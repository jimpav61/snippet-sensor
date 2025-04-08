
import React, { useState } from 'react';
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { savePrompt } from '@/utils/promptStorage';
import { toast } from 'sonner';

interface SavePromptModalProps {
  isOpen: boolean;
  onClose: () => void;
  originalPrompt: string;
  optimizedPrompt: string;
  score?: number | null;
  onSave: () => void;
}

const SavePromptModal: React.FC<SavePromptModalProps> = ({
  isOpen,
  onClose,
  originalPrompt,
  optimizedPrompt,
  score,
  onSave
}) => {
  const [promptName, setPromptName] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = () => {
    if (!promptName.trim()) {
      toast.error('Please enter a name for your prompt');
      return;
    }

    setIsSaving(true);
    try {
      savePrompt({
        name: promptName.trim(),
        originalPrompt,
        optimizedPrompt,
        score
      });
      
      toast.success('Prompt saved successfully');
      setPromptName('');
      onSave();
      onClose();
    } catch (error) {
      toast.error('Failed to save prompt');
      console.error('Error saving prompt:', error);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Save Prompt</DialogTitle>
          <DialogDescription>
            Give your prompt a name to save it for future use
          </DialogDescription>
        </DialogHeader>
        
        <div className="grid gap-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="prompt-name">Prompt Name</Label>
            <Input
              id="prompt-name"
              placeholder="Enter a descriptive name for your prompt"
              value={promptName}
              onChange={(e) => setPromptName(e.target.value)}
            />
          </div>
        </div>
        
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button 
            onClick={handleSave}
            disabled={isSaving || !promptName.trim()}
          >
            {isSaving ? 'Saving...' : 'Save Prompt'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default SavePromptModal;
