
import React from 'react';

interface ScoreItemProps {
  label: string;
  score: number;
  description: string;
}

const ScoreItem: React.FC<ScoreItemProps> = ({ label, score, description }) => (
  <div>
    <div className="flex justify-between items-center mb-1">
      <span className="font-medium">{label}</span>
      <span className="text-gray-700">{score}/100</span>
    </div>
    <div className="w-full bg-gray-100 rounded-full h-2.5">
      <div 
        className="bg-aeo-500 h-2.5 rounded-full" 
        style={{ width: `${score}%` }}
      ></div>
    </div>
    <p className="text-sm text-gray-500 mt-1">
      {description}
    </p>
  </div>
);

export default ScoreItem;
