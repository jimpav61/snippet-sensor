
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Link, useLocation } from 'react-router-dom';
import { Menu } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';
import { 
  Sheet,
  SheetContent,
  SheetTrigger
} from '@/components/ui/sheet';

const Header = () => {
  const location = useLocation();
  const path = location.pathname;
  const isMobile = useIsMobile();
  const [isOpen, setIsOpen] = useState(false);

  // Determine which nav item should be active
  const isHome = path === '/';
  const isAEO = path.includes('/aeo') && !path.includes('/aeo/admin') && !path.includes('/aeo/learning') && !path.includes('/aeo/learning/tools');
  const isAnalyticsDashboard = path.includes('/analytics-dashboard');
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
        
        {/* Desktop navigation */}
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
            to="/analytics-dashboard" 
            className={`font-medium ${isAnalyticsDashboard ? 'text-aeo-500' : 'text-gray-600 hover:text-aeo-500'}`}
          >
            Analytics Dashboard
          </Link>
        </nav>
        
        <div className="flex items-center space-x-4">
          {/* Mobile menu button */}
          {isMobile && (
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden">
                  <Menu className="h-6 w-6" />
                  <span className="sr-only">Open menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[250px] pt-10">
                <nav className="flex flex-col space-y-4">
                  <Link 
                    to="/"
                    onClick={() => setIsOpen(false)}
                    className={`font-medium ${isHome ? 'text-aeo-500' : 'text-gray-600 hover:text-aeo-500'}`}
                  >
                    Home
                  </Link>
                  <Link 
                    to="/aeo" 
                    onClick={() => setIsOpen(false)}
                    className={`font-medium ${isAEO ? 'text-aeo-500' : 'text-gray-600 hover:text-aeo-500'}`}
                  >
                    AEO Service
                  </Link>
                  <Link 
                    to="/aeo/learning" 
                    onClick={() => setIsOpen(false)}
                    className={`font-medium ${isLearningCenter ? 'text-aeo-500' : 'text-gray-600 hover:text-aeo-500'}`}
                  >
                    Learning Center
                  </Link>
                  <Link 
                    to="/aeo/learning/tools" 
                    onClick={() => setIsOpen(false)}
                    className={`font-medium ${isTools ? 'text-aeo-500' : 'text-gray-600 hover:text-aeo-500'}`}
                  >
                    Tools
                  </Link>
                  <Link 
                    to="/analytics-dashboard" 
                    onClick={() => setIsOpen(false)}
                    className={`font-medium ${isAnalyticsDashboard ? 'text-aeo-500' : 'text-gray-600 hover:text-aeo-500'}`}
                  >
                    Analytics Dashboard
                  </Link>
                  <Link 
                    to="/login"
                    onClick={() => setIsOpen(false)} 
                    className="font-medium text-gray-600 hover:text-aeo-500"
                  >
                    Login
                  </Link>
                </nav>
              </SheetContent>
            </Sheet>
          )}

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
