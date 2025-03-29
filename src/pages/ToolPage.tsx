
import React from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { ChevronLeft } from 'lucide-react';
import { Link, useParams } from 'react-router-dom';

// Dedicated tools data to match ToolsPage
const toolsData = [
  {
    slug: "aeo-analyzer",
    title: "AEO Analyzer Tool",
    description: "Interactive tool to analyze your AI content and get recommendations for optimization",
    category: "Content Analysis",
    readTime: "Interactive",
    content: [
      "This interactive tool allows you to analyze your AI content and get actionable recommendations.",
      "Upload your content or enter a URL to get started with a comprehensive analysis.",
      "The analyzer will evaluate your content against key AI optimization factors and provide specific improvement suggestions.",
      "Please note this is a placeholder. In a production environment, this would be a fully interactive tool with analysis capabilities."
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
      "See side-by-side comparisons of optimized vs. original prompts with expected outcome differences.",
      "Please note this is a placeholder. In a production environment, this would be a fully interactive tool."
    ]
  },
  {
    slug: "schema-generator",
    title: "AI Schema Generator",
    description: "Generate structured data schemas that help AI systems understand your content",
    category: "Technical SEO",
    readTime: "Interactive",
    content: [
      "The AI Schema Generator creates structured data markup to help AI systems better understand your content.",
      "Select your content type and enter key information to generate ready-to-use schema markup.",
      "Preview how AI systems will interpret your content with the generated schema applied.",
      "Please note this is a placeholder. In a production environment, this would be a fully interactive tool."
    ]
  },
  {
    slug: "fashion-retailer-case-study",
    title: "Fashion Retailer Analysis Tool",
    description: "Interactive tool for analyzing the fashion retail case study data",
    category: "Retail",
    readTime: "Interactive",
    content: [
      "This interactive tool allows you to explore the fashion retailer case study in depth.",
      "Analyze key metrics and performance indicators from the case study data.",
      "Compare different AI optimization strategies and their impact on retail performance.",
      "Please note this is a placeholder. In a production environment, this would be a fully interactive tool."
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
        <div className="max-w-4xl mx-auto px-4 py-12">
          <div className="mb-8">
            <Button variant="ghost" className="p-0 hover:bg-transparent mb-4" asChild>
              <Link to="/aeo/learning/tools">
                <ChevronLeft className="h-5 w-5 mr-1" />
                Back to Tools
              </Link>
            </Button>
            
            <div className="flex items-center gap-2 mb-4">
              <span className="text-sm font-medium text-aeo-500 bg-aeo-50 px-3 py-1 rounded-full">
                {tool.category}
              </span>
              <span className="text-sm text-gray-500">{tool.readTime}</span>
            </div>
            
            <h1 className="heading-xl mb-6">{tool.title}</h1>
            <p className="text-lg text-gray-700 mb-8">{tool.description}</p>
          </div>
          
          <div className="prose prose-lg max-w-none">
            {tool.content.map((paragraph, index) => (
              <p key={index} className="mb-4">{paragraph}</p>
            ))}
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default ToolPage;
