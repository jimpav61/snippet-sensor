
import React from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { BarChart, ArrowRight } from 'lucide-react';

const AnalyticsDashboardPromo = () => {
  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-10">
          <h2 className="heading-lg mb-4 text-gray-900">
            Unlock Insights with Our Free Analytics Dashboard
          </h2>
          <p className="text-lg text-gray-600 mb-6 max-w-3xl mx-auto">
            Track customer interactions, uncover trends, and improve engagement—all for free.
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          <div className="order-2 lg:order-1">
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="rounded-full bg-aeo-50 p-3 flex-shrink-0">
                  <BarChart className="h-6 w-6 text-aeo-500" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Conversation Analytics</h3>
                  <p className="text-gray-600">
                    Discover what your customers are asking about most frequently and optimize your AI responses accordingly.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="rounded-full bg-aeo-50 p-3 flex-shrink-0">
                  <svg className="h-6 w-6 text-aeo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Engagement Metrics</h3>
                  <p className="text-gray-600">
                    Identify drop-off points in conversations and improve your response strategies to keep users engaged.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="rounded-full bg-aeo-50 p-3 flex-shrink-0">
                  <svg className="h-6 w-6 text-aeo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Sentiment Analysis</h3>
                  <p className="text-gray-600">
                    Understand the emotional tone of your AI conversations and adjust your responses for better customer satisfaction.
                  </p>
                </div>
              </div>
              
              <div className="pt-4">
                <Button asChild size="lg" className="bg-aeo hover:bg-aeo-600">
                  <Link to="/analytics-dashboard">
                    Access Dashboard Now <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
          
          <div className="order-1 lg:order-2">
            <div className="relative">
              <div className="rounded-lg overflow-hidden shadow-xl border border-gray-200">
                <img 
                  src="/lovable-uploads/ae71c667-e69b-414e-a840-61baf21401e3.png" 
                  alt="Analytics Dashboard Preview" 
                  className="w-full h-auto"
                />
              </div>
              
              <div className="absolute -right-6 -bottom-6 h-24 w-24 rounded-xl aeo-gradient transform rotate-6 opacity-80 blur-sm -z-10"></div>
              <div className="absolute -left-4 -top-4 h-16 w-16 rounded-xl bg-gray-200 transform -rotate-12 opacity-60 blur-sm -z-10"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AnalyticsDashboardPromo;

