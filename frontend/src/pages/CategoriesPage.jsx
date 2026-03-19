import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const CategoriesPage = () => {
  const [categoriesData, setCategoriesData] = useState([]);

  useEffect(() => {
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

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-slate-900 to-slate-800 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 animate-fade-in-up">
            Our <span className="gradient-text">Categories</span>
          </h1>
          <p className="text-slate-300 text-lg max-w-2xl mx-auto animate-fade-in-up">
            Explore our comprehensive range of premium railing and partition solutions
          </p>
        </div>
      </section>

      {/* Categories Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {categoriesData.map((category, idx) => (
              <Link
                key={category.id}
                to={`/products/${category.id}`}
                className="group bg-white rounded-2xl shadow-lg overflow-hidden hover-lift"
                style={{ animationDelay: `${idx * 100}ms` }}
              >
                <div className="aspect-[4/3] overflow-hidden relative">
                  <img
                    src={category.image}
                    alt={category.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute top-4 right-4 bg-amber-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                    {category.products.length} Products
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-slate-800 mb-2 group-hover:text-amber-600 transition-colors">
                    {category.name}
                  </h3>
                  <p className="text-slate-600 text-sm mb-4 line-clamp-2">
                    {category.description}
                  </p>
                  <span className="inline-flex items-center text-amber-600 font-semibold group-hover:translate-x-2 transition-transform">
                    View Products <ArrowRight className="w-4 h-4 ml-2" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default CategoriesPage;