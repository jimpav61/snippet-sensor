import React from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { ChevronLeft, BookOpen } from 'lucide-react';
import { Link, useParams } from 'react-router-dom';
import PromptOptimizer from '@/components/tools/PromptOptimizer';
import SchemaGenerator from '@/components/tools/SchemaGenerator';
import AEOAnalyzer from '@/components/tools/AEOAnalyzer';

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
      "The tool provides an AEO score to evaluate how well your schema will help AI systems interpret your content.",
      "Use the validation tools to ensure your schema meets technical requirements for implementation."
    ]
  }
];

const ToolPage = () => {
  const { slug } = useParams();
  const tool = toolsData.find(tool => tool.slug === slug);

  if (!tool) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow flex items-center justify-center">
          <div className="text-center">
            <h1 className="heading-lg mb-4">Tool Not Found</h1>
            <Button asChild>
              <Link to="/aeo/learning/tools">Back to Tools</Link>
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
            <Button variant="ghost" className="p-0 hover:bg-transparent mb-4" asChild>
              <Link to="/aeo/learning/tools">
                <ChevronLeft className="h-5 w-5 mr-1" />
                Back to Tools
              </Link>
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
              <Link 
                to={`/aeo/learning/guide/${tool.relatedGuide}`} 
                className="inline-flex items-center text-aeo-600 hover:text-aeo-700 mb-6"
              >
                <BookOpen className="h-4 w-4 mr-2" />
                View guide for this tool
              </Link>
            )}
          </div>
          
          {slug === 'prompt-optimizer' ? (
            <PromptOptimizer />
          ) : slug === 'schema-generator' ? (
            <SchemaGenerator />
          ) : slug === 'aeo-analyzer' ? (
            <AEOAnalyzer />
          ) : (
            <div className="prose prose-lg max-w-none">
              {tool?.content.map((paragraph, index) => (
                <p key={index} className="mb-4">{paragraph}</p>
              ))}
            </div>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default ToolPage;
