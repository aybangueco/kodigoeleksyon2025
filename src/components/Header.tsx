
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { Menu } from 'lucide-react';

export const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false); // State for mobile menu

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out px-6 py-4 flex items-center justify-between print:hidden",
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
        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-gray-600 hover:text-gray-800"
          onClick={toggleMenu}
          aria-label="Toggle Menu"
        >
          <Menu />
        </button>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-4">
          <Link
            to="/"
            className="flex items-center gap-2 transition-opacity duration-300 hover:opacity-80"
          >
            <span className="text-sm font-medium text-gray-600">ZAMBOANGA CITY</span>
          </Link>
          <Link
            to="/cebu-city"
            className="flex items-center gap-2 transition-opacity duration-300 hover:opacity-80"
          >
            <span className="text-sm font-medium text-gray-600">CEBU CITY</span>
          </Link>
          <Link
            to="/makati-city"
            className="flex items-center gap-2 transition-opacity duration-300 hover:opacity-80"
          >
            <span className="text-sm font-medium text-gray-600">MAKATI CITY</span>
          </Link>
          <Link
            to="/taguig-city"
            className="flex items-center gap-2 transition-opacity duration-300 hover:opacity-80"
          >
            <span className="text-sm font-medium text-gray-600">TAGUIG CITY</span>
          </Link>
          <h2 className="text-sm font-medium text-gray-600">
            Sample Ballot Builder
          </h2>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div className="fixed top-0 left-0 w-full h-full bg-white z-40 md:hidden">
          <div className="p-6">
            <button
              className="text-gray-600 hover:text-gray-800 mb-4"
              onClick={toggleMenu}
              aria-label="Close Menu"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <div className="flex flex-col gap-4">
              <Link
                to="/"
                className="flex items-center gap-2 transition-opacity duration-300 hover:opacity-80"
                onClick={toggleMenu}
              >
                <span className="text-sm font-medium text-gray-600">ZAMBOANGA CITY</span>
              </Link>
              <Link
                to="/cebu-city"
                className="flex items-center gap-2 transition-opacity duration-300 hover:opacity-80"
                onClick={toggleMenu}
              >
                <span className="text-sm font-medium text-gray-600">CEBU CITY</span>
              </Link>
              <Link
                to="/makati-city"
                className="flex items-center gap-2 transition-opacity duration-300 hover:opacity-80"
                onClick={toggleMenu}
              >
                <span className="text-sm font-medium text-gray-600">MAKATI CITY</span>
              </Link>
              <Link
                to="/taguig-city"
                className="flex items-center gap-2 transition-opacity duration-300 hover:opacity-80"
                onClick={toggleMenu}
              >
                <span className="text-sm font-medium text-gray-600">TAGUIG CITY</span>
              </Link>
              <h2 className="text-sm font-medium text-gray-600">
                Sample Ballot Builder
              </h2>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
