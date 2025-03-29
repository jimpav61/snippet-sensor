
import React from 'react';
import { Button } from '@/components/ui/button';
import { Link, useLocation } from 'react-router-dom';

const Header = () => {
  const location = useLocation();
  const path = location.pathname;

  // Determine which nav item should be active
  const isHome = path === '/';
  const isAEO = path.includes('/aeo') && !path.includes('/aeo/admin') && !path.includes('/aeo/learning') && !path.includes('/aeo/learning/tools');
  const isDashboard = path.includes('/dashboard');
  const isLearningCenter = path.includes('/aeo/learning') && !path.includes('/aeo/learning/tools');
  const isTools = path.includes('/aeo/learning/tools');
  
  return (
    <header className="w-full py-4 px-4 sm:px-6 lg:px-8 border-b bg-white">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Link to="/" className="flex items-center">
            <span className="text-2xl font-bold text-aeo">ChatSites.ai</span>
          </Link>
        </div>
        
        <nav className="hidden md:flex items-center space-x-8">
          <Link 
            to="/" 
            className={`font-medium ${isHome ? 'text-aeo-500' : 'text-gray-600 hover:text-aeo-500'}`}
          >
            Home
          </Link>
          <Link 
            to="/aeo" 
            className={`font-medium ${isAEO ? 'text-aeo-500' : 'text-gray-600 hover:text-aeo-500'}`}
          >
            AEO Service
          </Link>
          <Link 
            to="/aeo/learning" 
            className={`font-medium ${isLearningCenter ? 'text-aeo-500' : 'text-gray-600 hover:text-aeo-500'}`}
          >
            Learning Center
          </Link>
          <Link 
            to="/aeo/learning/tools" 
            className={`font-medium ${isTools ? 'text-aeo-500' : 'text-gray-600 hover:text-aeo-500'}`}
          >
            Tools
          </Link>
          <Link 
            to="/dashboard" 
            className={`font-medium ${isDashboard ? 'text-aeo-500' : 'text-gray-600 hover:text-aeo-500'}`}
          >
            Dashboard
          </Link>
        </nav>
        
        <div className="flex items-center space-x-4">
          <Button asChild variant="ghost" className="hidden md:flex">
            <Link to="/login">Login</Link>
          </Button>
          <Button asChild className="bg-aeo hover:bg-aeo-600">
            <Link to="/aeo/analyze">Get Your AEO Score</Link>
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
