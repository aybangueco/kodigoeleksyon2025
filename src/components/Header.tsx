
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';

export const Header = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header 
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out px-6 py-4 flex items-center justify-between no-print",
        scrolled ? "bg-white/80 backdrop-blur-md shadow-sm" : "bg-transparent"
      )}
    >
      <Link 
        to="/" 
        className="flex items-center gap-2 transition-opacity duration-300 hover:opacity-80"
      >
        <div className="w-8 h-6 overflow-hidden rounded-sm">
          {/* Philippines flag using Tailwind colors */}
          <div className="relative w-full h-full">
            <div className="absolute inset-0 bg-ph-blue" style={{ clipPath: 'polygon(0 0, 100% 0, 100% 50%, 0 50%)' }}></div>
            <div className="absolute inset-0 bg-ph-red" style={{ clipPath: 'polygon(0 50%, 100% 50%, 100% 100%, 0 100%)' }}></div>
            <div className="absolute left-0 top-0 w-1/3 h-full flex items-center justify-center">
              <div className="w-4 h-4 transform rotate-45 bg-ph-yellow flex items-center justify-center">
                <div className="absolute w-1 h-1 bg-ph-yellow rounded-full" style={{ top: '0.5px', left: '0.5px' }}></div>
                <div className="absolute w-1 h-1 bg-ph-yellow rounded-full" style={{ top: '0.5px', right: '0.5px' }}></div>
                <div className="absolute w-1 h-1 bg-ph-yellow rounded-full" style={{ bottom: '0.5px', left: '0.5px' }}></div>
              </div>
            </div>
          </div>
        </div>
        <span className="font-bold text-lg tracking-tight">KODIGO ELEKSYON 2025</span>
      </Link>
      
      <div className="flex items-center gap-4">
        <h2 className="text-sm font-medium text-gray-600 hidden md:block">
          Sample Ballot Builder
        </h2>
      </div>
    </header>
  );
};

export default Header;
