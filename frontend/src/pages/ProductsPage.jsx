import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Search, Filter, X, ChevronLeft, ChevronRight } from 'lucide-react';

const parseDescription = (desc) => {
  if (!desc) return { modelName: null, weight: null, length: null, profileSize: null, bullets: [] };
  const lines = desc.split('\n').map(l => l.replace(/^[•\-\*]\s*/, '').trim()).filter(Boolean);
  let modelName = null, weight = null, length = null, profileSize = null;
  const bullets = [];
  lines.forEach(line => {
    const lower = line.toLowerCase();
    if (lower.includes('model name')) {
      modelName = line.replace(/model name\s*[:\–\-]?\s*/i, '').trim();
    } else if (lower.startsWith('weight')) {
      weight = line.replace(/weight\s*[:\–\-]?\s*/i, '').trim();
    } else if (lower.startsWith('length')) {
      length = line.replace(/length\s*[:\–\-]?\s*/i, '').trim();
    } else if (lower.includes('profile size')) {
      profileSize = line.replace(/profile size\s*[:\–\-]?\s*/i, '').trim();
    } else if (line.length > 10) {
      bullets.push(line);
    }
  });
  return { modelName, weight, length, profileSize, bullets };
};

const ImageLightbox = ({ images, startIndex, onClose }) => {
  const [current, setCurrent] = useState(startIndex);
  const prev = (e) => { e.stopPropagation(); setCurrent(i => (i - 1 + images.length) % images.length); };
  const next = (e) => { e.stopPropagation(); setCurrent(i => (i + 1) % images.length); };
  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === 'ArrowLeft') setCurrent(i => (i - 1 + images.length) % images.length);
      if (e.key === 'ArrowRight') setCurrent(i => (i + 1) % images.length);
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [images.length, onClose]);

  return (
    <div className="fixed inset-0 bg-black/95 z-[100] flex items-center justify-center" onClick={onClose}>
      <button onClick={onClose} className="absolute top-4 right-4 w-10 h-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-colors">
        <X className="w-6 h-6 text-white" />
      </button>
      <div className="absolute top-4 left-1/2 -translate-x-1/2 text-white/70 text-sm font-medium">
        {current + 1} / {images.length}
      </div>
      {images.length > 1 && (
        <button onClick={prev} className="absolute left-4 w-12 h-12 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-colors">
          <ChevronLeft className="w-7 h-7 text-white" />
        </button>
      )}
      <div className="max-w-4xl max-h-[85vh] w-full px-20" onClick={e => e.stopPropagation()}>
        <img src={images[current]} alt={`Image ${current + 1}`} className="w-full h-full object-contain max-h-[85vh] rounded-lg"
          onError={(e) => { e.target.src = 'https://via.placeholder.com/800x600?text=Image+Not+Found'; }} />
      </div>
      {images.length > 1 && (
        <button onClick={next} className="absolute right-4 w-12 h-12 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-colors">
          <ChevronRight className="w-7 h-7 text-white" />
        </button>
      )}
      {images.length > 1 && (
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
          {images.map((img, i) => (
            <div key={i} onClick={e => { e.stopPropagation(); setCurrent(i); }}
              className={`w-14 h-14 rounded-lg overflow-hidden cursor-pointer border-2 transition-all ${current === i ? 'border-amber-400 opacity-100' : 'border-white/30 opacity-50 hover:opacity-80'}`}>
              <img src={img} alt="" className="w-full h-full object-cover"
                onError={(e) => { e.target.src = 'https://via.placeholder.com/56x56'; }} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const ProductsPage = () => {
  const { categoryId } = useParams();
  const [allCategories, setAllCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [data, setData] = useState(null);
  const [activeTab, setActiveTab] = useState('features');
  const [lightbox, setLightbox] = useState(null);

  useEffect(() => {
    fetch('/data/products.json')
      .then(res => res.json())
      .then(data => {
        setData(data);
        const allCats = data.categories;
        setAllCategories(allCats);
        if (categoryId) {
          const cat = allCats.find(c => c.id === categoryId);
          setSelectedCategory(cat);
          setFilteredProducts((cat?.products || []).map(p => ({ ...p, categoryName: cat.name })));
        } else {
          setFilteredProducts(allCats.flatMap(c => (c.products || []).map(p => ({ ...p, categoryName: c.name }))));
        }
      })
      .catch(err => console.error('Error loading products:', err));
  }, [categoryId]);

  useEffect(() => {
    if (selectedCategory) {
      setFilteredProducts((selectedCategory.products || []).map(p => ({ ...p, categoryName: selectedCategory.name })).filter(p => p.name.toLowerCase().includes(searchTerm.toLowerCase())));
    } else {
      setFilteredProducts(allCategories.flatMap(c => (c.products || []).map(p => ({ ...p, categoryName: c.name }))).filter(p => p.name.toLowerCase().includes(searchTerm.toLowerCase())));
    }
  }, [searchTerm, selectedCategory, allCategories]);

  return (
    <div className="min-h-screen bg-slate-50">
      <section className="relative bg-gradient-to-r from-slate-900 to-slate-800 text-white py-12 w-full">
        <div className="w-full px-4">
          {categoryId && (
            <Link to="/categories" className="inline-flex items-center text-slate-300 hover:text-white mb-4 transition-colors">
              <ArrowLeft className="w-4 h-4 mr-2" /> Back to Categories
            </Link>
          )}
          <h1 className="text-3xl md:text-4xl font-bold mb-2">{selectedCategory ? selectedCategory.name : 'All Products'}</h1>
          <p className="text-slate-300">{selectedCategory ? selectedCategory.description : 'Browse our complete product range'}</p>
        </div>
      </section>

      <section className="bg-white shadow-sm py-6 sticky top-0 z-10 w-full">
        <div className="w-full px-4">
          <div className="flex flex-col md:flex-row gap-4 items-center">
            <div className="relative flex-1 w-full">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              <input type="text" placeholder="Search products..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500" />
            </div>
            <div className="flex items-center gap-2 text-slate-600">
              <Filter className="w-5 h-5" />
              <span className="font-medium">{filteredProducts.length} Products</span>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12">
        <div className="w-full px-4">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-2 md:gap-4">
            {filteredProducts.map((product, idx) => (
              <div key={product.id} onClick={() => { setSelectedProduct(product); setActiveTab('features'); }}
                className="bg-white rounded-xl shadow-md overflow-hidden hover-lift group cursor-pointer"
                style={{ animationDelay: `${(idx % 20) * 50}ms` }}>
                <div className="aspect-square overflow-hidden bg-slate-100">
                  <img src={product.images?.[0]} alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    onError={(e) => { e.target.style.display = 'none'; }} />
                </div>
                <div className="p-3">
                  <h3 className="font-semibold text-sm text-slate-800 mb-1 line-clamp-2 group-hover:text-amber-600 transition-colors">{product.name}</h3>
                  <p className="text-[11px] text-slate-500">{product.categoryName}</p>
                  <button className="text-xs text-amber-600 font-medium mt-2 hover:underline">View Details →</button>
                </div>
              </div>
            ))}
          </div>
          {filteredProducts.length === 0 && (
            <div className="text-center py-20"><p className="text-slate-600 text-lg">No products found matching your search.</p></div>
          )}
        </div>
      </section>

      {selectedProduct && (() => {
        const parsed = parseDescription(selectedProduct.description);
        const hasInfoRows = parsed.modelName || parsed.weight || parsed.length || parsed.profileSize;
        const images = selectedProduct.images || [];
        return (
          <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4" onClick={() => setSelectedProduct(null)}>
            <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
              <div className="sticky top-0 bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between z-10">
                <h2 className="text-2xl font-bold text-slate-800">{selectedProduct.name}</h2>
                <button onClick={() => setSelectedProduct(null)} className="w-10 h-10 rounded-full hover:bg-slate-100 flex items-center justify-center transition-colors">
                  <X className="w-6 h-6 text-slate-600" />
                </button>
              </div>
              <div className="p-6">
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <div className="grid grid-cols-2 gap-3">
                      {images.slice(0, 2).map((img, i) => (
                        <div key={i} className="bg-slate-100 rounded-xl overflow-hidden aspect-square cursor-zoom-in relative group"
                          onClick={() => setLightbox({ images, index: i })}>
                          <img src={img} alt={selectedProduct.name}
                            className="w-full h-full object-contain p-4 group-hover:scale-105 transition-transform duration-300"
                            onError={(e) => { e.target.src = 'https://via.placeholder.com/600x600?text=CR+PRO+RAILING'; }} />
                          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors flex items-center justify-center">
                            <span className="opacity-0 group-hover:opacity-100 bg-black/60 text-white text-xs px-2 py-1 rounded-full transition-opacity">🔍 Click to zoom</span>
                          </div>
                        </div>
                      ))}
                    </div>
                    {images.length > 2 && (
                      <div className="flex gap-2 mt-3 flex-wrap">
                        {images.slice(2).map((img, i) => (
                          <div key={i} className="w-16 h-16 bg-slate-100 rounded-lg overflow-hidden cursor-zoom-in border-2 border-transparent hover:border-amber-400 transition-colors"
                            onClick={() => setLightbox({ images, index: i + 2 })}>
                            <img src={img} alt="" className="w-full h-full object-cover"
                              onError={(e) => { e.target.src = 'https://via.placeholder.com/64'; }} />
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                  <div>
                    {(hasInfoRows || parsed.bullets.length > 0) && (
                      <div className="mb-5 bg-amber-50 border border-amber-200 rounded-xl p-4">
                        <h3 className="text-xs font-bold text-amber-700 uppercase tracking-wider mb-3">Product Information</h3>
                        {hasInfoRows && (
                          <table className="w-full text-sm mb-2">
                            <tbody>
                              {parsed.modelName && (<tr className="border-b border-amber-100"><td className="py-1.5 text-slate-500 font-medium w-2/5">Model Name</td><td className="py-1.5 text-slate-800 font-bold">: &nbsp;{parsed.modelName}</td></tr>)}
                              {parsed.weight && (<tr className="border-b border-amber-100"><td className="py-1.5 text-slate-500 font-medium">Weight</td><td className="py-1.5 text-slate-800 font-bold">: &nbsp;{parsed.weight}</td></tr>)}
                              {parsed.length && (<tr className="border-b border-amber-100"><td className="py-1.5 text-slate-500 font-medium">Length</td><td className="py-1.5 text-slate-800 font-bold">: &nbsp;{parsed.length}</td></tr>)}
                              {parsed.profileSize && (<tr><td className="py-1.5 text-slate-500 font-medium">Profile Size</td><td className="py-1.5 text-slate-800 font-bold">: &nbsp;{parsed.profileSize}</td></tr>)}
                            </tbody>
                          </table>
                        )}
                        {parsed.bullets.length > 0 && (
                          <ul className="space-y-1 mt-2">
                            {parsed.bullets.map((b, i) => (
                              <li key={i} className="flex items-start gap-2 text-slate-600 text-xs">
                                <span className="w-1.5 h-1.5 bg-amber-500 rounded-full mt-1.5 flex-shrink-0"></span>{b}
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>
                    )}
                    <div className="flex gap-4 border-b text-xs sm:text-sm font-medium mb-4 overflow-x-auto">
                      {['features', 'spec', 'glass', 'finishes'].map(tab => (
                        <button key={tab} onClick={() => setActiveTab(tab)}
                          className={`pb-2 capitalize whitespace-nowrap ${activeTab === tab ? 'border-b-2 border-green-500 text-green-600' : 'text-slate-500'}`}>
                          {tab === 'spec' ? 'Specification' : tab.charAt(0).toUpperCase() + tab.slice(1)}
                        </button>
                      ))}
                    </div>
                    {activeTab === 'features' && (<ul className="space-y-2 mb-4">{data?.commonData?.features?.map((item, i) => (<li key={i} className="flex items-center text-slate-600 text-sm"><span className="w-2 h-2 bg-amber-500 rounded-full mr-3 flex-shrink-0"></span>{item}</li>))}</ul>)}
                    {activeTab === 'spec' && (<ul className="space-y-2 mb-4">{data?.commonData?.specifications?.map((item, i) => (<li key={i} className="flex items-center text-slate-600 text-sm"><span className="w-2 h-2 bg-amber-500 rounded-full mr-3 flex-shrink-0"></span>{item}</li>))}</ul>)}
                    {activeTab === 'glass' && (<ul className="space-y-2 mb-4">{data?.commonData?.glass?.map((item, i) => (<li key={i} className="flex items-center text-slate-600 text-sm"><span className="w-2 h-2 bg-amber-500 rounded-full mr-3 flex-shrink-0"></span>{item}</li>))}</ul>)}
                    {activeTab === 'finishes' && (<div className="flex flex-wrap gap-2 mb-4">{data?.commonData?.finishes?.map((item, i) => (<span key={i} className="bg-amber-50 border border-amber-200 text-amber-800 text-xs font-semibold px-3 py-1.5 rounded-full">{item}</span>))}</div>)}
                    <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-slate-200">
                      <a href={`https://wa.me/919000916120?text=${encodeURIComponent(`Hello! I'm interested in ${selectedProduct.name}. Please provide more details.`)}`}
                        target="_blank" rel="noopener noreferrer"
                        className="flex-1 bg-green-500 hover:bg-green-600 text-white py-3 px-6 rounded-lg font-semibold text-center transition-colors flex items-center justify-center space-x-2">
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg>
                        <span>WhatsApp Enquiry</span>
                      </a>
                      <Link to="/contact" className="flex-1 bg-amber-500 hover:bg-amber-600 text-white py-3 px-6 rounded-lg font-semibold text-center transition-colors">Get Free Quote</Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      })()}

      {lightbox && <ImageLightbox images={lightbox.images} startIndex={lightbox.index} onClose={() => setLightbox(null)} />}
    </div>
  );
};

export default ProductsPage;
