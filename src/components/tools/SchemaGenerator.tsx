
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { CheckIcon, Copy, ExternalLink, Info } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";

// Schema type definitions
type SchemaType = "Article" | "Product" | "FAQ" | "Event" | "LocalBusiness" | "HowTo" | "Person" | "Organization" | "Recipe" | "VideoObject";

interface BaseSchema {
  name: string;
  description: string;
}

interface ArticleSchema extends BaseSchema {
  headline: string;
  author: string;
  publishDate: string;
  image: string;
  publisher: string;
}

interface ProductSchema extends BaseSchema {
  image: string;
  brand: string;
  sku: string;
  price: string;
  currency: string;
  availability: string;
  rating?: string;
  reviewCount?: string;
}

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQSchema {
  name: string;
  items: FAQItem[];
}

interface EventSchema extends BaseSchema {
  startDate: string;
  endDate: string;
  location: string;
  image?: string;
  organizer?: string;
  price?: string;
  currency?: string;
  availability?: string;
}

interface LocalBusinessSchema extends BaseSchema {
  image: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  telephone: string;
  priceRange?: string;
  openingHours?: string[];
}

interface HowToStep {
  name: string;
  text: string;
  image?: string;
}

interface HowToSchema extends BaseSchema {
  image?: string;
  totalTime?: string;
  estimatedCost?: string;
  supply?: string[];
  tools?: string[];
  steps: HowToStep[];
}

interface PersonSchema extends BaseSchema {
  image?: string;
  jobTitle?: string;
  email?: string;
  telephone?: string;
  address?: string;
  birthDate?: string;
  url?: string;
  sameAs?: string[];
}

interface OrganizationSchema extends BaseSchema {
  logo: string;
  url: string;
  address?: string;
  contactPoint?: {
    telephone: string;
    email?: string;
    contactType: string;
  };
  sameAs?: string[];
}

interface RecipeSchema extends BaseSchema {
  author: string;
  image: string;
  prepTime: string;
  cookTime: string;
  totalTime: string;
  recipeYield: string;
  recipeCategory?: string;
  recipeCuisine?: string;
  ingredients: string[];
  instructions: string[];
  nutrition?: {
    calories: string;
  };
}

interface VideoObjectSchema extends BaseSchema {
  thumbnailUrl: string;
  uploadDate: string;
  duration: string;
  contentUrl?: string;
  embedUrl?: string;
  publisher: string;
}

const SchemaGenerator: React.FC = () => {
  const [schemaType, setSchemaType] = useState<SchemaType>("Article");
  const [schemaCode, setSchemaCode] = useState<string>("");
  const [copied, setCopied] = useState<boolean>(false);
  const [schemaScore, setSchemaScore] = useState<number>(0);
  const [previewMode, setPreviewMode] = useState<"code" | "preview">("code");
  
  // Article Schema State
  const [articleData, setArticleData] = useState<ArticleSchema>({
    name: "",
    headline: "",
    description: "",
    author: "",
    publishDate: "",
    image: "",
    publisher: ""
  });

  // Product Schema State
  const [productData, setProductData] = useState<ProductSchema>({
    name: "",
    description: "",
    image: "",
    brand: "",
    sku: "",
    price: "",
    currency: "USD",
    availability: "InStock",
    rating: "",
    reviewCount: ""
  });

  // FAQ Schema State
  const [faqData, setFaqData] = useState<FAQSchema>({
    name: "",
    items: [{ question: "", answer: "" }]
  });

  // Event Schema State
  const [eventData, setEventData] = useState<EventSchema>({
    name: "",
    description: "",
    startDate: "",
    endDate: "",
    location: "",
    image: "",
    organizer: "",
    price: "",
    currency: "USD",
    availability: "InStock"
  });

  // Local Business Schema State
  const [localBusinessData, setLocalBusinessData] = useState<LocalBusinessSchema>({
    name: "",
    description: "",
    image: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    country: "",
    telephone: "",
    priceRange: "$$",
    openingHours: ["Mo-Fr 09:00-17:00"]
  });

  // HowTo Schema State
  const [howToData, setHowToData] = useState<HowToSchema>({
    name: "",
    description: "",
    image: "",
    totalTime: "PT1H",
    estimatedCost: "",
    supply: [""],
    tools: [""],
    steps: [{ name: "Step 1", text: "", image: "" }]
  });
  
  // Person Schema State
  const [personData, setPersonData] = useState<PersonSchema>({
    name: "",
    description: "",
    image: "",
    jobTitle: "",
    email: "",
    telephone: "",
    address: "",
    birthDate: "",
    url: "",
    sameAs: [""]
  });
  
  // Organization Schema State
  const [organizationData, setOrganizationData] = useState<OrganizationSchema>({
    name: "",
    description: "",
    logo: "",
    url: "",
    address: "",
    contactPoint: {
      telephone: "",
      email: "",
      contactType: "Customer Service"
    },
    sameAs: [""]
  });
  
  // Recipe Schema State
  const [recipeData, setRecipeData] = useState<RecipeSchema>({
    name: "",
    description: "",
    author: "",
    image: "",
    prepTime: "PT15M",
    cookTime: "PT1H",
    totalTime: "PT1H15M",
    recipeYield: "4 servings",
    recipeCategory: "",
    recipeCuisine: "",
    ingredients: [""],
    instructions: [""],
    nutrition: {
      calories: ""
    }
  });
  
  // VideoObject Schema State
  const [videoData, setVideoData] = useState<VideoObjectSchema>({
    name: "",
    description: "",
    thumbnailUrl: "",
    uploadDate: "",
    duration: "PT1M30S",
    contentUrl: "",
    embedUrl: "",
    publisher: ""
  });

  // Generate schema JSON
  const generateSchema = () => {
    let schema;
    let score = 0;

    switch (schemaType) {
      case "Article":
        schema = {
          "@context": "https://schema.org",
          "@type": "Article",
          "headline": articleData.headline || articleData.name,
          "name": articleData.name,
          "description": articleData.description,
          "author": {
            "@type": "Person",
            "name": articleData.author
          },
          "datePublished": articleData.publishDate,
          "image": articleData.image,
          "publisher": {
            "@type": "Organization",
            "name": articleData.publisher,
            "logo": {
              "@type": "ImageObject",
              "url": ""
            }
          }
        };

        // Calculate score based on completeness
        score = calculateArticleScore();
        break;

      case "Product":
        schema = {
          "@context": "https://schema.org",
          "@type": "Product",
          "name": productData.name,
          "description": productData.description,
          "image": productData.image,
          "brand": {
            "@type": "Brand",
            "name": productData.brand
          },
          "sku": productData.sku,
          "offers": {
            "@type": "Offer",
            "price": productData.price,
            "priceCurrency": productData.currency,
            "availability": `https://schema.org/${productData.availability}`
          }
        };

        // Add reviews if available
        if (productData.rating && productData.reviewCount) {
          schema.aggregateRating = {
            "@type": "AggregateRating",
            "ratingValue": productData.rating,
            "reviewCount": productData.reviewCount
          };
        }

        // Calculate score
        score = calculateProductScore();
        break;
        
      case "FAQ":
        const items = faqData.items.filter(item => item.question && item.answer);
        schema = {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          "mainEntity": items.map(item => ({
            "@type": "Question",
            "name": item.question,
            "acceptedAnswer": {
              "@type": "Answer",
              "text": item.answer
            }
          }))
        };

        // Calculate score
        score = calculateFAQScore();
        break;
        
      case "Event":
        schema = {
          "@context": "https://schema.org",
          "@type": "Event",
          "name": eventData.name,
          "description": eventData.description,
          "startDate": eventData.startDate,
          "endDate": eventData.endDate,
          "location": {
            "@type": "Place",
            "name": eventData.location
          }
        };

        if (eventData.image) {
          schema.image = eventData.image;
        }
        
        if (eventData.organizer) {
          schema.organizer = {
            "@type": "Organization",
            "name": eventData.organizer
          };
        }
        
        if (eventData.price) {
          schema.offers = {
            "@type": "Offer",
            "price": eventData.price,
            "priceCurrency": eventData.currency,
            "availability": `https://schema.org/${eventData.availability}`
          };
        }

        // Calculate score
        score = calculateEventScore();
        break;
        
      case "LocalBusiness":
        schema = {
          "@context": "https://schema.org",
          "@type": "LocalBusiness",
          "name": localBusinessData.name,
          "description": localBusinessData.description,
          "image": localBusinessData.image,
          "address": {
            "@type": "PostalAddress",
            "streetAddress": localBusinessData.address,
            "addressLocality": localBusinessData.city,
            "addressRegion": localBusinessData.state,
            "postalCode": localBusinessData.zipCode,
            "addressCountry": localBusinessData.country
          },
          "telephone": localBusinessData.telephone
        };

        if (localBusinessData.priceRange) {
          schema.priceRange = localBusinessData.priceRange;
        }
        
        if (localBusinessData.openingHours && localBusinessData.openingHours.length > 0) {
          schema.openingHours = localBusinessData.openingHours.filter(hour => hour);
        }

        // Calculate score
        score = calculateLocalBusinessScore();
        break;

      case "HowTo":
        const validSteps = howToData.steps.filter(step => step.name && step.text);
        schema = {
          "@context": "https://schema.org",
          "@type": "HowTo",
          "name": howToData.name,
          "description": howToData.description,
          "step": validSteps.map(step => {
            const stepItem = {
              "@type": "HowToStep",
              "name": step.name,
              "text": step.text
            };
            
            if (step.image) {
              stepItem.image = step.image;
            }
            
            return stepItem;
          })
        };

        if (howToData.image) {
          schema.image = howToData.image;
        }
        
        if (howToData.totalTime) {
          schema.totalTime = howToData.totalTime;
        }
        
        if (howToData.estimatedCost) {
          schema.estimatedCost = {
            "@type": "MonetaryAmount",
            "currency": "USD",
            "value": howToData.estimatedCost
          };
        }
        
        if (howToData.supply && howToData.supply.length > 0) {
          const validSupplies = howToData.supply.filter(s => s);
          if (validSupplies.length > 0) {
            schema.supply = validSupplies.map(s => ({
              "@type": "HowToSupply",
              "name": s
            }));
          }
        }
        
        if (howToData.tools && howToData.tools.length > 0) {
          const validTools = howToData.tools.filter(t => t);
          if (validTools.length > 0) {
            schema.tool = validTools.map(t => ({
              "@type": "HowToTool",
              "name": t
            }));
          }
        }

        // Calculate score
        score = calculateHowToScore();
        break;
        
      case "Person":
        schema = {
          "@context": "https://schema.org",
          "@type": "Person",
          "name": personData.name,
          "description": personData.description
        };
        
        if (personData.image) schema.image = personData.image;
        if (personData.jobTitle) schema.jobTitle = personData.jobTitle;
        if (personData.email) schema.email = personData.email;
        if (personData.telephone) schema.telephone = personData.telephone;
        if (personData.address) {
          schema.address = {
            "@type": "PostalAddress",
            "streetAddress": personData.address
          };
        }
        if (personData.birthDate) schema.birthDate = personData.birthDate;
        if (personData.url) schema.url = personData.url;
        if (personData.sameAs && personData.sameAs.length > 0) {
          const validSameAs = personData.sameAs.filter(s => s);
          if (validSameAs.length > 0) {
            schema.sameAs = validSameAs;
          }
        }
        
        // Calculate score
        score = calculatePersonScore();
        break;
        
      case "Organization":
        schema = {
          "@context": "https://schema.org",
          "@type": "Organization",
          "name": organizationData.name,
          "description": organizationData.description,
          "logo": organizationData.logo,
          "url": organizationData.url
        };
        
        if (organizationData.address) {
          schema.address = {
            "@type": "PostalAddress",
            "streetAddress": organizationData.address
          };
        }
        
        if (organizationData.contactPoint && organizationData.contactPoint.telephone) {
          schema.contactPoint = {
            "@type": "ContactPoint",
            "telephone": organizationData.contactPoint.telephone,
            "contactType": organizationData.contactPoint.contactType || "Customer Service"
          };
          
          if (organizationData.contactPoint.email) {
            schema.contactPoint.email = organizationData.contactPoint.email;
          }
        }
        
        if (organizationData.sameAs && organizationData.sameAs.length > 0) {
          const validSameAs = organizationData.sameAs.filter(s => s);
          if (validSameAs.length > 0) {
            schema.sameAs = validSameAs;
          }
        }
        
        // Calculate score
        score = calculateOrganizationScore();
        break;
        
      case "Recipe":
        schema = {
          "@context": "https://schema.org",
          "@type": "Recipe",
          "name": recipeData.name,
          "description": recipeData.description,
          "author": {
            "@type": "Person",
            "name": recipeData.author
          },
          "image": recipeData.image,
          "prepTime": recipeData.prepTime,
          "cookTime": recipeData.cookTime,
          "totalTime": recipeData.totalTime,
          "recipeYield": recipeData.recipeYield,
          "recipeIngredient": recipeData.ingredients.filter(i => i),
          "recipeInstructions": recipeData.instructions.filter(i => i).map(instruction => ({
            "@type": "HowToStep",
            "text": instruction
          }))
        };
        
        if (recipeData.recipeCategory) schema.recipeCategory = recipeData.recipeCategory;
        if (recipeData.recipeCuisine) schema.recipeCuisine = recipeData.recipeCuisine;
        
        if (recipeData.nutrition && recipeData.nutrition.calories) {
          schema.nutrition = {
            "@type": "NutritionInformation",
            "calories": recipeData.nutrition.calories
          };
        }
        
        // Calculate score
        score = calculateRecipeScore();
        break;
        
      case "VideoObject":
        schema = {
          "@context": "https://schema.org",
          "@type": "VideoObject",
          "name": videoData.name,
          "description": videoData.description,
          "thumbnailUrl": videoData.thumbnailUrl,
          "uploadDate": videoData.uploadDate,
          "duration": videoData.duration,
          "publisher": {
            "@type": "Organization",
            "name": videoData.publisher
          }
        };
        
        if (videoData.contentUrl) schema.contentUrl = videoData.contentUrl;
        if (videoData.embedUrl) schema.embedUrl = videoData.embedUrl;
        
        // Calculate score
        score = calculateVideoScore();
        break;
    }

    setSchemaCode(JSON.stringify(schema, null, 2));
    setSchemaScore(score);
  };

  // Score calculation functions
  const calculateArticleScore = () => {
    let score = 0;
    const requiredFields = ["name", "headline", "description", "author", "publishDate"];
    const optionalFields = ["image", "publisher"];
    
    // Check required fields (80% of score)
    requiredFields.forEach(field => {
      if (articleData[field as keyof ArticleSchema]) score += 16;
    });
    
    // Check optional fields (20% of score)
    optionalFields.forEach(field => {
      if (articleData[field as keyof ArticleSchema]) score += 10;
    });
    
    return Math.min(score, 100);
  };

  const calculateProductScore = () => {
    let score = 0;
    const requiredFields = ["name", "description", "image", "brand", "sku", "price", "currency", "availability"];
    const optionalFields = ["rating", "reviewCount"];
    
    // Check required fields (80% of score)
    requiredFields.forEach(field => {
      if (productData[field as keyof ProductSchema]) score += 10;
    });
    
    // Check optional fields (20% of score)
    optionalFields.forEach(field => {
      if (productData[field as keyof ProductSchema]) score += 10;
    });
    
    return Math.min(score, 100);
  };

  const calculateFAQScore = () => {
    let score = 0;
    
    // Check if there's a name (10%)
    if (faqData.name) score += 10;
    
    // Calculate FAQ items (90%)
    const validItems = faqData.items.filter(item => item.question && item.answer);
    
    if (validItems.length > 0) {
      // Base score for having at least one valid FAQ
      score += 30;
      
      // Additional score for having multiple FAQs (max 60%)
      score += Math.min(validItems.length * 15, 60);
    }
    
    return Math.min(score, 100);
  };

  const calculateEventScore = () => {
    let score = 0;
    const requiredFields = ["name", "description", "startDate", "endDate", "location"];
    const optionalFields = ["image", "organizer", "price", "currency", "availability"];
    
    // Check required fields (70% of score)
    requiredFields.forEach(field => {
      if (eventData[field as keyof EventSchema]) score += 14;
    });
    
    // Check optional fields (30% of score)
    optionalFields.forEach(field => {
      if (eventData[field as keyof EventSchema]) score += 6;
    });
    
    return Math.min(score, 100);
  };
  
  const calculateLocalBusinessScore = () => {
    let score = 0;
    const requiredFields = ["name", "description", "image", "address", "city", "state", "zipCode", "country", "telephone"];
    const optionalFields = ["priceRange", "openingHours"];
    
    // Check required fields (80% of score)
    requiredFields.forEach(field => {
      if (localBusinessData[field as keyof LocalBusinessSchema]) score += 9;
    });
    
    // Check optional fields (20% of score)
    optionalFields.forEach(field => {
      if (field === "openingHours") {
        if (localBusinessData.openingHours && localBusinessData.openingHours.length > 0 && localBusinessData.openingHours[0]) {
          score += 10;
        }
      } else if (localBusinessData[field as keyof LocalBusinessSchema]) {
        score += 10;
      }
    });
    
    return Math.min(score, 100);
  };

  const calculateHowToScore = () => {
    let score = 0;
    const requiredFields = ["name", "description"];
    const optionalFields = ["image", "totalTime", "estimatedCost"];
    
    // Check required fields (30% of score)
    requiredFields.forEach(field => {
      if (howToData[field as keyof HowToSchema]) score += 15;
    });
    
    // Check optional fields (20% of score)
    optionalFields.forEach(field => {
      if (howToData[field as keyof HowToSchema]) score += 7;
    });
    
    // Check steps (40% of score)
    const validSteps = howToData.steps.filter(step => step.name && step.text);
    if (validSteps.length > 0) {
      // Base score for having at least one step
      score += 20;
      
      // Additional score for having multiple steps (max 20 more points)
      score += Math.min((validSteps.length - 1) * 5, 20);
    }
    
    // Check for supplies and tools (10% of score)
    if (howToData.supply && howToData.supply.filter(s => s).length > 0) score += 5;
    if (howToData.tools && howToData.tools.filter(t => t).length > 0) score += 5;
    
    return Math.min(score, 100);
  };
  
  const calculatePersonScore = () => {
    let score = 0;
    const requiredFields = ["name", "description"];
    const optionalFields = ["image", "jobTitle", "email", "telephone", "address", "birthDate", "url", "sameAs"];
    
    // Check required fields (40% of score)
    requiredFields.forEach(field => {
      if (personData[field as keyof PersonSchema]) score += 20;
    });
    
    // Check optional fields (60% of score)
    optionalFields.forEach(field => {
      if (field === "sameAs") {
        if (personData.sameAs && personData.sameAs.length > 0 && personData.sameAs[0]) {
          score += 7.5;
        }
      } else if (personData[field as keyof PersonSchema]) {
        score += 7.5;
      }
    });
    
    return Math.min(score, 100);
  };
  
  const calculateOrganizationScore = () => {
    let score = 0;
    const requiredFields = ["name", "description", "logo", "url"];
    const optionalFields = ["address", "contactPoint", "sameAs"];
    
    // Check required fields (60% of score)
    requiredFields.forEach(field => {
      if (organizationData[field as keyof OrganizationSchema]) score += 15;
    });
    
    // Check optional fields (40% of score)
    optionalFields.forEach(field => {
      if (field === "contactPoint") {
        if (organizationData.contactPoint?.telephone) score += 10;
        if (organizationData.contactPoint?.email) score += 5;
      } else if (field === "sameAs") {
        if (organizationData.sameAs && organizationData.sameAs.length > 0 && organizationData.sameAs[0]) {
          score += 10;
        }
      } else if (organizationData[field as keyof OrganizationSchema]) {
        score += 15;
      }
    });
    
    return Math.min(score, 100);
  };
  
  const calculateRecipeScore = () => {
    let score = 0;
    const requiredFields = ["name", "description", "author", "image", "prepTime", "cookTime", "totalTime", "recipeYield"];
    const optionalFields = ["recipeCategory", "recipeCuisine"];
    
    // Check required fields (60% of score)
    requiredFields.forEach(field => {
      if (recipeData[field as keyof RecipeSchema]) score += 7.5;
    });
    
    // Check optional fields (10% of score)
    optionalFields.forEach(field => {
      if (recipeData[field as keyof RecipeSchema]) score += 5;
    });
    
    // Check ingredients (15% of score)
    const validIngredients = recipeData.ingredients.filter(i => i);
    if (validIngredients.length > 0) {
      score += Math.min(validIngredients.length * 3, 15);
    }
    
    // Check instructions (15% of score)
    const validInstructions = recipeData.instructions.filter(i => i);
    if (validInstructions.length > 0) {
      score += Math.min(validInstructions.length * 3, 15);
    }
    
    return Math.min(score, 100);
  };
  
  const calculateVideoScore = () => {
    let score = 0;
    const requiredFields = ["name", "description", "thumbnailUrl", "uploadDate", "duration", "publisher"];
    const optionalFields = ["contentUrl", "embedUrl"];
    
    // Check required fields (80% of score)
    requiredFields.forEach(field => {
      if (videoData[field as keyof VideoObjectSchema]) score += 13.33;
    });
    
    // Check optional fields (20% of score)
    optionalFields.forEach(field => {
      if (videoData[field as keyof VideoObjectSchema]) score += 10;
    });
    
    return Math.min(score, 100);
  };

  // Helper function to handle copying schema code
  const handleCopyCode = () => {
    navigator.clipboard.writeText(schemaCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Helper function to add FAQ item
  const handleAddFAQItem = () => {
    setFaqData(prev => ({
      ...prev,
      items: [...prev.items, { question: "", answer: "" }]
    }));
  };

  // Helper function to remove FAQ item
  const handleRemoveFAQItem = (index: number) => {
    setFaqData(prev => ({
      ...prev,
      items: prev.items.filter((_, i) => i !== index)
    }));
  };

  // Helper function to update FAQ item
  const handleUpdateFAQItem = (index: number, field: keyof FAQItem, value: string) => {
    setFaqData(prev => ({
      ...prev,
      items: prev.items.map((item, i) => {
        if (i === index) {
          return { ...item, [field]: value };
        }
        return item;
      })
    }));
  };

  // Helper function to add HowTo step
  const handleAddHowToStep = () => {
    setHowToData(prev => ({
      ...prev,
      steps: [...prev.steps, { name: `Step ${prev.steps.length + 1}`, text: "", image: "" }]
    }));
  };

  // Helper function to remove HowTo step
  const handleRemoveHowToStep = (index: number) => {
    setHowToData(prev => ({
      ...prev,
      steps: prev.steps.filter((_, i) => i !== index)
    }));
  };

  // Helper function to update HowTo step
  const handleUpdateHowToStep = (index: number, field: keyof HowToStep, value: string) => {
    setHowToData(prev => ({
      ...prev,
      steps: prev.steps.map((step, i) => {
        if (i === index) {
          return { ...step, [field]: value };
        }
        return step;
      })
    }));
  };

  // Helper function to add array item (for ingredients, instructions, supply, tools, sameAs)
  const handleAddArrayItem = (
    stateUpdater: React.Dispatch<React.SetStateAction<any>>,
    arrayName: string
  ) => {
    stateUpdater((prev: any) => ({
      ...prev,
      [arrayName]: [...prev[arrayName], ""]
    }));
  };

  // Helper function to remove array item
  const handleRemoveArrayItem = (
    stateUpdater: React.Dispatch<React.SetStateAction<any>>,
    arrayName: string,
    index: number
  ) => {
    stateUpdater((prev: any) => ({
      ...prev,
      [arrayName]: prev[arrayName].filter((_: any, i: number) => i !== index)
    }));
  };

  // Helper function to update array item
  const handleUpdateArrayItem = (
    stateUpdater: React.Dispatch<React.SetStateAction<any>>,
    arrayName: string,
    index: number,
    value: string
  ) => {
    stateUpdater((prev: any) => ({
      ...prev,
      [arrayName]: prev[arrayName].map((item: any, i: number) => {
        if (i === index) {
          return value;
        }
        return item;
      })
    }));
  };

  // Get score text color based on score value
  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-green-500";
    if (score >= 60) return "text-yellow-500";
    return "text-red-500";
  };

  // Get schema preview
  const getSchemaPreview = () => {
    try {
      if (!schemaCode) return null;
      const schema = JSON.parse(schemaCode);
      
      // Function to render schema objects recursively
      const renderSchemaObject = (obj: any, level = 0) => {
        return (
          <div style={{ marginLeft: `${level * 20}px` }} className="mt-2">
            {Object.entries(obj).map(([key, value]: [string, any]) => {
              if (key === "@context") return null; // Skip @context
              
              if (typeof value === "object" && value !== null) {
                // Handle arrays
                if (Array.isArray(value)) {
                  return (
                    <div key={key} className="mb-2">
                      <div className="font-semibold">{key}:</div>
                      {value.map((item, index) => (
                        <div key={index} className="ml-4">
                          {typeof item === "object" && item !== null ? (
                            renderSchemaObject(item, level + 1)
                          ) : (
                            <div>{item}</div>
                          )}
                        </div>
                      ))}
                    </div>
                  );
                } else {
                  // Handle nested objects
                  return (
                    <div key={key} className="mb-2">
                      <div className="font-semibold">{key}:</div>
                      {renderSchemaObject(value, level + 1)}
                    </div>
                  );
                }
              } else {
                // Handle primitive values
                return (
                  <div key={key} className="mb-1">
                    <span className="font-medium">{key}:</span> {value}
                  </div>
                );
              }
            })}
          </div>
        );
      };
      
      return (
        <div className="p-4 border rounded-md">
          <h3 className="text-lg font-bold mb-2">{schema["@type"] || "Schema"}</h3>
          {renderSchemaObject(schema)}
        </div>
      );
    } catch (e) {
      return <div className="text-red-500">Invalid JSON</div>;
    }
  };

  return (
    <div className="container mx-auto">
      <div className="text-center mb-8">
        <h1 className="text-2xl font-bold mb-2">AI Schema Generator</h1>
        <p className="text-gray-600">
          Create structured data schema markup for AI systems to better understand your content
        </p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-5">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle>Schema Configuration</CardTitle>
                  <CardDescription>Select and configure your schema type</CardDescription>
                </div>
                <div>
                  <Select value={schemaType} onValueChange={(value) => setSchemaType(value as SchemaType)}>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Select schema" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Article">Article</SelectItem>
                      <SelectItem value="Product">Product</SelectItem>
                      <SelectItem value="FAQ">FAQ</SelectItem>
                      <SelectItem value="Event">Event</SelectItem>
                      <SelectItem value="LocalBusiness">Local Business</SelectItem>
                      <SelectItem value="HowTo">How-To</SelectItem>
                      <SelectItem value="Person">Person</SelectItem>
                      <SelectItem value="Organization">Organization</SelectItem>
                      <SelectItem value="Recipe">Recipe</SelectItem>
                      <SelectItem value="VideoObject">Video</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardHeader>
            
            <CardContent>
              {/* Article Schema Form */}
              {schemaType === "Article" && (
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="article-name">Article Title</Label>
                    <Input 
                      id="article-name" 
                      placeholder="Enter article title" 
                      value={articleData.name}
                      onChange={(e) => setArticleData({ ...articleData, name: e.target.value })}
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="article-headline">Headline</Label>
                    <Input 
                      id="article-headline" 
                      placeholder="Enter headline (can be same as title)" 
                      value={articleData.headline}
                      onChange={(e) => setArticleData({ ...articleData, headline: e.target.value })}
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="article-description">Description</Label>
                    <Textarea 
                      id="article-description" 
                      placeholder="Enter article description" 
                      className="min-h-[100px]"
                      value={articleData.description}
                      onChange={(e) => setArticleData({ ...articleData, description: e.target.value })}
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="article-author">Author</Label>
                    <Input 
                      id="article-author" 
                      placeholder="Enter author name" 
                      value={articleData.author}
                      onChange={(e) => setArticleData({ ...articleData, author: e.target.value })}
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="article-publish-date">Publish Date</Label>
                    <Input 
                      id="article-publish-date" 
                      type="date"
                      value={articleData.publishDate}
                      onChange={(e) => setArticleData({ ...articleData, publishDate: e.target.value })}
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="article-image">Featured Image URL</Label>
                    <Input 
                      id="article-image" 
                      placeholder="https://example.com/image.jpg" 
                      value={articleData.image}
                      onChange={(e) => setArticleData({ ...articleData, image: e.target.value })}
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="article-publisher">Publisher Name</Label>
                    <Input 
                      id="article-publisher" 
                      placeholder="Enter publisher name" 
                      value={articleData.publisher}
                      onChange={(e) => setArticleData({ ...articleData, publisher: e.target.value })}
                    />
                  </div>
                </div>
              )}

              {/* Product Schema Form */}
              {schemaType === "Product" && (
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="product-name">Product Name</Label>
                    <Input 
                      id="product-name" 
                      placeholder="Enter product name" 
                      value={productData.name}
                      onChange={(e) => setProductData({ ...productData, name: e.target.value })}
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="product-description">Description</Label>
                    <Textarea 
                      id="product-description" 
                      placeholder="Enter product description" 
                      className="min-h-[100px]"
                      value={productData.description}
                      onChange={(e) => setProductData({ ...productData, description: e.target.value })}
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="product-image">Product Image URL</Label>
                    <Input 
                      id="product-image" 
                      placeholder="https://example.com/product.jpg" 
                      value={productData.image}
                      onChange={(e) => setProductData({ ...productData, image: e.target.value })}
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="product-brand">Brand</Label>
                    <Input 
                      id="product-brand" 
                      placeholder="Enter brand name" 
                      value={productData.brand}
                      onChange={(e) => setProductData({ ...productData, brand: e.target.value })}
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="product-sku">SKU</Label>
                    <Input 
                      id="product-sku" 
                      placeholder="Enter product SKU" 
                      value={productData.sku}
                      onChange={(e) => setProductData({ ...productData, sku: e.target.value })}
                    />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="product-price">Price</Label>
                      <Input 
                        id="product-price" 
                        placeholder="29.99" 
                        value={productData.price}
                        onChange={(e) => setProductData({ ...productData, price: e.target.value })}
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="product-currency">Currency</Label>
                      <Select 
                        value={productData.currency}
                        onValueChange={(value) => setProductData({ ...productData, currency: value })}
                      >
                        <SelectTrigger id="product-currency">
                          <SelectValue placeholder="Select currency" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="USD">USD</SelectItem>
                          <SelectItem value="EUR">EUR</SelectItem>
                          <SelectItem value="GBP">GBP</SelectItem>
                          <SelectItem value="JPY">JPY</SelectItem>
                          <SelectItem value="CAD">CAD</SelectItem>
                          <SelectItem value="AUD">AUD</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  
                  <div>
                    <Label htmlFor="product-availability">Availability</Label>
                    <Select 
                      value={productData.availability}
                      onValueChange={(value) => setProductData({ ...productData, availability: value })}
                    >
                      <SelectTrigger id="product-availability">
                        <SelectValue placeholder="Select availability" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="InStock">In Stock</SelectItem>
                        <SelectItem value="OutOfStock">Out of Stock</SelectItem>
                        <SelectItem value="PreOrder">Pre-Order</SelectItem>
                        <SelectItem value="BackOrder">Back Order</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="product-rating">
                        Rating 
                        <span className="text-gray-500 text-sm ml-1">(optional)</span>
                      </Label>
                      <Input 
                        id="product-rating" 
                        placeholder="4.5" 
                        value={productData.rating || ""}
                        onChange={(e) => setProductData({ ...productData, rating: e.target.value })}
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="product-review-count">
                        Review Count
                        <span className="text-gray-500 text-sm ml-1">(optional)</span>
                      </Label>
                      <Input 
                        id="product-review-count" 
                        placeholder="100" 
                        value={productData.reviewCount || ""}
                        onChange={(e) => setProductData({ ...productData, reviewCount: e.target.value })}
                      />
                    </div>
                  </div>
                </div>
              )}
              
              {/* FAQ Schema Form */}
              {schemaType === "FAQ" && (
                <div className="space-y-6">
                  <div>
                    <Label htmlFor="faq-name">FAQ Page Title</Label>
                    <Input 
                      id="faq-name" 
                      placeholder="Enter FAQ page title" 
                      value={faqData.name}
                      onChange={(e) => setFaqData({ ...faqData, name: e.target.value })}
                    />
                  </div>
                  
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <Label>FAQ Items</Label>
                      <Button 
                        type="button" 
                        size="sm" 
                        onClick={handleAddFAQItem}
                      >
                        Add FAQ
                      </Button>
                    </div>
                    
                    {faqData.items.map((item, index) => (
                      <div key={index} className="p-4 border rounded-md mb-4 relative">
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          className="absolute top-2 right-2 h-8 w-8 p-0"
                          onClick={() => handleRemoveFAQItem(index)}
                          disabled={faqData.items.length === 1}
                        >
                          ×
                        </Button>
                        
                        <div className="space-y-4">
                          <div>
                            <Label htmlFor={`faq-question-${index}`}>Question</Label>
                            <Input 
                              id={`faq-question-${index}`}
                              placeholder="Enter question" 
                              value={item.question}
                              onChange={(e) => handleUpdateFAQItem(index, "question", e.target.value)}
                            />
                          </div>
                          
                          <div>
                            <Label htmlFor={`faq-answer-${index}`}>Answer</Label>
                            <Textarea 
                              id={`faq-answer-${index}`}
                              placeholder="Enter answer" 
                              value={item.answer}
                              onChange={(e) => handleUpdateFAQItem(index, "answer", e.target.value)}
                              className="min-h-[100px]"
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              
              {/* Event Schema Form */}
              {schemaType === "Event" && (
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="event-name">Event Name</Label>
                    <Input 
                      id="event-name" 
                      placeholder="Enter event name" 
                      value={eventData.name}
                      onChange={(e) => setEventData({ ...eventData, name: e.target.value })}
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="event-description">Description</Label>
                    <Textarea 
                      id="event-description" 
                      placeholder="Enter event description" 
                      className="min-h-[100px]"
                      value={eventData.description}
                      onChange={(e) => setEventData({ ...eventData, description: e.target.value })}
                    />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="event-start-date">Start Date</Label>
                      <Input 
                        id="event-start-date" 
                        type="datetime-local"
                        value={eventData.startDate}
                        onChange={(e) => setEventData({ ...eventData, startDate: e.target.value })}
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="event-end-date">End Date</Label>
                      <Input 
                        id="event-end-date" 
                        type="datetime-local"
                        value={eventData.endDate}
                        onChange={(e) => setEventData({ ...eventData, endDate: e.target.value })}
                      />
                    </div>
                  </div>
                  
                  <div>
                    <Label htmlFor="event-location">Location</Label>
                    <Input 
                      id="event-location" 
                      placeholder="Enter event location" 
                      value={eventData.location}
                      onChange={(e) => setEventData({ ...eventData, location: e.target.value })}
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="event-image">
                      Event Image URL
                      <span className="text-gray-500 text-sm ml-1">(optional)</span>
                    </Label>
                    <Input 
                      id="event-image" 
                      placeholder="https://example.com/event.jpg" 
                      value={eventData.image || ""}
                      onChange={(e) => setEventData({ ...eventData, image: e.target.value })}
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="event-organizer">
                      Organizer
                      <span className="text-gray-500 text-sm ml-1">(optional)</span>
                    </Label>
                    <Input 
                      id="event-organizer" 
                      placeholder="Enter organizer name" 
                      value={eventData.organizer || ""}
                      onChange={(e) => setEventData({ ...eventData, organizer: e.target.value })}
                    />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="event-price">
                        Price
                        <span className="text-gray-500 text-sm ml-1">(optional)</span>
                      </Label>
                      <Input 
                        id="event-price" 
                        placeholder="29.99" 
                        value={eventData.price || ""}
                        onChange={(e) => setEventData({ ...eventData, price: e.target.value })}
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="event-currency">Currency</Label>
                      <Select 
                        value={eventData.currency}
                        onValueChange={(value) => setEventData({ ...eventData, currency: value })}
                      >
                        <SelectTrigger id="event-currency">
                          <SelectValue placeholder="Select currency" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="USD">USD</SelectItem>
                          <SelectItem value="EUR">EUR</SelectItem>
                          <SelectItem value="GBP">GBP</SelectItem>
                          <SelectItem value="JPY">JPY</SelectItem>
                          <SelectItem value="CAD">CAD</SelectItem>
                          <SelectItem value="AUD">AUD</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  
                  <div>
                    <Label htmlFor="event-availability">Ticket Availability</Label>
                    <Select 
                      value={eventData.availability}
                      onValueChange={(value) => setEventData({ ...eventData, availability: value })}
                    >
                      <SelectTrigger id="event-availability">
                        <SelectValue placeholder="Select availability" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="InStock">Available</SelectItem>
                        <SelectItem value="SoldOut">Sold Out</SelectItem>
                        <SelectItem value="PreOrder">Pre-Order</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              )}
              
              {/* Local Business Schema Form */}
              {schemaType === "LocalBusiness" && (
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="business-name">Business Name</Label>
                    <Input 
                      id="business-name" 
                      placeholder="Enter business name" 
                      value={localBusinessData.name}
                      onChange={(e) => setLocalBusinessData({ ...localBusinessData, name: e.target.value })}
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="business-description">Description</Label>
                    <Textarea 
                      id="business-description" 
                      placeholder="Enter business description" 
                      className="min-h-[100px]"
                      value={localBusinessData.description}
                      onChange={(e) => setLocalBusinessData({ ...localBusinessData, description: e.target.value })}
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="business-image">Image URL</Label>
                    <Input 
                      id="business-image" 
                      placeholder="https://example.com/business.jpg" 
                      value={localBusinessData.image}
                      onChange={(e) => setLocalBusinessData({ ...localBusinessData, image: e.target.value })}
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="business-address">Street Address</Label>
                    <Input 
                      id="business-address" 
                      placeholder="123 Main St" 
                      value={localBusinessData.address}
                      onChange={(e) => setLocalBusinessData({ ...localBusinessData, address: e.target.value })}
                    />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="business-city">City</Label>
                      <Input 
                        id="business-city" 
                        placeholder="City" 
                        value={localBusinessData.city}
                        onChange={(e) => setLocalBusinessData({ ...localBusinessData, city: e.target.value })}
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="business-state">State</Label>
                      <Input 
                        id="business-state" 
                        placeholder="State/Province" 
                        value={localBusinessData.state}
                        onChange={(e) => setLocalBusinessData({ ...localBusinessData, state: e.target.value })}
                      />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="business-zip">ZIP/Postal Code</Label>
                      <Input 
                        id="business-zip" 
                        placeholder="ZIP/Postal Code" 
                        value={localBusinessData.zipCode}
                        onChange={(e) => setLocalBusinessData({ ...localBusinessData, zipCode: e.target.value })}
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="business-country">Country</Label>
                      <Input 
                        id="business-country" 
                        placeholder="Country" 
                        value={localBusinessData.country}
                        onChange={(e) => setLocalBusinessData({ ...localBusinessData, country: e.target.value })}
                      />
                    </div>
                  </div>
                  
                  <div>
                    <Label htmlFor="business-telephone">Telephone</Label>
                    <Input 
                      id="business-telephone" 
                      placeholder="+1 123-456-7890" 
                      value={localBusinessData.telephone}
                      onChange={(e) => setLocalBusinessData({ ...localBusinessData, telephone: e.target.value })}
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="business-price-range">
                      Price Range
                      <span className="text-gray-500 text-sm ml-1">(optional)</span>
                    </Label>
                    <Select 
                      value={localBusinessData.priceRange}
                      onValueChange={(value) => setLocalBusinessData({ ...localBusinessData, priceRange: value })}
                    >
                      <SelectTrigger id="business-price-range">
                        <SelectValue placeholder="Select price range" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="$">$ (Inexpensive)</SelectItem>
                        <SelectItem value="$$">$$ (Moderate)</SelectItem>
                        <SelectItem value="$$$">$$$ (Expensive)</SelectItem>
                        <SelectItem value="$$$$">$$$$ (Very Expensive)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <Label>
                        Opening Hours
                        <span className="text-gray-500 text-sm ml-1">(optional)</span>
                      </Label>
                      <Button 
                        type="button" 
                        size="sm" 
                        onClick={() => handleAddArrayItem(setLocalBusinessData, "openingHours")}
                      >
                        Add Hours
                      </Button>
                    </div>
                    
                    {localBusinessData.openingHours?.map((hours, index) => (
                      <div key={index} className="flex items-center mb-2">
                        <Input 
                          placeholder="Mo-Fr 09:00-17:00" 
                          value={hours}
                          onChange={(e) => handleUpdateArrayItem(setLocalBusinessData, "openingHours", index, e.target.value)}
                          className="flex-grow"
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          className="ml-2 h-8 w-8 p-0"
                          onClick={() => handleRemoveArrayItem(setLocalBusinessData, "openingHours", index)}
                          disabled={localBusinessData.openingHours?.length === 1}
                        >
                          ×
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              
              {/* HowTo Schema Form */}
              {schemaType === "HowTo" && (
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="howto-name">How-To Title</Label>
                    <Input 
                      id="howto-name" 
                      placeholder="Enter how-to title" 
                      value={howToData.name}
                      onChange={(e) => setHowToData({ ...howToData, name: e.target.value })}
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="howto-description">Description</Label>
                    <Textarea 
                      id="howto-description" 
                      placeholder="Enter description" 
                      className="min-h-[100px]"
                      value={howToData.description}
                      onChange={(e) => setHowToData({ ...howToData, description: e.target.value })}
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="howto-image">
                      Featured Image URL
                      <span className="text-gray-500 text-sm ml-1">(optional)</span>
                    </Label>
                    <Input 
                      id="howto-image" 
                      placeholder="https://example.com/howto.jpg" 
                      value={howToData.image || ""}
                      onChange={(e) => setHowToData({ ...howToData, image: e.target.value })}
                    />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="howto-total-time">
                        Total Time
                        <span className="text-gray-500 text-sm ml-1">(optional)</span>
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Info className="h-4 w-4 ml-1 inline-block" />
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>Use ISO 8601 duration format:<br/>PT1H30M (1 hour, 30 min)</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </Label>
                      <Input 
                        id="howto-total-time" 
                        placeholder="PT1H30M" 
                        value={howToData.totalTime || ""}
                        onChange={(e) => setHowToData({ ...howToData, totalTime: e.target.value })}
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="howto-cost">
                        Estimated Cost
                        <span className="text-gray-500 text-sm ml-1">(optional)</span>
                      </Label>
                      <Input 
                        id="howto-cost" 
                        placeholder="25.99" 
                        value={howToData.estimatedCost || ""}
                        onChange={(e) => setHowToData({ ...howToData, estimatedCost: e.target.value })}
                      />
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <Label>
                        Supplies
                        <span className="text-gray-500 text-sm ml-1">(optional)</span>
                      </Label>
                      <Button 
                        type="button" 
                        size="sm" 
                        onClick={() => handleAddArrayItem(setHowToData, "supply")}
                      >
                        Add Supply
                      </Button>
                    </div>
                    
                    {howToData.supply?.map((supply, index) => (
                      <div key={index} className="flex items-center mb-2">
                        <Input 
                          placeholder="Enter supply item" 
                          value={supply}
                          onChange={(e) => handleUpdateArrayItem(setHowToData, "supply", index, e.target.value)}
                          className="flex-grow"
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          className="ml-2 h-8 w-8 p-0"
                          onClick={() => handleRemoveArrayItem(setHowToData, "supply", index)}
                          disabled={howToData.supply?.length === 1}
                        >
                          ×
                        </Button>
                      </div>
                    ))}
                  </div>
                  
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <Label>
                        Tools
                        <span className="text-gray-500 text-sm ml-1">(optional)</span>
                      </Label>
                      <Button 
                        type="button" 
                        size="sm" 
                        onClick={() => handleAddArrayItem(setHowToData, "tools")}
                      >
                        Add Tool
                      </Button>
                    </div>
                    
                    {howToData.tools?.map((tool, index) => (
                      <div key={index} className="flex items-center mb-2">
                        <Input 
                          placeholder="Enter tool name" 
                          value={tool}
                          onChange={(e) => handleUpdateArrayItem(setHowToData, "tools", index, e.target.value)}
                          className="flex-grow"
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          className="ml-2 h-8 w-8 p-0"
                          onClick={() => handleRemoveArrayItem(setHowToData, "tools", index)}
                          disabled={howToData.tools?.length === 1}
                        >
                          ×
                        </Button>
                      </div>
                    ))}
                  </div>
                  
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <Label>Steps</Label>
                      <Button 
                        type="button" 
                        size="sm" 
                        onClick={handleAddHowToStep}
                      >
                        Add Step
                      </Button>
                    </div>
                    
                    {howToData.steps.map((step, index) => (
                      <div key={index} className="p-4 border rounded-md mb-4 relative">
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          className="absolute top-2 right-2 h-8 w-8 p-0"
                          onClick={() => handleRemoveHowToStep(index)}
                          disabled={howToData.steps.length === 1}
                        >
                          ×
                        </Button>
                        
                        <div className="space-y-4">
                          <div>
                            <Label htmlFor={`step-name-${index}`}>Step Name</Label>
                            <Input 
                              id={`step-name-${index}`}
                              placeholder="Step Name" 
                              value={step.name}
                              onChange={(e) => handleUpdateHowToStep(index, "name", e.target.value)}
                            />
                          </div>
                          
                          <div>
                            <Label htmlFor={`step-text-${index}`}>Step Instructions</Label>
                            <Textarea 
                              id={`step-text-${index}`}
                              placeholder="Enter instructions" 
                              value={step.text}
                              onChange={(e) => handleUpdateHowToStep(index, "text", e.target.value)}
                            />
                          </div>
                          
                          <div>
                            <Label htmlFor={`step-image-${index}`}>
                              Step Image URL
                              <span className="text-gray-500 text-sm ml-1">(optional)</span>
                            </Label>
                            <Input 
                              id={`step-image-${index}`}
                              placeholder="https://example.com/step1.jpg" 
                              value={step.image || ""}
                              onChange={(e) => handleUpdateHowToStep(index, "image", e.target.value)}
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              
              {/* Person Schema Form */}
              {schemaType === "Person" && (
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="person-name">Full Name</Label>
                    <Input 
                      id="person-name" 
                      placeholder="Enter full name" 
                      value={personData.name}
                      onChange={(e) => setPersonData({ ...personData, name: e.target.value })}
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="person-description">Description/Bio</Label>
                    <Textarea 
                      id="person-description" 
                      placeholder="Enter person description or biography" 
                      className="min-h-[100px]"
                      value={personData.description}
                      onChange={(e) => setPersonData({ ...personData, description: e.target.value })}
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="person-image">
                      Profile Image URL
                      <span className="text-gray-500 text-sm ml-1">(optional)</span>
                    </Label>
                    <Input 
                      id="person-image" 
                      placeholder="https://example.com/profile.jpg" 
                      value={personData.image || ""}
                      onChange={(e) => setPersonData({ ...personData, image: e.target.value })}
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="person-job-title">
                      Job Title
                      <span className="text-gray-500 text-sm ml-1">(optional)</span>
                    </Label>
                    <Input 
                      id="person-job-title" 
                      placeholder="Enter job title" 
                      value={personData.jobTitle || ""}
                      onChange={(e) => setPersonData({ ...personData, jobTitle: e.target.value })}
                    />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="person-email">
                        Email
                        <span className="text-gray-500 text-sm ml-1">(optional)</span>
                      </Label>
                      <Input 
                        id="person-email" 
                        placeholder="email@example.com" 
                        type="email"
                        value={personData.email || ""}
                        onChange={(e) => setPersonData({ ...personData, email: e.target.value })}
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="person-phone">
                        Telephone
                        <span className="text-gray-500 text-sm ml-1">(optional)</span>
                      </Label>
                      <Input 
                        id="person-phone" 
                        placeholder="+1 123-456-7890" 
                        value={personData.telephone || ""}
                        onChange={(e) => setPersonData({ ...personData, telephone: e.target.value })}
                      />
                    </div>
                  </div>
                  
                  <div>
                    <Label htmlFor="person-address">
                      Address
                      <span className="text-gray-500 text-sm ml-1">(optional)</span>
                    </Label>
                    <Input 
                      id="person-address" 
                      placeholder="Enter address" 
                      value={personData.address || ""}
                      onChange={(e) => setPersonData({ ...personData, address: e.target.value })}
                    />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="person-birthdate">
                        Birth Date
                        <span className="text-gray-500 text-sm ml-1">(optional)</span>
                      </Label>
                      <Input 
                        id="person-birthdate" 
                        type="date"
                        value={personData.birthDate || ""}
                        onChange={(e) => setPersonData({ ...personData, birthDate: e.target.value })}
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="person-url">
                        Website URL
                        <span className="text-gray-500 text-sm ml-1">(optional)</span>
                      </Label>
                      <Input 
                        id="person-url" 
                        placeholder="https://example.com" 
                        value={personData.url || ""}
                        onChange={(e) => setPersonData({ ...personData, url: e.target.value })}
                      />
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <Label>
                        Social Profiles
                        <span className="text-gray-500 text-sm ml-1">(optional)</span>
                      </Label>
                      <Button 
                        type="button" 
                        size="sm" 
                        onClick={() => handleAddArrayItem(setPersonData, "sameAs")}
                      >
                        Add Profile
                      </Button>
                    </div>
                    
                    {personData.sameAs?.map((profile, index) => (
                      <div key={index} className="flex items-center mb-2">
                        <Input 
                          placeholder="https://twitter.com/username" 
                          value={profile}
                          onChange={(e) => handleUpdateArrayItem(setPersonData, "sameAs", index, e.target.value)}
                          className="flex-grow"
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          className="ml-2 h-8 w-8 p-0"
                          onClick={() => handleRemoveArrayItem(setPersonData, "sameAs", index)}
                          disabled={personData.sameAs?.length === 1}
                        >
                          ×
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              
              {/* Organization Schema Form */}
              {schemaType === "Organization" && (
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="org-name">Organization Name</Label>
                    <Input 
                      id="org-name" 
                      placeholder="Enter organization name" 
                      value={organizationData.name}
                      onChange={(e) => setOrganizationData({ ...organizationData, name: e.target.value })}
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="org-description">Description</Label>
                    <Textarea 
                      id="org-description" 
                      placeholder="Enter organization description" 
                      className="min-h-[100px]"
                      value={organizationData.description}
                      onChange={(e) => setOrganizationData({ ...organizationData, description: e.target.value })}
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="org-logo">Logo URL</Label>
                    <Input 
                      id="org-logo" 
                      placeholder="https://example.com/logo.png" 
                      value={organizationData.logo}
                      onChange={(e) => setOrganizationData({ ...organizationData, logo: e.target.value })}
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="org-url">Website URL</Label>
                    <Input 
                      id="org-url" 
                      placeholder="https://example.com" 
                      value={organizationData.url}
                      onChange={(e) => setOrganizationData({ ...organizationData, url: e.target.value })}
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="org-address">
                      Address
                      <span className="text-gray-500 text-sm ml-1">(optional)</span>
                    </Label>
                    <Input 
                      id="org-address" 
                      placeholder="123 Main St, City, State, ZIP" 
                      value={organizationData.address || ""}
                      onChange={(e) => setOrganizationData({ ...organizationData, address: e.target.value })}
                    />
                  </div>
                  
                  <div className="p-4 border rounded-md mb-4">
                    <h4 className="font-medium mb-2">Contact Point</h4>
                    
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="org-phone">Telephone</Label>
                        <Input 
                          id="org-phone" 
                          placeholder="+1 123-456-7890" 
                          value={organizationData.contactPoint?.telephone || ""}
                          onChange={(e) => setOrganizationData({
                            ...organizationData,
                            contactPoint: { 
                              ...organizationData.contactPoint,
                              telephone: e.target.value
                            }
                          })}
                        />
                      </div>
                      
                      <div>
                        <Label htmlFor="org-email">
                          Email
                          <span className="text-gray-500 text-sm ml-1">(optional)</span>
                        </Label>
                        <Input 
                          id="org-email" 
                          type="email"
                          placeholder="contact@example.com" 
                          value={organizationData.contactPoint?.email || ""}
                          onChange={(e) => setOrganizationData({
                            ...organizationData,
                            contactPoint: { 
                              ...organizationData.contactPoint,
                              email: e.target.value
                            }
                          })}
                        />
                      </div>
                      
                      <div>
                        <Label htmlFor="contact-type">Contact Type</Label>
                        <Select 
                          value={organizationData.contactPoint?.contactType || "Customer Service"}
                          onValueChange={(value) => setOrganizationData({
                            ...organizationData,
                            contactPoint: { 
                              ...organizationData.contactPoint,
                              contactType: value
                            }
                          })}
                        >
                          <SelectTrigger id="contact-type">
                            <SelectValue placeholder="Select contact type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Customer Service">Customer Service</SelectItem>
                            <SelectItem value="Technical Support">Technical Support</SelectItem>
                            <SelectItem value="Sales">Sales</SelectItem>
                            <SelectItem value="Billing">Billing</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <Label>
                        Social Profiles
                        <span className="text-gray-500 text-sm ml-1">(optional)</span>
                      </Label>
                      <Button 
                        type="button" 
                        size="sm" 
                        onClick={() => handleAddArrayItem(setOrganizationData, "sameAs")}
                      >
                        Add Profile
                      </Button>
                    </div>
                    
                    {organizationData.sameAs?.map((profile, index) => (
                      <div key={index} className="flex items-center mb-2">
                        <Input 
                          placeholder="https://twitter.com/company" 
                          value={profile}
                          onChange={(e) => handleUpdateArrayItem(setOrganizationData, "sameAs", index, e.target.value)}
                          className="flex-grow"
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          className="ml-2 h-8 w-8 p-0"
                          onClick={() => handleRemoveArrayItem(setOrganizationData, "sameAs", index)}
                          disabled={organizationData.sameAs?.length === 1}
                        >
                          ×
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              
              {/* Recipe Schema Form */}
              {schemaType === "Recipe" && (
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="recipe-name">Recipe Name</Label>
                    <Input 
                      id="recipe-name" 
                      placeholder="Enter recipe name" 
                      value={recipeData.name}
                      onChange={(e) => setRecipeData({ ...recipeData, name: e.target.value })}
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="recipe-description">Description</Label>
                    <Textarea 
                      id="recipe-description" 
                      placeholder="Enter recipe description" 
                      className="min-h-[100px]"
                      value={recipeData.description}
                      onChange={(e) => setRecipeData({ ...recipeData, description: e.target.value })}
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="recipe-author">Author</Label>
                    <Input 
                      id="recipe-author" 
                      placeholder="Enter recipe author" 
                      value={recipeData.author}
                      onChange={(e) => setRecipeData({ ...recipeData, author: e.target.value })}
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="recipe-image">Image URL</Label>
                    <Input 
                      id="recipe-image" 
                      placeholder="https://example.com/recipe.jpg" 
                      value={recipeData.image}
                      onChange={(e) => setRecipeData({ ...recipeData, image: e.target.value })}
                    />
                  </div>
                  
                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <Label htmlFor="recipe-prep-time">
                        Prep Time
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Info className="h-4 w-4 ml-1 inline-block" />
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>ISO 8601 duration format:<br/>PT15M (15 minutes)</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </Label>
                      <Input 
                        id="recipe-prep-time" 
                        placeholder="PT15M" 
                        value={recipeData.prepTime}
                        onChange={(e) => setRecipeData({ ...recipeData, prepTime: e.target.value })}
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="recipe-cook-time">
                        Cook Time
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Info className="h-4 w-4 ml-1 inline-block" />
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>ISO 8601 duration format:<br/>PT1H (1 hour)</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </Label>
                      <Input 
                        id="recipe-cook-time" 
                        placeholder="PT1H" 
                        value={recipeData.cookTime}
                        onChange={(e) => setRecipeData({ ...recipeData, cookTime: e.target.value })}
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="recipe-total-time">
                        Total Time
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Info className="h-4 w-4 ml-1 inline-block" />
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>ISO 8601 duration format:<br/>PT1H15M (1 hour, 15 min)</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </Label>
                      <Input 
                        id="recipe-total-time" 
                        placeholder="PT1H15M" 
                        value={recipeData.totalTime}
                        onChange={(e) => setRecipeData({ ...recipeData, totalTime: e.target.value })}
                      />
                    </div>
                  </div>
                  
                  <div>
                    <Label htmlFor="recipe-yield">Yield</Label>
                    <Input 
                      id="recipe-yield" 
                      placeholder="4 servings" 
                      value={recipeData.recipeYield}
                      onChange={(e) => setRecipeData({ ...recipeData, recipeYield: e.target.value })}
                    />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="recipe-category">
                        Category
                        <span className="text-gray-500 text-sm ml-1">(optional)</span>
                      </Label>
                      <Input 
                        id="recipe-category" 
                        placeholder="Dessert" 
                        value={recipeData.recipeCategory || ""}
                        onChange={(e) => setRecipeData({ ...recipeData, recipeCategory: e.target.value })}
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="recipe-cuisine">
                        Cuisine
                        <span className="text-gray-500 text-sm ml-1">(optional)</span>
                      </Label>
                      <Input 
                        id="recipe-cuisine" 
                        placeholder="Italian" 
                        value={recipeData.recipeCuisine || ""}
                        onChange={(e) => setRecipeData({ ...recipeData, recipeCuisine: e.target.value })}
                      />
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <Label>Ingredients</Label>
                      <Button 
                        type="button" 
                        size="sm" 
                        onClick={() => handleAddArrayItem(setRecipeData, "ingredients")}
                      >
                        Add Ingredient
                      </Button>
                    </div>
                    
                    {recipeData.ingredients.map((ingredient, index) => (
                      <div key={index} className="flex items-center mb-2">
                        <Input 
                          placeholder="2 cups flour" 
                          value={ingredient}
                          onChange={(e) => handleUpdateArrayItem(setRecipeData, "ingredients", index, e.target.value)}
                          className="flex-grow"
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          className="ml-2 h-8 w-8 p-0"
                          onClick={() => handleRemoveArrayItem(setRecipeData, "ingredients", index)}
                          disabled={recipeData.ingredients.length === 1}
                        >
                          ×
                        </Button>
                      </div>
                    ))}
                  </div>
                  
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <Label>Instructions</Label>
                      <Button 
                        type="button" 
                        size="sm" 
                        onClick={() => handleAddArrayItem(setRecipeData, "instructions")}
                      >
                        Add Instruction
                      </Button>
                    </div>
                    
                    {recipeData.instructions.map((instruction, index) => (
                      <div key={index} className="flex items-center mb-2">
                        <Textarea
                          placeholder="Mix the flour and water..." 
                          value={instruction}
                          onChange={(e) => handleUpdateArrayItem(setRecipeData, "instructions", index, e.target.value)}
                          className="flex-grow min-h-[80px]"
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          className="ml-2 h-8 w-8 p-0 self-start mt-2"
                          onClick={() => handleRemoveArrayItem(setRecipeData, "instructions", index)}
                          disabled={recipeData.instructions.length === 1}
                        >
                          ×
                        </Button>
                      </div>
                    ))}
                  </div>
                  
                  <div>
                    <Label htmlFor="recipe-calories">
                      Calories
                      <span className="text-gray-500 text-sm ml-1">(optional)</span>
                    </Label>
                    <Input 
                      id="recipe-calories" 
                      placeholder="270 calories" 
                      value={recipeData.nutrition?.calories || ""}
                      onChange={(e) => setRecipeData({
                        ...recipeData,
                        nutrition: { calories: e.target.value }
                      })}
                    />
                  </div>
                </div>
              )}
              
              {/* VideoObject Schema Form */}
              {schemaType === "VideoObject" && (
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="video-name">Video Title</Label>
                    <Input 
                      id="video-name" 
                      placeholder="Enter video title" 
                      value={videoData.name}
                      onChange={(e) => setVideoData({ ...videoData, name: e.target.value })}
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="video-description">Description</Label>
                    <Textarea 
                      id="video-description" 
                      placeholder="Enter video description" 
                      className="min-h-[100px]"
                      value={videoData.description}
                      onChange={(e) => setVideoData({ ...videoData, description: e.target.value })}
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="video-thumbnail">Thumbnail URL</Label>
                    <Input 
                      id="video-thumbnail" 
                      placeholder="https://example.com/thumbnail.jpg" 
                      value={videoData.thumbnailUrl}
                      onChange={(e) => setVideoData({ ...videoData, thumbnailUrl: e.target.value })}
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="video-upload-date">Upload Date</Label>
                    <Input 
                      id="video-upload-date" 
                      type="date"
                      value={videoData.uploadDate}
                      onChange={(e) => setVideoData({ ...videoData, uploadDate: e.target.value })}
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="video-duration">
                      Duration
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Info className="h-4 w-4 ml-1 inline-block" />
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>ISO 8601 duration format:<br/>PT1M30S (1 minute, 30 seconds)</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </Label>
                    <Input 
                      id="video-duration" 
                      placeholder="PT1M30S" 
                      value={videoData.duration}
                      onChange={(e) => setVideoData({ ...videoData, duration: e.target.value })}
                    />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="video-content-url">
                        Content URL
                        <span className="text-gray-500 text-sm ml-1">(optional)</span>
                      </Label>
                      <Input 
                        id="video-content-url" 
                        placeholder="https://example.com/video.mp4" 
                        value={videoData.contentUrl || ""}
                        onChange={(e) => setVideoData({ ...videoData, contentUrl: e.target.value })}
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="video-embed-url">
                        Embed URL
                        <span className="text-gray-500 text-sm ml-1">(optional)</span>
                      </Label>
                      <Input 
                        id="video-embed-url" 
                        placeholder="https://youtube.com/embed/xyz" 
                        value={videoData.embedUrl || ""}
                        onChange={(e) => setVideoData({ ...videoData, embedUrl: e.target.value })}
                      />
                    </div>
                  </div>
                  
                  <div>
                    <Label htmlFor="video-publisher">Publisher Name</Label>
                    <Input 
                      id="video-publisher" 
                      placeholder="Enter publisher name" 
                      value={videoData.publisher}
                      onChange={(e) => setVideoData({ ...videoData, publisher: e.target.value })}
                    />
                  </div>
                </div>
              )}
            </CardContent>
            
            <CardFooter>
              <Button onClick={generateSchema} className="w-full">Generate Schema</Button>
            </CardFooter>
          </Card>
        </div>
        
        <div className="lg:col-span-7">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle>Schema Output</CardTitle>
                  <CardDescription>
                    Generated schema.org structured data
                  </CardDescription>
                </div>
                
                <div className="flex items-center space-x-2">
                  {schemaScore > 0 && (
                    <div className="flex items-center">
                      <Badge variant={schemaScore >= 80 ? "default" : schemaScore >= 60 ? "outline" : "destructive"}>
                        AEO Score: <span className={getScoreColor(schemaScore)}>{schemaScore}</span>
                      </Badge>
                    </div>
                  )}
                </div>
              </div>
            </CardHeader>
            
            <CardContent>
              <div className="mb-4">
                <div className="flex justify-between items-center">
                  <div className="flex space-x-2">
                    <Button
                      variant={previewMode === "code" ? "default" : "outline"}
                      size="sm"
                      onClick={() => setPreviewMode("code")}
                    >
                      Code
                    </Button>
                    <Button
                      variant={previewMode === "preview" ? "default" : "outline"}
                      size="sm"
                      onClick={() => setPreviewMode("preview")}
                    >
                      Preview
                    </Button>
                  </div>
                  
                  {schemaCode && (
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={handleCopyCode}
                      className="ml-auto"
                    >
                      {copied ? <CheckIcon className="h-4 w-4 mr-1" /> : <Copy className="h-4 w-4 mr-1" />}
                      {copied ? "Copied" : "Copy"}
                    </Button>
                  )}
                </div>
              </div>
              
              {schemaCode ? (
                previewMode === "code" ? (
                  <div className="p-4 bg-gray-100 rounded-md">
                    <pre className="whitespace-pre-wrap font-mono text-sm overflow-auto max-h-[500px]">
                      {schemaCode}
                    </pre>
                  </div>
                ) : (
                  getSchemaPreview()
                )
              ) : (
                <div className="text-center p-8 border border-dashed rounded-md">
                  <p className="text-gray-500">Fill out the form and click Generate Schema to see the output here</p>
                </div>
              )}
            </CardContent>
            
            <CardFooter className="flex-col items-start space-y-4">
              <div className="w-full">
                <h3 className="font-semibold mb-1">Schema Implementation</h3>
                <p className="text-sm text-gray-600 mb-2">
                  After generating the schema, add it to your website using one of these methods:
                </p>
                
                <div className="space-y-2">
                  <div className="p-3 bg-gray-100 rounded text-sm">
                    <strong>JSON-LD (Recommended):</strong> Add to the &lt;head&gt; section:
                    <div className="mt-1 font-mono text-xs">
                      &lt;script type="application/ld+json"&gt;<br />
                      {"{schema JSON}"}<br />
                      &lt;/script&gt;
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="w-full">
                <h3 className="font-semibold mb-1">Validate Your Schema</h3>
                <p className="text-sm text-gray-600 mb-2">
                  Make sure to validate your schema using these tools:
                </p>
                
                <div className="flex flex-wrap gap-2">
                  <Button variant="outline" size="sm" asChild>
                    <a 
                      href="https://validator.schema.org/" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="inline-flex items-center"
                    >
                      Schema Validator
                      <ExternalLink className="h-3 w-3 ml-1" />
                    </a>
                  </Button>
                  <Button variant="outline" size="sm" asChild>
                    <a 
                      href="https://search.google.com/test/rich-results" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="inline-flex items-center"
                    >
                      Rich Results Test
                      <ExternalLink className="h-3 w-3 ml-1" />
                    </a>
                  </Button>
                </div>
              </div>
              
              <div className="w-full">
                <h3 className="font-semibold mb-1">AEO Impact</h3>
                <p className="text-sm text-gray-600">
                  Adding proper schema markup allows AI systems to better understand your content, 
                  improving your chances of appearing in AI-generated answers.
                  Each schema type helps AI systems recognize specific content types like articles, products, FAQs, events, 
                  business information, how-to guides, people, organizations, recipes, and videos.
                </p>
              </div>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default SchemaGenerator;

