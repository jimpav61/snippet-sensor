
import React from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import ResourceCategorySection from '@/components/learning-center/ResourceCategorySection';
import { Button } from '@/components/ui/button';
import { ChevronLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

const CaseStudiesPage = () => {
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
            <h1 className="heading-xl mb-2">Case Studies</h1>
            <p className="text-lg max-w-3xl">
              Real-world examples of how businesses have successfully implemented AI Engine Optimization strategies.
            </p>
          </div>
        </section>
        
        {/* Case Studies Sections */}
        <section className="py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto space-y-16">
            <ResourceCategorySection 
              title="E-commerce Success Stories"
              resources={[
                {
                  title: "How FashionRetailer.com Increased Traffic 300% with AEO",
                  description: "This online clothing retailer implemented comprehensive AEO strategies including product schema markup, question-answering content formats, and AI-friendly navigation, resulting in a 300% traffic increase from AI platforms within 4 months.",
                  category: "E-commerce",
                  readTime: "10 min read"
                },
                {
                  title: "ElectronicsStore Increases Conversion Rate by 45% Through AEO",
                  description: "By restructuring product pages to answer common customer questions and implementing enhanced technical specifications in structured data, this electronics retailer saw conversions jump dramatically from AI-referred traffic.",
                  category: "E-commerce",
                  readTime: "12 min read"
                },
                {
                  title: "HomeGoods.com: AEO-Driven Category Page Optimization",
                  description: "This home goods retailer redesigned their category pages with AI-optimized content structures, resulting in 65% more category page visibility in AI search results and a 40% increase in category page revenue.",
                  category: "E-commerce",
                  readTime: "11 min read"
                },
                {
                  title: "SpecialtyShop's AI-First Product Description Strategy",
                  description: "By implementing an AI-first approach to product descriptions that prioritized natural language answers to common product questions, this specialty retailer increased their conversion rate from AI-referred traffic by 28%.",
                  category: "E-commerce",
                  readTime: "9 min read"
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
                  readTime: "8 min read"
                },
                {
                  title: "Manufacturing Firm Captures Market Share Through AEO",
                  description: "By creating comprehensive, structured content addressing industry-specific questions and implementing technical schema markup, this B2B manufacturer became the go-to information source for AI-powered business research.",
                  category: "Manufacturing",
                  readTime: "11 min read"
                },
                {
                  title: "Professional Services Firm Increases Visibility with AEO",
                  description: "This consulting firm implemented a comprehensive content strategy focused on answering industry-specific questions, resulting in a 150% increase in visibility for high-value search queries in their target market.",
                  category: "Professional Services",
                  readTime: "10 min read"
                },
                {
                  title: "Tech Company Dominates AI Search with Entity Optimization",
                  description: "By focusing on entity relationships and comprehensive structured data implementation, this technology provider achieved dominant positions in AI search results for their core service offerings and key technologies.",
                  category: "Technology",
                  readTime: "13 min read"
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
                  readTime: "7 min read"
                },
                {
                  title: "Restaurant Increases Reservations 85% Through AI Visibility",
                  description: "By restructuring their menu items with comprehensive structured data and creating content that specifically addressed local dining questions, this restaurant dramatically increased its visibility in AI recommendation platforms.",
                  category: "Hospitality",
                  readTime: "9 min read"
                },
                {
                  title: "Medical Practice Grows New Patients with AEO Strategy",
                  description: "This local healthcare provider implemented specialized content addressing common patient questions and health concerns, resulting in a 120% increase in new patient inquiries from AI search platforms.",
                  category: "Healthcare",
                  readTime: "8 min read"
                },
                {
                  title: "Retail Store Chain Drives Foot Traffic with Local AEO",
                  description: "This multi-location retailer implemented location-specific content and structured data optimizations, increasing their visibility in local AI search results and driving a 35% increase in store visits across all locations.",
                  category: "Retail",
                  readTime: "10 min read"
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

export default CaseStudiesPage;
