
// This declaration file augments types used in SchemaGenerator.tsx
// to ensure the TypeScript compiler doesn't throw errors for the 'image' property

// Instead of just declaring an interface, we'll use a module declaration
// to directly patch the existing types in the application
declare namespace Schema {
  interface BaseType {
    "@type": string;
    name: string;
    text: string;
    image?: string;
  }
}

// Since SchemaGenerator.tsx is a read-only file, we're adding these global 
// type declarations to augment its types without modifying the file directly
declare global {
  interface SchemaBaseType {
    "@type": string;
    name: string;
    text: string;
    image?: string;
  }
  
  // Add any other schema related types that might need the image property
  interface SchemaObject {
    "@type": string;
    name: string;
    text: string;
    image?: string;
    [key: string]: any;
  }
}

// This export statement ensures TypeScript treats this as a module
export {};
