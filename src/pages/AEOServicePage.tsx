
import React from 'react';
import { Button } from '@/components/ui/button';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Link } from 'react-router-dom';
import { BarChart3, Search, Zap, LineChart, BarChart, PieChart, ArrowRight, Download, Calendar } from 'lucide-react';

const AEOServicePage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative py-20 px-4 sm:px-6 lg:px-8 overflow-hidden bg-gradient-to-br from-gray-50 to-white">
          <div className="absolute inset-0 z-0 opacity-20">
            <div className="absolute inset-0 bg-white"></div>
            <div className="absolute right-0 bottom-0 w-full h-full max-w-3xl">
              <div className="w-full h-full bg-aeo-50 rounded-full blur-3xl opacity-30 transform translate-x-1/3 translate-y-1/3"></div>
            </div>
          </div>
          
          <div className="relative z-10 max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="animate-fade-in">
                <div className="inline-block px-3 py-1 rounded-full bg-aeo-50 text-aeo-600 font-medium text-sm mb-6">
                  Introducing AEO Service
                </div>
                <h1 className="heading-xl mb-6 text-gray-900">
                  AI Engine <span className="text-aeo">Optimization</span> for the Future of Search
                </h1>
                <p className="text-lg md:text-xl text-gray-600 mb-8 max-w-2xl">
                  In today's AI-driven search landscape, being visible means optimizing for AI, not just keywords. Our AEO service ensures your content stands out where it matters most.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button asChild size="lg" className="bg-aeo hover:bg-aeo-600">
                    <Link to="/aeo/analyze">Get Your Free AEO Score</Link>
                  </Button>
                  <Button asChild variant="outline" size="lg">
                    <Link to="/aeo/learn-more">Learn More <ArrowRight className="ml-2 h-4 w-4" /></Link>
                  </Button>
                </div>
                
                <div className="mt-8 p-4 rounded-lg border border-gray-200 bg-white/50 backdrop-blur-sm">
                  <p className="text-gray-800 font-medium">
                    <span className="text-aeo font-bold">60%</span> of Google searches conclude without clicks due to AI-generated featured snippets.
                  </p>
                </div>
              </div>
              
              <div className="relative">
                <div className="aeo-card p-6 md:p-8 lg:p-10 shadow-lg">
                  <div className="flex items-center mb-6">
                    <div className="h-12 w-12 rounded-full bg-aeo-50 flex items-center justify-center text-aeo-500">
                      <Search className="h-6 w-6" />
                    </div>
                    <div className="ml-4">
                      <h3 className="font-semibold text-xl">AI Search Results</h3>
                      <p className="text-gray-500">Optimized snippet for "content marketing strategies"</p>
                    </div>
                  </div>
                  
                  <div className="p-4 rounded-lg bg-gray-50 border border-gray-100">
                    <p className="text-gray-800">
                      <span className="font-semibold">Content marketing strategies</span> should focus on creating valuable,
                      relevant content that addresses user intent and provides comprehensive answers. Successful strategies incorporate
                      structured data, clear headings, and concise summaries optimized for featured snippets.
                    </p>
                    <div className="mt-4 flex items-center text-sm text-gray-500">
                      <span className="text-aeo-500 font-medium">AEO Score: 92/100</span>
                      <span className="mx-2">•</span>
                      <span>High snippet potential</span>
                    </div>
                  </div>
                  
                  <div className="mt-6 grid grid-cols-2 gap-4">
                    <div className="p-3 rounded-lg border border-gray-100 bg-white">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm text-gray-500">Relevance</span>
                        <span className="text-sm font-medium">94%</span>
                      </div>
                      <div className="w-full bg-gray-100 rounded-full h-2">
                        <div className="bg-aeo-500 h-2 rounded-full" style={{ width: '94%' }}></div>
                      </div>
                    </div>
                    <div className="p-3 rounded-lg border border-gray-100 bg-white">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm text-gray-500">Readability</span>
                        <span className="text-sm font-medium">88%</span>
                      </div>
                      <div className="w-full bg-gray-100 rounded-full h-2">
                        <div className="bg-aeo-500 h-2 rounded-full" style={{ width: '88%' }}></div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="absolute -right-6 -bottom-6 h-24 w-24 rounded-xl aeo-gradient transform rotate-6 opacity-80 blur-sm -z-10"></div>
                <div className="absolute -left-4 -top-4 h-16 w-16 rounded-xl bg-gray-200 transform -rotate-12 opacity-60 blur-sm -z-10"></div>
              </div>
            </div>
          </div>
        </section>
        
        {/* What is AEO Section */}
        <section className="py-16 md:py-24 px-4 sm:px-6 lg:px-8 bg-white">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12 md:mb-16">
              <h2 className="heading-lg mb-4 text-gray-900">What is <span className="text-aeo">AI Engine Optimization</span>?</h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                AEO is the process of optimizing your content to perform better in AI-driven search systems, ensuring your business remains visible in a changing search landscape.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="aeo-card p-6">
                <div className="h-12 w-12 rounded-lg bg-aeo-50 flex items-center justify-center text-aeo mb-4">
                  <Search className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Beyond Traditional SEO</h3>
                <p className="text-gray-600">
                  While SEO focuses on ranking in traditional search results, AEO targets AI-generated snippets and answers that often replace traditional clicks.
                </p>
              </div>
              
              <div className="aeo-card p-6">
                <div className="h-12 w-12 rounded-lg bg-aeo-50 flex items-center justify-center text-aeo mb-4">
                  <Zap className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-semibold mb-3">AI-Ready Content</h3>
                <p className="text-gray-600">
                  Structure your content to be easily understood and extracted by AI systems, making it more likely to be featured in AI-generated responses.
                </p>
              </div>
              
              <div className="aeo-card p-6">
                <div className="h-12 w-12 rounded-lg bg-aeo-50 flex items-center justify-center text-aeo mb-4">
                  <BarChart3 className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Data-Driven Insights</h3>
                <p className="text-gray-600">
                  Our comprehensive scoring system helps you understand exactly how your content performs with AI systems and where improvements can be made.
                </p>
              </div>
            </div>
          </div>
        </section>
        
        {/* Why It Matters Section */}
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
                      <span>2019</span>
                      <span>2020</span>
                      <span>2021</span>
                      <span>2022</span>
                      <span>2023</span>
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
        
        {/* How It Works Section */}
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
        
        {/* CTA Section */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 aeo-gradient">
          <div className="max-w-5xl mx-auto text-center">
            <h2 className="heading-lg mb-6 text-white">Ready to Optimize Your Content for AI?</h2>
            <p className="text-lg text-white/90 mb-8 max-w-2xl mx-auto">
              Get your free AEO score today and discover how your content performs with AI systems.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" variant="secondary">
                <Link to="/aeo/analyze">Get Your Free AEO Score</Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="bg-transparent text-white border-white hover:bg-white/10">
                <Link to="/aeo/contact">Schedule a Consultation <Calendar className="ml-2 h-4 w-4" /></Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default AEOServicePage;
