import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight, ArrowRight, Shield, Award, Users, Sparkles, Phone } from 'lucide-react';

const HomePage = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [sliderData, setSliderData] = useState([]);
  const [categoriesData, setCategoriesData] = useState([]);
  const [isVisible, setIsVisible] = useState(false);
  const featuresRef = useRef(null);

  useEffect(() => {
    fetch('/data/slider.json')
      .then(res => res.json())
      .then(data => setSliderData(data.slides))
      .catch(err => console.error('Error loading slider:', err));

    Promise.all([
      fetch('/data/products.json').then(res => res.json()),
      fetch('/data/categories-additional.json').then(res => res.json())
    ])
      .then(([products, additional]) => {
        setCategoriesData([...products.categories, ...additional.categories]);
      })
      .catch(err => console.error('Error loading categories:', err));
  }, []);

  useEffect(() => {
    if (sliderData.length > 0) {
      const timer = setInterval(() => {
        setCurrentSlide(prev => (prev + 1) % sliderData.length);
      }, 5000);
      return () => clearInterval(timer);
    }
  }, [sliderData]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsVisible(true); },
      { threshold: 0.1 }
    );
    if (featuresRef.current) observer.observe(featuresRef.current);
    return () => observer.disconnect();
  }, []);

  const nextSlide = () => setCurrentSlide(prev => (prev + 1) % sliderData.length);
  const prevSlide = () => setCurrentSlide(prev => (prev - 1 + sliderData.length) % sliderData.length);

  const features = [
    { icon: Shield, title: 'Safety First', desc: 'ISI certified products with maximum safety standards', num: '100%' },
    { icon: Award, title: 'Premium Quality', desc: 'Top-grade materials with lifetime warranty', num: '15+' },
    { icon: Users, title: 'Expert Team', desc: 'Professional installation by trained technicians', num: '500+' },
    { icon: Sparkles, title: 'Custom Design', desc: 'Tailored solutions for your unique needs', num: '∞' },
  ];

  return (
    <div className="w-full overflow-hidden" style={{ fontFamily: "'Outfit', 'Segoe UI', sans-serif" }}>

      {/* ── HERO SLIDER ─────────────────────────────────────────── */}
      <section className="relative h-[480px] md:h-[620px] overflow-hidden bg-slate-950">
        {sliderData.map((slide, index) => (
          <div
            key={slide.id}
            className="absolute inset-0 transition-all duration-1000"
            style={{ opacity: index === currentSlide ? 1 : 0, zIndex: index === currentSlide ? 1 : 0 }}
          >
            <div
              className="absolute inset-0 bg-cover bg-center scale-105 transition-transform duration-[8000ms]"
              style={{
                backgroundImage: `url(${slide.image})`,
                transform: index === currentSlide ? 'scale(1)' : 'scale(1.05)',
              }}
            />
            {/* Multi-layer gradient overlay */}
            <div className="absolute inset-0" style={{ background: 'linear-gradient(105deg, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.5) 50%, rgba(0,0,0,0.2) 100%)' }} />
            <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.7) 0%, transparent 60%)' }} />

            {/* Gold accent line */}
            <div className="absolute left-0 top-0 bottom-0 w-1" style={{ background: 'linear-gradient(to bottom, transparent, #f59e0b, transparent)' }} />

            <div className="relative h-full flex items-center z-10 px-6 md:px-16 lg:px-24">
              <div className="max-w-2xl text-white" style={{ animation: index === currentSlide ? 'slideUp 0.8s ease forwards' : 'none' }}>
                {/* Badge */}
                <div className="inline-flex items-center gap-2 mb-5 px-4 py-1.5 rounded-full text-xs font-bold tracking-widest uppercase"
                  style={{ background: 'rgba(245,158,11,0.15)', border: '1px solid rgba(245,158,11,0.4)', color: '#fbbf24' }}>
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse"></span>
                  Premium Railing Solutions
                </div>

                <h1 className="text-4xl md:text-5xl lg:text-6xl font-black mb-5 leading-tight" style={{ letterSpacing: '-0.02em' }}>
                  {slide.title}
                </h1>

                <p className="text-base md:text-lg mb-8 leading-relaxed" style={{ color: 'rgba(255,255,255,0.75)', maxWidth: '520px' }}>
                  {slide.description}
                </p>

                <div className="flex flex-wrap gap-3">
                  <Link to="/products"
                    className="group inline-flex items-center gap-2 px-7 py-3.5 rounded-xl font-bold text-sm transition-all duration-300 hover:gap-3"
                    style={{ background: 'linear-gradient(135deg, #f59e0b, #d97706)', color: '#fff', boxShadow: '0 8px 32px rgba(245,158,11,0.35)' }}>
                    Explore Products
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                  <Link to="/contact"
                    className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl font-bold text-sm transition-all duration-300"
                    style={{ background: 'rgba(255,255,255,0.08)', border: '1.5px solid rgba(255,255,255,0.25)', color: '#fff', backdropFilter: 'blur(12px)' }}>
                    Get Free Quote
                  </Link>
                  <a href="/catalog/CR-PRO-RAILING-Catalog.pdf" download
                    className="hidden sm:inline-flex items-center gap-2 px-7 py-3.5 rounded-xl font-bold text-sm transition-all duration-300"
                    style={{ background: 'rgba(245,158,11,0.1)', border: '1.5px solid rgba(245,158,11,0.35)', color: '#fbbf24' }}>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    Catalog
                  </a>
                </div>
              </div>

              {/* Floating logo */}
              <div className="absolute right-8 md:right-16 top-1/2 -translate-y-1/2 hidden md:block"
                style={{ animation: 'float 4s ease-in-out infinite' }}>
                <div className="relative">
                  <div className="absolute inset-0 rounded-full blur-2xl opacity-30" style={{ background: '#f59e0b', transform: 'scale(1.4)' }} />
                  <img src="/logo.png" alt="CR PRO RAILING" className="relative w-28 h-28 lg:w-36 lg:h-36 object-contain drop-shadow-2xl" />
                </div>
              </div>
            </div>
          </div>
        ))}

        {/* Slider Controls */}
        <button onClick={prevSlide} className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110"
          style={{ background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)', backdropFilter: 'blur(8px)' }}>
          <ChevronLeft className="w-5 h-5 text-white" />
        </button>
        <button onClick={nextSlide} className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110"
          style={{ background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)', backdropFilter: 'blur(8px)' }}>
          <ChevronRight className="w-5 h-5 text-white" />
        </button>

        {/* Slide dots */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-20">
          {sliderData.map((_, i) => (
            <button key={i} onClick={() => setCurrentSlide(i)}
              className="rounded-full transition-all duration-300"
              style={{ width: i === currentSlide ? '28px' : '8px', height: '8px', background: i === currentSlide ? '#f59e0b' : 'rgba(255,255,255,0.35)' }} />
          ))}
        </div>

        {/* Slide counter */}
        <div className="absolute bottom-6 right-6 z-20 text-white/50 text-xs font-mono">
          {String(currentSlide + 1).padStart(2, '0')} / {String(sliderData.length).padStart(2, '0')}
        </div>
      </section>

      {/* ── STATS BAR ───────────────────────────────────────────── */}
      <div style={{ background: 'linear-gradient(90deg, #0f172a 0%, #1e293b 100%)', borderBottom: '1px solid rgba(245,158,11,0.2)' }}>
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 divide-x" style={{ divideColor: 'rgba(255,255,255,0.05)' }}>
            {[
              { num: '500+', label: 'Projects Done' },
              { num: '15+', label: 'Years Experience' },
              { num: '50+', label: 'Product Variants' },
              { num: '100%', label: 'Satisfied Clients' },
            ].map((stat, i) => (
              <div key={i} className="text-center py-5 px-4">
                <div className="text-2xl md:text-3xl font-black" style={{ color: '#f59e0b' }}>{stat.num}</div>
                <div className="text-xs text-slate-400 mt-0.5 font-medium tracking-wide">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── FEATURES ────────────────────────────────────────────── */}
      <section ref={featuresRef} className="py-20" style={{ background: '#fff' }}>
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-14">
            <div className="inline-block px-4 py-1 rounded-full text-xs font-bold uppercase tracking-widest mb-3"
              style={{ background: '#fef3c7', color: '#92400e' }}>Why Choose Us</div>
            <h2 className="text-3xl md:text-4xl font-black text-slate-900" style={{ letterSpacing: '-0.02em' }}>
              Built on <span style={{ color: '#f59e0b' }}>Excellence</span>
            </h2>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
            {features.map((f, i) => (
              <div key={i} className="group relative p-6 rounded-2xl transition-all duration-300 hover:-translate-y-1"
                style={{
                  background: '#f8fafc',
                  border: '1.5px solid #e2e8f0',
                  opacity: isVisible ? 1 : 0,
                  transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
                  transition: `all 0.5s ease ${i * 120}ms`,
                  boxShadow: '0 0 0 0 rgba(245,158,11,0)',
                }}
                onMouseEnter={e => e.currentTarget.style.boxShadow = '0 12px 40px rgba(245,158,11,0.12)'}
                onMouseLeave={e => e.currentTarget.style.boxShadow = '0 0 0 0 rgba(245,158,11,0)'}
              >
                {/* Big background number */}
                <div className="absolute top-3 right-4 text-5xl font-black opacity-5 text-slate-900 select-none">{f.num}</div>

                <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
                  style={{ background: 'linear-gradient(135deg, #fef3c7, #fde68a)' }}>
                  <f.icon className="w-6 h-6" style={{ color: '#d97706' }} />
                </div>
                <h3 className="font-bold text-slate-800 mb-2 text-sm md:text-base">{f.title}</h3>
                <p className="text-slate-500 text-xs md:text-sm leading-relaxed">{f.desc}</p>

                {/* Hover accent */}
                <div className="absolute bottom-0 left-6 right-6 h-0.5 rounded-full transition-all duration-300 group-hover:left-0 group-hover:right-0"
                  style={{ background: 'linear-gradient(90deg, #f59e0b, #d97706)' }} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CATEGORIES ──────────────────────────────────────────── */}
      <section className="py-20" style={{ background: '#f1f5f9' }}>
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
            <div>
              <div className="inline-block px-4 py-1 rounded-full text-xs font-bold uppercase tracking-widest mb-3"
                style={{ background: '#fef3c7', color: '#92400e' }}>Our Range</div>
              <h2 className="text-3xl md:text-4xl font-black text-slate-900" style={{ letterSpacing: '-0.02em' }}>
                Product <span style={{ color: '#f59e0b' }}>Categories</span>
              </h2>
              <p className="text-slate-500 mt-2 text-sm max-w-md">Explore our wide range of premium railing and partition solutions</p>
            </div>
            <Link to="/categories"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-sm transition-all hover:gap-3 self-start md:self-auto"
              style={{ background: '#0f172a', color: '#fff' }}>
              View All <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {categoriesData.map((cat, i) => (
              <Link key={cat.id} to={`/products/${cat.id}`}
                className="group relative overflow-hidden rounded-2xl block"
                style={{ boxShadow: '0 4px 24px rgba(0,0,0,0.08)', aspectRatio: '4/3' }}>

                <img src={cat.image} alt={cat.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />

                {/* Gradient */}
                <div className="absolute inset-0 transition-opacity duration-300"
                  style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.3) 50%, rgba(0,0,0,0.0) 100%)' }} />

                {/* Gold top border on hover */}
                <div className="absolute top-0 left-0 right-0 h-0.5 transition-opacity duration-300 opacity-0 group-hover:opacity-100"
                  style={{ background: 'linear-gradient(90deg, #f59e0b, #fbbf24)' }} />

                <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                  {/* Category tag */}
                  <div className="inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-widest mb-2"
                    style={{ background: 'rgba(245,158,11,0.2)', color: '#fbbf24', border: '1px solid rgba(245,158,11,0.3)' }}>
                    {cat.id?.replace(/-/g, ' ')}
                  </div>
                  <h3 className="text-xl font-black mb-1 transition-colors group-hover:text-amber-400">
                    {cat.name}
                  </h3>
                  <p className="text-slate-300 text-xs line-clamp-2 mb-3 leading-relaxed">{cat.description}</p>
                  <span className="inline-flex items-center gap-1.5 text-amber-400 text-xs font-bold transition-all group-hover:gap-3">
                    View Products <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA SECTION ─────────────────────────────────────────── */}
      <section className="relative overflow-hidden py-20"
        style={{ background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)' }}>

        {/* Decorative circles */}
        <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full opacity-5" style={{ background: '#f59e0b' }} />
        <div className="absolute -bottom-24 -left-24 w-72 h-72 rounded-full opacity-5" style={{ background: '#f59e0b' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full opacity-[0.03]"
          style={{ border: '80px solid #f59e0b' }} />

        <div className="relative max-w-4xl mx-auto px-4 text-center">
          <div className="inline-block px-4 py-1 rounded-full text-xs font-bold uppercase tracking-widest mb-5"
            style={{ background: 'rgba(245,158,11,0.15)', color: '#fbbf24', border: '1px solid rgba(245,158,11,0.3)' }}>
            Get Started Today
          </div>
          <h2 className="text-3xl md:text-5xl font-black text-white mb-5" style={{ letterSpacing: '-0.02em' }}>
            Ready to Transform<br />
            <span style={{ color: '#f59e0b' }}>Your Space?</span>
          </h2>
          <p className="text-slate-400 text-base md:text-lg mb-10 max-w-xl mx-auto leading-relaxed">
            Contact us today for a free consultation and quote. Our experts are ready to bring your vision to life.
          </p>

          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/contact"
              className="group inline-flex items-center gap-2 px-8 py-4 rounded-xl font-bold text-sm transition-all duration-300 hover:gap-3"
              style={{ background: 'linear-gradient(135deg, #f59e0b, #d97706)', color: '#fff', boxShadow: '0 8px 32px rgba(245,158,11,0.35)' }}>
              Get Free Quote <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Link>
            <a href="tel:9000916120"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl font-bold text-sm transition-all duration-300"
              style={{ background: 'rgba(255,255,255,0.06)', border: '1.5px solid rgba(255,255,255,0.15)', color: '#fff' }}>
              <Phone className="w-4 h-4" style={{ color: '#f59e0b' }} />
              9000916120
            </a>
            <a href="tel:9581901555"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl font-bold text-sm transition-all duration-300"
              style={{ background: 'rgba(255,255,255,0.06)', border: '1.5px solid rgba(255,255,255,0.15)', color: '#fff' }}>
              <Phone className="w-4 h-4" style={{ color: '#f59e0b' }} />
              9581901555
            </a>
          </div>
        </div>
      </section>

      <style>{`
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(30px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes float {
          0%, 100% { transform: translateY(-50%) translateY(0px); }
          50%       { transform: translateY(-50%) translateY(-12px); }
        }
      `}</style>
    </div>
  );
};

export default HomePage;
