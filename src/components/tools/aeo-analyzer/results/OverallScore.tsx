
import React from 'react';
import ScoreCircle from './ScoreCircle';

interface OverallScoreProps {
  score: number;
}

const OverallScore: React.FC<OverallScoreProps> = ({ score }) => {
  return (
    <div className="p-6 bg-gray-50 rounded-lg border border-gray-100 mb-6">
      <div className="flex flex-col items-center">
        <ScoreCircle score={score} />
        <h3 className="text-xl font-semibold">Overall AEO Score</h3>
        <p className="text-gray-600 mt-1">
          {score >= 80 
            ? "Your content is well-optimized for AI engines."
            : score >= 60
              ? "Your content is performing moderately well for AI engines."
              : "Your content needs significant improvement for AI engines."}
        </p>
      </div>
    </div>
  );
};

export default OverallScore;
