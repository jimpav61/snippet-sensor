
import React from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import ArticleCard from '@/components/learning-center/ArticleCard';
import { Button } from '@/components/ui/button';
import { ChevronLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { articlesData } from '@/data/articlesData';

const ArticlesPage = () => {
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
            <h1 className="heading-xl mb-2">Articles</h1>
            <p className="text-lg max-w-3xl">
              Explore our collection of in-depth articles on AI Engine Optimization strategies and best practices.
            </p>
          </div>
        </section>
        
        {/* Articles Grid */}
        <section className="py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {articlesData.map((article) => (
                <ArticleCard 
                  key={article.id}
                  title={article.title}
                  description={article.description}
                  category={article.category}
                  date={article.date}
                  readTime={article.readTime}
                  slug={article.slug}
                />
              ))}
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default ArticlesPage;
