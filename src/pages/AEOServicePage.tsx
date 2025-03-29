
import React from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import HeroSection from '@/components/aeo-service/HeroSection';
import WhatIsAEOSection from '@/components/aeo-service/WhatIsAEOSection';
import WhyItMattersSection from '@/components/aeo-service/WhyItMattersSection';
import HowItWorksSection from '@/components/aeo-service/HowItWorksSection';
import CTASection from '@/components/aeo-service/CTASection';

const AEOServicePage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow">
        <HeroSection />
        <WhatIsAEOSection />
        <WhyItMattersSection />
        <HowItWorksSection />
        <CTASection />
      </main>
      
      <Footer />
    </div>
  );
};

export default AEOServicePage;
