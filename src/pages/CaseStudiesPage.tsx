
import React from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import ResourceCard from '@/components/learning-center/ResourceCard';
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
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {featuredCaseStudies.map((study, index) => (
                <ResourceCard
                  key={study.slug || index}
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
        
        {/* Case Studies by Industry */}
        <section className="py-8 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-2xl font-bold mb-6 text-gray-900">Browse by Industry</h2>
            
            {industrySections.map((section, index) => (
              <div key={index} className="mb-12">
                <h3 className="text-xl font-semibold mb-6 text-gray-800">{section.title}</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {section.resources.map((resource, idx) => (
                    <ResourceCard
                      key={resource.slug || idx}
                      title={resource.title}
                      description={resource.description}
                      category={resource.category}
                      readTime={resource.readTime}
                      slug={resource.slug}
                      type="case-study"
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default CaseStudiesPage;
