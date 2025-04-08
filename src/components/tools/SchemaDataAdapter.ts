
import { BaseSchema } from '@/types/schema';

/**
 * This adapter serves as a bridge between our schema data and the SchemaGenerator component.
 * It ensures all schema objects have the required properties before being passed to SchemaGenerator.
 */

// Transform any schema object to ensure it has an image property
export function adaptSchemaData<T extends Record<string, any>>(data: T): T & { image: any } {
  // Create a new object to avoid mutating the original
  const adaptedData = { ...data };
  
  // Ensure image property exists
  if (!adaptedData.hasOwnProperty('image')) {
    adaptedData.image = null;
  }
  
  return adaptedData as T & { image: any };
}

// Transform an array of schema objects
export function adaptSchemaArray<T extends Record<string, any>>(dataArray: T[]): (T & { image: any })[] {
  return dataArray.map(item => adaptSchemaData(item));
}

// Recursively process an object and all its nested objects to ensure image property
export function deepAdaptSchema(obj: any): any {
  if (!obj || typeof obj !== 'object') {
    return obj;
  }
  
  // Handle arrays
  if (Array.isArray(obj)) {
    return obj.map(item => deepAdaptSchema(item));
  }
  
  // Process object
  const result = { ...obj };
  
  // Add image property if this looks like a schema object (has @type, name, text)
  if (result['@type'] && result.name && result.text && !result.hasOwnProperty('image')) {
    result.image = null;
  }
  
  // Process all properties recursively
  for (const key in result) {
    if (typeof result[key] === 'object' && result[key] !== null) {
      result[key] = deepAdaptSchema(result[key]);
    }
  }
  
  return result;
}

// Patching function to ensure all schema-like objects have image property
export function initializeSchemaAdapter() {
  console.log('Initializing Schema Data Adapter');
  
  // Store the original methods we need to patch
  const originalJSONStringify = JSON.stringify;
  
  // Override JSON.stringify to ensure all schema objects have image property
  // This targets the specific points where SchemaGenerator might be using JSON
  (global as any).JSON = {
    ...JSON,
    stringify: function(value: any, ...args: any[]) {
      return originalJSONStringify(deepAdaptSchema(value), ...args);
    }
  };
  
  console.log('Schema Data Adapter initialized');
}
