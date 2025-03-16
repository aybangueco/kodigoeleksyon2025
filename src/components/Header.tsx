
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
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
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out px-6 py-4 flex items-center justify-between",
        scrolled ? "bg-white/80 backdrop-blur-md shadow-sm" : "bg-transparent"
      )}
    >
      <Link 
        to="/" 
        className="flex items-center gap-2 transition-opacity duration-300 hover:opacity-80"
      >
        <div className="relative">
          <div className="w-8 h-8 flex items-center justify-center">
            <div className="w-6 h-6 rounded-full bg-ph-blue absolute animate-pulse-subtle"></div>
            <div className="w-6 h-6 rounded-full bg-ph-red absolute animate-pulse-subtle" style={{ animationDelay: '0.5s' }}></div>
            <div className="w-6 h-6 rounded-full bg-ph-yellow absolute animate-pulse-subtle" style={{ animationDelay: '1s' }}></div>
          </div>
        </div>
        <span className="font-semibold text-lg tracking-tight">Kodigo 2025</span>
      </Link>
      
      <div className="flex items-center gap-4">
        <h2 className="text-lg font-medium text-muted-foreground hidden md:block">
          Create Your Election Kodigo
        </h2>
      </div>
    </header>
  );
};

export default Header;
