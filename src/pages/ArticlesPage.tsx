
import React from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import ArticleCard from '@/components/learning-center/ArticleCard';
import { Button } from '@/components/ui/button';
import { ChevronLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

const ArticlesPage = () => {
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
            <h1 className="heading-xl mb-2">Articles</h1>
            <p className="text-lg max-w-3xl">
              Explore our collection of in-depth articles on AI Engine Optimization strategies and best practices.
            </p>
          </div>
        </section>
        
        {/* Articles Grid */}
        <section className="py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <ArticleCard 
                title="Understanding AI Snippets and How to Optimize For Them"
                description="AI search engines display direct answers to user queries as snippets. Learn how these systems select content for featured snippets and how to optimize your content to increase visibility in these valuable positions."
                category="AEO Strategy"
                date="June 15, 2023"
                readTime="8 min read"
              />
              <ArticleCard 
                title="The Importance of Structured Data for AEO"
                description="Structured data helps AI understand your content's context. Discover how implementing schema markup can significantly improve your content's performance in AI search results and enhance your digital presence."
                category="Technical SEO"
                date="May 28, 2023"
                readTime="6 min read"
              />
              <ArticleCard 
                title="How AI Engines Evaluate Content Quality"
                description="AI engines assess content based on expertise, authoritativeness, and trustworthiness. This in-depth analysis reveals the factors AI uses to determine quality and relevance to help you create better content."
                category="Content Strategy"
                date="April 12, 2023"
                readTime="10 min read"
              />
              <ArticleCard 
                title="AEO vs SEO: Key Differences and Strategies"
                description="While SEO focuses on keywords and rankings, AEO prioritizes answering questions and providing value. Compare traditional SEO with AI Engine Optimization and learn when to apply each approach for maximum visibility."
                category="Strategy"
                date="March 5, 2023"
                readTime="7 min read"
              />
              <ArticleCard 
                title="Optimizing E-commerce Sites for AI Search"
                description="E-commerce sites face unique challenges in AI search. Explore specialized strategies for product descriptions, reviews, and technical implementations that will help online stores perform better in AI-powered search results."
                category="E-commerce"
                date="February 18, 2023"
                readTime="9 min read"
              />
              <ArticleCard 
                title="The Future of Search: AI Trends to Watch"
                description="AI search technology is evolving rapidly. Stay ahead of the curve with insights into emerging technologies like multimodal search, voice optimization, and real-time personalization, and what they mean for content creators."
                category="Trends"
                date="January 22, 2023"
                readTime="5 min read"
              />
              <ArticleCard 
                title="Creating Content That Answers User Questions"
                description="AI engines prioritize content that directly answers user questions. Learn how to structure your content to provide direct, valuable answers to the questions your audience is asking."
                category="Content Strategy"
                date="December 15, 2022"
                readTime="7 min read"
              />
              <ArticleCard 
                title="AI Search and Voice Optimization Strategies"
                description="Voice search is increasingly powered by AI technologies. Discover how to optimize your content for voice queries and ensure your business is found in this growing search medium."
                category="Voice Search"
                date="November 8, 2022"
                readTime="8 min read"
              />
              <ArticleCard 
                title="How Entity Recognition Impacts AI Visibility"
                description="Entity recognition is a core component of how AI understands content. Learn how to identify and optimize for entities in your content to improve visibility in AI-powered search."
                category="Technical AEO"
                date="October 22, 2022"
                readTime="9 min read"
              />
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default ArticlesPage;
