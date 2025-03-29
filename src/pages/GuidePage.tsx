
import React from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { ChevronLeft } from 'lucide-react';
import { Link, useParams } from 'react-router-dom';
import { guidesData } from '@/data/guidesData';

const GuidePage = () => {
  const { slug } = useParams();
  const guide = guidesData.find(guide => guide.slug === slug);

  if (!guide) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow flex items-center justify-center">
          <div className="text-center">
            <h1 className="heading-lg mb-4">Guide Not Found</h1>
            <Button asChild>
              <Link to="/aeo/learning/guides">Back to Guides</Link>
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
              <Link to="/aeo/learning/guides">
                <ChevronLeft className="h-5 w-5 mr-1" />
                Back to Guides
              </Link>
            </Button>
            
            <div className="flex items-center gap-2 mb-4">
              <span className="text-sm font-medium text-aeo-500 bg-aeo-50 px-3 py-1 rounded-full">
                {guide.category}
              </span>
              <span className="text-sm text-gray-500">{guide.readTime}</span>
            </div>
            
            <h1 className="heading-xl mb-6">{guide.title}</h1>
          </div>
          
          <div className="prose prose-lg max-w-none">
            {guide.content.map((paragraph, index) => (
              <p key={index} className="mb-6">{paragraph}</p>
            ))}
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default GuidePage;
