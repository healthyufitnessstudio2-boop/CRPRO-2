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
      <div className="bg-gradient-to-r from-slate-900 to-slate-800 text-white py-2 px-2 md:py-3 md:px-4">
        <div className="container mx-auto flex items-center justify-between text-[10px] md:text-sm">

          {/* LEFT */}
          <div className="flex items-center gap-3 font-semibold">

            <a href="tel:9000916120" className="flex items-center gap-1">
              <Phone className="w-4 h-4" />
              9000916120
            </a>

            <a href="tel:9581901555" className="flex items-center gap-1">
              <Phone className="w-4 h-4" />
              9581901555
            </a>

            <a href="https://wa.me/919000916120" target="_blank" rel="noopener noreferrer">
              <img 
                src="https://cdn-icons-png.flaticon.com/512/733/733585.png"
                className="w-5 h-5"
                alt="WhatsApp"
              />
            </a>

          </div>

          {/* RIGHT */}
          <div className="flex items-center gap-3">

            <a href="mailto:crprorailing@gmail.com">
              <Mail className="w-4 h-4" />
            </a>

            <a href="https://www.facebook.com/share/1ApX5UYCHB/" target="_blank" rel="noopener noreferrer">
  <img 
    src="https://cdn-icons-png.flaticon.com/512/733/733547.png"
    className="w-5 h-5"
    alt="Facebook"
  />
</a>

            <a href="https://www.instagram.com/cr_pro_railing" target="_blank" rel="noopener noreferrer">
              <img 
                src="https://cdn-icons-png.flaticon.com/512/2111/2111463.png"
                className="w-5 h-5"
                alt="Instagram"
              />
            </a>

          </div>

        </div>
      </div>

      {/* Main Navigation */}
      <header className={`sticky top-0 z-50 ${isScrolled ? 'bg-black shadow-lg' : 'bg-black/95 backdrop-blur-sm'}`}>
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">

            {/* Logo */}
            <Link to="/" className="flex items-center space-x-3">
              <img src="/logo.png" alt="CR PRO" className="h-10 md:h-14" />
              <span className="text-amber-400 font-bold text-sm md:text-2xl">
                CR PRO RAILING
              </span>
            </Link>

            {/* Desktop Menu */}
            <nav className="hidden lg:flex space-x-4">
              {navLinks.map(link => (
                <Link key={link.path} to={link.path} className="text-white hover:text-amber-400">
                  {link.name}
                </Link>
              ))}
            </nav>

            {/* Mobile Button */}
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="lg:hidden text-white">
              {isMenuOpen ? <X /> : <Menu />}
            </button>

          </div>

          {/* Mobile Menu */}
          {isMenuOpen && (
            <div className="mt-4 space-y-3 text-white">

              {navLinks.map(link => (
                <Link key={link.path} to={link.path} className="block">
                  {link.name}
                </Link>
              ))}

              <div className="border-t pt-3">

                <a href="tel:9000916120" className="block">
                  9000916120
                </a>

                <a href="tel:9581901555" className="block">
                  9581901555
                </a>

                <a href="https://wa.me/919000916120" target="_blank">
                  <img 
                    src="https://cdn-icons-png.flaticon.com/512/733/733585.png"
                    className="w-5 h-5 mt-2"
                  />
                </a>

              </div>

            </div>
          )}

        </div>
      </header>
    </>
  );
};

export default Header;
