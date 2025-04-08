
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

  // Convert to array of category sections
  const industrySections = Object.entries(groupedByIndustry).map(([industry, studies]) => ({
    title: `${industry} Industry`,
    resources: studies
  }));

  // Get featured case studies
  const featuredCaseStudies = caseStudiesData.slice(0, 3);

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
            <h2 className="text-2xl font-bold mb-6 text-gray-900">Featured Success Stories</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredCaseStudies.map((study, index) => (
                <div key={index} className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow">
                  <div className="p-6">
                    <span className="inline-block px-3 py-1 text-xs font-medium bg-aeo-50 text-aeo-600 rounded-full mb-4">
                      {study.category}
                    </span>
                    <h3 className="text-lg font-semibold mb-2">{study.title}</h3>
                    <p className="text-gray-600 text-sm mb-4">{study.description}</p>
                    <div className="flex justify-between items-center">
                      <span className="text-xs text-gray-500">{study.readTime}</span>
                      <Button asChild variant="ghost" size="sm" className="text-aeo-600 hover:text-aeo-700 p-0">
                        <Link to={`/aeo/learning/case-study/${study.slug}`}>
                          Read Case Study
                        </Link>
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
        
        {/* Case Studies by Industry */}
        <section className="py-8 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-2xl font-bold mb-6 text-gray-900">Browse by Industry</h2>
            
            {/* Using our ResourceCategorySection component for each industry */}
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
