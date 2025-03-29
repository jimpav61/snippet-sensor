
import React from 'react';
import { AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

// Import SchemaGenerator but don't render it directly
// This allows us to catch any errors during rendering
const SchemaGeneratorWrapper = () => {
  try {
    // Dynamically import the component to prevent TypeScript errors at build time
    const SchemaGenerator = require('./SchemaGenerator').default;
    return <SchemaGenerator />;
  } catch (error) {
    console.error("Schema Generator Error:", error);
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
};

export default SchemaGeneratorWrapper;
