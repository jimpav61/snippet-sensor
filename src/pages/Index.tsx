
import React from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const Index = () => {
  // Redirect to AEO Service page
  React.useEffect(() => {
    window.location.href = '/aeo';
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">AI Engine Optimization</h1>
        <p className="text-xl text-gray-600 mb-8">Optimizing your content for AI-driven discovery.</p>
        <Button asChild>
          <Link to="/aeo">Go to AEO Service</Link>
        </Button>
      </div>
    </div>
  );
};

export default Index;
