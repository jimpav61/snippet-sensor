
import React from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { ChevronLeft } from 'lucide-react';
import { Link, useParams } from 'react-router-dom';
import { caseStudiesData } from '@/data/caseStudiesData';

const CaseStudyPage = () => {
  const { slug } = useParams();
  const caseStudy = caseStudiesData.find(study => study.slug === slug);

  if (!caseStudy) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow flex items-center justify-center">
          <div className="text-center">
            <h1 className="heading-lg mb-4">Case Study Not Found</h1>
            <Button asChild>
              <Link to="/aeo/learning/case-studies">Back to Case Studies</Link>
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow">
        <div className="max-w-4xl mx-auto px-4 py-12">
          <div className="mb-8">
            <Button variant="ghost" className="p-0 hover:bg-transparent mb-4" asChild>
              <Link to="/aeo/learning/case-studies">
                <ChevronLeft className="h-5 w-5 mr-1" />
                Back to Case Studies
              </Link>
            </Button>
            
            <div className="flex items-center gap-2 mb-4">
              <span className="text-sm font-medium text-aeo-500 bg-aeo-50 px-3 py-1 rounded-full">
                {caseStudy.category} Industry
              </span>
              <span className="text-sm text-gray-500">{caseStudy.readTime}</span>
            </div>
            
            <h1 className="heading-xl mb-6">{caseStudy.title}</h1>
            <p className="text-lg text-gray-700 mb-8">{caseStudy.description}</p>
          </div>
          
          <div className="prose prose-lg max-w-none">
            {caseStudy.content.map((paragraph, index) => {
              // Check if paragraph starts with ## for heading
              if (paragraph.startsWith('## ')) {
                const headingText = paragraph.replace('## ', '');
                return <h2 key={index} className="text-2xl font-bold mt-8 mb-4">{headingText}</h2>;
              }
              // Check if paragraph starts with ### for subheading
              else if (paragraph.startsWith('### ')) {
                const subheadingText = paragraph.replace('### ', '');
                return <h3 key={index} className="text-xl font-semibold mt-6 mb-3">{subheadingText}</h3>;
              }
              // Regular paragraph
              return <p key={index} className="mb-4">{paragraph}</p>;
            })}
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default CaseStudyPage;
