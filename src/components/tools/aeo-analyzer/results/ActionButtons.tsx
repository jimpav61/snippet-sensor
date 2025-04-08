
import React from 'react';
import { Button } from '@/components/ui/button';

interface ActionButtonsProps {
  resetAnalysis: () => void;
  handleFullAnalysis: () => void;
  detailedView: boolean;
}

const ActionButtons: React.FC<ActionButtonsProps> = ({ 
  resetAnalysis, 
  handleFullAnalysis, 
  detailedView 
}) => {
  return (
    <div className="flex flex-col sm:flex-row gap-3 pt-4">
      <Button 
        onClick={resetAnalysis}
        variant="outline"
        className="sm:flex-1"
      >
        Analyze Another Content
      </Button>
      <Button 
        onClick={handleFullAnalysis}
        className="bg-aeo hover:bg-aeo-600 sm:flex-1"
      >
        {detailedView ? "Hide Detailed Analysis" : "Get Detailed Analysis"}
      </Button>
    </div>
  );
};

export default ActionButtons;
