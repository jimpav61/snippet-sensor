
import React, { useEffect } from 'react';
import SchemaGenerator from './SchemaGenerator';
import { initializeSchemaAdapter } from './SchemaDataAdapter';

/**
 * This wrapper component ensures that SchemaGenerator receives data in the format it expects,
 * particularly ensuring all schema objects have the 'image' property before they reach SchemaGenerator.
 */
const CustomSchemaGeneratorWrapper = () => {
  useEffect(() => {
    // Initialize our adapter when the component mounts
    initializeSchemaAdapter();
  }, []);

  return <SchemaGenerator />;
};

export default CustomSchemaGeneratorWrapper;
