import React from 'react';
import { Link } from 'react-router-dom';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { ArrowRight, Lightbulb, BarChart3, Zap, Search, BookOpen } from 'lucide-react';

const AEOLearnMorePage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow">
        <section className="bg-gradient-to-r from-aeo-600 to-aeo-400 py-16 lg:py-24 px-4 sm:px-6 lg:px-8 text-white">
          <div className="max-w-7xl mx-auto">
            <div className="max-w-3xl">
              <h1 className="heading-xl mb-6">Understanding AI Engine Optimization</h1>
              <p className="text-xl font-light mb-8">
                Discover how AI is transforming search and why traditional SEO strategies are no longer enough in today's digital landscape.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button asChild size="lg" className="bg-white text-aeo-600 hover:bg-gray-100">
                  <Link to="/aeo/analyze">Try Our Free Analysis</Link>
                </Button>
                <Button 
                  asChild 
                  variant="outline" 
                  size="lg" 
                  className="text-aeo-600 border-white bg-white/30 hover:bg-white/50 hover:text-aeo-700"
                >
                  <Link to="/aeo/guide">Explore Full AEO Guide</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
        
        <section className="py-16 md:py-24 px-4 sm:px-6 lg:px-8 bg-white">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="heading-lg mb-4">The AEO <span className="text-aeo">Revolution</span></h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                As AI engines increasingly generate content summaries and direct answers, the traditional search paradigm is fundamentally changing.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 flex flex-col items-center text-center">
                <div className="h-14 w-14 rounded-full bg-aeo-50 flex items-center justify-center text-aeo mb-6">
                  <Lightbulb className="h-7 w-7" />
                </div>
                <h3 className="text-xl font-semibold mb-4">Beyond Keywords</h3>
                <p className="text-gray-600">
                  AI systems understand context, intent, and meaning—not just keywords. This requires a fundamental shift in how we optimize content.
                </p>
              </div>
              
              <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 flex flex-col items-center text-center">
                <div className="h-14 w-14 rounded-full bg-aeo-50 flex items-center justify-center text-aeo mb-6">
                  <BarChart3 className="h-7 w-7" />
                </div>
                <h3 className="text-xl font-semibold mb-4">Diminishing Clicks</h3>
                <p className="text-gray-600">
                  60% of search queries now end without clicks as AI systems provide direct answers, putting traditional traffic models at risk.
                </p>
              </div>
              
              <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 flex flex-col items-center text-center">
                <div className="h-14 w-14 rounded-full bg-aeo-50 flex items-center justify-center text-aeo mb-6">
                  <Zap className="h-7 w-7" />
                </div>
                <h3 className="text-xl font-semibold mb-4">First-Mover Advantage</h3>
                <p className="text-gray-600">
                  Early adopters of AEO strategies will establish dominance as AI continues to reshape how people discover information online.
                </p>
              </div>
            </div>
          </div>
        </section>
        
        <section className="py-16 md:py-24 px-4 sm:px-6 lg:px-8 bg-gray-50">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="heading-lg mb-6">Why AEO <span className="text-aeo">Matters</span> For Your Business</h2>
                <p className="text-lg text-gray-600 mb-8">
                  The transition to AI-first search is happening faster than most businesses realize. Here's why you need to act now:
                </p>
                
                <div className="space-y-6">
                  <div className="flex">
                    <div className="flex-shrink-0 h-10 w-10 rounded-full bg-aeo-500 flex items-center justify-center text-white">
                      <span className="text-lg font-bold">1</span>
                    </div>
                    <div className="ml-4">
                      <h3 className="text-lg font-semibold text-gray-900">Visibility in a Zero-Click World</h3>
                      <p className="mt-2 text-gray-600">
                        As AI engines provide direct answers, being the source of that information is crucial for maintaining brand visibility.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex">
                    <div className="flex-shrink-0 h-10 w-10 rounded-full bg-aeo-500 flex items-center justify-center text-white">
                      <span className="text-lg font-bold">2</span>
                    </div>
                    <div className="ml-4">
                      <h3 className="text-lg font-semibold text-gray-900">Authority Establishment</h3>
                      <p className="mt-2 text-gray-600">
                        AI systems prioritize content from authoritative sources. AEO helps position your brand as the go-to expert in your field.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex">
                    <div className="flex-shrink-0 h-10 w-10 rounded-full bg-aeo-500 flex items-center justify-center text-white">
                      <span className="text-lg font-bold">3</span>
                    </div>
                    <div className="ml-4">
                      <h3 className="text-lg font-semibold text-gray-900">Future-Proofing Your Strategy</h3>
                      <p className="mt-2 text-gray-600">
                        Traditional SEO strategies are becoming less effective. AEO prepares your business for the next evolution of search.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="relative">
                <div className="aeo-card p-8 shadow-lg">
                  <h3 className="text-xl font-semibold mb-6">Companies Using AEO See:</h3>
                  
                  <div className="space-y-6">
                    <div className="p-4 bg-white rounded-lg shadow-sm">
                      <div className="flex justify-between items-center mb-2">
                        <span className="font-medium">Featured Answer Rate</span>
                        <span className="text-aeo-500 font-bold">+215%</span>
                      </div>
                      <div className="w-full bg-gray-100 rounded-full h-3">
                        <div className="bg-aeo-500 h-3 rounded-full" style={{ width: '85%' }}></div>
                      </div>
                    </div>
                    
                    <div className="p-4 bg-white rounded-lg shadow-sm">
                      <div className="flex justify-between items-center mb-2">
                        <span className="font-medium">Brand Visibility</span>
                        <span className="text-aeo-500 font-bold">+180%</span>
                      </div>
                      <div className="w-full bg-gray-100 rounded-full h-3">
                        <div className="bg-aeo-500 h-3 rounded-full" style={{ width: '75%' }}></div>
                      </div>
                    </div>
                    
                    <div className="p-4 bg-white rounded-lg shadow-sm">
                      <div className="flex justify-between items-center mb-2">
                        <span className="font-medium">Qualified Traffic</span>
                        <span className="text-aeo-500 font-bold">+120%</span>
                      </div>
                      <div className="w-full bg-gray-100 rounded-full h-3">
                        <div className="bg-aeo-500 h-3 rounded-full" style={{ width: '65%' }}></div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-8 text-center">
                    <Button asChild className="bg-aeo hover:bg-aeo-600">
                      <Link to="/aeo/analyze">Get Your Free AEO Score</Link>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        <section className="py-16 md:py-24 px-4 sm:px-6 lg:px-8 bg-white">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="heading-lg mb-4">How <span className="text-aeo">AEO</span> Works</h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                Our comprehensive approach ensures your content is optimized for how AI engines actually understand and process information.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
              <div className="relative p-6 border border-gray-100 rounded-xl bg-white">
                <div className="absolute -top-5 left-6 h-10 w-10 rounded-full bg-aeo flex items-center justify-center text-white font-bold text-lg">1</div>
                <div className="pt-4">
                  <div className="flex items-center mb-4">
                    <Search className="h-5 w-5 text-aeo-500 mr-2" />
                    <h3 className="text-xl font-semibold">Content Analysis</h3>
                  </div>
                  <p className="text-gray-600">
                    We analyze your existing content to identify optimization opportunities specifically for AI engine visibility.
                  </p>
                </div>
              </div>
              
              <div className="relative p-6 border border-gray-100 rounded-xl bg-white">
                <div className="absolute -top-5 left-6 h-10 w-10 rounded-full bg-aeo flex items-center justify-center text-white font-bold text-lg">2</div>
                <div className="pt-4">
                  <div className="flex items-center mb-4">
                    <BookOpen className="h-5 w-5 text-aeo-500 mr-2" />
                    <h3 className="text-xl font-semibold">Strategic Recommendations</h3>
                  </div>
                  <p className="text-gray-600">
                    We provide detailed, actionable recommendations tailored to your specific content and business objectives.
                  </p>
                </div>
              </div>
              
              <div className="relative p-6 border border-gray-100 rounded-xl bg-white">
                <div className="absolute -top-5 left-6 h-10 w-10 rounded-full bg-aeo flex items-center justify-center text-white font-bold text-lg">3</div>
                <div className="pt-4">
                  <div className="flex items-center mb-4">
                    <Zap className="h-5 w-5 text-aeo-500 mr-2" />
                    <h3 className="text-xl font-semibold">Implementation & Monitoring</h3>
                  </div>
                  <p className="text-gray-600">
                    Our team helps implement changes and continuously monitors performance to ensure optimal AI visibility.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="mt-16 text-center">
              <Button asChild size="lg" className="bg-aeo hover:bg-aeo-600">
                <Link to="/aeo/guide">Read Our Complete AEO Guide <ArrowRight className="ml-2 h-4 w-4" /></Link>
              </Button>
            </div>
          </div>
        </section>
        
        <section className="py-16 md:py-20 px-4 sm:px-6 lg:px-8 bg-gray-900 text-white">
          <div className="max-w-5xl mx-auto text-center">
            <h2 className="heading-lg mb-6">Ready to Optimize Your Content for AI?</h2>
            <p className="text-xl mb-8 max-w-3xl mx-auto">
              Don't get left behind as AI transforms how people discover information online. Start your AEO journey today.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                asChild 
                size="lg" 
                className="bg-aeo-500 hover:bg-aeo-600 text-white"
              >
                <Link to="/aeo/analyze">Get Your Free AEO Score</Link>
              </Button>
              <Button 
                asChild 
                variant="outline" 
                size="lg" 
                className="border-white text-white hover:bg-white/30 hover:text-white/90"
              >
                <Link to="/aeo/learning">Discover Learning Resources</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default AEOLearnMorePage;
