
import React from 'react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';

const RecommendationsCard: React.FC = () => {
  return (
    <div className="aeo-card p-6 md:p-8">
      <h3 className="text-xl font-semibold mb-4">Key Recommendations</h3>
      
      <ul className="space-y-4">
        <RecommendationItem 
          number={1}
          title="Improve snippet optimization"
          description="Include clear, concise answers to common questions related to your topic. Format key information in lists and use descriptive subheadings."
        />
        
        <RecommendationItem 
          number={2}
          title="Enhance structured data"
          description="Implement Schema.org markup to provide clear signals to AI systems about your content's purpose and structure."
        />
        
        <RecommendationItem 
          number={3}
          title="Expand topic coverage"
          description="Address related subtopics and questions to provide comprehensive coverage that AI systems prefer."
        />
      </ul>
      
      <Separator className="my-6" />
      
      <div className="text-center">
        <h3 className="text-lg font-medium mb-3">Want a detailed action plan?</h3>
        <p className="text-gray-600 mb-4">
          Schedule a consultation with our AEO experts to get personalized recommendations.
        </p>
        <Button className="bg-aeo hover:bg-aeo-600">
          Schedule a Consultation
        </Button>
      </div>
    </div>
  );
};

interface RecommendationItemProps {
  number: number;
  title: string;
  description: string;
}

const RecommendationItem: React.FC<RecommendationItemProps> = ({ number, title, description }) => (
  <li className="flex">
    <div className="flex-shrink-0 h-6 w-6 rounded-full bg-aeo-500 flex items-center justify-center text-white font-medium text-sm">
      {number}
    </div>
    <div className="ml-3">
      <p className="text-gray-800 font-medium">{title}</p>
      <p className="text-gray-600 mt-1">
        {description}
      </p>
    </div>
  </li>
);

export default RecommendationsCard;
