
// Global type augmentation for Schema.org types
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

  // Additional schema types can be defined here
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
  }

  interface Organization extends SchemaObject {
    "@type": "Organization";
    name: string;
    logo?: ImageObject | string;
    address?: PostalAddress | string;
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
  }

  interface ListItem extends SchemaBaseType {
    "@type": "ListItem";
    position: number;
    item: SchemaObject;
  }

  interface WebSite extends SchemaObject {
    "@type": "WebSite";
    name: string;
    url: string;
    potentialAction?: SearchAction;
  }

  interface SearchAction extends SchemaBaseType {
    "@type": "SearchAction";
    target: string;
    "query-input": string;
  }

  interface FAQPage extends SchemaObject {
    "@type": "FAQPage";
    mainEntity: Question[];
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
  }

  interface Review extends SchemaObject {
    "@type": "Review";
    reviewRating: Rating;
    author: Person | Organization | string;
    reviewBody?: string;
  }

  interface Rating extends SchemaBaseType {
    "@type": "Rating";
    ratingValue: string | number;
    bestRating?: string | number;
    worstRating?: string | number;
  }

  interface AggregateRating extends SchemaBaseType {
    "@type": "AggregateRating";
    ratingValue: string | number;
    reviewCount: string | number;
    bestRating?: string | number;
    worstRating?: string | number;
  }
}
