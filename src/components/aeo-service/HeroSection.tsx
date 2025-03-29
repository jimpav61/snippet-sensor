
import React from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { ArrowRight, Search } from 'lucide-react';

const HeroSection = () => {
  return (
    <section className="relative py-20 px-4 sm:px-6 lg:px-8 overflow-hidden bg-gradient-to-br from-gray-50 to-white">
      <div className="absolute inset-0 z-0 opacity-20">
        <div className="absolute inset-0 bg-white"></div>
        <div className="absolute right-0 bottom-0 w-full h-full max-w-3xl">
          <div className="w-full h-full bg-aeo-50 rounded-full blur-3xl opacity-30 transform translate-x-1/3 translate-y-1/3"></div>
        </div>
      </div>
      
      <div className="relative z-10 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="animate-fade-in">
            <div className="inline-block px-3 py-1 rounded-full bg-aeo-50 text-aeo-600 font-medium text-sm mb-6">
              Introducing AEO Service
            </div>
            <h1 className="heading-xl mb-6 text-gray-900">
              AI Engine <span className="text-aeo">Optimization</span> for the Future of Search
            </h1>
            <p className="text-lg md:text-xl text-gray-600 mb-8 max-w-2xl">
              In today's AI-driven search landscape, being visible means optimizing for AI, not just keywords. Our AEO service ensures your content stands out where it matters most.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button asChild size="lg" className="bg-aeo hover:bg-aeo-600">
                <Link to="/aeo/analyze">Get Your Free AEO Score</Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link to="/aeo/learn-more">Learn More <ArrowRight className="ml-2 h-4 w-4" /></Link>
              </Button>
            </div>
            
            <div className="mt-8 p-4 rounded-lg border border-gray-200 bg-white/50 backdrop-blur-sm">
              <p className="text-gray-800 font-medium">
                <span className="text-aeo font-bold">60%</span> of Google searches conclude without clicks due to AI-generated featured snippets.
              </p>
            </div>
          </div>
          
          <div className="relative">
            <div className="aeo-card p-6 md:p-8 lg:p-10 shadow-lg">
              <div className="flex items-center mb-6">
                <div className="h-12 w-12 rounded-full bg-aeo-50 flex items-center justify-center text-aeo-500">
                  <Search className="h-6 w-6" />
                </div>
                <div className="ml-4">
                  <h3 className="font-semibold text-xl">AI Search Results</h3>
                  <p className="text-gray-500">Optimized snippet for "content marketing strategies"</p>
                </div>
              </div>
              
              <div className="p-4 rounded-lg bg-gray-50 border border-gray-100">
                <p className="text-gray-800">
                  <span className="font-semibold">Content marketing strategies</span> should focus on creating valuable,
                  relevant content that addresses user intent and provides comprehensive answers. Successful strategies incorporate
                  structured data, clear headings, and concise summaries optimized for featured snippets.
                </p>
                <div className="mt-4 flex items-center text-sm text-gray-500">
                  <span className="text-aeo-500 font-medium">AEO Score: 92/100</span>
                  <span className="mx-2">•</span>
                  <span>High snippet potential</span>
                </div>
              </div>
              
              <div className="mt-6 grid grid-cols-2 gap-4">
                <div className="p-3 rounded-lg border border-gray-100 bg-white">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-gray-500">Relevance</span>
                    <span className="text-sm font-medium">94%</span>
                  </div>
                  <div className="w-full bg-gray-100 rounded-full h-2">
                    <div className="bg-aeo-500 h-2 rounded-full" style={{ width: '94%' }}></div>
                  </div>
                </div>
                <div className="p-3 rounded-lg border border-gray-100 bg-white">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-gray-500">Readability</span>
                    <span className="text-sm font-medium">88%</span>
                  </div>
                  <div className="w-full bg-gray-100 rounded-full h-2">
                    <div className="bg-aeo-500 h-2 rounded-full" style={{ width: '88%' }}></div>
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
  );
};

export default HeroSection;
