
import React, { useEffect } from 'react';
import SchemaGenerator from './SchemaGenerator';
import { initializeSchemaAdapter } from './SchemaDataAdapter';
import { patchSchemaObjects } from './SchemaGeneratorTypeFix';

/**
 * This wrapper component ensures that SchemaGenerator receives data in the format it expects,
 * particularly ensuring all schema objects have the 'image' property before they reach SchemaGenerator.
 */
const CustomSchemaGeneratorWrapper = () => {
  useEffect(() => {
    // Initialize our adapter when the component mounts
    initializeSchemaAdapter();
    
    // Also run the type patch for extra coverage
    patchSchemaObjects();
    
    console.log('Schema adapter and type fixes initialized');
  }, []);

  return <SchemaGenerator />;
};

export default CustomSchemaGeneratorWrapper;
