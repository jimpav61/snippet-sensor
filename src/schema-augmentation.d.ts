
// Global type augmentation for Schema.org types
// This file ensures all Schema.org related types properly include the image property

declare namespace Schema {
  interface SchemaBaseType {
    "@type": string;
    [key: string]: any;
    image?: string | ImageObject;
    name?: string;
    text?: string;
  }

  interface SchemaObject extends SchemaBaseType {
    name?: string;
    description?: string;
    url?: string;
    image?: string | ImageObject;
  }

  interface ImageObject extends SchemaBaseType {
    "@type": "ImageObject";
    url: string;
    width?: number;
    height?: number;
    caption?: string;
  }

  interface Article extends SchemaObject {
    "@type": "Article";
    headline: string;
    author: Person | Organization | string;
    datePublished?: string;
    dateModified?: string;
    publisher: Organization;
    articleBody?: string;
    image?: string | ImageObject;
  }

  interface Person extends SchemaObject {
    "@type": "Person";
    name: string;
    jobTitle?: string;
    email?: string;
    telephone?: string;
    image?: string | ImageObject;
  }

  interface Organization extends SchemaObject {
    "@type": "Organization";
    name: string;
    logo?: ImageObject | string;
    address?: PostalAddress | string;
    image?: string | ImageObject;
  }

  interface PostalAddress extends SchemaBaseType {
    "@type": "PostalAddress";
    streetAddress?: string;
    addressLocality?: string;
    addressRegion?: string;
    postalCode?: string;
    addressCountry?: string;
  }

  interface BreadcrumbList extends SchemaBaseType {
    "@type": "BreadcrumbList";
    itemListElement: ListItem[];
    image?: string | ImageObject;
  }

  interface ListItem extends SchemaBaseType {
    "@type": "ListItem";
    position: number;
    item: SchemaObject;
    image?: string | ImageObject;
  }

  interface WebSite extends SchemaObject {
    "@type": "WebSite";
    name: string;
    url: string;
    potentialAction?: SearchAction;
    image?: string | ImageObject;
  }

  interface SearchAction extends SchemaBaseType {
    "@type": "SearchAction";
    target: string;
    "query-input": string;
    image?: string | ImageObject;
  }

  interface FAQPage extends SchemaObject {
    "@type": "FAQPage";
    mainEntity: Question[];
    image?: string | ImageObject;
  }

  interface Question extends SchemaBaseType {
    "@type": "Question";
    name: string;
    acceptedAnswer: Answer;
    image?: string | ImageObject;
  }

  interface Answer extends SchemaBaseType {
    "@type": "Answer";
    text: string;
    image?: string | ImageObject;
  }

  interface HowTo extends SchemaObject {
    "@type": "HowTo";
    step: HowToStep[];
    image?: string | ImageObject;
  }

  interface HowToStep extends SchemaBaseType {
    "@type": "HowToStep";
    name?: string;
    text: string;
    image?: string | ImageObject;
    url?: string;
  }

  interface Product extends SchemaObject {
    "@type": "Product";
    name: string;
    description?: string;
    image?: string | ImageObject;
    brand?: Organization | string;
    offers?: Offer;
    review?: Review;
    aggregateRating?: AggregateRating;
  }

  interface Offer extends SchemaBaseType {
    "@type": "Offer";
    price: string | number;
    priceCurrency: string;
    availability?: string;
    url?: string;
    validFrom?: string;
    priceValidUntil?: string;
    image?: string | ImageObject;
  }

  interface Review extends SchemaObject {
    "@type": "Review";
    reviewRating: Rating;
    author: Person | Organization | string;
    reviewBody?: string;
    image?: string | ImageObject;
  }

  interface Rating extends SchemaBaseType {
    "@type": "Rating";
    ratingValue: string | number;
    bestRating?: string | number;
    worstRating?: string | number;
    image?: string | ImageObject;
  }

  interface AggregateRating extends SchemaBaseType {
    "@type": "AggregateRating";
    ratingValue: string | number;
    reviewCount: string | number;
    bestRating?: string | number;
    worstRating?: string | number;
    image?: string | ImageObject;
  }

  interface TextContent {
    "@type": string;
    name: string;
    text: string;
    image?: string | ImageObject;
  }
}
