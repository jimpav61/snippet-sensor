
import React from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import ResourceCategorySection from '@/components/learning-center/ResourceCategorySection';
import { Button } from '@/components/ui/button';
import { ChevronLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

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
              Explore our suite of tools and resources designed to help you implement effective AI Engine Optimization strategies.
            </p>
          </div>
        </section>
        
        {/* Tools Sections */}
        <section className="py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto space-y-16">
            <ResourceCategorySection 
              title="Essential AEO Tools & Resources"
              resources={[
                {
                  title: "AEO Analyzer Tool Guide",
                  description: "Learn how to use our AEO Analyzer tool to identify optimization opportunities in your content. This step-by-step guide covers content analysis, competitive benchmarking, and implementing the tool's recommendations effectively.",
                  category: "Tool Guide",
                  readTime: "5 min read"
                },
                {
                  title: "Free Schema Generator for AEO",
                  description: "Generate structured data markup with our free tool to improve your AI visibility. This guide walks you through selecting the right schema types for your content and implementing the generated code properly on your website.",
                  category: "Tool",
                  readTime: "3 min read"
                },
                {
                  title: "Content Evaluation Checklist",
                  description: "A downloadable checklist to evaluate your content's readiness for AI search engines. Covers all essential elements from content structure and formatting to technical implementation and performance measurement.",
                  category: "Checklist",
                  readTime: "2 min read"
                },
                {
                  title: "AEO Audit Template",
                  description: "A comprehensive template for conducting a full AEO audit of your website. This downloadable resource provides a structured framework for evaluating your current optimization status and identifying improvement opportunities.",
                  category: "Template",
                  readTime: "4 min read"
                }
              ]}
            />
            
            <ResourceCategorySection 
              title="Advanced AEO Toolkits"
              resources={[
                {
                  title: "AI Content Opportunity Analyzer",
                  description: "Our premium tool helps identify gaps in your content strategy based on what AI engines are looking for in your industry. Learn how to interpret the data and create high-performing content that addresses identified opportunities.",
                  category: "Premium Tool",
                  readTime: "8 min read"
                },
                {
                  title: "Structured Data Validator & Enhancer",
                  description: "This advanced tool not only validates your structured data implementation but also suggests enhancements based on AI engine preferences. Includes industry-specific recommendations for maximum visibility.",
                  category: "Technical Tool",
                  readTime: "6 min read"
                },
                {
                  title: "Entity Relationship Mapper",
                  description: "Visualize and optimize the entity relationships in your content with this specialized tool. Helps you create more contextually rich content that AI engines can better understand and prioritize in search results.",
                  category: "Advanced Tool",
                  readTime: "7 min read"
                },
                {
                  title: "AI Search Simulator",
                  description: "Test how your content might perform in AI search results with this simulation tool. Provides insights into potential visibility and suggested optimizations based on simulated AI search patterns.",
                  category: "Testing Tool",
                  readTime: "5 min read"
                }
              ]}
            />
            
            <ResourceCategorySection 
              title="Industry-Specific Tools"
              resources={[
                {
                  title: "E-commerce Product Schema Generator",
                  description: "Specialized schema markup generator for e-commerce product pages. Creates comprehensive product structured data that helps AI engines better understand and feature your products in relevant searches.",
                  category: "E-commerce",
                  readTime: "4 min read"
                },
                {
                  title: "Local Business AEO Toolkit",
                  description: "A collection of tools specifically designed for local businesses looking to improve their visibility in AI-powered local search. Includes local entity optimization and geo-specific content recommendations.",
                  category: "Local Business",
                  readTime: "6 min read"
                },
                {
                  title: "Content Publisher AEO Assistant",
                  description: "Designed for news sites, blogs, and media outlets, this tool helps optimize article content for AI distribution channels, including recommendations for structure, headings, and entity inclusion.",
                  category: "Publishing",
                  readTime: "5 min read"
                },
                {
                  title: "B2B Content Optimizer",
                  description: "Tailored for B2B companies, this tool analyzes your business content and provides recommendations to improve visibility in AI-powered business research tools and platforms.",
                  category: "B2B",
                  readTime: "7 min read"
                }
              ]}
            />
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default ToolsPage;
