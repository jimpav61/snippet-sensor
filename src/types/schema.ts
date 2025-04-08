
import { WithContext } from 'schema-dts';

// Define our own base schema interface with required image property
export interface BaseSchema {
  "@type": string;
  name: string;
  text: string;
  image: string | { "@type": "ImageObject"; url: string; width?: number; height?: number; caption?: string; } | null;
}

// Ensure TypeScript knows that objects with @type, name, text should have image
declare global {
  interface ObjectConstructor {
    __hasSchemaImage?: boolean;
  }
}

export interface BlogPostingSchema extends BaseSchema {
  "@type": "BlogPosting";
  headline: string;
  description: string;
  author: {
    "@type": "Person";
    name: string;
  };
  datePublished: string;
  dateModified: string;
}

export interface ProductSchema extends BaseSchema {
  "@type": "Product";
  description: string;
  brand: string;
  sku: string;
  offers: {
    "@type": "Offer";
    priceCurrency: string;
    price: number;
    availability: string;
  };
}

export interface ArticleSchema extends BaseSchema {
  "@type": "Article";
  headline: string;
  description: string;
  author: {
    "@type": "Person";
    name: string;
  };
  datePublished: string;
  dateModified: string;
}

export type SchemaType = BlogPostingSchema | ProductSchema | ArticleSchema;

// Helper function to create a schema with proper context
export function createSchemaWithContext<T extends BaseSchema>(schema: T): WithContext<any> {
  return {
    "@context": "https://schema.org",
    ...schema
  };
}
