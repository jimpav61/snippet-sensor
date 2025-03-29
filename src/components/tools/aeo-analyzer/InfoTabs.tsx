
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Info, Lightbulb } from 'lucide-react';
import { Link } from 'react-router-dom';

const InfoTabs: React.FC = () => {
  return (
    <Tabs defaultValue="about" className="w-full">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="about">
          <Info className="mr-2 h-4 w-4" /> About This Tool
        </TabsTrigger>
        <TabsTrigger value="tips">
          <Lightbulb className="mr-2 h-4 w-4" /> AEO Tips
        </TabsTrigger>
      </TabsList>
      
      <TabsContent value="about" className="mt-4 space-y-4">
        <p>
          The AEO Analyzer evaluates how well your content is optimized for AI systems like ChatGPT and Google's Bard. 
          It checks factors like:
        </p>
        <ul className="list-disc pl-5 space-y-1">
          <li>Keyword relevance and topic coverage</li>
          <li>Content readability and structure</li>
          <li>Snippet optimization potential</li>
          <li>Structured data implementation</li>
        </ul>
        <p>
          For a more comprehensive analysis with detailed recommendations, use our 
          <Link to="/aeo/analyze" className="text-aeo-600 hover:underline ml-1">full analysis tool</Link>.
        </p>
      </TabsContent>
      
      <TabsContent value="tips" className="mt-4 space-y-4">
        <p className="font-medium">Quick tips to improve your AEO score:</p>
        <ul className="list-disc pl-5 space-y-2">
          <li>
            <span className="font-medium">Enhance readability:</span> Use clear headings, short paragraphs, and simple language.
          </li>
          <li>
            <span className="font-medium">Include structured data:</span> Implement Schema.org markup to help AI systems understand your content.
          </li>
          <li>
            <span className="font-medium">Answer questions directly:</span> Provide clear, concise answers to common questions related to your topic.
          </li>
          <li>
            <span className="font-medium">Cover related topics:</span> Address subtopics and questions that users might have about your main topic.
          </li>
        </ul>
      </TabsContent>
    </Tabs>
  );
};

export default InfoTabs;
