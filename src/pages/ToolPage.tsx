
import React from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { ChevronLeft } from 'lucide-react';
import { Link, useParams } from 'react-router-dom';

// Placeholder for tool data - in a real app this would come from an API or data file
const toolsData = [
  {
    slug: "fashion-retailer-case-study",
    title: "Fashion Retailer Case Study Tool",
    description: "Interactive tool for analyzing the fashion retail case study",
    category: "Retail",
    readTime: "Interactive",
    content: [
      "This interactive tool allows you to explore the fashion retailer case study in depth.",
      "Please note this is a placeholder. In a production environment, this would be a fully interactive tool."
    ]
  }
];

const ToolPage = () => {
  const { slug } = useParams();
  const tool = toolsData.find(tool => tool.slug === slug);

  if (!tool) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow flex items-center justify-center">
          <div className="text-center">
            <h1 className="heading-lg mb-4">Tool Not Found</h1>
            <Button asChild>
              <Link to="/aeo/learning/tools">Back to Tools</Link>
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
              <Link to="/aeo/learning/tools">
                <ChevronLeft className="h-5 w-5 mr-1" />
                Back to Tools
              </Link>
            </Button>
            
            <div className="flex items-center gap-2 mb-4">
              <span className="text-sm font-medium text-aeo-500 bg-aeo-50 px-3 py-1 rounded-full">
                {tool.category}
              </span>
              <span className="text-sm text-gray-500">{tool.readTime}</span>
            </div>
            
            <h1 className="heading-xl mb-6">{tool.title}</h1>
            <p className="text-lg text-gray-700 mb-8">{tool.description}</p>
          </div>
          
          <div className="prose prose-lg max-w-none">
            {tool.content.map((paragraph, index) => (
              <p key={index} className="mb-4">{paragraph}</p>
            ))}
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default ToolPage;
