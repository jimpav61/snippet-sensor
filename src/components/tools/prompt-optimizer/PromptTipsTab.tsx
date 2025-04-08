
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

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

const PromptTipsTab: React.FC = () => {
  return (
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
  );
};

export default PromptTipsTab;
