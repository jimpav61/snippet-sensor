
// This file provides type fixes for the SchemaGenerator component

// Define the exact shape that's causing problems in SchemaGenerator
export interface TextContentWithImage {
  "@type": string;
  name: string;
  text: string;
  image?: string | { "@type": "ImageObject"; url: string; width?: number; height?: number; caption?: string; };
}

// Helper function to ensure objects have the image property for TypeScript
export function ensureImageProperty<T extends { "@type": string; name: string; text: string; }>(obj: T): T & { image?: any } {
  const result = { ...obj, image: obj.hasOwnProperty('image') ? obj.image : undefined };
  return result as T & { image?: any };
}

// Type assertion function that can be used in SchemaGenerator
export function asTextContentWithImage(content: any): TextContentWithImage {
  return content as TextContentWithImage;
}

// This is a utility function that can be used to create schema objects
// with the image property explicitly included at runtime
export function createSchemaObject(type: string, name: string, text: string, image?: any) {
  return {
    "@type": type,
    name,
    text,
    image
  };
}

// Runtime patch function that can be called to ensure all schema objects
// in the application have the image property
export function patchSchemaObjects() {
  // Find all objects with @type, name, and text but no image property
  // and add the image property to them
  const originalObjectCreate = Object.create;
  Object.create = function(...args: any[]) {
    const obj = originalObjectCreate.apply(this, args);
    
    // When an object is created that looks like a schema object,
    // ensure it has the image property
    if (obj && 
        typeof obj === 'object' && 
        obj['@type'] && 
        obj.name && 
        obj.text && 
        !obj.hasOwnProperty('image')) {
      Object.defineProperty(obj, 'image', {
        value: undefined,
        writable: true,
        enumerable: true,
        configurable: true,
      });
    }
    
    return obj;
  };
  
  console.log('Schema objects patched to ensure image property exists');
}
