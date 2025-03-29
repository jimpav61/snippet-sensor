
import React from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import ArticleCard from '@/components/learning-center/ArticleCard';
import ResourceCategorySection from '@/components/learning-center/ResourceCategorySection';
import FeaturedResource from '@/components/learning-center/FeaturedResource';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const LearningCenterPage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-aeo-600 to-aeo-400 py-16 px-4 sm:px-6 lg:px-8 text-white">
          <div className="max-w-7xl mx-auto">
            <h1 className="heading-xl mb-4">AEO Learning Center</h1>
            <p className="text-xl max-w-3xl mb-8">
              Explore resources, guides, and best practices to optimize your content for AI-powered search engines and stay ahead in the evolving digital landscape.
            </p>
          </div>
        </section>
        
        {/* Featured Resource */}
        <section className="py-12 px-4 sm:px-6 lg:px-8 bg-gray-50">
          <div className="max-w-7xl mx-auto">
            <h2 className="heading-md mb-8">Featured Resources</h2>
            <FeaturedResource
              title="The Complete Guide to AI Engine Optimization in 2025"
              description="Learn how to optimize your content for AI-powered search platforms with our comprehensive guide covering all the essential strategies and techniques."
              imageUrl="/placeholder.svg"
              category="Guide"
              readTime="15 min read"
            />
          </div>
        </section>
        
        {/* Resources Tabs */}
        <section className="py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <h2 className="heading-md mb-8">Resources & Articles</h2>
            
            <Tabs defaultValue="articles" className="w-full">
              <TabsList className="mb-8">
                <TabsTrigger value="articles">Articles</TabsTrigger>
                <TabsTrigger value="guides">Guides</TabsTrigger>
                <TabsTrigger value="case-studies">Case Studies</TabsTrigger>
                <TabsTrigger value="tools">Tools</TabsTrigger>
              </TabsList>
              
              <TabsContent value="articles">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <ArticleCard 
                    title="Understanding AI Snippets and How to Optimize For Them"
                    description="Learn how AI platforms select content for featured snippets and optimize your content to increase visibility."
                    category="AEO Strategy"
                    date="June 15, 2023"
                    readTime="8 min read"
                  />
                  <ArticleCard 
                    title="The Importance of Structured Data for AEO"
                    description="Discover how implementing structured data can significantly improve your content's performance in AI search results."
                    category="Technical SEO"
                    date="May 28, 2023"
                    readTime="6 min read"
                  />
                  <ArticleCard 
                    title="How AI Engines Evaluate Content Quality"
                    description="An in-depth analysis of the factors AI engines use to determine content quality and relevance."
                    category="Content Strategy"
                    date="April 12, 2023"
                    readTime="10 min read"
                  />
                  <ArticleCard 
                    title="AEO vs SEO: Key Differences and Strategies"
                    description="Compare traditional SEO with AI Engine Optimization and learn when to apply each approach."
                    category="Strategy"
                    date="March 5, 2023"
                    readTime="7 min read"
                  />
                  <ArticleCard 
                    title="Optimizing E-commerce Sites for AI Search"
                    description="Specialized strategies for online stores to perform better in AI-powered search results."
                    category="E-commerce"
                    date="February 18, 2023"
                    readTime="9 min read"
                  />
                  <ArticleCard 
                    title="The Future of Search: AI Trends to Watch"
                    description="Stay ahead of the curve with insights into emerging AI search technologies and what they mean for content creators."
                    category="Trends"
                    date="January 22, 2023"
                    readTime="5 min read"
                  />
                </div>
              </TabsContent>
              
              <TabsContent value="guides">
                <ResourceCategorySection 
                  title="Comprehensive AEO Guides"
                  resources={[
                    {
                      title: "Beginner's Guide to AEO",
                      description: "Start your journey into AI Engine Optimization with fundamental concepts and strategies.",
                      category: "Beginner",
                      readTime: "12 min read"
                    },
                    {
                      title: "Advanced AEO Techniques",
                      description: "Take your optimization to the next level with advanced strategies for experienced marketers.",
                      category: "Advanced",
                      readTime: "20 min read"
                    },
                    {
                      title: "Creating AI-Friendly Content",
                      description: "Learn how to structure and format your content for maximum visibility in AI search results.",
                      category: "Content",
                      readTime: "15 min read"
                    },
                    {
                      title: "Technical Guide to Schema.org for AEO",
                      description: "Implement structured data with this technical guide to boost your visibility in AI search.",
                      category: "Technical",
                      readTime: "18 min read"
                    }
                  ]}
                />
              </TabsContent>
              
              <TabsContent value="case-studies">
                <ResourceCategorySection 
                  title="Real-World AEO Success Stories"
                  resources={[
                    {
                      title: "How Company X Increased Traffic 300% with AEO",
                      description: "A detailed case study on implementing AEO strategies and the resulting traffic growth.",
                      category: "E-commerce",
                      readTime: "10 min read"
                    },
                    {
                      title: "SaaS Company Boosts Conversions with AI Optimization",
                      description: "Learn how a software company restructured their content for AI visibility and increased leads.",
                      category: "SaaS",
                      readTime: "8 min read"
                    },
                    {
                      title: "Local Business Success with AEO Strategies",
                      description: "How a local service business outranked larger competitors using targeted AEO tactics.",
                      category: "Local Business",
                      readTime: "7 min read"
                    }
                  ]}
                />
              </TabsContent>
              
              <TabsContent value="tools">
                <ResourceCategorySection 
                  title="Essential AEO Tools & Resources"
                  resources={[
                    {
                      title: "AEO Analyzer Tool Guide",
                      description: "Learn how to use our AEO Analyzer tool to identify optimization opportunities.",
                      category: "Tool Guide",
                      readTime: "5 min read"
                    },
                    {
                      title: "Free Schema Generator for AEO",
                      description: "Generate structured data markup with our free tool to improve your AI visibility.",
                      category: "Tool",
                      readTime: "3 min read"
                    },
                    {
                      title: "Content Evaluation Checklist",
                      description: "A downloadable checklist to evaluate your content's readiness for AI search engines.",
                      category: "Checklist",
                      readTime: "2 min read"
                    }
                  ]}
                />
              </TabsContent>
            </Tabs>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default LearningCenterPage;
