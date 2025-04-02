
// This declaration file augments the types used in SchemaGenerator.tsx
// to ensure the TypeScript compiler doesn't throw errors for the 'image' property

interface SchemaBaseType {
  "@type": string;
  name: string;
  text: string;
  // Add the image property that's causing the error
  image?: string | { "@type": "ImageObject"; url: string; width?: number; height?: number; caption?: string; };
}

// Ensure this gets applied globally
declare global {
  interface SchemaBaseType {
    "@type": string;
    name: string;
    text: string;
    image?: string | { "@type": "ImageObject"; url: string; width?: number; height?: number; caption?: string; };
  }
}

export {};
