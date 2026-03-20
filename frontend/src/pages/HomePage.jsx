import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight, ArrowRight, Shield, Award, Users, Sparkles, Phone } from 'lucide-react';

// ── Count-up animation component ────────────────────────────
function StatItem({ num, label, started }) {
  const [count, setCount] = useState(0);
  const isPercent = String(num).includes('%');
  const isPlus = String(num).includes('+');
  const target = parseInt(String(num).replace(/[^0-9]/g, ''));

  useEffect(() => {
    if (!started) return;
    let startTime = null;
    const duration = 2000;
    const step = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * target));
      if (progress < 1) requestAnimationFrame(step);
      else setCount(target);
    };
    requestAnimationFrame(step);
  }, [started, target]);

  return (
    <div className="text-center py-5 px-3">
      <div className="text-2xl md:text-3xl font-black" style={{ color: '#f59e0b' }}>
        {count}{isPercent ? '%' : isPlus ? '+' : ''}
      </div>
      <div className="text-xs mt-0.5 font-medium tracking-wide" style={{ color: 'rgba(255,255,255,0.45)' }}>{label}</div>
    </div>
  );
}

const HomePage = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [sliderData, setSliderData] = useState([]);
  const [categoriesData, setCategoriesData] = useState([]);
  const [statsVisible, setStatsVisible] = useState(false);
  const [featuresVisible, setFeaturesVisible] = useState(false);
  const statsRef = useRef(null);
  const featuresRef = useRef(null);

  useEffect(() => {
    fetch('/data/slider.json')
      .then(res => res.json())
      .then(data => setSliderData(data.slides))
      .catch(err => console.error(err));
    Promise.all([
      fetch('/data/products.json').then(r => r.json()),
      fetch('/data/categories-additional.json').then(r => r.json())
    ]).then(([p, a]) => setCategoriesData([...p.categories, ...a.categories]))
      .catch(err => console.error(err));
  }, []);

  useEffect(() => {
    if (sliderData.length > 0) {
      const t = setInterval(() => setCurrentSlide(p => (p + 1) % sliderData.length), 5000);
      return () => clearInterval(t);
    }
  }, [sliderData]);

  useEffect(() => {
    const o1 = new IntersectionObserver(([e]) => { if (e.isIntersecting) setStatsVisible(true); }, { threshold: 0.3 });
    const o2 = new IntersectionObserver(([e]) => { if (e.isIntersecting) setFeaturesVisible(true); }, { threshold: 0.1 });
    if (statsRef.current) o1.observe(statsRef.current);
    if (featuresRef.current) o2.observe(featuresRef.current);
    return () => { o1.disconnect(); o2.disconnect(); };
  }, []);

  const features = [
    { icon: Shield, title: 'Safety First', desc: 'ISI certified products with maximum safety standards', num: '100%' },
    { icon: Award, title: 'Premium Quality', desc: 'Top-grade materials with lifetime warranty', num: '15+' },
    { icon: Users, title: 'Expert Team', desc: 'Professional installation by trained technicians', num: '500+' },
    { icon: Sparkles, title: 'Custom Design', desc: 'Tailored solutions for your unique needs', num: '∞' },
  ];

  return (
    <div className="w-full overflow-hidden">

      {/* ── HERO SLIDER ──────────────────────────────────── */}
      <section className="relative h-[480px] md:h-[620px] overflow-hidden bg-slate-950">
        {sliderData.map((slide, index) => (
          <div key={slide.id} className="absolute inset-0 transition-opacity duration-1000"
            style={{ opacity: index === currentSlide ? 1 : 0, zIndex: index === currentSlide ? 1 : 0 }}>
            <div className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url(${slide.image})` }} />
            <div className="absolute inset-0"
              style={{ background: 'linear-gradient(105deg, rgba(0,0,0,0.82) 0%, rgba(0,0,0,0.4) 55%, rgba(0,0,0,0.1) 100%)' }} />
            <div className="absolute inset-0"
              style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.7) 0%, transparent 50%)' }} />
            <div className="absolute left-0 top-0 bottom-0 w-1"
              style={{ background: 'linear-gradient(to bottom, transparent, #f59e0b, transparent)' }} />

            {/* Content — flush bottom-left */}
            <div className="relative h-full flex flex-col justify-end z-10 px-5 md:px-14 lg:px-20 pb-16 md:pb-20">
              <h1 className="text-3xl md:text-5xl lg:text-6xl font-black text-white mb-3 leading-tight"
                style={{ letterSpacing: '-0.02em', maxWidth: '600px' }}>
                {slide.title}
              </h1>
              <p className="text-sm md:text-base mb-5 leading-relaxed"
                style={{ color: 'rgba(255,255,255,0.7)', maxWidth: '480px' }}>
                {slide.description}
              </p>

              {/* Buttons — compact, all one line */}
              <div className="flex items-center gap-2 flex-wrap">
                <Link to="/products"
                  className="group inline-flex items-center gap-1.5 rounded-xl font-bold transition-all whitespace-nowrap"
                  style={{ background: 'linear-gradient(135deg,#f59e0b,#d97706)', color: '#fff', padding: '8px 14px', fontSize: '12px', boxShadow: '0 4px 18px rgba(245,158,11,0.35)' }}>
                  Explore <ArrowRight className="w-3 h-3" />
                </Link>
                <Link to="/contact"
                  className="inline-flex items-center rounded-xl font-bold transition-all whitespace-nowrap"
                  style={{ background: 'rgba(255,255,255,0.09)', border: '1.5px solid rgba(255,255,255,0.22)', color: '#fff', backdropFilter: 'blur(10px)', padding: '8px 14px', fontSize: '12px' }}>
                  Get Quote
                </Link>
                <a href="/catalog/CR-PRO-RAILING-Catalog.pdf" download
                  className="inline-flex items-center gap-1 rounded-xl font-bold transition-all whitespace-nowrap"
                  style={{ background: 'rgba(245,158,11,0.12)', border: '1.5px solid rgba(245,158,11,0.32)', color: '#fbbf24', padding: '8px 14px', fontSize: '12px' }}>
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  Catalog
                </a>
              </div>
            </div>
          </div>
        ))}

        {/* Controls */}
        <button onClick={() => setCurrentSlide(p => (p - 1 + sliderData.length) % sliderData.length)}
          className="absolute left-3 top-1/2 -translate-y-1/2 z-20 w-9 h-9 rounded-full flex items-center justify-center"
          style={{ background: 'rgba(255,255,255,0.12)', border: '1px solid rgba(255,255,255,0.18)', backdropFilter: 'blur(8px)' }}>
          <ChevronLeft className="w-4 h-4 text-white" />
        </button>
        <button onClick={() => setCurrentSlide(p => (p + 1) % sliderData.length)}
          className="absolute right-3 top-1/2 -translate-y-1/2 z-20 w-9 h-9 rounded-full flex items-center justify-center"
          style={{ background: 'rgba(255,255,255,0.12)', border: '1px solid rgba(255,255,255,0.18)', backdropFilter: 'blur(8px)' }}>
          <ChevronRight className="w-4 h-4 text-white" />
        </button>

        {/* Dots */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5 z-20">
          {sliderData.map((_, i) => (
            <button key={i} onClick={() => setCurrentSlide(i)} className="rounded-full transition-all duration-300"
              style={{ width: i === currentSlide ? '22px' : '6px', height: '6px', background: i === currentSlide ? '#f59e0b' : 'rgba(255,255,255,0.3)' }} />
          ))}
        </div>
        <div className="absolute bottom-4 right-4 z-20 font-mono text-xs" style={{ color: 'rgba(255,255,255,0.35)' }}>
          {String(currentSlide + 1).padStart(2, '0')} / {String(sliderData.length).padStart(2, '0')}
        </div>

        {/* Floating logo desktop */}
        <div className="absolute right-10 md:right-16 top-1/2 -translate-y-1/2 hidden md:block z-10"
          style={{ animation: 'float 4s ease-in-out infinite' }}>
          <div className="relative">
            <div className="absolute inset-0 rounded-full blur-2xl opacity-20" style={{ background: '#f59e0b', transform: 'scale(1.5)' }} />
            <img src="/logo.png" alt="CR PRO" className="relative w-28 h-28 lg:w-36 lg:h-36 object-contain drop-shadow-2xl" />
          </div>
        </div>
      </section>

      {/* ── STATS BAR — count-up ─────────────────────────── */}
      <div ref={statsRef} style={{ background: 'linear-gradient(90deg,#0f172a,#1e293b)', borderBottom: '1px solid rgba(245,158,11,0.18)' }}>
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4">
            {[
              { num: '500+', label: 'Projects Done' },
              { num: '15+', label: 'Years Experience' },
              { num: '50+', label: 'Product Variants' },
              { num: '100%', label: 'Satisfied Clients' },
            ].map((s, i) => (
              <div key={i} style={{ borderRight: i < 3 ? '1px solid rgba(255,255,255,0.06)' : 'none' }}>
                <StatItem num={s.num} label={s.label} started={statsVisible} />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── FEATURES ─────────────────────────────────────── */}
      <section ref={featuresRef} className="py-16 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <div className="inline-block px-4 py-1 rounded-full text-xs font-bold uppercase tracking-widest mb-3"
              style={{ background: '#fef3c7', color: '#92400e' }}>Why Choose Us</div>
            <h2 className="text-3xl md:text-4xl font-black text-slate-900" style={{ letterSpacing: '-0.02em' }}>
              Built on <span style={{ color: '#f59e0b' }}>Excellence</span>
            </h2>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {features.map((f, i) => (
              <div key={i} className="group relative p-5 rounded-2xl transition-all duration-300 hover:-translate-y-1"
                style={{
                  background: '#f8fafc', border: '1.5px solid #e2e8f0',
                  opacity: featuresVisible ? 1 : 0,
                  transform: featuresVisible ? 'translateY(0)' : 'translateY(20px)',
                  transition: `all 0.5s ease ${i * 120}ms`,
                }}>
                <div className="absolute top-3 right-3 text-4xl font-black opacity-[0.04] text-slate-900 select-none">{f.num}</div>
                <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-3"
                  style={{ background: 'linear-gradient(135deg,#fef3c7,#fde68a)' }}>
                  <f.icon className="w-5 h-5" style={{ color: '#d97706' }} />
                </div>
                <h3 className="font-bold text-slate-800 mb-1 text-sm md:text-base">{f.title}</h3>
                <p className="text-slate-500 text-xs leading-relaxed">{f.desc}</p>
                <div className="absolute bottom-0 left-5 right-5 h-0.5 rounded-full group-hover:left-0 group-hover:right-0 transition-all duration-300"
                  style={{ background: 'linear-gradient(90deg,#f59e0b,#d97706)' }} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CATEGORIES ───────────────────────────────────── */}
      <section className="py-16 md:py-20" style={{ background: '#f1f5f9' }}>
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
            <div>
              <div className="inline-block px-4 py-1 rounded-full text-xs font-bold uppercase tracking-widest mb-3"
                style={{ background: '#fef3c7', color: '#92400e' }}>Our Range</div>
              <h2 className="text-3xl md:text-4xl font-black text-slate-900" style={{ letterSpacing: '-0.02em' }}>
                Product <span style={{ color: '#f59e0b' }}>Categories</span>
              </h2>
            </div>
            <Link to="/categories" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-sm self-start md:self-auto transition-all hover:gap-3"
              style={{ background: '#0f172a', color: '#fff' }}>
              View All <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {categoriesData.map((cat) => (
              <Link key={cat.id} to={`/products/${cat.id}`}
                className="group relative overflow-hidden rounded-2xl block"
                style={{ aspectRatio: '4/3', boxShadow: '0 4px 20px rgba(0,0,0,0.08)' }}>
                {/* Image fills entire card */}
                <img src={cat.image} alt={cat.name}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                {/* Thin gradient ONLY at very bottom for text readability */}
                <div className="absolute bottom-0 left-0 right-0"
                  style={{ height: '45%', background: 'linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.5) 50%, transparent 100%)' }} />
                {/* Gold border top on hover */}
                <div className="absolute top-0 left-0 right-0 h-0.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{ background: 'linear-gradient(90deg,#f59e0b,#fbbf24)' }} />
                {/* Name + arrow only at bottom */}
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <h3 className="text-base font-black text-white mb-0.5 group-hover:text-amber-400 transition-colors leading-tight">
                    {cat.name}
                  </h3>
                  <span className="inline-flex items-center gap-1 text-amber-400 text-xs font-bold transition-all group-hover:gap-2">
                    View Products <ArrowRight className="w-3 h-3" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────── */}
      <section className="relative overflow-hidden py-16 md:py-20"
        style={{ background: 'linear-gradient(135deg,#0f172a 0%,#1e293b 100%)' }}>
        <div className="absolute -top-20 -right-20 w-80 h-80 rounded-full opacity-[0.04]" style={{ background: '#f59e0b' }} />
        <div className="absolute -bottom-20 -left-20 w-64 h-64 rounded-full opacity-[0.04]" style={{ background: '#f59e0b' }} />
        <div className="relative max-w-3xl mx-auto px-4 text-center">
          <div className="inline-block px-4 py-1 rounded-full text-xs font-bold uppercase tracking-widest mb-5"
            style={{ background: 'rgba(245,158,11,0.15)', color: '#fbbf24', border: '1px solid rgba(245,158,11,0.3)' }}>
            Get Started Today
          </div>
          <h2 className="text-3xl md:text-5xl font-black text-white mb-4" style={{ letterSpacing: '-0.02em' }}>
            Ready to Transform<br /><span style={{ color: '#f59e0b' }}>Your Space?</span>
          </h2>
          <p className="mb-8 max-w-md mx-auto leading-relaxed" style={{ color: 'rgba(255,255,255,0.55)', fontSize: '15px' }}>
            Contact us today for a free consultation. Our experts are ready to help.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link to="/contact" className="group inline-flex items-center gap-2 px-7 py-3.5 rounded-xl font-bold text-sm transition-all hover:gap-3"
              style={{ background: 'linear-gradient(135deg,#f59e0b,#d97706)', color: '#fff', boxShadow: '0 8px 28px rgba(245,158,11,0.35)' }}>
              Get Free Quote <ArrowRight className="w-4 h-4" />
            </Link>
            <a href="tel:9000916120" className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl font-bold text-sm"
              style={{ background: 'rgba(255,255,255,0.06)', border: '1.5px solid rgba(255,255,255,0.15)', color: '#fff' }}>
              <Phone className="w-4 h-4" style={{ color: '#f59e0b' }} /> 9000916120
            </a>
            <a href="tel:9581901555" className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl font-bold text-sm"
              style={{ background: 'rgba(255,255,255,0.06)', border: '1.5px solid rgba(255,255,255,0.15)', color: '#fff' }}>
              <Phone className="w-4 h-4" style={{ color: '#f59e0b' }} /> 9581901555
            </a>
          </div>
        </div>
      </section>

      <style>{`
        @keyframes float {
          0%,100%{transform:translateY(-50%) translateY(0px)}
          50%{transform:translateY(-50%) translateY(-12px)}
        }
      `}</style>
    </div>
  );
};

export default HomePage;
