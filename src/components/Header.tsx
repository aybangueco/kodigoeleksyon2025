
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';

export const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const { pathname } = useLocation();

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
      
      <nav className="hidden md:flex items-center gap-6">
        <NavLink to="/" isActive={pathname === '/'}>Home</NavLink>
        <NavLink to="/ballot" isActive={pathname === '/ballot'}>Create Ballot</NavLink>
      </nav>
      
      <div className="flex items-center gap-4">
        <Link 
          to="/ballot" 
          className={cn(
            "px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300",
            "bg-primary text-white hover:bg-primary/90",
            "shadow-sm hover:shadow",
            "transform hover:translate-y-[-1px] active:translate-y-[1px]"
          )}
        >
          Create Your Kodigo
        </Link>
      </div>
    </header>
  );
};

const NavLink = ({ to, isActive, children }: { to: string; isActive: boolean; children: React.ReactNode }) => (
  <Link 
    to={to} 
    className={cn(
      "relative px-1 py-2 text-sm font-medium transition-colors duration-200",
      isActive 
        ? "text-primary" 
        : "text-muted-foreground hover:text-foreground"
    )}
  >
    {children}
    <span className={cn(
      "absolute bottom-0 left-0 w-full h-0.5 bg-primary scale-x-0 transition-transform duration-200 origin-left", 
      isActive && "scale-x-100"
    )} />
  </Link>
);

export default Header;
