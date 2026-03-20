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
    {/* Top Bar */}
<div className="bg-gradient-to-r from-slate-900 to-slate-800 text-white py-2 px-2 md:py-3 md:px-4">
  <div className="container mx-auto flex items-center justify-between text-[10px] md:text-sm">

    {/* LEFT SIDE */}
    <div className="flex items-center gap-3 font-semibold">

      <a href="https://wa.me/919000916120" target="_blank">
  <img 
    src="https://cdn-icons-png.flaticon.com/512/733/733585.png"
    className="w-5 h-5"
  />
</a>

      <a href="https://wa.me/919000916120" target="_blank" rel="noopener noreferrer">
       <img 
  src="https://cdn-icons-png.flaticon.com/512/733/733585.png"
  alt="WhatsApp"
  className="w-5 h-5"
/>
      </a>

    </div>

    {/* RIGHT SIDE */}
    <div className="flex items-center gap-3">

      <a href="mailto:crprorailing@gmail.com" className="hover:text-amber-400">
        <Mail className="w-4 h-4" />
      </a>

      <a href="https://www.facebook.com/share/1ApX5UYCHB/" target="_blank" rel="noopener noreferrer">
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
        </svg>
      </a>

      <a href="https://www.instagram.com/cr_pro_railing" target="_blank" rel="noopener noreferrer">
       <img 
  src="https://cdn-icons-png.flaticon.com/512/2111/2111463.png"
  alt="Instagram"
  className="w-5 h-5"
/>
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
                 <div className="flex items-center gap-3 px-4 py-2 text-white">

  <div className="flex items-center gap-3 font-semibold">

  <a href="tel:9000916120" className="flex items-center gap-1 hover:text-amber-400">
    <Phone className="w-4 h-4" />
    9000916120
  </a>

  </div>
  <a href="https://wa.me/919000916120" target="_blank" rel="noopener noreferrer">
    <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 24 24">
      <path d="M20.52 3.48A11.92 11.92 0 0012.06 0C5.4 0 .04 5.36.04 12.02c0 2.12.55 4.2 1.6 6.04L0 24l6.11-1.6a11.96 11.96 0 005.95 1.52h.01c6.66 0 12.02-5.36 12.02-12.02 0-3.21-1.25-6.23-3.57-8.52zM12.07 21.7h-.01a9.9 9.9 0 01-5.05-1.38l-.36-.21-3.63.95.97-3.54-.23-.37a9.86 9.86 0 01-1.52-5.26c0-5.46 4.44-9.9 9.91-9.9 2.64 0 5.13 1.03 7 2.9a9.83 9.83 0 012.9 7c0 5.47-4.44 9.91-9.9 9.91z"/>
    </svg>
  </a>

</div>
                
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
