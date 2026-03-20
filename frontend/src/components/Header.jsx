import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Phone, Mail, ChevronDown } from 'lucide-react';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => { setIsMenuOpen(false); }, [location]);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Categories', path: '/categories' },
    { name: 'Products', path: '/products' },
    { name: 'Gallery', path: '/gallery' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <>
      {/* ── TOP BAR ──────────────────────────────────────────── */}
      <div style={{ background: '#0f172a', borderBottom: '1px solid rgba(245,158,11,0.15)' }}>
        <div className="max-w-7xl mx-auto px-4 py-2 flex items-center justify-between">

          {/* Left: Phone numbers */}
          <div className="flex items-center gap-4">
            <a href="tel:9000916120"
              className="flex items-center gap-1.5 text-xs font-semibold transition-colors hover:text-amber-400"
              style={{ color: 'rgba(255,255,255,0.8)' }}>
              <Phone className="w-3 h-3" style={{ color: '#f59e0b' }} />
              9000916120
            </a>
            <span style={{ color: 'rgba(255,255,255,0.15)', fontSize: '10px' }}>|</span>
            <a href="tel:9581901555"
              className="flex items-center gap-1.5 text-xs font-semibold transition-colors hover:text-amber-400"
              style={{ color: 'rgba(255,255,255,0.8)' }}>
              <Phone className="w-3 h-3" style={{ color: '#f59e0b' }} />
              9581901555
            </a>
            <a href="https://wa.me/919000916120" target="_blank" rel="noopener noreferrer"
              className="hidden sm:flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full transition-all hover:scale-105"
              style={{ background: 'rgba(37,211,102,0.15)', color: '#4ade80', border: '1px solid rgba(37,211,102,0.25)' }}>
              <img src="https://cdn-icons-png.flaticon.com/512/733/733585.png" className="w-3.5 h-3.5" alt="WA" />
              WhatsApp
            </a>
          </div>

          {/* Right: Social icons */}
          <div className="flex items-center gap-2">
            <a href="mailto:crprorailing@gmail.com"
              className="w-7 h-7 rounded-full flex items-center justify-center transition-all hover:scale-110"
              style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)' }}>
              <Mail className="w-3.5 h-3.5" style={{ color: 'rgba(255,255,255,0.7)' }} />
            </a>
            <a href="https://www.facebook.com/share/1ApX5UYCHB/" target="_blank" rel="noopener noreferrer"
              className="w-7 h-7 rounded-full flex items-center justify-center transition-all hover:scale-110"
              style={{ background: 'rgba(24,119,242,0.15)', border: '1px solid rgba(24,119,242,0.25)' }}>
              <img src="https://cdn-icons-png.flaticon.com/512/733/733547.png" className="w-3.5 h-3.5" alt="Facebook" />
            </a>
            <a href="https://www.instagram.com/cr_pro_railing" target="_blank" rel="noopener noreferrer"
              className="w-7 h-7 rounded-full flex items-center justify-center transition-all hover:scale-110"
              style={{ background: 'rgba(225,48,108,0.15)', border: '1px solid rgba(225,48,108,0.2)' }}>
              <img src="https://cdn-icons-png.flaticon.com/512/2111/2111463.png" className="w-3.5 h-3.5" alt="Instagram" />
            </a>
          </div>
        </div>
      </div>

      {/* ── MAIN HEADER ──────────────────────────────────────── */}
      <header
        className="sticky top-0 z-50 transition-all duration-300"
        style={{
          background: isScrolled
            ? 'rgba(10,15,28,0.97)'
            : 'rgba(10,15,28,0.95)',
          backdropFilter: 'blur(20px)',
          borderBottom: '1px solid rgba(245,158,11,0.12)',
          boxShadow: isScrolled ? '0 4px 30px rgba(0,0,0,0.4)' : 'none',
        }}
      >
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between py-3">

            {/* Logo */}
            <Link to="/" className="flex items-center gap-3 group">
              <div className="relative">
                <div className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-30 transition-opacity blur-lg"
                  style={{ background: '#f59e0b' }} />
                <img src="/logo.png" alt="CR PRO" className="relative h-10 md:h-12 object-contain" />
              </div>
              <div>
                <div className="font-black text-sm md:text-xl leading-tight" style={{ color: '#f59e0b', letterSpacing: '-0.01em' }}>
                  CR PRO RAILING
                </div>
                <div className="text-[9px] tracking-widest uppercase font-medium hidden md:block" style={{ color: 'rgba(255,255,255,0.35)' }}>
                  Premium Glass & Railing
                </div>
              </div>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden lg:flex items-center gap-1">
              {navLinks.map(link => (
                <Link
                  key={link.path}
                  to={link.path}
                  className="relative px-4 py-2 text-sm font-semibold rounded-lg transition-all duration-200"
                  style={{
                    color: isActive(link.path) ? '#f59e0b' : 'rgba(255,255,255,0.75)',
                    background: isActive(link.path) ? 'rgba(245,158,11,0.1)' : 'transparent',
                  }}
                  onMouseEnter={e => { if (!isActive(link.path)) e.currentTarget.style.color = '#fff'; e.currentTarget.style.background = 'rgba(255,255,255,0.05)'; }}
                  onMouseLeave={e => { e.currentTarget.style.color = isActive(link.path) ? '#f59e0b' : 'rgba(255,255,255,0.75)'; e.currentTarget.style.background = isActive(link.path) ? 'rgba(245,158,11,0.1)' : 'transparent'; }}
                >
                  {link.name}
                  {isActive(link.path) && (
                    <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full" style={{ background: '#f59e0b' }} />
                  )}
                </Link>
              ))}
            </nav>

            {/* CTA Button */}
            <div className="hidden lg:flex items-center gap-3">
              <a href="tel:9000916120"
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold transition-all duration-200 hover:scale-105"
                style={{ background: 'linear-gradient(135deg, #f59e0b, #d97706)', color: '#fff', boxShadow: '0 4px 20px rgba(245,158,11,0.3)' }}>
                <Phone className="w-3.5 h-3.5" />
                Call Now
              </a>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden w-10 h-10 rounded-xl flex items-center justify-center transition-all"
              style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)' }}
            >
              {isMenuOpen
                ? <X className="w-5 h-5 text-white" />
                : <Menu className="w-5 h-5 text-white" />}
            </button>
          </div>
        </div>

        {/* ── MOBILE MENU ─────────────────────────────────────── */}
        <div
          className="lg:hidden overflow-hidden transition-all duration-300"
          style={{
            maxHeight: isMenuOpen ? '500px' : '0',
            borderTop: isMenuOpen ? '1px solid rgba(245,158,11,0.1)' : 'none',
          }}
        >
          <div className="px-4 py-4 space-y-1" style={{ background: 'rgba(5,10,20,0.98)' }}>
            {navLinks.map(link => (
              <Link key={link.path} to={link.path}
                className="flex items-center justify-between px-4 py-3 rounded-xl text-sm font-semibold transition-all"
                style={{
                  color: isActive(link.path) ? '#f59e0b' : 'rgba(255,255,255,0.8)',
                  background: isActive(link.path) ? 'rgba(245,158,11,0.1)' : 'transparent',
                  borderLeft: isActive(link.path) ? '3px solid #f59e0b' : '3px solid transparent',
                }}>
                {link.name}
                <ChevronDown className="w-4 h-4 -rotate-90 opacity-40" />
              </Link>
            ))}

            <div className="pt-3 mt-3 space-y-2" style={{ borderTop: '1px solid rgba(255,255,255,0.07)' }}>
              <a href="tel:9000916120"
                className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold"
                style={{ background: 'linear-gradient(135deg, #f59e0b, #d97706)', color: '#fff' }}>
                <Phone className="w-4 h-4" />
                9000916120
              </a>
              <a href="tel:9581901555"
                className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold"
                style={{ background: 'rgba(255,255,255,0.05)', color: 'rgba(255,255,255,0.8)', border: '1px solid rgba(255,255,255,0.1)' }}>
                <Phone className="w-4 h-4" style={{ color: '#f59e0b' }} />
                9581901555
              </a>
              <a href="https://wa.me/919000916120" target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold"
                style={{ background: 'rgba(37,211,102,0.1)', color: '#4ade80', border: '1px solid rgba(37,211,102,0.2)' }}>
                <img src="https://cdn-icons-png.flaticon.com/512/733/733585.png" className="w-4 h-4" alt="WA" />
                WhatsApp Us
              </a>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
