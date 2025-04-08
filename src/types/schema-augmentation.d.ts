
// Global type augmentation for Schema.org types to ensure 'image' property existence

// Make sure all objects with these properties include the image property
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

export {};
