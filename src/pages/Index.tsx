
import React from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { ArrowRight, BarChart3, Zap, Search } from 'lucide-react';
import AnalyticsDashboardPromo from '@/components/home/AnalyticsDashboardPromo';

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative py-24 px-4 sm:px-6 lg:px-8 overflow-hidden bg-gradient-to-br from-slate-50 to-white">
          <div className="absolute inset-0 z-0 opacity-20">
            <div className="absolute inset-0 bg-white"></div>
            <div className="absolute right-0 bottom-0 w-full h-full max-w-4xl">
              <div className="w-full h-full bg-aeo-50 rounded-full blur-3xl opacity-30 transform translate-x-1/3 translate-y-1/3"></div>
            </div>
          </div>
          
          <div className="relative z-10 max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="animate-fade-in">
                <h1 className="heading-xl mb-6 text-gray-900">
                  <span className="text-aeo font-bold block">Stay Visible</span> in the AI-Driven 
                  <span className="relative">
                    <span className="relative z-10">Search Revolution</span>
                    <span className="absolute bottom-2 left-0 w-full h-3 bg-aeo-100 -z-10 transform -rotate-1"></span>
                  </span>
                </h1>
                <p className="text-lg md:text-xl text-gray-600 mb-8 max-w-2xl">
                  In a world where <span className="font-semibold">60% of searches</span> end without clicks, 
                  traditional SEO isn't enough. ChatSites.ai helps you optimize for AI engines 
                  so your content stands out exactly where your audience is looking.
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4 mb-8">
                  <Button asChild size="lg" className="bg-aeo hover:bg-aeo-600">
                    <Link to="/aeo/analyze">Get Your Free AEO Score <ArrowRight className="ml-2 h-4 w-4" /></Link>
                  </Button>
                  <Button asChild variant="outline" size="lg">
                    <Link to="/aeo">Explore Our Solutions</Link>
                  </Button>
                </div>
                
                <div className="flex flex-wrap gap-6 mt-8">
                  <div className="flex items-center gap-2">
                    <div className="w-12 h-12 rounded-full flex items-center justify-center bg-green-50">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M5 13L9 17L19 7" stroke="#22C55E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                    <span className="text-gray-700">AI-Optimized Content</span>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <div className="w-12 h-12 rounded-full flex items-center justify-center bg-blue-50">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M5 13L9 17L19 7" stroke="#3B82F6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                    <span className="text-gray-700">Data-Driven Insights</span>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <div className="w-12 h-12 rounded-full flex items-center justify-center bg-purple-50">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M5 13L9 17L19 7" stroke="#8B5CF6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                    <span className="text-gray-700">Actionable Recommendations</span>
                  </div>
                </div>
              </div>
              
              <div className="relative">
                <div className="aeo-card p-8 shadow-xl">
                  <div className="flex items-center mb-6">
                    <div className="h-14 w-14 rounded-full bg-aeo-50 flex items-center justify-center text-aeo-500">
                      <Search className="h-7 w-7" />
                    </div>
                    <div className="ml-4">
                      <h3 className="font-semibold text-2xl">AI Search Results</h3>
                      <p className="text-gray-500">See how your content performs with AI engines</p>
                    </div>
                  </div>
                  
                  <div className="p-6 rounded-lg bg-gray-50 border border-gray-100 mb-6">
                    <p className="text-gray-800 text-lg">
                      <span className="font-semibold">AI Engine Optimization</span> helps businesses 
                      adapt to AI-driven search by structuring content for AI comprehension, optimizing 
                      for featured snippets, and ensuring visibility in an evolving search landscape.
                    </p>
                    <div className="mt-4 flex items-center text-sm text-gray-500">
                      <span className="text-aeo-500 font-medium">AEO Score: 94/100</span>
                      <span className="mx-2">•</span>
                      <span>Top-tier snippet potential</span>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 rounded-lg border border-gray-100 bg-white">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm text-gray-500">Relevance</span>
                        <span className="text-sm font-medium">96%</span>
                      </div>
                      <div className="w-full bg-gray-100 rounded-full h-2">
                        <div className="bg-aeo-500 h-2 rounded-full" style={{ width: '96%' }}></div>
                      </div>
                    </div>
                    <div className="p-4 rounded-lg border border-gray-100 bg-white">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm text-gray-500">Searchability</span>
                        <span className="text-sm font-medium">92%</span>
                      </div>
                      <div className="w-full bg-gray-100 rounded-full h-2">
                        <div className="bg-aeo-500 h-2 rounded-full" style={{ width: '92%' }}></div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="absolute -right-6 -bottom-6 h-24 w-24 rounded-xl aeo-gradient transform rotate-6 opacity-80 blur-sm -z-10"></div>
                <div className="absolute -left-4 -top-4 h-16 w-16 rounded-xl bg-gray-200 transform -rotate-12 opacity-60 blur-sm -z-10"></div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Features Section */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="heading-lg mb-4 text-gray-900">Why <span className="text-aeo">AI Engine Optimization</span> Matters Now</h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                The search landscape is evolving. Is your content strategy keeping up?
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="aeo-card p-8 flex flex-col items-center text-center transform transition-all duration-300 hover:scale-105">
                <div className="h-16 w-16 rounded-lg bg-aeo-50 flex items-center justify-center text-aeo mb-6">
                  <Search className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Beyond Traditional SEO</h3>
                <p className="text-gray-600">
                  AI-powered search results deliver direct answers, bypassing traditional 
                  organic listings and reducing clickthrough to your website.
                </p>
              </div>
              
              <div className="aeo-card p-8 flex flex-col items-center text-center transform transition-all duration-300 hover:scale-105">
                <div className="h-16 w-16 rounded-lg bg-aeo-50 flex items-center justify-center text-aeo mb-6">
                  <Zap className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-semibold mb-3">AI-Ready Content</h3>
                <p className="text-gray-600">
                  Structure your content to be easily understood by AI systems, ensuring your 
                  brand's voice is heard in this new era of search.
                </p>
              </div>
              
              <div className="aeo-card p-8 flex flex-col items-center text-center transform transition-all duration-300 hover:scale-105">
                <div className="h-16 w-16 rounded-lg bg-aeo-50 flex items-center justify-center text-aeo mb-6">
                  <BarChart3 className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Data-Driven Strategy</h3>
                <p className="text-gray-600">
                  Gain insights into how AI interprets your content and make targeted 
                  improvements with measurable results.
                </p>
              </div>
            </div>
            
            <div className="mt-16 text-center">
              <Button asChild size="lg" className="bg-aeo hover:bg-aeo-600">
                <Link to="/aeo/analyze">Get Your Free AEO Score <ArrowRight className="ml-2 h-4 w-4" /></Link>
              </Button>
            </div>
          </div>
        </section>
        
        {/* Statistics Section */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="aeo-card p-8 text-center">
                <div className="text-4xl font-bold text-aeo mb-2">60%</div>
                <p className="text-gray-600">of Google searches end without clicks due to AI-generated answers</p>
              </div>
              
              <div className="aeo-card p-8 text-center">
                <div className="text-4xl font-bold text-aeo mb-2">78%</div>
                <p className="text-gray-600">of businesses are unprepared for AI-first search strategies</p>
              </div>
              
              <div className="aeo-card p-8 text-center">
                <div className="text-4xl font-bold text-aeo mb-2">3.2x</div>
                <p className="text-gray-600">higher engagement for AI-optimized content</p>
              </div>
              
              <div className="aeo-card p-8 text-center">
                <div className="text-4xl font-bold text-aeo mb-2">91%</div>
                <p className="text-gray-600">of users trust content featured in AI snippets</p>
              </div>
            </div>
          </div>
        </section>
        
        {/* Analytics Dashboard Promo */}
        <AnalyticsDashboardPromo />
        
        {/* CTA Section */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 aeo-gradient">
          <div className="max-w-5xl mx-auto text-center">
            <h2 className="heading-lg mb-6 text-white">Ready to Thrive in the AI Search Era?</h2>
            <p className="text-xl text-white/90 mb-8 max-w-3xl mx-auto">
              Join forward-thinking businesses that are already adapting to the future of search. 
              Get your free AEO score today and take the first step.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" variant="secondary" className="text-lg px-8 py-6">
                <Link to="/aeo/analyze">Get Your Free AEO Score <ArrowRight className="ml-2 h-5 w-5" /></Link>
              </Button>
              <Button 
                asChild
                size="lg" 
                variant="outline" 
                className="bg-transparent text-white border-white hover:bg-white/10 text-lg px-8 py-6"
              >
                <Link to="/aeo/contact">Schedule a Consultation</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
