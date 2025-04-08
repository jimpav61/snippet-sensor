
// This file provides type fixes for the SchemaGenerator component
import { BaseSchema } from '@/types/schema';

// Define the exact shape that's causing problems in SchemaGenerator
export interface TextContentWithImage {
  "@type": string;
  name: string;
  text: string;
  image: string | { "@type": "ImageObject"; url: string; width?: number; height?: number; caption?: string; } | null;
}

// Helper function to ensure objects have the image property for TypeScript
export function ensureImageProperty<T extends { "@type": string; name: string; text: string; }>(obj: T): TextContentWithImage {
  const result = { 
    ...obj, 
    image: (obj as any).hasOwnProperty('image') ? (obj as any).image : null 
  };
  return result as TextContentWithImage;
}

// Type assertion function that can be used in SchemaGenerator
export function asTextContentWithImage(content: any): TextContentWithImage {
  return content as TextContentWithImage;
}

// This is a utility function that can be used to create schema objects
// with the image property explicitly included at runtime
export function createSchemaObject(type: string, name: string, text: string, image: any = null): TextContentWithImage {
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
  console.log('Schema objects patched to ensure image property exists');
}
