
// Explicit type definitions for the Schema Generator
// This file defines all Schema.org types used in the application

export interface SchemaBaseType {
  "@type": string;
  [key: string]: any;
}

export interface ImageObject extends SchemaBaseType {
  "@type": "ImageObject";
  url: string;
  width?: number;
  height?: number;
  caption?: string;
}

export interface SchemaObject extends SchemaBaseType {
  name?: string;
  description?: string;
  url?: string;
  image?: string | ImageObject;
}

export interface Article extends SchemaObject {
  "@type": "Article";
  headline: string;
  author: Person | Organization | string;
  datePublished?: string;
  dateModified?: string;
  publisher: Organization;
  articleBody?: string;
  image?: string | ImageObject;
}

export interface Person extends SchemaObject {
  "@type": "Person";
  name: string;
  jobTitle?: string;
  email?: string;
  telephone?: string;
}

export interface Organization extends SchemaObject {
  "@type": "Organization";
  name: string;
  logo?: ImageObject | string;
  address?: PostalAddress | string;
}

export interface PostalAddress extends SchemaBaseType {
  "@type": "PostalAddress";
  streetAddress?: string;
  addressLocality?: string;
  addressRegion?: string;
  postalCode?: string;
  addressCountry?: string;
}

export interface BreadcrumbList extends SchemaBaseType {
  "@type": "BreadcrumbList";
  itemListElement: ListItem[];
}

export interface ListItem extends SchemaBaseType {
  "@type": "ListItem";
  position: number;
  item: SchemaObject;
}

export interface WebSite extends SchemaObject {
  "@type": "WebSite";
  name: string;
  url: string;
  potentialAction?: SearchAction;
}

export interface SearchAction extends SchemaBaseType {
  "@type": "SearchAction";
  target: string;
  "query-input": string;
}

export interface FAQPage extends SchemaObject {
  "@type": "FAQPage";
  mainEntity: Question[];
}

export interface Question extends SchemaBaseType {
  "@type": "Question";
  name: string;
  acceptedAnswer: Answer;
  image?: string | ImageObject;
}

export interface Answer extends SchemaBaseType {
  "@type": "Answer";
  text: string;
  image?: string | ImageObject;
}

export interface HowTo extends SchemaObject {
  "@type": "HowTo";
  step: HowToStep[];
}

export interface HowToStep extends SchemaBaseType {
  "@type": "HowToStep";
  name?: string;
  text: string;
  image?: string | ImageObject;
  url?: string;
}

export interface Product extends SchemaObject {
  "@type": "Product";
  name: string;
  description?: string;
  image?: string | ImageObject;
  brand?: Organization | string;
  offers?: Offer;
  review?: Review;
  aggregateRating?: AggregateRating;
}

export interface Offer extends SchemaBaseType {
  "@type": "Offer";
  price: string | number;
  priceCurrency: string;
  availability?: string;
  url?: string;
  validFrom?: string;
  priceValidUntil?: string;
}

export interface Review extends SchemaObject {
  "@type": "Review";
  reviewRating: Rating;
  author: Person | Organization | string;
  reviewBody?: string;
}

export interface Rating extends SchemaBaseType {
  "@type": "Rating";
  ratingValue: string | number;
  bestRating?: string | number;
  worstRating?: string | number;
}

export interface AggregateRating extends SchemaBaseType {
  "@type": "AggregateRating";
  ratingValue: string | number;
  reviewCount: string | number;
  bestRating?: string | number;
  worstRating?: string | number;
}
