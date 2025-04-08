
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

  // Create industry sections with up to 4 different case studies per row
  const industrySections = Object.entries(groupedByIndustry).map(([industry, studies]) => {
    // Get all case studies from this industry plus others to fill the row if needed
    let adjustedStudies = [...studies];
    
    // If we don't have 4 studies for this industry, add studies from other industries
    if (adjustedStudies.length < 4) {
      // Get studies from other industries to supplement
      const otherStudies = caseStudiesData.filter(study => study.category !== industry);
      
      // Add them until we have 4 total, making sure not to duplicate
      let i = 0;
      while (adjustedStudies.length < 4 && i < otherStudies.length) {
        const study = otherStudies[i];
        // Check if this study is already in our adjusted list
        if (!adjustedStudies.some(s => s.id === study.id)) {
          adjustedStudies.push(study);
        }
        i++;
      }
    }
    
    // Limit to 4 studies per row
    adjustedStudies = adjustedStudies.slice(0, 4);
    
    return {
      title: `${industry} Industry`,
      resources: adjustedStudies
    };
  });

  // Get featured case studies - always show 4 different ones
  // Take one from each industry if possible to show variety
  const industryKeys = Object.keys(groupedByIndustry);
  let featuredCaseStudies: typeof caseStudiesData = [];
  
  // Try to get one case study from each industry first
  industryKeys.slice(0, 4).forEach(industry => {
    if (groupedByIndustry[industry].length > 0) {
      featuredCaseStudies.push(groupedByIndustry[industry][0]);
    }
  });
  
  // If we still don't have 4, add more from remaining data without duplicating
  let remainingIndex = 0;
  while (featuredCaseStudies.length < 4 && remainingIndex < caseStudiesData.length) {
    const study = caseStudiesData[remainingIndex];
    if (!featuredCaseStudies.some(s => s.id === study.id)) {
      featuredCaseStudies.push(study);
    }
    remainingIndex++;
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
