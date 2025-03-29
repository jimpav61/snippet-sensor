
import React from 'react';

const WhyItMattersSection = () => {
  return (
    <section className="py-16 md:py-24 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="heading-lg mb-6 text-gray-900">Why AEO <span className="text-aeo">Matters</span> for Your Business</h2>
            <p className="text-lg text-gray-600 mb-8">
              As AI continues to transform how people find information online, businesses need to adapt their content strategies to maintain visibility.
            </p>
            
            <div className="space-y-6">
              <div className="flex">
                <div className="flex-shrink-0 h-6 w-6 rounded-full bg-aeo-500 flex items-center justify-center text-white font-bold text-sm">
                  1
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-medium text-gray-900">Maintain Visibility</h3>
                  <p className="mt-2 text-gray-600">
                    As direct clicks decrease due to AI-generated answers, optimizing for AI ensures your content still reaches your audience.
                  </p>
                </div>
              </div>
              
              <div className="flex">
                <div className="flex-shrink-0 h-6 w-6 rounded-full bg-aeo-500 flex items-center justify-center text-white font-bold text-sm">
                  2
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-medium text-gray-900">Competitive Advantage</h3>
                  <p className="mt-2 text-gray-600">
                    Early adopters of AEO will outperform competitors as AI continues to dominate the search landscape.
                  </p>
                </div>
              </div>
              
              <div className="flex">
                <div className="flex-shrink-0 h-6 w-6 rounded-full bg-aeo-500 flex items-center justify-center text-white font-bold text-sm">
                  3
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-medium text-gray-900">Future-Proof Strategy</h3>
                  <p className="mt-2 text-gray-600">
                    As search evolves toward AI-first experiences, AEO becomes essential rather than optional.
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="relative">
            <div className="aeo-card p-6 shadow-lg">
              <div className="mb-6">
                <h3 className="font-semibold text-xl mb-2">The Changing Search Landscape</h3>
                <p className="text-gray-600 text-sm">Last 5 years of search behavior data</p>
              </div>
            
              <div className="relative h-60 w-full mb-6">
                <div className="absolute bottom-0 left-0 w-full h-full flex items-end">
                  <div className="w-1/5 h-[30%] bg-gray-200 rounded-t"></div>
                  <div className="w-1/5 h-[45%] bg-gray-200 rounded-t"></div>
                  <div className="w-1/5 h-[55%] bg-gray-200 rounded-t"></div>
                  <div className="w-1/5 h-[70%] bg-gray-200 rounded-t"></div>
                  <div className="w-1/5 h-[85%] bg-gray-200 rounded-t"></div>
                </div>
                
                <div className="absolute bottom-0 left-0 w-full h-full flex items-end">
                  <div className="w-1/5 h-[10%] bg-aeo-500 rounded-t"></div>
                  <div className="w-1/5 h-[20%] bg-aeo-500 rounded-t"></div>
                  <div className="w-1/5 h-[35%] bg-aeo-500 rounded-t"></div>
                  <div className="w-1/5 h-[50%] bg-aeo-500 rounded-t"></div>
                  <div className="w-1/5 h-[65%] bg-aeo-500 rounded-t"></div>
                </div>
                
                <div className="absolute bottom-[-24px] left-0 w-full flex justify-between text-xs text-gray-500">
                  <span>2020</span>
                  <span>2021</span>
                  <span>2022</span>
                  <span>2023</span>
                  <span>2024</span>
                </div>
              </div>
              
              <div className="flex justify-between items-center text-sm">
                <div className="flex items-center">
                  <div className="h-3 w-3 bg-gray-200 rounded-sm mr-2"></div>
                  <span className="text-gray-600">Traditional clicks</span>
                </div>
                <div className="flex items-center">
                  <div className="h-3 w-3 bg-aeo-500 rounded-sm mr-2"></div>
                  <span className="text-gray-600">AI-generated results</span>
                </div>
              </div>
            </div>
            
            <div className="absolute -left-6 -bottom-6 h-32 w-32 rounded-full bg-aeo-50 transform opacity-70 blur-md -z-10"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyItMattersSection;
