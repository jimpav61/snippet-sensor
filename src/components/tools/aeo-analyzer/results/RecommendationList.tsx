
import React from 'react';

interface RecommendationListProps {
  recommendations: string[];
}

const RecommendationList: React.FC<RecommendationListProps> = ({ recommendations }) => {
  return (
    <div>
      <h3 className="text-lg font-semibold mb-3">Key Recommendations</h3>
      <ul className="space-y-3">
        {recommendations.map((recommendation, index) => {
          // Parse recommendation string
          const parts = recommendation.includes(':') 
            ? recommendation.split(':') 
            : [recommendation, ''];
          
          return (
            <li key={index} className="flex">
              <div className="flex-shrink-0 h-6 w-6 rounded-full bg-aeo-500 flex items-center justify-center text-white font-medium text-sm">
                {index + 1}
              </div>
              <div className="ml-3">
                <p className="text-gray-800 font-medium">{parts[0].trim()}</p>
                {parts[1] && <p className="text-gray-600 text-sm">{parts[1].trim()}</p>}
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default RecommendationList;
