
import React from 'react';
import { getDetailedExplanation, getActionItems } from '@/utils/aeo-report/explanationUtils';

interface DetailedExplanationProps {
  type: string;
  score: number;
  contentType?: string;
}

const DetailedExplanation: React.FC<DetailedExplanationProps> = ({ 
  type, 
  score,
  contentType = 'content'
}) => {
  const explanation = getDetailedExplanation(type);
  const actionItems = getActionItems(type, score, contentType);

  return (
    <div className="pl-4 border-l-2 border-gray-200 ml-2 text-sm">
      <p className="text-gray-600 mb-2">{explanation}</p>
      <h4 className="font-medium text-gray-800 mt-3 mb-1">Action Items:</h4>
      <ul className="list-disc pl-5 space-y-1 text-gray-600">
        {actionItems.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    </div>
  );
};

export default DetailedExplanation;
