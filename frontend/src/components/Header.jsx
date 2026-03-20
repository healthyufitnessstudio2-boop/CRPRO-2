import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Phone, Mail } from 'lucide-react';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Categories', path: '/categories' },
    { name: 'Products', path: '/products' },
    { name: 'Gallery', path: '/gallery' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <>
      {/* Top Bar */}
      <div className="bg-gradient-to-r from-slate-900 to-slate-800 text-white py-2 px-2 text-xs md:text-sm md:py-3 md:px-4">
                <div className="container mx-auto flex justify-between items-center text-sm">
          <div className="flex items-center space-x-6">
          <a href="tel:9000916120" className="flex items-center hover:text-amber-400 transition-colors font-semibold text-sm">
  <Phone className="w-5 h-5 mr-2" />
  <span>9000916120</span>
  <span className="mx-1">/</span>
  <span>9581901555</span>
</a>
<a href="mailto:crprorailing@gmail.com" className="flex items-center hover:text-amber-400 transition-colors font-semibold text-sm">
  <Mail className="w-5 h-5 mr-2" />
  <span>crprorailing@gmail.com</span>
</a>
          </div>
          <div className="flex items-center space-x-4">
            <span className="text-slate-300">Follow us:</span>
            <a 
              href="https://www.facebook.com/share/1ApX5UYCHB/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="hover:text-amber-400 transition-colors"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
            </a>
            <a 
              href="https://www.instagram.com/cr_pro_railing?igsh=MWU2aDZ6a2Nxcnd3aw==" 
              target="_blank" 
              rel="noopener noreferrer"
              className="hover:text-amber-400 transition-colors"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
              </svg>
            </a>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <header 
        className={`sticky top-0 z-50 transition-all duration-300 ${
          isScrolled ? 'bg-black shadow-lg' : 'bg-black/95 backdrop-blur-sm'
        }`}
      >
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
           {/* Logo + Text */}
<Link to="/" className="flex items-center space-x-2 group">
  <img 
    src="/logo.png"
    alt="CR PRO RAILING" 
    className="h-8 md:h-14 w-auto transition-transform group-hover:scale-105"
  />
  <span className="text-white font-bold text-xs md:text-lg whitespace-nowrap">
    CR PRO RAILING
  </span>
</Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-1">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                    location.pathname === link.path
                      ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-white'
                      : 'text-white hover:bg-slate-800 hover:text-amber-400'
                  }`}
                >
                  {link.name}
                </Link>
              ))}
            </nav>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden p-2 rounded-lg hover:bg-slate-800 transition-colors"
            >
              {isMenuOpen ? (
                <X className="w-6 h-6 text-white" />
              ) : (
                <Menu className="w-6 h-6 text-white" />
              )}
            </button>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <nav className="lg:hidden mt-4 pb-4 animate-fade-in-up">
              <div className="flex flex-col space-y-2">
                {navLinks.map((link) => (
                  <Link
                    key={link.path}
                    to={link.path}
                    className={`px-4 py-3 rounded-lg font-medium transition-all ${
                      location.pathname === link.path
                        ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-white'
                        : 'text-white hover:bg-slate-800 hover:text-amber-400'
                    }`}
                  >
                    {link.name}
                  </Link>
                ))}
                <div className="pt-4 border-t border-slate-700">
                  <a href="tel:9000916120" className="flex items-center px-4 py-2 text-white hover:text-amber-400">
                    <Phone className="w-4 h-4 mr-2" />
                    9000916120
                  </a>
                <a href="mailto:crprorailing@gmail.com" className="flex items-center px-4 py-2 text-white hover:text-amber-400">
  <Mail className="w-4 h-4 mr-2" />
  crprorailing@gmail.com
</a>
                </div>
              </div>
            </nav>
          )}
        </div>
      </header>
    </>
  );
};

export default Header;
