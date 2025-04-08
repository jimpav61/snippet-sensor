
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import PromptOptimizerContent from './prompt-optimizer/PromptOptimizerContent';
import SavedPromptsTab from './prompt-optimizer/SavedPromptsTab';
import PromptTemplatesTab from './prompt-optimizer/PromptTemplatesTab';
import PromptTipsTab from './prompt-optimizer/PromptTipsTab';
import PromptExamplesTab from './prompt-optimizer/PromptExamplesTab';
import { SavedPrompt } from '@/utils/promptStorage';

const PromptOptimizer = () => {
  const [activeTab, setActiveTab] = useState('write');
  const [originalPrompt, setOriginalPrompt] = useState('');
  
  const handleTabChange = (value: string) => {
    setActiveTab(value);
  };
  
  const handleSavedPromptLoad = (prompt: SavedPrompt) => {
    // When a saved prompt is loaded, switch to the write tab
    setActiveTab('write');
  };

  const handlePromptSaved = () => {
    // If we want to immediately switch to saved prompts tab after saving
    // setActiveTab('saved');
  };

  const handleSelectTemplate = (template: string) => {
    setOriginalPrompt(template);
    setActiveTab('write');
  };

  return (
    <div className="w-full max-w-5xl mx-auto">
      <Tabs defaultValue="write" value={activeTab} onValueChange={handleTabChange}>
        <TabsList className="w-full mb-6">
          <TabsTrigger value="write" className="flex-1">Write & Optimize</TabsTrigger>
          <TabsTrigger value="saved" className="flex-1">Saved Prompts</TabsTrigger>
          <TabsTrigger value="templates" className="flex-1">Prompt Templates</TabsTrigger>
          <TabsTrigger value="tips" className="flex-1">Prompt Writing Tips</TabsTrigger>
          <TabsTrigger value="examples" className="flex-1">Example Prompts</TabsTrigger>
        </TabsList>
        
        <TabsContent value="write" className="space-y-6">
          <PromptOptimizerContent onSavePrompt={handlePromptSaved} />
        </TabsContent>

        <TabsContent value="saved">
          <SavedPromptsTab onLoadPrompt={handleSavedPromptLoad} />
        </TabsContent>
        
        <TabsContent value="templates">
          <PromptTemplatesTab onSelectTemplate={handleSelectTemplate} />
        </TabsContent>
        
        <TabsContent value="tips">
          <PromptTipsTab />
        </TabsContent>
        
        <TabsContent value="examples">
          <PromptExamplesTab />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default PromptOptimizer;
