
// This declaration file augments the types used in SchemaGenerator.tsx
// to ensure the TypeScript compiler doesn't throw errors for the 'image' property

interface SchemaBaseType {
  "@type": string;
  name: string;
  text: string;
  // Add the missing image property that's causing the error
  image?: string;
}

// No need to explicitly export anything as TypeScript .d.ts files are 
// automatically included in the global scope
