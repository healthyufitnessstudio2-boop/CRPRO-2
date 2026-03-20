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
      <div className="bg-gradient-to-r from-slate-900 to-slate-800 text-white py-2 px-2 text-[10px] md:text-sm md:py-3 md:px-4">
                <div className="container mx-auto flex items-center justify-between text-[10px] md:text-sm">
          <div className="flex items-center gap-2 flex-1">
         <div className="flex items-center gap-2 font-semibold text-[11px] md:text-sm">
  
 <div className="flex items-center gap-2 px-4 py-2">

  <a href="tel:9000916120" className="flex items-center gap-1 text-white hover:text-amber-400">
    <Phone className="w-4 h-4" />
    9000916120
  </a>

  <a href="https://wa.me/919000916120" target="_blank" rel="noopener noreferrer">
    <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 24 24">
      <path d="M20.52 3.48A11.92..." />
    </svg>
  </a>

</div>

  <a href="https://wa.me/919000916120" target="_blank" rel="noopener noreferrer">
    <svg className="w-4 h-4 text-green-500 hover:scale-110 transition">
      <path d="M20.52 3.48A11.92 11.92 0 0012.06 0C5.4 0 .04 5.36.04 12.02..." />
    </svg>
  </a>

</div>

          </div>
          <div className="flex items-center gap-3 ml-2">
            <a href="mailto:crprorailing@gmail.com" className="hover:text-amber-400">
  <Mail className="w-4 h-4" />
</a>
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
<Link to="/" className="flex items-center space-x-3 group">
  <img 
    src="/logo.png"
    alt="CR PRO RAILING" 
    className="h-10 md:h-14 w-auto transition-transform group-hover:scale-105"
  />
  <span className="bg-gradient-to-r from-amber-400 to-amber-600 bg-clip-text text-transparent font-extrabold text-sm md:text-2xl tracking-wide whitespace-nowrap">
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
                 <a href="tel:9000916120" className="flex items-center gap-1 font-semibold text-[11px] md:text-sm">
  <Phone className="w-4 h-4" />
  
  <a href="https://wa.me/919000916120" target="_blank" rel="noopener noreferrer">
    <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 24 24">
      <path d="M20.52 3.48A11.92 11.92 0 0012.06 0C5.4 0 .04 5.36.04 12.02c0 2.12.55 4.2 1.6 6.04L0 24l6.11-1.6a11.96 11.96 0 005.95 1.52h.01c6.66 0 12.02-5.36 12.02-12.02 0-3.21-1.25-6.23-3.57-8.52zM12.07 21.7h-.01a9.9 9.9 0 01-5.05-1.38l-.36-.21-3.63.95.97-3.54-.23-.37a9.86 9.86 0 01-1.52-5.26c0-5.46 4.44-9.9 9.91-9.9 2.64 0 5.13 1.03 7 2.9a9.83 9.83 0 012.9 7c0 5.47-4.44 9.91-9.9 9.91zm5.44-7.39c-.3-.15-1.78-.88-2.06-.98-.28-.1-.48-.15-.69.15-.2.3-.79.98-.96 1.18-.18.2-.35.22-.65.07-.3-.15-1.27-.47-2.42-1.5-.89-.8-1.5-1.78-1.68-2.08-.18-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.18.2-.3.3-.5.1-.2.05-.37-.02-.52-.07-.15-.69-1.66-.95-2.27-.25-.6-.5-.52-.69-.53l-.59-.01c-.2 0-.52.07-.8.37-.28.3-1.06 1.03-1.06 2.5 0 1.47 1.09 2.89 1.24 3.09.15.2 2.14 3.27 5.19 4.58.72.31 1.28.5 1.72.64.72.23 1.37.2 1.88.12.57-.09 1.78-.73 2.03-1.44.25-.71.25-1.32.17-1.44-.08-.12-.28-.2-.59-.35z"/>
    </svg>
  </a>

  <span>9000916120</span>
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
