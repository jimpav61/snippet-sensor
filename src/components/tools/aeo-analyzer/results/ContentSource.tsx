
import React from 'react';

interface ContentSourceProps {
  analysisSource: string;
}

const ContentSource: React.FC<ContentSourceProps> = ({ analysisSource }) => {
  return (
    <div className="bg-gray-50 p-4 rounded-lg text-sm text-gray-600">
      <p><strong>Analyzed Content:</strong> {analysisSource}</p>
    </div>
  );
};

export default ContentSource;
