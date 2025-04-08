
import { Thing, WithContext, ImageObject, Article, Product } from 'schema-dts';

// Base schema with common properties
export interface BaseSchema extends Partial<Thing> {
  "@type": string;
  name: string;
  text: string;
  image?: string | ImageObject;
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
export function createSchemaWithContext<T extends BaseSchema>(schema: T): WithContext<T> {
  return {
    "@context": "https://schema.org",
    ...schema
  };
}
