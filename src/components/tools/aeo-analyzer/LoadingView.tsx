
import React from 'react';
import { Skeleton } from '@/components/ui/skeleton';

const LoadingView: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center space-y-4 py-10">
      <div className="relative h-20 w-20">
        <div className="absolute inset-0 rounded-full border-4 border-gray-200"></div>
        <div className="absolute inset-0 rounded-full border-4 border-aeo-500 border-t-transparent animate-spin"></div>
      </div>
      <p className="text-lg font-medium">Analyzing your content...</p>
      <p className="text-gray-500">This typically takes 10-15 seconds</p>
      <div className="w-full max-w-md space-y-3 mt-6">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-11/12" />
        <Skeleton className="h-4 w-10/12" />
      </div>
    </div>
  );
};

export default LoadingView;
