import React from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { ArrowRight, Bot, BarChart3, Zap, Users, Lightbulb, BarChart } from 'lucide-react';
const Index = () => {
  return <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow">
        {/* Hero Section - Completely redesigned */}
        <section className="py-20 md:py-28 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-aeo-900 via-aeo-700 to-aeo-500 text-white relative overflow-hidden">
          <div className="absolute inset-0 z-0 opacity-30">
            <div className="absolute right-0 top-0 w-full h-full max-w-4xl">
              <div className="w-full h-full bg-blue-400 rounded-full blur-3xl opacity-20 transform -translate-x-1/4 -translate-y-1/4"></div>
            </div>
            <div className="absolute left-0 bottom-0 w-full h-full max-w-4xl">
              <div className="w-full h-full bg-purple-400 rounded-full blur-3xl opacity-20 transform translate-x-1/4 translate-y-1/4"></div>
            </div>
          </div>
          
          <div className="relative z-10 max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="animate-fade-in">
                <h1 className="text-4xl md:text-6xl font-extrabold mb-6 leading-tight">
                  AI-Powered Solutions for a <span className="text-transparent bg-clip-text bg-gradient-to-r from-aeo-300 to-aeo-500">Digital Future</span>
                </h1>
                <p className="text-xl md:text-2xl mb-8 text-gray-100 max-w-2xl">
                  Unlock the potential of AI for your business with ChatSites.ai - where innovative solutions meet real-world challenges.
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4 mb-8">
                  <Button asChild size="lg" className="bg-white text-aeo-600 hover:bg-gray-100">
                    <Link to="/aeo">Explore Solutions <ArrowRight className="ml-2 h-4 w-4" /></Link>
                  </Button>
                  <Button asChild variant="outline" size="lg" className="border-white/50 text-white bg-aeo-900/10 hover:bg-aeo-900/20 font-semibold">
                    <Link to="/aeo/learning">Learning Center</Link>
                  </Button>
                </div>
                
                <div className="flex flex-wrap gap-6 mt-8">
                  <div className="flex items-center gap-2">
                    <div className="w-10 h-10 rounded-full flex items-center justify-center bg-white/10 backdrop-blur-sm">
                      <Bot className="h-5 w-5 text-white" />
                    </div>
                    <span className="text-white/90">AI-First Solutions</span>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <div className="w-10 h-10 rounded-full flex items-center justify-center bg-white/10 backdrop-blur-sm">
                      <BarChart3 className="h-5 w-5 text-white" />
                    </div>
                    <span className="text-white/90">Data Analytics</span>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <div className="w-10 h-10 rounded-full flex items-center justify-center bg-white/10 backdrop-blur-sm">
                      <Zap className="h-5 w-5 text-white" />
                    </div>
                    <span className="text-white/90">Fast Implementation</span>
                  </div>
                </div>
              </div>
              
              <div className="relative hidden lg:block">
                <div className="relative z-10 rounded-lg overflow-hidden shadow-2xl transform rotate-2 hover:rotate-0 transition-transform duration-300">
                  <img alt="AI Platform Dashboard" className="w-full h-auto" src="/lovable-uploads/cb29f1b3-9228-4c64-af45-cb7d8a4cd5fa.png" />
                </div>
                <div className="absolute -z-10 -bottom-10 -right-10 w-64 h-64 bg-pink-500 rounded-full opacity-20 blur-3xl"></div>
                <div className="absolute -z-10 -top-10 -left-10 w-48 h-48 bg-blue-500 rounded-full opacity-20 blur-3xl"></div>
              </div>
            </div>
          </div>
        </section>
        
        {/* What We Offer Section - New */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">Our Platform Solutions</h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                ChatSites.ai provides a comprehensive suite of AI-powered solutions designed to transform your digital presence.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white rounded-xl shadow-md p-8 hover:shadow-lg transition-shadow">
                <div className="h-14 w-14 rounded-full bg-aeo-50 flex items-center justify-center text-aeo mb-6">
                  <BarChart className="h-7 w-7" />
                </div>
                <h3 className="text-xl font-semibold mb-3">AI Analytics Dashboard</h3>
                <p className="text-gray-600 mb-4">
                  Gain valuable insights from your data with our comprehensive analytics solution.
                </p>
                <Link to="/analytics-dashboard" className="text-aeo-600 font-medium flex items-center hover:underline">
                  Learn more <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </div>
              
              <div className="bg-gradient-to-br from-aeo-500 to-aeo-700 rounded-xl shadow-md p-8 text-white hover:shadow-lg transition-shadow">
                <div className="h-14 w-14 rounded-full bg-white/20 flex items-center justify-center mb-6">
                  <Zap className="h-7 w-7 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-3">AI Engine Optimization</h3>
                <p className="text-white/90 mb-4">
                  Optimize your content for AI-driven search with our specialized AEO services.
                </p>
                <Link to="/aeo" className="text-white font-medium flex items-center hover:underline">
                  Learn more <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </div>
              
              <div className="bg-white rounded-xl shadow-md p-8 hover:shadow-lg transition-shadow">
                <div className="h-14 w-14 rounded-full bg-aeo-50 flex items-center justify-center text-aeo mb-6">
                  <Lightbulb className="h-7 w-7" />
                </div>
                <h3 className="text-xl font-semibold mb-3">AI Learning Center</h3>
                <p className="text-gray-600 mb-4">
                  Access resources, guides and tools to enhance your AI implementation strategy.
                </p>
                <Link to="/aeo/learning" className="text-aeo-600 font-medium flex items-center hover:underline">
                  Learn more <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>
        </section>
        
        {/* Why Choose Us Section - New */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">Why Choose ChatSites.ai</h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                Partner with the leader in AI solutions and stay ahead in an ever-evolving digital landscape.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="bg-gray-50 rounded-lg p-6 hover:shadow-md transition-shadow">
                <div className="text-2xl font-bold text-aeo-600 mb-2">01</div>
                <h3 className="text-xl font-semibold mb-2">Cutting-Edge Technology</h3>
                <p className="text-gray-600">
                  Our solutions leverage the latest advancements in artificial intelligence and machine learning.
                </p>
              </div>
              
              <div className="bg-gray-50 rounded-lg p-6 hover:shadow-md transition-shadow">
                <div className="text-2xl font-bold text-aeo-600 mb-2">02</div>
                <h3 className="text-xl font-semibold mb-2">Proven Results</h3>
                <p className="text-gray-600">
                  Our clients experience tangible improvements in engagement, visibility, and conversion rates.
                </p>
              </div>
              
              <div className="bg-gray-50 rounded-lg p-6 hover:shadow-md transition-shadow">
                <div className="text-2xl font-bold text-aeo-600 mb-2">03</div>
                <h3 className="text-xl font-semibold mb-2">Expert Support</h3>
                <p className="text-gray-600">
                  Our team of AI specialists is dedicated to helping you maximize the value of our solutions.
                </p>
              </div>
              
              <div className="bg-gray-50 rounded-lg p-6 hover:shadow-md transition-shadow">
                <div className="text-2xl font-bold text-aeo-600 mb-2">04</div>
                <h3 className="text-xl font-semibold mb-2">Future-Proof Solutions</h3>
                <p className="text-gray-600">
                  Stay ahead of the curve with solutions designed to adapt to emerging AI technologies.
                </p>
              </div>
            </div>
          </div>
        </section>
        
        {/* Success Stories Section - New */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">Success Stories</h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                See how businesses like yours are thriving with our AI solutions.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white rounded-lg shadow p-6">
                <div className="flex items-center mb-4">
                  <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center mr-4">
                    <Users className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold">TechCorp Inc.</h3>
                    <p className="text-sm text-gray-500">Technology</p>
                  </div>
                </div>
                <p className="text-gray-600 mb-4">
                  "ChatSites.ai transformed our approach to customer engagement. Our AI visibility improved by 87% in just 3 months."
                </p>
                <Link to="/aeo/learning/case-studies" className="text-aeo-600 font-medium text-sm hover:underline">
                  Read the case study
                </Link>
              </div>
              
              <div className="bg-white rounded-lg shadow p-6">
                <div className="flex items-center mb-4">
                  <div className="h-12 w-12 rounded-full bg-green-100 flex items-center justify-center mr-4">
                    <Users className="h-6 w-6 text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold">GreenLeaf Marketing</h3>
                    <p className="text-sm text-gray-500">Marketing Agency</p>
                  </div>
                </div>
                <p className="text-gray-600 mb-4">
                  "The analytics dashboard gave us insights we never knew existed. We've seen a 32% increase in conversion rates."
                </p>
                <Link to="/aeo/learning/case-studies" className="text-aeo-600 font-medium text-sm hover:underline">
                  Read the case study
                </Link>
              </div>
              
              <div className="bg-white rounded-lg shadow p-6">
                <div className="flex items-center mb-4">
                  <div className="h-12 w-12 rounded-full bg-purple-100 flex items-center justify-center mr-4">
                    <Users className="h-6 w-6 text-purple-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold">Retail Evolution</h3>
                    <p className="text-sm text-gray-500">E-commerce</p>
                  </div>
                </div>
                <p className="text-gray-600 mb-4">
                  "AEO has become a critical part of our content strategy. Our products now appear in 46% more AI-generated responses."
                </p>
                <Link to="/aeo/learning/case-studies" className="text-aeo-600 font-medium text-sm hover:underline">
                  Read the case study
                </Link>
              </div>
            </div>
            
            <div className="text-center mt-10">
              <Button asChild variant="outline" size="lg" className="border-aeo-500 text-aeo-600 hover:bg-aeo-50">
                <Link to="/aeo/learning/case-studies">View All Case Studies</Link>
              </Button>
            </div>
          </div>
        </section>
        
        {/* CTA Section - Redesigned */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-aeo-600 to-indigo-900 text-white">
          <div className="max-w-5xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Start Your AI Journey Today</h2>
            <p className="text-xl text-white/90 mb-8 max-w-3xl mx-auto">
              Begin with our free AEO assessment and discover how ChatSites.ai can transform your digital presence.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" variant="secondary" className="text-lg">
                <Link to="/aeo/analyze">Get Your Free AEO Score <ArrowRight className="ml-2 h-5 w-5" /></Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="bg-transparent text-white border-white hover:bg-white/10 text-lg">
                <Link to="/aeo/contact">Schedule a Demo</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>;
};
export default Index;