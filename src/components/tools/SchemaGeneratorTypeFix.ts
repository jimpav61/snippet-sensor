
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
  return obj as T & { image?: any };
}

// Type assertion function that can be used in SchemaGenerator
export function asTextContentWithImage(content: any): TextContentWithImage {
  return content as TextContentWithImage;
}
