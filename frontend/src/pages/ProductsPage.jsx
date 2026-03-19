import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Search, Filter } from 'lucide-react';

const ProductsPage = () => {
  const { categoryId } = useParams();
  const [allCategories, setAllCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    Promise.all([
      fetch('/data/products.json').then(res => res.json()),
      fetch('/data/categories-additional.json').then(res => res.json())
    ])
      .then(([products, additional]) => {
        const allCats = [...products.categories, ...additional.categories];
        setAllCategories(allCats);
        
        if (categoryId) {
          const cat = allCats.find(c => c.id === categoryId);
          setSelectedCategory(cat);
          setFilteredProducts(cat?.products || []);
        } else {
          const allProds = allCats.flatMap(c => c.products);
          setFilteredProducts(allProds);
        }
      })
      .catch(err => console.error('Error loading products:', err));
  }, [categoryId]);

  useEffect(() => {
    if (selectedCategory) {
      const filtered = selectedCategory.products.filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredProducts(filtered);
    } else {
      const allProds = allCategories.flatMap(c => c.products);
      const filtered = allProds.filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredProducts(filtered);
    }
  }, [searchTerm, selectedCategory, allCategories]);

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-slate-900 to-slate-800 text-white py-12">
        <div className="container mx-auto px-4">
          {categoryId && (
            <Link
              to="/categories"
              className="inline-flex items-center text-slate-300 hover:text-white mb-4 transition-colors"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Categories
            </Link>
          )}
          <h1 className="text-3xl md:text-4xl font-bold mb-2">
            {selectedCategory ? selectedCategory.name : 'All Products'}
          </h1>
          <p className="text-slate-300">
            {selectedCategory ? selectedCategory.description : 'Browse our complete product range'}
          </p>
        </div>
      </section>

      {/* Search & Filter */}
      <section className="bg-white shadow-sm py-6 sticky top-0 z-10">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-4 items-center">
            <div className="relative flex-1 w-full">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              <input
                type="text"
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
              />
            </div>
            <div className="flex items-center gap-2 text-slate-600">
              <Filter className="w-5 h-5" />
              <span className="font-medium">{filteredProducts.length} Products</span>
            </div>
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((product, idx) => (
              <div
                key={product.id}
                className="bg-white rounded-xl shadow-md overflow-hidden hover-lift group"
                style={{ animationDelay: `${(idx % 20) * 50}ms` }}
              >
                <div className="aspect-square overflow-hidden bg-slate-100">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-slate-800 mb-2 line-clamp-2 group-hover:text-amber-600 transition-colors">
                    {product.name}
                  </h3>
                  <p className="text-slate-600 text-sm line-clamp-2">
                    {product.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {filteredProducts.length === 0 && (
            <div className="text-center py-20">
              <p className="text-slate-600 text-lg">No products found matching your search.</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default ProductsPage;