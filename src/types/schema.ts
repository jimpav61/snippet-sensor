
import { WithContext } from 'schema-dts';
import { createSchemaObject } from '../components/tools/SchemaGeneratorTypeFix';

// Define our own base schema interface without extending schema-dts types
export interface BaseSchema {
  "@type": string;
  name: string;
  text: string;
  image?: string | { "@type": "ImageObject"; url: string; width?: number; height?: number; caption?: string; };
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
// Using 'any' type to bypass schema-dts strict type checking
export function createSchemaWithContext<T extends BaseSchema>(schema: T): WithContext<any> {
  // Ensure all schema objects have the image property
  const schemaWithImage = { ...schema, image: schema.image };
  
  return {
    "@context": "https://schema.org",
    ...schemaWithImage
  };
}

// Helper function to create a schema object with required properties
export function createBaseSchema(type: string, name: string, text: string, image?: any): BaseSchema {
  return createSchemaObject(type, name, text, image);
}
