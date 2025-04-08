
// Global type augmentation for Schema.org types to ensure 'image' property existence

// Base interface for schema objects with the required image property
interface SchemaTextContent {
  "@type": string;
  name: string;
  text: string;
  image: string | { "@type": "ImageObject"; url: string; width?: number; height?: number; caption?: string; } | null;
}

// Apply augmentation globally
declare global {
  namespace SchemaOrg {
    interface Thing {
      "@type": string;
      name?: string;
      text?: string;
      image?: string | { "@type": "ImageObject"; url: string; width?: number; height?: number; caption?: string; } | null;
    }
  }
}

// Add global type augmentation for any object with @type, name, and text
declare global {
  interface Object {
    image?: string | { "@type": "ImageObject"; url: string; width?: number; height?: number; caption?: string; } | null;
  }
}

export {};
