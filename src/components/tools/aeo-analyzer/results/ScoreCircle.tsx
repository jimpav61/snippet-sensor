
import React from 'react';

interface ScoreCircleProps {
  score: number;
}

const ScoreCircle: React.FC<ScoreCircleProps> = ({ score }) => {
  return (
    <div 
      className="relative h-32 w-32 flex items-center justify-center mb-4 rounded-full"
      style={{
        background: `conic-gradient(#F65228 ${score}%, #E5E7EB ${score}% 100%)`
      }}
    >
      <div className="absolute inset-3 bg-white rounded-full flex items-center justify-center">
        <div className="text-center">
          <span className="text-3xl font-bold text-gray-900">{score}</span>
          <span className="text-lg text-gray-500">/100</span>
        </div>
      </div>
    </div>
  );
};

export default ScoreCircle;
