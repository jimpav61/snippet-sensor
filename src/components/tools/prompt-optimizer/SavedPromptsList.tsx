
import React from 'react';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import { Edit, Trash2, Star, Clock, FileText } from 'lucide-react';
import { toast } from 'sonner';
import { deletePrompt, SavedPrompt } from '@/utils/promptStorage';

interface SavedPromptsListProps {
  prompts: SavedPrompt[];
  onLoad: (prompt: SavedPrompt) => void;
  onDelete: (id: string) => void;
  className?: string;
}

const SavedPromptsList: React.FC<SavedPromptsListProps> = ({ 
  prompts, 
  onLoad, 
  onDelete,
  className
}) => {
  if (prompts.length === 0) {
    return (
      <Card className={className}>
        <CardContent className="pt-6 text-center">
          <FileText className="h-12 w-12 text-gray-300 mx-auto mb-3" />
          <p className="text-gray-500">No saved prompts yet.</p>
          <p className="text-sm text-gray-400 mt-2">
            Optimize a prompt and save it to see it here.
          </p>
        </CardContent>
      </Card>
    );
  }

  const handleDelete = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    onDelete(id);
  };

  const formatDate = (timestamp: number) => {
    return new Date(timestamp).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const getScoreColor = (score: number | null | undefined) => {
    if (score === null || score === undefined) return 'bg-gray-200';
    if (score >= 80) return 'bg-green-500';
    if (score >= 50) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  return (
    <ScrollArea className={`h-[400px] ${className}`}>
      <div className="space-y-4 pr-4">
        {prompts.sort((a, b) => b.createdAt - a.createdAt).map((prompt) => (
          <Card 
            key={prompt.id} 
            className="cursor-pointer hover:shadow-md transition-shadow"
            onClick={() => onLoad(prompt)}
          >
            <CardHeader className="pb-2">
              <div className="flex justify-between items-start">
                <CardTitle className="text-base">{prompt.name}</CardTitle>
                {prompt.score !== null && prompt.score !== undefined && (
                  <Badge className={`${getScoreColor(prompt.score)} text-white`}>
                    {prompt.score}/100
                  </Badge>
                )}
              </div>
              <CardDescription className="flex items-center text-xs">
                <Clock className="h-3 w-3 mr-1" />
                {formatDate(prompt.createdAt)}
              </CardDescription>
            </CardHeader>
            <CardContent className="pb-4">
              <p className="text-sm text-gray-700 truncate">
                {prompt.originalPrompt.slice(0, 100)}
                {prompt.originalPrompt.length > 100 ? '...' : ''}
              </p>
            </CardContent>
            <CardFooter className="pt-0 flex justify-end space-x-2">
              <Button 
                variant="destructive" 
                size="sm"
                onClick={(e) => handleDelete(prompt.id, e)}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
              <Button 
                variant="outline" 
                size="sm"
                onClick={(e) => {
                  e.stopPropagation();
                  onLoad(prompt);
                }}
              >
                Load
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </ScrollArea>
  );
};

export default SavedPromptsList;
