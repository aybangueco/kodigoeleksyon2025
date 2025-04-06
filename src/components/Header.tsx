
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { Menu, X } from 'lucide-react';

export const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  const locations = [
    { name: "ZAMBOANGA CITY", path: "/" },
    { name: "CEBU CITY", path: "/cebu-city" },
    { name: "MAKATI CITY", path: "/makati-city" },
    { name: "TAGUIG CITY", path: "/taguig-city" },
    { name: "CAINTA, RIZAL", path: "/cainta-rizal" },
    { name: "TAYTAY, RIZAL", path: "/taytay-rizal" },
    { name: "NATIONAL", path: "/national" },
  ];

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out px-4 sm:px-6 py-4 flex items-center justify-between print:hidden",
        scrolled ? "bg-white/95 backdrop-blur-md shadow-sm" : "bg-transparent"
      )}
    >
      <Link
        to="/"
        className="flex items-center gap-2 transition-opacity duration-300 hover:opacity-80"
      >
        <div className="w-8 h-6 overflow-hidden rounded-sm shadow-sm">
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
        {/* Mobile Menu Button */}
        <button
          className="md:hidden flex items-center justify-center w-10 h-10 text-gray-600 hover:text-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 rounded-full"
          onClick={toggleMenu}
          aria-label={isMenuOpen ? "Close Menu" : "Open Menu"}
          aria-expanded={isMenuOpen}
        >
          {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-1 lg:space-x-2">
          {locations.map((loc) => (
            <Link
              key={loc.path}
              to={loc.path}
              className={cn(
                "px-2 lg:px-3 py-1.5 text-sm font-medium rounded-md transition-colors",
                isActive(loc.path)
                  ? "bg-blue-50 text-blue-700"
                  : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
              )}
              aria-current={isActive(loc.path) ? "page" : undefined}
            >
              {loc.name}
            </Link>
          ))}
          <div className="h-6 border-l border-gray-300 mx-1"></div>
          <span className="text-sm font-medium text-gray-500 whitespace-nowrap">
            Sample Ballot Builder
          </span>
        </nav>
      </div>

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-40 bg-white/95 backdrop-blur-sm md:hidden">
          <div className="flex flex-col h-full">
            <div className="flex justify-between items-center p-4 border-b">
              <Link
                to="/"
                className="flex items-center gap-2"
                onClick={() => setIsMenuOpen(false)}
              >
                <div className="w-8 h-6 overflow-hidden rounded-sm">
                  {/* Philippines flag (same as above) */}
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
              <button
                className="flex items-center justify-center w-10 h-10 text-gray-600 hover:text-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 rounded-full"
                onClick={() => setIsMenuOpen(false)}
                aria-label="Close Menu"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            
            <nav className="flex flex-col p-4 space-y-3 overflow-y-auto">
              {locations.map((loc) => (
                <Link
                  key={loc.path}
                  to={loc.path}
                  className={cn(
                    "px-4 py-3 text-base font-medium rounded-md transition-colors",
                    isActive(loc.path)
                      ? "bg-blue-50 text-blue-700"
                      : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                  )}
                  onClick={() => setIsMenuOpen(false)}
                  aria-current={isActive(loc.path) ? "page" : undefined}
                >
                  {loc.name}
                </Link>
              ))}
              <div className="h-px bg-gray-200 my-2"></div>
              <div className="px-4 py-3 text-base font-medium text-gray-500">
                Sample Ballot Builder
              </div>
            </nav>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
