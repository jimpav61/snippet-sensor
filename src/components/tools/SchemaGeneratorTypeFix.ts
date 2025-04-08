
// This file is kept as a placeholder but no longer used in the application.
// The functionality has been replaced with react-schemaorg, which handles types properly.

// Empty placeholder for backward compatibility
export interface TextContentWithImage {
  "@type": string;
  name: string;
  text: string;
  image: any;
}

export function ensureImageProperty<T extends Record<string, any>>(obj: T): T {
  return obj;
}

export function asTextContentWithImage(content: any): any {
  return content;
}

export function createSchemaObject(type: string, name: string, text: string, image: any = null): any {
  return { "@type": type, name, text, image };
}

export function patchSchemaObjects() {
  console.log('Schema objects patching no longer required - using react-schemaorg instead');
}
