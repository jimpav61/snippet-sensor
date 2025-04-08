
import React from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { ChevronLeft, BookOpen } from 'lucide-react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import PromptOptimizer from '@/components/tools/PromptOptimizer';
import CustomSchemaGeneratorWrapper from '@/components/tools/CustomSchemaGeneratorWrapper';
import AEOAnalyzer from '@/components/tools/AEOAnalyzer';

// This helps to prevent the error in SchemaGenerator.tsx 
// by properly handling the tool data and component rendering
const toolsData = [
  {
    slug: "aeo-analyzer",
    title: "AEO Analyzer Tool",
    description: "Interactive tool to analyze your AI content and get recommendations for optimization",
    category: "Content Analysis",
    readTime: "Interactive",
    relatedGuide: "aeo-analyzer-guide",
    content: [
      "This interactive tool allows you to analyze your AI content and get actionable recommendations.",
      "Upload your content or enter a URL to get started with a comprehensive analysis.",
      "The analyzer will evaluate your content against key AI optimization factors and provide specific improvement suggestions.",
      "Please note this is a placeholder. In a production environment, this would be a fully interactive tool."
    ]
  },
  {
    slug: "prompt-optimizer",
    title: "Prompt Optimization Tool",
    description: "Tool to improve your AI prompts for better responses and clearer understanding",
    category: "Prompting",
    readTime: "Interactive",
    content: [
      "The Prompt Optimization Tool helps you craft more effective prompts for AI systems.",
      "Enter your existing prompt to receive suggestions for clarity, specificity, and context improvements.",
      "See side-by-side comparisons of optimized vs. original prompts with expected outcome differences."
    ]
  },
  {
    slug: "schema-generator",
    title: "AI Schema Generator",
    description: "Generate structured data schemas that help AI systems understand your content",
    category: "Technical SEO",
    readTime: "Interactive",
    relatedGuide: "schema-guide",
    content: [
      "The AI Schema Generator creates structured data markup to help AI systems better understand your content.",
      "Select your content type and enter key information to generate ready-to-use schema markup.",
      "Now supporting Article, Product, FAQ, Event, Local Business, How-To, Person, Organization, Recipe, and Video schema types.",
      "The tool provides an AEO score to evaluate how well your schema will help AI systems interpret your content.",
      "Use the validation tools to ensure your schema meets technical requirements for implementation."
    ]
  }
];

const ToolPage = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const tool = toolsData.find(tool => tool.slug === slug);

  // Handle back navigation manually to avoid JSON.parse issues
  const handleBackClick = (e: React.MouseEvent) => {
    e.preventDefault();
    navigate('/aeo/learning/tools');
  };

  // Improved tool component rendering with error boundary pattern
  const renderToolComponent = () => {
    try {
      if (slug === 'prompt-optimizer') {
        return <PromptOptimizer />;
      } else if (slug === 'schema-generator') {
        // Use our custom wrapper with the new schema generator implementation
        return <CustomSchemaGeneratorWrapper />;
      } else if (slug === 'aeo-analyzer') {
        return <AEOAnalyzer />;
      } else {
        return (
          <div className="prose prose-lg max-w-none">
            {tool?.content.map((paragraph, index) => (
              <p key={index} className="mb-4">{paragraph}</p>
            ))}
          </div>
        );
      }
    } catch (error) {
      console.error("Error rendering tool component:", error);
      return (
        <div className="text-center p-8 bg-red-50 rounded-lg">
          <h3 className="text-lg font-semibold text-red-600">Something went wrong</h3>
          <p className="text-gray-700">There was an error loading this tool. Please try again later.</p>
          <Button onClick={handleBackClick} className="mt-4">
            Back to Tools
          </Button>
        </div>
      );
    }
  };

  if (!tool) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow flex items-center justify-center">
          <div className="text-center">
            <h1 className="heading-lg mb-4">Tool Not Found</h1>
            <Button onClick={() => navigate('/aeo/learning/tools')}>
              Back to Tools
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow">
        <div className="max-w-5xl mx-auto px-4 py-12">
          <div className="mb-8">
            <Button 
              variant="ghost" 
              className="p-0 hover:bg-transparent mb-4"
              onClick={handleBackClick}
            >
              <ChevronLeft className="h-5 w-5 mr-1" />
              Back to Tools
            </Button>
            
            <div className="flex items-center gap-2 mb-4">
              <span className="text-sm font-medium text-aeo-500 bg-aeo-50 px-3 py-1 rounded-full">
                {tool?.category}
              </span>
              <span className="text-sm text-gray-500">{tool?.readTime}</span>
            </div>
            
            <h1 className="heading-xl mb-6">{tool?.title}</h1>
            <p className="text-lg text-gray-700 mb-8">{tool?.description}</p>
            
            {tool?.relatedGuide && (
              <Button 
                variant="link" 
                className="inline-flex items-center text-aeo-600 hover:text-aeo-700 mb-6 p-0"
                onClick={() => navigate(`/aeo/learning/guide/${tool.relatedGuide}`)}
              >
                <BookOpen className="h-4 w-4 mr-2" />
                View guide for this tool
              </Button>
            )}
          </div>
          
          {renderToolComponent()}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default ToolPage;
