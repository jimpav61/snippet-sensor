
import React from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className="w-full py-4 px-4 sm:px-6 lg:px-8 border-b bg-white">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Link to="/" className="flex items-center">
            <span className="text-2xl font-bold text-aeo">ChatSites.ai</span>
          </Link>
        </div>
        
        <nav className="hidden md:flex items-center space-x-8">
          <Link to="/" className="text-gray-600 hover:text-aeo-500 font-medium">Home</Link>
          <Link to="/aeo" className="text-aeo-500 font-medium">AEO Service</Link>
          <Link to="/dashboard" className="text-gray-600 hover:text-aeo-500 font-medium">Dashboard</Link>
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
