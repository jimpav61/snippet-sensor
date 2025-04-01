import React, { useState, useEffect, lazy, Suspense } from 'react';
import { AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { toast } from "sonner";

// Use lazy loading for the SchemaGenerator component
const LazySchemaGenerator = lazy(() => import('./SchemaGenerator')
  .catch(err => {
    console.error("Failed to load SchemaGenerator:", err);
    // Return a placeholder module with a default export component
    return {
      default: () => (
        <div className="text-center p-8 bg-red-50 rounded-lg">
          <div className="flex justify-center mb-4">
            <AlertTriangle className="h-12 w-12 text-red-500" />
          </div>
          <h3 className="text-lg font-semibold text-red-600">Schema Generator Error</h3>
          <p className="text-gray-700 mb-4">
            Failed to load the Schema Generator component.
          </p>
          <p className="text-sm text-gray-600 mb-6">
            Error details: {err.message || "Unknown error during component loading"}
          </p>
          <Button variant="outline" asChild>
            <Link to="/aeo/learning/tools">Return to Tools</Link>
          </Button>
        </div>
      ),
    };
  })
);

const SchemaGeneratorWrapper = () => {
  const [hasError, setHasError] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Show error toast if we encounter an error
  useEffect(() => {
    if (hasError && errorMessage) {
      toast.error("Schema Generator Tool Error", {
        description: errorMessage
      });
    }
  }, [hasError, errorMessage]);

  // Custom error handler for React errors
  const handleError = (error: Error) => {
    console.error("Schema Generator Runtime Error:", error);
    setHasError(true);
    
    // Set appropriate error message based on the error
    if (error.message && error.message.includes("Property 'image' does not exist")) {
      setErrorMessage("Schema type issue with 'image' property. Our team is working on a fix.");
    } else {
      setErrorMessage(error.message || "An unexpected error occurred");
    }
    
    // Prevent the error from bubbling up and crashing the app
    return true;
  };

  // If there's already a detected error, show error UI
  if (hasError) {
    return (
      <div className="text-center p-8 bg-red-50 rounded-lg">
        <div className="flex justify-center mb-4">
          <AlertTriangle className="h-12 w-12 text-red-500" />
        </div>
        <h3 className="text-lg font-semibold text-red-600">Schema Generator Error</h3>
        <p className="text-gray-700 mb-4">
          We encountered an issue with the Schema Generator tool. Our team has been notified.
        </p>
        <p className="text-sm text-gray-600 mb-6">
          Error details: {errorMessage || "Unknown error"}
        </p>
        <Button variant="outline" asChild>
          <Link to="/aeo/learning/tools">Return to Tools</Link>
        </Button>
      </div>
    );
  }

  // Create a custom error boundary with a fallback component
  return (
    <ErrorBoundary onError={handleError}>
      <Suspense fallback={<LoadingFallback />}>
        <LazySchemaGenerator />
      </Suspense>
    </ErrorBoundary>
  );
};

// Simple loading state component
const LoadingFallback = () => (
  <div className="text-center p-8">
    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-aeo-600 mx-auto mb-4"></div>
    <p className="text-gray-600">Loading Schema Generator...</p>
  </div>
);

// Basic error boundary component
class ErrorBoundary extends React.Component<{
  children: React.ReactNode;
  onError: (error: Error) => boolean;
}> {
  state = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: Error) {
    this.props.onError(error);
  }

  render() {
    if (this.state.hasError) {
      return null; // The parent component will handle showing the error UI
    }
    return this.props.children;
  }
}

export default SchemaGeneratorWrapper;
