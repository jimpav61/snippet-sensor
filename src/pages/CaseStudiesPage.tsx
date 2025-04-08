
import React from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import ResourceCategorySection from '@/components/learning-center/ResourceCategorySection';
import { Button } from '@/components/ui/button';
import { ChevronLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { caseStudiesData } from '@/data/caseStudiesData';

const CaseStudiesPage = () => {
  // Group case studies by industry category
  const groupedByIndustry = caseStudiesData.reduce((acc, caseStudy) => {
    const { category } = caseStudy;
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(caseStudy);
    return acc;
  }, {} as Record<string, typeof caseStudiesData>);

  // Make sure each industry section has exactly 4 case studies
  // If less than 4, duplicate some to fill the row
  const industrySections = Object.entries(groupedByIndustry).map(([industry, studies]) => {
    let adjustedStudies = [...studies];
    while (adjustedStudies.length < 4) {
      // Add duplicates with modified slugs to fill the row
      const toAdd = studies[adjustedStudies.length % studies.length];
      adjustedStudies.push({
        ...toAdd,
        slug: `${toAdd.slug}-copy-${adjustedStudies.length}`
      });
    }
    
    // Limit to 4 studies per row
    adjustedStudies = adjustedStudies.slice(0, 4);
    
    return {
      title: `${industry} Industry`,
      resources: adjustedStudies
    };
  });

  // Get featured case studies - always show exactly 4
  let featuredCaseStudies = caseStudiesData.slice(0, 4);
  
  // If we have less than 4 featured studies, duplicate some to fill the row
  while (featuredCaseStudies.length < 4) {
    const toAdd = caseStudiesData[featuredCaseStudies.length % caseStudiesData.length];
    featuredCaseStudies.push({
      ...toAdd,
      slug: `${toAdd.slug}-featured-copy-${featuredCaseStudies.length}`
    });
  }
  
  // Create a featured section object that matches the format expected by ResourceCategorySection
  const featuredSection = {
    title: "Featured Success Stories",
    resources: featuredCaseStudies
  };

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
              Real-world examples of how organizations across different industries improved their AI-enabled applications through AEO methodologies.
            </p>
          </div>
        </section>
        
        {/* Featured Case Studies */}
        <section className="py-8 px-4 sm:px-6 lg:px-8 bg-gray-50">
          <div className="max-w-7xl mx-auto">
            <ResourceCategorySection
              title={featuredSection.title}
              resources={featuredSection.resources}
              type="case-study"
            />
          </div>
        </section>
        
        {/* Case Studies by Industry */}
        <section className="py-8 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-2xl font-bold mb-6 text-gray-900">Browse by Industry</h2>
            
            {industrySections.map((section, index) => (
              <ResourceCategorySection
                key={index}
                title={section.title}
                resources={section.resources}
                type="case-study"
              />
            ))}
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default CaseStudiesPage;
