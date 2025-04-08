
import React, { useState } from 'react';
import { JsonLd } from 'react-schemaorg';
import { Thing } from 'schema-dts';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Clipboard, CheckCircle2 } from 'lucide-react';
import { toast } from 'sonner';

type SchemaType = 
  | 'Article' 
  | 'Product' 
  | 'LocalBusiness' 
  | 'FAQPage' 
  | 'Event' 
  | 'Person' 
  | 'Organization' 
  | 'Recipe' 
  | 'HowTo';

interface SchemaField {
  name: string;
  label: string;
  type: 'text' | 'textarea' | 'url';
  required: boolean;
}

// Define fields for each schema type
const schemaFields: Record<SchemaType, SchemaField[]> = {
  Article: [
    { name: 'headline', label: 'Headline', type: 'text', required: true },
    { name: 'description', label: 'Description', type: 'textarea', required: true },
    { name: 'authorName', label: 'Author Name', type: 'text', required: true },
    { name: 'datePublished', label: 'Date Published', type: 'text', required: true },
    { name: 'image', label: 'Image URL', type: 'url', required: false },
  ],
  Product: [
    { name: 'name', label: 'Product Name', type: 'text', required: true },
    { name: 'description', label: 'Description', type: 'textarea', required: true },
    { name: 'price', label: 'Price', type: 'text', required: true },
    { name: 'priceCurrency', label: 'Currency (USD, EUR, etc)', type: 'text', required: true },
    { name: 'image', label: 'Image URL', type: 'url', required: false },
  ],
  LocalBusiness: [
    { name: 'name', label: 'Business Name', type: 'text', required: true },
    { name: 'description', label: 'Description', type: 'textarea', required: true },
    { name: 'address', label: 'Address', type: 'text', required: true },
    { name: 'telephone', label: 'Telephone', type: 'text', required: false },
    { name: 'image', label: 'Image URL', type: 'url', required: false },
  ],
  FAQPage: [
    { name: 'question1', label: 'Question 1', type: 'text', required: true },
    { name: 'answer1', label: 'Answer 1', type: 'textarea', required: true },
    { name: 'question2', label: 'Question 2', type: 'text', required: false },
    { name: 'answer2', label: 'Answer 2', type: 'textarea', required: false },
  ],
  Event: [
    { name: 'name', label: 'Event Name', type: 'text', required: true },
    { name: 'description', label: 'Description', type: 'textarea', required: true },
    { name: 'startDate', label: 'Start Date', type: 'text', required: true },
    { name: 'location', label: 'Location', type: 'text', required: true },
    { name: 'image', label: 'Image URL', type: 'url', required: false },
  ],
  Person: [
    { name: 'name', label: 'Full Name', type: 'text', required: true },
    { name: 'jobTitle', label: 'Job Title', type: 'text', required: false },
    { name: 'telephone', label: 'Telephone', type: 'text', required: false },
    { name: 'email', label: 'Email', type: 'text', required: false },
    { name: 'image', label: 'Image URL', type: 'url', required: false },
  ],
  Organization: [
    { name: 'name', label: 'Organization Name', type: 'text', required: true },
    { name: 'description', label: 'Description', type: 'textarea', required: true },
    { name: 'url', label: 'Website URL', type: 'url', required: false },
    { name: 'logo', label: 'Logo URL', type: 'url', required: false },
  ],
  Recipe: [
    { name: 'name', label: 'Recipe Name', type: 'text', required: true },
    { name: 'description', label: 'Description', type: 'textarea', required: true },
    { name: 'recipeIngredient', label: 'Ingredients (one per line)', type: 'textarea', required: true },
    { name: 'recipeInstructions', label: 'Instructions', type: 'textarea', required: true },
    { name: 'image', label: 'Image URL', type: 'url', required: false },
  ],
  HowTo: [
    { name: 'name', label: 'How-To Title', type: 'text', required: true },
    { name: 'description', label: 'Description', type: 'textarea', required: true },
    { name: 'step1', label: 'Step 1', type: 'text', required: true },
    { name: 'step2', label: 'Step 2', type: 'text', required: false },
    { name: 'step3', label: 'Step 3', type: 'text', required: false },
    { name: 'image', label: 'Image URL', type: 'url', required: false },
  ],
};

const SimpleSchemaGenerator: React.FC = () => {
  const [schemaType, setSchemaType] = useState<SchemaType>('Article');
  const [formData, setFormData] = useState<Record<string, string>>({});
  const [schema, setSchema] = useState<any>(null);
  const [copied, setCopied] = useState(false);

  const handleInputChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const generateSchema = () => {
    try {
      let generatedSchema: any = {
        '@context': 'https://schema.org',
        '@type': schemaType,
      };

      // Add additional properties based on schema type
      switch (schemaType) {
        case 'Article':
          generatedSchema = {
            ...generatedSchema,
            headline: formData.headline,
            description: formData.description,
            author: {
              '@type': 'Person',
              name: formData.authorName,
            },
            datePublished: formData.datePublished,
            ...(formData.image && { image: formData.image }),
          };
          break;
        case 'Product':
          generatedSchema = {
            ...generatedSchema,
            name: formData.name,
            description: formData.description,
            offers: {
              '@type': 'Offer',
              price: formData.price,
              priceCurrency: formData.priceCurrency,
            },
            ...(formData.image && { image: formData.image }),
          };
          break;
        case 'LocalBusiness':
          generatedSchema = {
            ...generatedSchema,
            name: formData.name,
            description: formData.description,
            address: {
              '@type': 'PostalAddress',
              streetAddress: formData.address,
            },
            ...(formData.telephone && { telephone: formData.telephone }),
            ...(formData.image && { image: formData.image }),
          };
          break;
        case 'FAQPage':
          generatedSchema = {
            ...generatedSchema,
            mainEntity: [
              {
                '@type': 'Question',
                name: formData.question1,
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: formData.answer1,
                },
              },
              ...(formData.question2 && formData.answer2 ? [
                {
                  '@type': 'Question',
                  name: formData.question2,
                  acceptedAnswer: {
                    '@type': 'Answer',
                    text: formData.answer2,
                  },
                },
              ] : []),
            ],
          };
          break;
        case 'Event':
          generatedSchema = {
            ...generatedSchema,
            name: formData.name,
            description: formData.description,
            startDate: formData.startDate,
            location: {
              '@type': 'Place',
              name: formData.location,
            },
            ...(formData.image && { image: formData.image }),
          };
          break;
        case 'Person':
          generatedSchema = {
            ...generatedSchema,
            name: formData.name,
            ...(formData.jobTitle && { jobTitle: formData.jobTitle }),
            ...(formData.telephone && { telephone: formData.telephone }),
            ...(formData.email && { email: formData.email }),
            ...(formData.image && { image: formData.image }),
          };
          break;
        case 'Organization':
          generatedSchema = {
            ...generatedSchema,
            name: formData.name,
            description: formData.description,
            ...(formData.url && { url: formData.url }),
            ...(formData.logo && { logo: formData.logo }),
          };
          break;
        case 'Recipe':
          generatedSchema = {
            ...generatedSchema,
            name: formData.name,
            description: formData.description,
            recipeIngredient: formData.recipeIngredient.split('\n').filter(line => line.trim()),
            recipeInstructions: formData.recipeInstructions,
            ...(formData.image && { image: formData.image }),
          };
          break;
        case 'HowTo':
          generatedSchema = {
            ...generatedSchema,
            name: formData.name,
            description: formData.description,
            step: [
              {
                '@type': 'HowToStep',
                text: formData.step1,
              },
              ...(formData.step2 ? [
                {
                  '@type': 'HowToStep',
                  text: formData.step2,
                },
              ] : []),
              ...(formData.step3 ? [
                {
                  '@type': 'HowToStep',
                  text: formData.step3,
                },
              ] : []),
            ],
            ...(formData.image && { image: formData.image }),
          };
          break;
      }

      setSchema(generatedSchema);
      toast.success('Schema generated successfully', {
        description: 'Your schema has been created. You can now view and copy it.',
      });
    } catch (error) {
      console.error('Error generating schema:', error);
      toast.error('Failed to generate schema', {
        description: 'There was an error generating your schema. Please check your inputs.',
      });
    }
  };

  const copyToClipboard = () => {
    if (schema) {
      navigator.clipboard.writeText(JSON.stringify(schema, null, 2))
        .then(() => {
          setCopied(true);
          toast.success('Copied to clipboard');
          setTimeout(() => setCopied(false), 2000);
        })
        .catch(() => {
          toast.error('Failed to copy');
        });
    }
  };

  const handleSchemaTypeChange = (value: string) => {
    setSchemaType(value as SchemaType);
    setFormData({});
    setSchema(null);
  };

  const renderFields = () => {
    const fields = schemaFields[schemaType];
    return fields.map((field) => (
      <div key={field.name} className="mb-4">
        <Label htmlFor={field.name} className="mb-2">
          {field.label} {field.required && <span className="text-red-500">*</span>}
        </Label>
        {field.type === 'textarea' ? (
          <Textarea
            id={field.name}
            value={formData[field.name] || ''}
            onChange={(e) => handleInputChange(field.name, e.target.value)}
            className="w-full"
            rows={4}
          />
        ) : (
          <Input
            id={field.name}
            type={field.type}
            value={formData[field.name] || ''}
            onChange={(e) => handleInputChange(field.name, e.target.value)}
            className="w-full"
          />
        )}
      </div>
    ));
  };

  const isFormValid = () => {
    const fields = schemaFields[schemaType];
    return fields
      .filter(field => field.required)
      .every(field => formData[field.name]?.trim());
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="heading-xl mb-8 text-center">AI Schema Generator</h1>
      
      <div className="mb-8 p-4 bg-aeo-50 rounded-lg">
        <p className="text-sm text-gray-700">
          Structured data helps AI engines better understand your content. Select a schema type and 
          fill out the form below to generate JSON-LD markup that can be added to your website.
        </p>
      </div>

      <Tabs defaultValue="generator" className="w-full">
        <TabsList className="grid grid-cols-2 mb-8">
          <TabsTrigger value="generator">Generator</TabsTrigger>
          <TabsTrigger value="preview" disabled={!schema}>Preview</TabsTrigger>
        </TabsList>
        
        <TabsContent value="generator">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <Card>
              <CardHeader>
                <CardTitle>Schema Information</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="mb-6">
                  <Label htmlFor="schemaType" className="mb-2">Schema Type</Label>
                  <Select 
                    value={schemaType} 
                    onValueChange={handleSchemaTypeChange}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select schema type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Article">Article</SelectItem>
                      <SelectItem value="Product">Product</SelectItem>
                      <SelectItem value="LocalBusiness">Local Business</SelectItem>
                      <SelectItem value="FAQPage">FAQ Page</SelectItem>
                      <SelectItem value="Event">Event</SelectItem>
                      <SelectItem value="Person">Person</SelectItem>
                      <SelectItem value="Organization">Organization</SelectItem>
                      <SelectItem value="Recipe">Recipe</SelectItem>
                      <SelectItem value="HowTo">How-To</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                {renderFields()}
                
                <Button 
                  onClick={generateSchema} 
                  className="w-full mt-4"
                  disabled={!isFormValid()}
                >
                  Generate Schema
                </Button>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="flex justify-between items-center">
                  <span>Generated Schema</span>
                  {schema && (
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={copyToClipboard}
                      className="flex items-center gap-1"
                    >
                      {copied ? <CheckCircle2 className="h-4 w-4" /> : <Clipboard className="h-4 w-4" />}
                      {copied ? 'Copied' : 'Copy'}
                    </Button>
                  )}
                </CardTitle>
              </CardHeader>
              <CardContent>
                {schema ? (
                  <pre className="bg-gray-100 p-4 rounded-md overflow-auto max-h-[500px] text-sm">
                    {JSON.stringify(schema, null, 2)}
                  </pre>
                ) : (
                  <div className="text-center py-8 text-gray-500">
                    Fill out the form and click "Generate Schema" to see the result
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="preview">
          {schema && (
            <Card>
              <CardHeader>
                <CardTitle>Live Schema Preview</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="bg-gray-100 p-4 rounded-md">
                  <p className="mb-4">
                    This is how your schema would be implemented on a webpage:
                  </p>
                  <pre className="bg-gray-200 p-4 rounded-md overflow-auto text-sm">
                    {`<script type="application/ld+json">
${JSON.stringify(schema, null, 2)}
</script>`}
                  </pre>
                </div>
                
                <div className="mt-8">
                  <h3 className="text-lg font-semibold mb-4">Implementation Instructions</h3>
                  <ol className="list-decimal pl-5 space-y-2">
                    <li>Copy the above code</li>
                    <li>Paste it in the <code>&lt;head&gt;</code> section of your HTML</li>
                    <li>Verify using Google's Rich Results Test tool</li>
                  </ol>
                </div>
                
                <div className="mt-8 p-4 bg-blue-50 rounded-md">
                  <h4 className="font-medium text-blue-800 mb-2">AEO Impact</h4>
                  <p className="text-sm text-gray-700">
                    By adding this schema markup, you're helping AI systems understand the context 
                    and structure of your content, which can improve how your page appears in AI-powered 
                    search results and other AI-driven interfaces.
                  </p>
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>
      
      {/* Hidden JsonLd component for demonstration */}
      {schema && (
        <div style={{ display: 'none' }}>
          <JsonLd<Thing> item={schema} />
        </div>
      )}
    </div>
  );
};

export default SimpleSchemaGenerator;
