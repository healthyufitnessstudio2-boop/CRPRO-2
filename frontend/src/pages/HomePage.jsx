import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight, ArrowRight, Shield, Award, Users, Sparkles } from 'lucide-react';

const HomePage = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [sliderData, setSliderData] = useState([]);
  const [categoriesData, setCategoriesData] = useState([]);

  useEffect(() => {
    // Load slider data
    fetch('/data/slider.json')
      .then(res => res.json())
      .then(data => setSliderData(data.slides))
      .catch(err => console.error('Error loading slider:', err));

    // Load categories data
    Promise.all([
      fetch('/data/products.json').then(res => res.json()),
      fetch('/data/categories-additional.json').then(res => res.json())
    ])
      .then(([products, additional]) => {
        const allCategories = [...products.categories, ...additional.categories];
        setCategoriesData(allCategories);
      })
      .catch(err => console.error('Error loading categories:', err));
  }, []);

  useEffect(() => {
    if (sliderData.length > 0) {
      const timer = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % sliderData.length);
      }, 5000);
      return () => clearInterval(timer);
    }
  }, [sliderData]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % sliderData.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + sliderData.length) % sliderData.length);
  };

  // Demo images for slider (will be replaced by user)
  const demoImages = [
    'https://images.unsplash.com/photo-1766156181041-0dc63ec093ff',
    'https://images.unsplash.com/photo-1668015642434-a5d2c8ffb6f4',
    'https://images.unsplash.com/photo-1506465243340-79d6321deb0e',
    'https://images.pexels.com/photos/18435276/pexels-photo-18435276.jpeg',
    'https://images.pexels.com/photos/34840277/pexels-photo-34840277.jpeg',
    'https://images.unsplash.com/photo-1592427761244-5aeb02877a',
    'https://images.unsplash.com/photo-1635266147530-f30f831dc9e0',
    'https://images.unsplash.com/photo-1766156181041-0dc63ec093ff',
    'https://images.unsplash.com/photo-1668015642434-a5d2c8ffb6f4',
    'https://images.unsplash.com/photo-1506465243340-79d6321deb0e'
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Slider */}
      <section className="relative h-[400px] md:h-[600px] overflow-hidden bg-slate-900">
        {sliderData.length > 0 && sliderData.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentSlide ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <div 
              className="absolute inset-0 bg-cover bg-center"
              style={{ 
                backgroundImage: `url(${demoImages[index]})`,
                filter: 'brightness(0.5)'
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-r from-slate-900/80 to-transparent" />
            
            <div className="relative h-full container mx-auto px-4 flex items-center">
              <div className="max-w-2xl text-white animate-fade-in-up">
                <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-4 leading-tight">
                  {slide.title}
                </h1>
                <p className="text-lg md:text-xl mb-8 text-slate-200">
                  {slide.description}
                </p>
                <div className="flex flex-wrap gap-2 md:gap-4">
                  <Link 
                    to="/products"
                    className="bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white px-4 py-2 md:px-8 md:py-3 rounded-lg text-sm md:text-base font-semibold flex items-center space-x-1 md:space-x-2 transition-all transform hover:scale-105"
                  >
                    <span>Explore Products</span>
                    <ArrowRight className="w-4 h-4 md:w-5 md:h-5" />
                  </Link>
                  <Link 
                    to="/contact"
                    className="bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white border-2 border-white/30 px-4 py-2 md:px-8 md:py-3 rounded-lg text-sm md:text-base font-semibold transition-all"
                  >
                    Get Quote
                  </Link>
                  <a 
                    href="/catalog/CR-PRO-RAILING-Catalog.pdf"
                    download
                    className="bg-slate-800/50 backdrop-blur-sm hover:bg-slate-700/50 text-white border-2 border-amber-400/50 px-4 py-2 md:px-8 md:py-3 rounded-lg text-sm md:text-base font-semibold transition-all flex items-center space-x-1 md:space-x-2"
                  >
                    <svg className="w-4 h-4 md:w-5 md:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    <span className="hidden sm:inline">Download Catalog</span>
                    <span className="sm:hidden">Catalog</span>
                  </a>
                </div>
              </div>
              
              {/* Logo on slider - fixed position with animation */}
              <div className="absolute right-4 md:right-12 lg:right-16 top-1/2 -translate-y-1/2 animate-float hidden sm:block">
                <img 
                  src="/logo.png"
                  alt="CR PRO RAILING" 
                  className="w-20 h-20 md:w-28 md:h-28 lg:w-36 lg:h-36 object-contain drop-shadow-2xl"
                  style={{filter: 'drop-shadow(0 0 20px rgba(0,0,0,0.5))'}}
                />
              </div>
            </div>
          </div>
        ))}

        {/* Slider Controls */}
        <button
          onClick={prevSlide}
          className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full flex items-center justify-center transition-all z-10"
        >
          <ChevronLeft className="w-6 h-6 text-white" />
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full flex items-center justify-center transition-all z-10"
        >
          <ChevronRight className="w-6 h-6 text-white" />
        </button>

        {/* Slider Indicators */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex space-x-2 z-10">
          {sliderData.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`h-2 rounded-full transition-all ${
                index === currentSlide ? 'w-8 bg-amber-500' : 'w-2 bg-white/50'
              }`}
            />
          ))}
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {[
              { icon: Shield, title: 'Safety First', desc: 'ISI certified products with maximum safety standards' },
              { icon: Award, title: 'Premium Quality', desc: 'Top-grade materials with lifetime warranty' },
              { icon: Users, title: 'Expert Team', desc: 'Professional installation by trained technicians' },
              { icon: Sparkles, title: 'Custom Design', desc: 'Tailored solutions for your unique needs' }
            ].map((feature, idx) => (
              <div 
                key={idx}
                className="text-center p-6 rounded-xl hover:bg-slate-50 transition-all hover-lift group"
              >
                <div className="w-16 h-16 bg-gradient-to-br from-amber-100 to-amber-200 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                  <feature.icon className="w-8 h-8 text-amber-600" />
                </div>
                <h3 className="text-xl font-semibold mb-2 text-slate-800">{feature.title}</h3>
                <p className="text-slate-600 text-sm">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16 bg-gradient-to-br from-slate-50 to-slate-100">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-4">
              Our <span className="gradient-text">Categories</span>
            </h2>
            <p className="text-slate-600 max-w-2xl mx-auto">
              Explore our wide range of premium railing and partition solutions
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {categoriesData.map((category, idx) => (
              <Link
                key={category.id}
                to={`/products/${category.id}`}
                className="group relative overflow-hidden rounded-2xl shadow-lg hover-lift bg-white"
              >
                <div className="aspect-[4/3] overflow-hidden">
                  <img
                    src={category.image}
                    alt={category.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/50 to-transparent opacity-70 group-hover:opacity-90 transition-opacity" />
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                  <h3 className="text-xl md:text-2xl font-bold mb-2 group-hover:text-amber-400 transition-colors">
                    {category.name}
                  </h3>
                  <p className="text-slate-200 text-sm mb-4 line-clamp-2">
                    {category.description}
                  </p>
                  <span className="inline-flex items-center text-amber-400 font-semibold group-hover:translate-x-2 transition-transform">
                    View Products <ArrowRight className="w-4 h-4 ml-2" />
                  </span>
                </div>
              </Link>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link
              to="/categories"
              className="inline-flex items-center bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white px-8 py-3 rounded-lg font-semibold transition-all transform hover:scale-105"
            >
              View All Categories <ArrowRight className="w-5 h-5 ml-2" />
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-slate-900 to-slate-800 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Transform Your Space?
          </h2>
          <p className="text-slate-300 text-lg mb-8 max-w-2xl mx-auto">
            Contact us today for a free consultation and quote. Our experts are ready to bring your vision to life.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              to="/contact"
              className="bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white px-8 py-4 rounded-lg font-semibold transition-all transform hover:scale-105"
            >
              Get Free Quote
            </Link>
            <a
              href="tel:9000916120"
              className="bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white border-2 border-white/30 px-8 py-4 rounded-lg font-semibold transition-all"
            >
              Call Now: 9000916120
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
