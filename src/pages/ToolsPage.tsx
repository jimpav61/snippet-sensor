
import React from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import ResourceCard from '@/components/learning-center/ResourceCard';
import { Button } from '@/components/ui/button';
import { ChevronLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

// Create dedicated tools data
const toolsData = [
  {
    id: 1,
    slug: "aeo-analyzer",
    title: "AEO Analyzer Tool",
    description: "Interactive tool to analyze your AI content and get recommendations for optimization",
    category: "Content Analysis",
    readTime: "Interactive",
    type: "tool"
  },
  {
    id: 2,
    slug: "prompt-optimizer",
    title: "Prompt Optimization Tool",
    description: "Tool to improve your AI prompts for better responses and clearer understanding",
    category: "Prompting",
    readTime: "Interactive",
    type: "tool"
  },
  {
    id: 3,
    slug: "schema-generator",
    title: "AI Schema Generator",
    description: "Generate structured data schemas that help AI systems understand your content",
    category: "Technical SEO",
    readTime: "Interactive",
    type: "tool"
  },
  {
    id: 4,
    slug: "fashion-retailer-case-study",
    title: "Fashion Retailer Analysis Tool",
    description: "Interactive tool for analyzing the fashion retail case study data",
    category: "Retail",
    readTime: "Interactive",
    type: "tool"
  }
];

const ToolsPage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-aeo-600 to-aeo-400 py-12 px-4 sm:px-6 lg:px-8 text-white">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center mb-4">
              <Button variant="ghost" className="text-white hover:bg-white/20 p-0 mr-2" asChild>
                <Link to="/aeo/learning">
                  <ChevronLeft className="h-5 w-5" />
                  Back to Learning Center
                </Link>
              </Button>
            </div>
            <h1 className="heading-xl mb-2">AEO Tools</h1>
            <p className="text-lg max-w-3xl">
              Discover helpful tools and resources to enhance your AI Engine Optimization efforts.
            </p>
          </div>
        </section>
        
        {/* Tools Grid */}
        <section className="py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {toolsData.map((tool) => (
                <ResourceCard 
                  key={tool.id}
                  title={tool.title}
                  description={tool.description}
                  category={tool.category}
                  readTime={tool.readTime}
                  slug={tool.slug}
                  type="tool"
                />
              ))}
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default ToolsPage;
