import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Search, Filter, X } from 'lucide-react';

const ProductsPage = () => {
  const { categoryId } = useParams();
  const [allCategories, setAllCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedProduct, setSelectedProduct] = useState(null);

 useEffect(() => {
  fetch('/data/products.json')
    .then(res => res.json())
    .then(data => {
      const allCats = data.categories;
      setAllCategories(allCats);

           if (categoryId) {
        const cat = allCats.find(c => c.id === categoryId);
        setSelectedCategory(cat);

        const prodsWithCat = (cat?.products || []).map(p => ({
          ...p,
          categoryName: cat.name
        }));
        setFilteredProducts(prodsWithCat);
      } else {
        const allProds = allCats.flatMap(c =>
          (c.products || []).map(p => ({
            ...p,
            categoryName: c.name
          }))
        );
        setFilteredProducts(allProds);
      }

    })
    .catch(err => console.error('Error loading products:', err));
}, [categoryId]);
     
    useEffect(() => {
       if (selectedCategory) {
      const filtered = (selectedCategory.products || [])
        .map(p => ({ ...p, categoryName: selectedCategory.name }))
        .filter(product =>
          product.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
      setFilteredProducts(filtered);
    } else {
      const allProds = allCategories.flatMap(c =>
        (c.products || []).map(p => ({
          ...p,
          categoryName: c.name
        }))
      );
      const filtered = allProds.filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredProducts(filtered);
    }

  }, [searchTerm, selectedCategory, allCategories]);

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Hero Section */}
    <section className="relative bg-gradient-to-r from-slate-900 to-slate-800 text-white py-12 w-full">
  <div className="w-full px-4">
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
      <section className="bg-white shadow-sm py-6 sticky top-0 z-10 w-full">
  <div className="w-full px-4">
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
        <div className=""w-full px-4">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-2 md:gap-4">
            {filteredProducts.map((product, idx) => (
              <div
                key={product.id}
                onClick={() => setSelectedProduct(product)}
                className="bg-white rounded-xl shadow-md overflow-hidden hover-lift group cursor-pointer"
                style={{ animationDelay: `${(idx % 20) * 50}ms` }}
              >
                <div className="aspect-square overflow-hidden bg-slate-100">
                  <img
                    src={product.images?.[0]}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    onError={(e) => {
  e.target.style.display = 'none';
}}
                  />
                </div>
                <div className="p-3">
                  <h3 className="font-semibold text-sm text-slate-800 mb-1 line-clamp-2 group-hover:text-amber-600 transition-colors">
                    {product.name}
                  </h3>
                  <p className="text-[11px] text-slate-500">
  {product.categoryName}
</p>
                  <button className="text-xs text-amber-600 font-medium mt-2 hover:underline">
                    View Details →
                  </button>
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

      {/* Product Detail Modal */}
      {selectedProduct && (
        <div 
          className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4 animate-fade-in-up"
          onClick={() => setSelectedProduct(null)}
        >
          <div 
            className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="sticky top-0 bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between z-10">
              <h2 className="text-2xl font-bold text-slate-800">{selectedProduct.name}</h2>
              <button
                onClick={() => setSelectedProduct(null)}
                className="w-10 h-10 rounded-full hover:bg-slate-100 flex items-center justify-center transition-colors"
              >
                <X className="w-6 h-6 text-slate-600" />
              </button>
            </div>
            
            <div className="p-6">
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                {/* Product Image */}
               <div className="grid grid-cols-2 gap-4">
  {selectedProduct.images?.slice(0, 2).map((img, i) => (
    <div key={i} className="bg-slate-100 rounded-xl overflow-hidden aspect-square">
      <img
        src={img}
        alt={selectedProduct.name}
        className="w-full h-full object-contain p-4"
        onError={(e) => {
          e.target.src = 'https://via.placeholder.com/600x600?text=CR+PRO+RAILING';
        }}
      />
    </div>
  ))}
</div>
</div>
                   

                {/* Product Details */}
                <div>
                  <div className="mb-6">
                    <h3 className="text-lg font-semibold text-slate-800 mb-3">Description</h3>
                    <p className="text-slate-600 leading-relaxed">
  {selectedCategory?.description || 'Premium quality product from CR PRO RAILING.'}
</p>
                  </div>

                  <div className="mb-6">
                    <h3 className="text-lg font-semibold text-slate-800 mb-3">Features</h3>
                    <ul className="space-y-2">
                      <li className="flex items-center text-slate-600">
                        <span className="w-2 h-2 bg-amber-500 rounded-full mr-3"></span>
                        Premium Quality Material
                      </li>
                      <li className="flex items-center text-slate-600">
                        <span className="w-2 h-2 bg-amber-500 rounded-full mr-3"></span>
                        Weather Resistant
                      </li>
                      <li className="flex items-center text-slate-600">
                        <span className="w-2 h-2 bg-amber-500 rounded-full mr-3"></span>
                        Easy Installation
                      </li>
                      <li className="flex items-center text-slate-600">
                        <span className="w-2 h-2 bg-amber-500 rounded-full mr-3"></span>
                        Low Maintenance
                      </li>
                     </ul>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-slate-200">
                    <a
                      href={`https://wa.me/919000916120?text=${encodeURIComponent(`Hello! I'm interested in ${selectedProduct.name}. Please provide more details.`)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 bg-green-500 hover:bg-green-600 text-white py-3 px-6 rounded-lg font-semibold text-center transition-colors flex items-center justify-center space-x-2"
                    >
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                      </svg>
                      <span>WhatsApp Enquiry</span>
                    </a>
                    <Link
                      to="/contact"
                      className="flex-1 bg-amber-500 hover:bg-amber-600 text-white py-3 px-6 rounded-lg font-semibold text-center transition-colors"
                    >
                      Get Free Quote
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductsPage;
