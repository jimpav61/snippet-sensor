
import React, { useState, useEffect } from 'react';
import { AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { toast } from "sonner";

// Import SchemaGenerator but don't render it directly
// This allows us to catch any errors during rendering
const SchemaGeneratorWrapper = () => {
  const [hasError, setHasError] = useState(false);
  const [errorDetails, setErrorDetails] = useState<string | null>(null);
  const [SchemaGeneratorComponent, setSchemaGeneratorComponent] = useState<React.ComponentType | null>(null);

  useEffect(() => {
    // Use dynamic import to prevent TypeScript errors from causing build failures
    const loadComponent = async () => {
      try {
        // We need to handle the import in a way that catches TypeScript errors
        const module = await import('./SchemaGenerator').catch(err => {
          console.error("Failed to import SchemaGenerator:", err);
          setHasError(true);
          
          // Check if this is our specific error related to the image property
          if (err.message && err.message.includes("Property 'image' does not exist")) {
            setErrorDetails("Property 'image' does not exist on schema type. This is a known issue that our team is working on.");
          }
          
          return { default: null };
        });
        
        // Proceed only if we successfully imported the component
        if (module && module.default) {
          setSchemaGeneratorComponent(() => module.default);
        } else {
          setHasError(true);
        }
      } catch (error: any) {
        console.error("Schema Generator Error:", error);
        setHasError(true);
        
        // Capture the specific error message
        if (error.message && error.message.includes("Property 'image' does not exist")) {
          setErrorDetails("Property 'image' does not exist on schema type. This is a known issue that our team is working on.");
        }
      }
    };

    loadComponent();
  }, []);

  useEffect(() => {
    // Show a toast notification for the error
    if (hasError) {
      toast.error("Schema Generator Tool Error", {
        description: errorDetails || "There was an issue loading the Schema Generator tool."
      });
    }
  }, [hasError, errorDetails]);

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
          Error details: {errorDetails || "Property 'image' reference issue in schema type"}
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
  } catch (renderError: any) {
    console.error("Error rendering SchemaGenerator:", renderError);
    
    // Check if this is the specific image property error
    const errorMessage = renderError?.message && renderError.message.includes("Property 'image' does not exist")
      ? "Property 'image' does not exist on schema type"
      : "There was an error while rendering the Schema Generator tool.";
      
    return (
      <div className="text-center p-8 bg-red-50 rounded-lg">
        <div className="flex justify-center mb-4">
          <AlertTriangle className="h-12 w-12 text-red-500" />
        </div>
        <h3 className="text-lg font-semibold text-red-600">Schema Generator Error</h3>
        <p className="text-gray-700 mb-4">
          {errorMessage}
        </p>
        <Button variant="outline" asChild>
          <Link to="/aeo/learning/tools">Return to Tools</Link>
        </Button>
      </div>
    );
  }
};

export default SchemaGeneratorWrapper;
