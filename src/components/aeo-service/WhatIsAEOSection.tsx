
import React from 'react';
import { Search, Zap, BarChart3 } from 'lucide-react';

const WhatIsAEOSection = () => {
  return (
    <section className="py-16 md:py-24 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="heading-lg mb-4 text-gray-900">What is <span className="text-aeo">AI Engine Optimization</span>?</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            AEO is the process of optimizing your content to perform better in AI-driven search systems, ensuring your business remains visible in a changing search landscape.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="aeo-card p-6">
            <div className="h-12 w-12 rounded-lg bg-aeo-50 flex items-center justify-center text-aeo mb-4">
              <Search className="h-6 w-6" />
            </div>
            <h3 className="text-xl font-semibold mb-3">Beyond Traditional SEO</h3>
            <p className="text-gray-600">
              While SEO focuses on ranking in traditional search results, AEO targets AI-generated snippets and answers that often replace traditional clicks.
            </p>
          </div>
          
          <div className="aeo-card p-6">
            <div className="h-12 w-12 rounded-lg bg-aeo-50 flex items-center justify-center text-aeo mb-4">
              <Zap className="h-6 w-6" />
            </div>
            <h3 className="text-xl font-semibold mb-3">AI-Ready Content</h3>
            <p className="text-gray-600">
              Structure your content to be easily understood and extracted by AI systems, making it more likely to be featured in AI-generated responses.
            </p>
          </div>
          
          <div className="aeo-card p-6">
            <div className="h-12 w-12 rounded-lg bg-aeo-50 flex items-center justify-center text-aeo mb-4">
              <BarChart3 className="h-6 w-6" />
            </div>
            <h3 className="text-xl font-semibold mb-3">Data-Driven Insights</h3>
            <p className="text-gray-600">
              Our comprehensive scoring system helps you understand exactly how your content performs with AI systems and where improvements can be made.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhatIsAEOSection;
