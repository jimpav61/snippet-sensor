
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Search, BarChart, LineChart, PieChart, ArrowRight } from 'lucide-react';

const HowItWorksSection = () => {
  return (
    <section className="py-16 md:py-24 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="heading-lg mb-4 text-gray-900">How Our <span className="text-aeo">AEO Service</span> Works</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Our comprehensive process analyzes your content and provides actionable insights to improve AI visibility.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="relative">
            <div className="aeo-card p-6 h-full">
              <div className="absolute top-4 right-4 h-8 w-8 rounded-full bg-aeo-500 flex items-center justify-center text-white font-bold">
                1
              </div>
              <div className="h-12 w-12 rounded-lg bg-aeo-50 flex items-center justify-center text-aeo mb-4">
                <Search className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Content Analysis</h3>
              <p className="text-gray-600">
                Submit your URL or content for comprehensive analysis by our specialized AEO tools.
              </p>
            </div>
            <div className="hidden md:block absolute -right-4 top-1/2 transform -translate-y-1/2 z-10">
              <ArrowRight className="h-8 w-8 text-gray-300" />
            </div>
          </div>
          
          <div className="relative">
            <div className="aeo-card p-6 h-full">
              <div className="absolute top-4 right-4 h-8 w-8 rounded-full bg-aeo-500 flex items-center justify-center text-white font-bold">
                2
              </div>
              <div className="h-12 w-12 rounded-lg bg-aeo-50 flex items-center justify-center text-aeo mb-4">
                <BarChart className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Performance Scoring</h3>
              <p className="text-gray-600">
                Receive detailed scoring across key metrics that determine AI visibility.
              </p>
            </div>
            <div className="hidden md:block absolute -right-4 top-1/2 transform -translate-y-1/2 z-10">
              <ArrowRight className="h-8 w-8 text-gray-300" />
            </div>
          </div>
          
          <div className="relative">
            <div className="aeo-card p-6 h-full">
              <div className="absolute top-4 right-4 h-8 w-8 rounded-full bg-aeo-500 flex items-center justify-center text-white font-bold">
                3
              </div>
              <div className="h-12 w-12 rounded-lg bg-aeo-50 flex items-center justify-center text-aeo mb-4">
                <LineChart className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Actionable Insights</h3>
              <p className="text-gray-600">
                Get specific recommendations to improve your content for AI optimization.
              </p>
            </div>
            <div className="hidden md:block absolute -right-4 top-1/2 transform -translate-y-1/2 z-10">
              <ArrowRight className="h-8 w-8 text-gray-300" />
            </div>
          </div>
          
          <div>
            <div className="aeo-card p-6 h-full">
              <div className="absolute top-4 right-4 h-8 w-8 rounded-full bg-aeo-500 flex items-center justify-center text-white font-bold">
                4
              </div>
              <div className="h-12 w-12 rounded-lg bg-aeo-50 flex items-center justify-center text-aeo mb-4">
                <PieChart className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Implementation & Results</h3>
              <p className="text-gray-600">
                Implement our recommendations and track improvements in your AI visibility.
              </p>
            </div>
          </div>
        </div>
        
        <div className="mt-12 text-center">
          <Button asChild size="lg" className="bg-aeo hover:bg-aeo-600">
            <Link to="/aeo/analyze">Start Your AEO Analysis Now</Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
