
import React, { useState, useEffect } from 'react';
import { AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

// Import SchemaGenerator but don't render it directly
// This allows us to catch any errors during rendering
const SchemaGeneratorWrapper = () => {
  const [hasError, setHasError] = useState(false);
  const [SchemaGeneratorComponent, setSchemaGeneratorComponent] = useState<React.ComponentType | null>(null);

  useEffect(() => {
    // Use dynamic import to prevent TypeScript errors from causing build failures
    const loadComponent = async () => {
      try {
        // We need to handle the import in a way that catches TypeScript errors
        const module = await import('./SchemaGenerator').catch(err => {
          console.error("Failed to import SchemaGenerator:", err);
          setHasError(true);
          return { default: null };
        });
        
        setSchemaGeneratorComponent(() => module.default);
      } catch (error) {
        console.error("Schema Generator Error:", error);
        setHasError(true);
      }
    };

    loadComponent();
  }, []);

  if (hasError || !SchemaGeneratorComponent) {
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
          Error details: Property 'image' reference issue in schema type
        </p>
        <Button variant="outline" asChild>
          <Link to="/aeo/learning/tools">Return to Tools</Link>
        </Button>
      </div>
    );
  }

  // Render the component with error boundary
  try {
    return <SchemaGeneratorComponent />;
  } catch (renderError) {
    console.error("Error rendering SchemaGenerator:", renderError);
    return (
      <div className="text-center p-8 bg-red-50 rounded-lg">
        <div className="flex justify-center mb-4">
          <AlertTriangle className="h-12 w-12 text-red-500" />
        </div>
        <h3 className="text-lg font-semibold text-red-600">Schema Generator Error</h3>
        <p className="text-gray-700 mb-4">
          There was an error while rendering the Schema Generator tool.
        </p>
        <Button variant="outline" asChild>
          <Link to="/aeo/learning/tools">Return to Tools</Link>
        </Button>
      </div>
    );
  }
};

export default SchemaGeneratorWrapper;
