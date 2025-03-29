import React from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import ArticleCard from '@/components/learning-center/ArticleCard';
import ResourceCategorySection from '@/components/learning-center/ResourceCategorySection';
import FeaturedResource from '@/components/learning-center/FeaturedResource';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { BookOpen, FileText, ChevronRight } from 'lucide-react';
import ResourceCard from '@/components/learning-center/ResourceCard';

const LearningCenterPage = () => {
  const navigate = useNavigate();
  
  const handleTabChange = (value: string) => {
    if (value === "guides") {
      navigate("/aeo/learning/guides");
    } else if (value === "case-studies") {
      navigate("/aeo/learning/case-studies");
    } else if (value === "articles") {
      navigate("/aeo/learning/articles");
    }
  };
  
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
              imageUrl="https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&fit=crop&w=800&h=500"
              category="Guide"
              readTime="15 min read"
            />
          </div>
        </section>
        
        {/* Resources Tabs */}
        <section className="py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <h2 className="heading-md mb-8">Resources & Articles</h2>
            
            <Tabs defaultValue="articles" className="w-full" onValueChange={handleTabChange}>
              <TabsList className="mb-8">
                <TabsTrigger value="articles">Articles</TabsTrigger>
                <TabsTrigger value="guides">Guides</TabsTrigger>
                <TabsTrigger value="case-studies">Case Studies</TabsTrigger>
              </TabsList>
              
              <TabsContent value="articles">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <ArticleCard 
                    title="Understanding AI Snippets and How to Optimize For Them"
                    description="AI search engines display direct answers to user queries as snippets. Learn how these systems select content for featured snippets and how to optimize your content to increase visibility in these valuable positions."
                    category="AEO Strategy"
                    date="June 15, 2023"
                    readTime="8 min read"
                    slug="understanding-ai-snippets"
                  />
                  <ArticleCard 
                    title="The Importance of Structured Data for AEO"
                    description="Structured data helps AI understand your content's context. Discover how implementing schema markup can significantly improve your content's performance in AI search results and enhance your digital presence."
                    category="Technical SEO"
                    date="May 28, 2023"
                    readTime="6 min read"
                    slug="structured-data-importance"
                  />
                  <ArticleCard 
                    title="How AI Engines Evaluate Content Quality"
                    description="AI engines assess content based on expertise, authoritativeness, and trustworthiness. This in-depth analysis reveals the factors AI uses to determine quality and relevance to help you create better content."
                    category="Content Strategy"
                    date="April 12, 2023"
                    readTime="10 min read"
                    slug="ai-content-evaluation"
                  />
                  <ArticleCard 
                    title="AEO vs SEO: Key Differences and Strategies"
                    description="While SEO focuses on keywords and rankings, AEO prioritizes answering questions and providing value. Compare traditional SEO with AI Engine Optimization and learn when to apply each approach for maximum visibility."
                    category="Strategy"
                    date="March 5, 2023"
                    readTime="7 min read"
                    slug="aeo-vs-seo"
                  />
                  <ArticleCard 
                    title="Optimizing E-commerce Sites for AI Search"
                    description="E-commerce sites face unique challenges in AI search. Explore specialized strategies for product descriptions, reviews, and technical implementations that will help online stores perform better in AI-powered search results."
                    category="E-commerce"
                    date="February 18, 2023"
                    readTime="9 min read"
                    slug="ecommerce-ai-optimization"
                  />
                  <ArticleCard 
                    title="The Future of Search: AI Trends to Watch"
                    description="AI search technology is evolving rapidly. Stay ahead of the curve with insights into emerging technologies like multimodal search, voice optimization, and real-time personalization, and what they mean for content creators."
                    category="Trends"
                    date="January 22, 2023"
                    readTime="5 min read"
                    slug="future-ai-search-trends"
                  />
                </div>
              </TabsContent>
              
              <TabsContent value="guides">
                <ResourceCategorySection 
                  title="Comprehensive AEO Guides"
                  resources={[
                    {
                      title: "Beginner's Guide to AEO",
                      description: "Start your journey into AI Engine Optimization with this comprehensive guide covering fundamental concepts, basic implementation strategies, and common pitfalls to avoid as you begin optimizing for AI search.",
                      category: "Beginner",
                      readTime: "12 min read",
                      slug: "beginners-guide-to-aeo"
                    },
                    {
                      title: "Advanced AEO Techniques",
                      description: "Take your optimization to the next level with advanced strategies including entity optimization, natural language processing alignment, and semantic content structuring for experienced marketers looking to maximize AI visibility.",
                      category: "Advanced",
                      readTime: "20 min read",
                      slug: "advanced-aeo-techniques"
                    },
                    {
                      title: "Creating AI-Friendly Content",
                      description: "Learn how to structure and format your content for maximum visibility in AI search results. This guide covers question-answering formats, entity relationships, and content organization principles that AI engines prioritize.",
                      category: "Content",
                      readTime: "15 min read",
                      slug: "ai-friendly-content-creation"
                    },
                    {
                      title: "Technical Guide to Schema.org for AEO",
                      description: "Implement structured data with this technical guide to boost your visibility in AI search. Covers JSON-LD implementation, key schema types for different industries, and validation techniques to ensure proper integration.",
                      category: "Technical",
                      readTime: "18 min read",
                      slug: "schema-implementation-guide"
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
                      readTime: "16 min read",
                      slug: "ecommerce-aeo-guide"
                    },
                    {
                      title: "AEO for B2B Companies",
                      description: "B2B businesses have unique AEO needs. This guide covers targeting decision-makers, optimizing for complex purchase journeys, and structuring content for AI-powered business research tools.",
                      category: "B2B",
                      readTime: "14 min read",
                      slug: "b2b-aeo-guide"
                    },
                    {
                      title: "AEO for Local Businesses",
                      description: "Local businesses can leverage AI search to attract nearby customers. Learn location-based optimization techniques, local entity strategies, and how to structure business information for AI local search.",
                      category: "Local",
                      readTime: "10 min read",
                      slug: "local-business-aeo-guide"
                    },
                    {
                      title: "AEO for Content Publishers",
                      description: "News outlets, blogs, and content publishers need specialized approaches to AEO. This guide covers freshness signals, authority building, and content formatting that works best for AI news aggregation.",
                      category: "Publishing",
                      readTime: "17 min read",
                      slug: "publisher-aeo-guide"
                    }
                  ]}
                />
              </TabsContent>
              
              <TabsContent value="case-studies">
                <ResourceCategorySection 
                  title="E-commerce Success Stories"
                  resources={[
                    {
                      title: "How FashionRetailer.com Increased Traffic 300% with AEO",
                      description: "This online clothing retailer implemented comprehensive AEO strategies including product schema markup, question-answering content formats, and AI-friendly navigation, resulting in a 300% traffic increase from AI platforms within 4 months.",
                      category: "E-commerce",
                      readTime: "10 min read",
                      slug: "fashion-retailer-case-study"
                    },
                    {
                      title: "ElectronicsStore Increases Conversion Rate by 45% Through AEO",
                      description: "By restructuring product pages to answer common customer questions and implementing enhanced technical specifications in structured data, this electronics retailer saw conversions jump dramatically from AI-referred traffic.",
                      category: "E-commerce",
                      readTime: "12 min read",
                      slug: "electronics-store-case-study"
                    }
                  ]}
                />
                
                <ResourceCategorySection 
                  title="B2B Company Case Studies"
                  resources={[
                    {
                      title: "SaaS Company Boosts Leads by 200% with AI Optimization",
                      description: "This software-as-a-service provider reorganized their content library around user questions and implemented comprehensive AI-friendly documentation, resulting in significantly higher qualified lead generation from AI search platforms.",
                      category: "SaaS",
                      readTime: "8 min read",
                      slug: "saas-aeo-case-study"
                    },
                    {
                      title: "Manufacturing Firm Captures Market Share Through AEO",
                      description: "By creating comprehensive, structured content addressing industry-specific questions and implementing technical schema markup, this B2B manufacturer became the go-to information source for AI-powered business research.",
                      category: "Manufacturing",
                      readTime: "11 min read",
                      slug: "manufacturing-aeo-case-study"
                    }
                  ]}
                />
                
                <ResourceCategorySection 
                  title="Local Business Success Stories"
                  resources={[
                    {
                      title: "Local Service Business Outranks National Chains with AEO",
                      description: "A small local home services company implemented hyperlocal content strategies and structured data markup, allowing them to capture prominent visibility in AI search results over much larger national competitors.",
                      category: "Local Business",
                      readTime: "7 min read",
                      slug: "local-service-case-study"
                    },
                    {
                      title: "Restaurant Increases Reservations 85% Through AI Visibility",
                      description: "By restructuring their menu items with comprehensive structured data and creating content that specifically addressed local dining questions, this restaurant dramatically increased its visibility in AI recommendation platforms.",
                      category: "Hospitality",
                      readTime: "9 min read",
                      slug: "restaurant-case-study"
                    }
                  ]}
                />
              </TabsContent>
            </Tabs>
          </div>
        </section>
        
        {/* Call-to-Action Section */}
        <section className="bg-aeo-50 py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto text-center">
            <h2 className="heading-md mb-4">Ready to Optimize Your Content for AI Engines?</h2>
            <p className="text-lg mb-8 max-w-3xl mx-auto">
              Get your personalized AEO score and recommendations to improve your visibility in AI search results.
            </p>
            <Button className="bg-aeo hover:bg-aeo-600" size="lg" asChild>
              <Link to="/aeo/analyze">
                <FileText className="mr-2 h-5 w-5" />
                Analyze Your Content Now
              </Link>
            </Button>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default LearningCenterPage;
