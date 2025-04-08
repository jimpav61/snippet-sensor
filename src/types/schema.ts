// Add or update the schema types to include image property
export interface BaseSchema {
  "@type": string;
  name: string;
  text: string;
  image?: string; // Added image property as optional
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
