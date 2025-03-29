
import React from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import ResourceCategorySection from '@/components/learning-center/ResourceCategorySection';
import { Button } from '@/components/ui/button';
import { ChevronLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

const GuidesPage = () => {
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
            <h1 className="heading-xl mb-2">Guides</h1>
            <p className="text-lg max-w-3xl">
              Comprehensive guides to help you master AI Engine Optimization for various industries and use cases.
            </p>
          </div>
        </section>
        
        {/* Guides Sections */}
        <section className="py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto space-y-16">
            <ResourceCategorySection 
              title="Comprehensive AEO Guides"
              resources={[
                {
                  title: "Beginner's Guide to AEO",
                  description: "Start your journey into AI Engine Optimization with this comprehensive guide covering fundamental concepts, basic implementation strategies, and common pitfalls to avoid as you begin optimizing for AI search.",
                  category: "Beginner",
                  readTime: "12 min read"
                },
                {
                  title: "Advanced AEO Techniques",
                  description: "Take your optimization to the next level with advanced strategies including entity optimization, natural language processing alignment, and semantic content structuring for experienced marketers looking to maximize AI visibility.",
                  category: "Advanced",
                  readTime: "20 min read"
                },
                {
                  title: "Creating AI-Friendly Content",
                  description: "Learn how to structure and format your content for maximum visibility in AI search results. This guide covers question-answering formats, entity relationships, and content organization principles that AI engines prioritize.",
                  category: "Content",
                  readTime: "15 min read"
                },
                {
                  title: "Technical Guide to Schema.org for AEO",
                  description: "Implement structured data with this technical guide to boost your visibility in AI search. Covers JSON-LD implementation, key schema types for different industries, and validation techniques to ensure proper integration.",
                  category: "Technical",
                  readTime: "18 min read"
                }
              ]}
            />
            
            <ResourceCategorySection 
              title="Industry-Specific AEO Guides"
              resources={[
                {
                  title: "AEO for E-commerce Websites",
                  description: "Specialized optimization techniques for online retailers, including product description optimization, review integration, and AI-friendly navigation structures that improve conversion rates and visibility.",
                  category: "E-commerce",
                  readTime: "16 min read"
                },
                {
                  title: "AEO for B2B Companies",
                  description: "B2B businesses have unique AEO needs. This guide covers targeting decision-makers, optimizing for complex purchase journeys, and structuring content for AI-powered business research tools.",
                  category: "B2B",
                  readTime: "14 min read"
                },
                {
                  title: "AEO for Local Businesses",
                  description: "Local businesses can leverage AI search to attract nearby customers. Learn location-based optimization techniques, local entity strategies, and how to structure business information for AI local search.",
                  category: "Local",
                  readTime: "10 min read"
                },
                {
                  title: "AEO for Content Publishers",
                  description: "News outlets, blogs, and content publishers need specialized approaches to AEO. This guide covers freshness signals, authority building, and content formatting that works best for AI news aggregation.",
                  category: "Publishing",
                  readTime: "17 min read"
                }
              ]}
            />
            
            <ResourceCategorySection 
              title="Strategy Guides"
              resources={[
                {
                  title: "AEO Audit Framework",
                  description: "A comprehensive framework for auditing your website's AEO readiness. Includes checklists, scoring methods, and actionable improvement plans based on audit findings.",
                  category: "Strategy",
                  readTime: "14 min read"
                },
                {
                  title: "Competitive Analysis for AEO",
                  description: "Learn how to analyze competitors in the context of AI search visibility. This guide provides methodologies for identifying competitors' AEO strengths and weaknesses and leveraging those insights.",
                  category: "Strategy",
                  readTime: "12 min read"
                },
                {
                  title: "AEO Performance Measurement",
                  description: "Measuring AEO success requires different metrics than traditional SEO. This guide outlines the key performance indicators for AI search visibility and how to track them effectively.",
                  category: "Analytics",
                  readTime: "13 min read"
                },
                {
                  title: "Building an AEO-First Content Strategy",
                  description: "Create a content strategy that prioritizes AI visibility from the ground up. This guide walks through planning, creating, and measuring content specifically designed for AI engine distribution.",
                  category: "Content Strategy",
                  readTime: "19 min read"
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

export default GuidesPage;
