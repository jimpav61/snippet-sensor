
import React from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import ResourceCategorySection from '@/components/learning-center/ResourceCategorySection';
import { Button } from '@/components/ui/button';
import { ChevronLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { caseStudiesData } from '@/data/caseStudiesData';

const CaseStudiesPage = () => {
  // Get featured case studies - always show 4 different ones
  // Take one from each industry if possible to show variety
  const uniqueIndustries = [...new Set(caseStudiesData.map(study => study.category))];
  let featuredCaseStudies = [];
  
  // Try to get one case study from each industry first
  for (const industry of uniqueIndustries.slice(0, 4)) {
    const study = caseStudiesData.find(s => s.category === industry);
    if (study) {
      featuredCaseStudies.push(study);
    }
  }
  
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
        
        {/* All Case Studies in a single grid */}
        <section className="py-8 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-2xl font-bold mb-6 text-gray-900">All Case Studies</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {caseStudiesData.map((study) => (
                <ResourceCard
                  key={study.slug}
                  title={study.title}
                  description={study.description}
                  category={study.category}
                  readTime={study.readTime}
                  slug={study.slug}
                  type="case-study"
                />
              ))}
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default CaseStudiesPage;
