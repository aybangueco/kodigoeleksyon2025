
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
        <div className="w-8 h-6 overflow-hidden">
          <img 
            src="/lovable-uploads/philippines-flag.png" 
            alt="Philippine Flag" 
            className="w-full h-full object-cover"
          />
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
