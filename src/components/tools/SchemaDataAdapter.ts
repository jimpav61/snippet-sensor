
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
  if (!('image' in adaptedData)) {
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
  if (result['@type'] && result.name && result.text && !('image' in result)) {
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
  
  // Use window instead of global in browser environment
  if (typeof window !== 'undefined') {
    // IMPORTANT: Don't override JSON methods completely as it breaks routing
    // Instead, create a custom method that can be called explicitly
    window.adaptSchemaJSON = {
      stringify: function(value: any, ...args: any[]) {
        return originalJSONStringify(deepAdaptSchema(value), ...args);
      }
    };
  }
  
  console.log('Schema Data Adapter initialized');
}

// Type declaration for our custom JSON adapter
declare global {
  interface Window {
    adaptSchemaJSON?: {
      stringify: typeof JSON.stringify;
    };
  }
}
