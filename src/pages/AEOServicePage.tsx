
import React from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import HeroSection from '@/components/aeo-service/HeroSection';
import WhatIsAEOSection from '@/components/aeo-service/WhatIsAEOSection';
import HowItWorksSection from '@/components/aeo-service/HowItWorksSection';
import WhyItMattersSection from '@/components/aeo-service/WhyItMattersSection';
import CTASection from '@/components/aeo-service/CTASection';
import AnalyticsDashboardPromo from '@/components/home/AnalyticsDashboardPromo';
import AEOAnalyzer from '@/components/tools/AEOAnalyzer';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import SchemaGeneratorWrapper from '@/components/tools/SchemaGeneratorWrapper';
import PromptOptimizer from '@/components/tools/PromptOptimizer';

const AEOServicePage = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1">
        <HeroSection />
        <WhatIsAEOSection />
        <HowItWorksSection />
        <WhyItMattersSection />
        
        {/* AEO Tools Section */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-10">
              <h2 className="heading-lg mb-4 text-gray-900">
                Free AEO Tools
              </h2>
              <p className="text-lg text-gray-600 mb-6 max-w-2xl mx-auto">
                Start optimizing your content for AI with our free suite of tools
              </p>
            </div>
            
            <Tabs defaultValue="analyzer" className="w-full">
              <TabsList className="grid w-full grid-cols-3 mb-8">
                <TabsTrigger value="analyzer">AEO Analyzer</TabsTrigger>
                <TabsTrigger value="schema">Schema Generator</TabsTrigger>
                <TabsTrigger value="prompt">Prompt Optimizer</TabsTrigger>
              </TabsList>
              
              <TabsContent value="analyzer" className="p-4 bg-white rounded-lg shadow">
                <AEOAnalyzer />
              </TabsContent>
              
              <TabsContent value="schema" className="p-4 bg-white rounded-lg shadow">
                <SchemaGeneratorWrapper />
              </TabsContent>
              
              <TabsContent value="prompt" className="p-4 bg-white rounded-lg shadow">
                <PromptOptimizer />
              </TabsContent>
            </Tabs>
          </div>
        </section>
        
        {/* Add Analytics Dashboard Promo Section here */}
        <AnalyticsDashboardPromo />
        
        <CTASection />
      </main>
      <Footer />
    </div>
  );
};

export default AEOServicePage;
