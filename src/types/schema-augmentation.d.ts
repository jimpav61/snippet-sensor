
// This file provides global augmentation for Schema.org types to ensure
// TypeScript recognizes all properties used in SchemaGenerator.tsx

// Define a base interface that includes all common properties
interface SchemaBaseType {
  "@type": string;
  name?: string;
  text?: string;
  image?: string | { "@type": "ImageObject"; url: string; width?: number; height?: number; caption?: string; };
  [key: string]: any; // Allow any additional properties
}

// Apply these interfaces globally
declare global {
  // Force TypeScript to accept 'image' on any schema object
  interface Record<K extends string | number | symbol, T> {
    image?: string | { "@type": "ImageObject"; url: string; width?: number; height?: number; caption?: string; };
  }
  
  // Add a specific interface for the exact shape causing the error
  interface SchemaTextType {
    "@type": string;
    name: string;
    text: string;
    image?: string | { "@type": "ImageObject"; url: string; width?: number; height?: number; caption?: string; };
  }
  
  // Make sure all objects with these properties will include the image property
  interface TextContent {
    "@type": string;
    name: string;
    text: string;
    image?: string | { "@type": "ImageObject"; url: string; width?: number; height?: number; caption?: string; };
  }
}

// Export an empty object to make this a module
export {};
