
import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 border-t">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        <div className="col-span-1 md:col-span-2">
          <Link to="/" className="flex items-center">
            <span className="text-2xl font-bold text-aeo">ChatSites.ai</span>
          </Link>
          <p className="mt-4 text-gray-600 max-w-md">
            Helping businesses optimize their content for AI-driven search platforms and stay ahead in the evolving digital landscape.
          </p>
        </div>
        
        <div>
          <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider">Services</h3>
          <ul className="mt-4 space-y-2">
            <li>
              <Link to="/aeo" className="text-gray-600 hover:text-aeo-500">AI Engine Optimization</Link>
            </li>
            <li>
              <Link to="/aeo/analyze" className="text-gray-600 hover:text-aeo-500">Get Your AEO Score</Link>
            </li>
            <li>
              <Link to="/aeo/admin" className="text-gray-600 hover:text-aeo-500">Admin Portal</Link>
            </li>
          </ul>
        </div>
        
        <div>
          <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider">Company</h3>
          <ul className="mt-4 space-y-2">
            <li>
              <Link to="/about" className="text-gray-600 hover:text-aeo-500">About Us</Link>
            </li>
            <li>
              <a href="https://chatsites.ai" className="text-gray-600 hover:text-aeo-500">ChatSites.ai</a>
            </li>
            <li>
              <Link to="/contact" className="text-gray-600 hover:text-aeo-500">Contact</Link>
            </li>
          </ul>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto pt-8 mt-8 border-t border-gray-200">
        <p className="text-gray-400 text-sm text-center">
          &copy; {new Date().getFullYear()} ChatSites.ai. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
