
import React from 'react';
import SimpleSchemaGenerator from './SimpleSchemaGenerator';

/**
 * This wrapper component provides the new schema generator that uses react-schemaorg
 * instead of the previous implementation that had compatibility issues.
 */
const CustomSchemaGeneratorWrapper = () => {
  return <SimpleSchemaGenerator />;
};

export default CustomSchemaGeneratorWrapper;
