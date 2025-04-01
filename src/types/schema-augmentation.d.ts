
// This declaration file augments the types used in SchemaGenerator.tsx
// to ensure the TypeScript compiler doesn't throw errors for the 'image' property

interface SchemaBaseType {
  "@type": string;
  name: string;
  text: string;
  // Add the missing image property that's causing the error
  image?: string;
}

// Ensure this gets applied globally
declare global {
  // This is intentionally left mostly empty as it's meant to patch existing types
  // rather than define comprehensive schema types
}

export {};
