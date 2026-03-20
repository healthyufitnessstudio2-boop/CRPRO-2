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
    if (lower.includes('model name')) modelName = line.replace(/model name\s*[:\–\-]?\s*/i, '').trim();
    else if (lower.startsWith('weight')) weight = line.replace(/weight\s*[:\–\-]?\s*/i, '').trim();
    else if (lower.startsWith('length')) length = line.replace(/length\s*[:\–\-]?\s*/i, '').trim();
    else if (lower.includes('profile size')) profileSize = line.replace(/profile size\s*[:\–\-]?\s*/i, '').trim();
    else if (line.length > 8) bullets.push(line);
  });
  return { modelName, weight, length, profileSize, bullets };
};

// ── Lightbox ──────────────────────────────────────────────────
const ImageLightbox = ({ images, startIndex, onClose }) => {
  const [current, setCurrent] = useState(startIndex);
  useEffect(() => {
    const h = (e) => {
      if (e.key === 'ArrowLeft') setCurrent(i => (i - 1 + images.length) % images.length);
      if (e.key === 'ArrowRight') setCurrent(i => (i + 1) % images.length);
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', h);
    return () => window.removeEventListener('keydown', h);
  }, [images.length, onClose]);

  return (
    <div className="fixed inset-0 bg-black/95 z-[100] flex items-center justify-center" onClick={onClose}>
      <button onClick={onClose} className="absolute top-4 right-4 w-10 h-10 bg-white/10 rounded-full flex items-center justify-center">
        <X className="w-5 h-5 text-white" />
      </button>
      <div className="absolute top-4 left-1/2 -translate-x-1/2 text-white/50 text-xs font-mono">{current + 1} / {images.length}</div>
      {images.length > 1 && (
        <button onClick={e => { e.stopPropagation(); setCurrent(i => (i - 1 + images.length) % images.length); }}
          className="absolute left-3 top-1/2 -translate-y-1/2 w-11 h-11 bg-white/10 rounded-full flex items-center justify-center">
          <ChevronLeft className="w-6 h-6 text-white" />
        </button>
      )}
      <div className="max-w-4xl max-h-[85vh] w-full px-16" onClick={e => e.stopPropagation()}>
        <img src={images[current]} alt="" className="w-full h-full object-contain max-h-[85vh] rounded-xl"
          onError={e => { e.target.src = 'https://via.placeholder.com/800x600?text=No+Image'; }} />
      </div>
      {images.length > 1 && (
        <button onClick={e => { e.stopPropagation(); setCurrent(i => (i + 1) % images.length); }}
          className="absolute right-3 top-1/2 -translate-y-1/2 w-11 h-11 bg-white/10 rounded-full flex items-center justify-center">
          <ChevronRight className="w-6 h-6 text-white" />
        </button>
      )}
      {images.length > 1 && (
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
          {images.map((img, i) => (
            <div key={i} onClick={e => { e.stopPropagation(); setCurrent(i); }}
              className="w-12 h-12 rounded-lg overflow-hidden cursor-pointer"
              style={{ border: `2px solid ${current === i ? '#f59e0b' : 'rgba(255,255,255,0.2)'}`, opacity: current === i ? 1 : 0.5 }}>
              <img src={img} alt="" className="w-full h-full object-cover" />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

// ── Product Modal ─────────────────────────────────────────────
const ProductModal = ({ product, data, onClose }) => {
  const [activeTab, setActiveTab] = useState('features');
  const [activeImg, setActiveImg] = useState(0);
  const [lightbox, setLightbox] = useState(null);
  const parsed = parseDescription(product.description);
  const hasInfo = parsed.modelName || parsed.weight || parsed.length || parsed.profileSize;
  const images = product.images || [];

  return (
    <>
      <div className="fixed inset-0 bg-black/80 z-50 flex items-start justify-center p-3 md:p-6 overflow-y-auto"
        onClick={onClose}>
        <div className="bg-white rounded-2xl w-full my-auto"
          style={{ maxWidth: '700px' }}
          onClick={e => e.stopPropagation()}>

          {/* ── Header ── */}
          <div className="flex items-start justify-between px-5 py-4 border-b border-slate-100">
            <div>
              <h2 className="text-lg font-bold text-slate-800">{product.name}</h2>
              <span className="text-xs text-slate-400">{product.categoryName} · {product.id}</span>
            </div>
            <button onClick={onClose} className="w-8 h-8 rounded-full hover:bg-slate-100 flex items-center justify-center ml-2 flex-shrink-0">
              <X className="w-4 h-4 text-slate-500" />
            </button>
          </div>

          {/* ── TOP SECTION: Images LEFT | Tabs RIGHT ── */}
          <div className="flex flex-col md:flex-row border-b border-slate-100">

            {/* Images — left */}
            <div className="md:w-[45%] p-4 border-b md:border-b-0 md:border-r border-slate-100 flex flex-col gap-3">
              {/* Main image */}
              <div
                className="rounded-xl overflow-hidden bg-slate-50 cursor-zoom-in relative group"
                style={{ aspectRatio: '1/1', border: '1px solid #f0f0f0' }}
                onClick={() => setLightbox({ images, index: activeImg })}
              >
                <img
                  src={images[activeImg]}
                  alt={product.name}
                  className="w-full h-full object-contain p-4 group-hover:scale-105 transition-transform duration-300"
                  onError={e => { e.target.src = 'https://via.placeholder.com/400?text=No+Image'; }}
                />
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <span className="bg-black/50 text-white text-xs px-2 py-1 rounded-full">🔍 Zoom</span>
                </div>
              </div>
              {/* Thumbnails */}
              {images.length > 1 && (
                <div className="flex gap-2 flex-wrap">
                  {images.map((img, i) => (
                    <div key={i} onClick={() => setActiveImg(i)}
                      className="w-14 h-14 rounded-lg overflow-hidden cursor-pointer bg-slate-50"
                      style={{ border: `2px solid ${activeImg === i ? '#f59e0b' : '#e5e7eb'}` }}>
                      <img src={img} alt="" className="w-full h-full object-contain p-1"
                        onError={e => { e.target.src = 'https://via.placeholder.com/56'; }} />
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Tabs — right */}
            <div className="md:w-[55%] p-4">
              {/* Tab buttons */}
              <div className="flex border-b border-slate-200 mb-4 gap-1">
                {['features', 'spec', 'glass', 'finishes'].map(tab => (
                  <button key={tab} onClick={() => setActiveTab(tab)}
                    className="pb-2 px-2 md:px-3 text-xs font-bold capitalize whitespace-nowrap transition-all"
                    style={{
                      color: activeTab === tab ? '#16a34a' : '#94a3b8',
                      borderBottom: `2px solid ${activeTab === tab ? '#16a34a' : 'transparent'}`,
                    }}>
                    {tab === 'spec' ? 'Specification' : tab.charAt(0).toUpperCase() + tab.slice(1)}
                  </button>
                ))}
              </div>

              {/* Tab content */}
              {activeTab === 'features' && (
                <ul className="space-y-2.5">
                  {data?.commonData?.features?.map((item, i) => (
                    <li key={i} className="flex items-center gap-2 text-slate-700 text-sm">
                      <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: '#f59e0b' }} />{item}
                    </li>
                  ))}
                </ul>
              )}
              {activeTab === 'spec' && (
                <ul className="space-y-2.5">
                  {data?.commonData?.specifications?.map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-slate-700 text-sm">
                      <span className="w-2 h-2 rounded-full flex-shrink-0 mt-1.5" style={{ background: '#f59e0b' }} />{item}
                    </li>
                  ))}
                </ul>
              )}
              {activeTab === 'glass' && (
                <ul className="space-y-2.5">
                  {data?.commonData?.glass?.map((item, i) => (
                    <li key={i} className="flex items-center gap-2 text-slate-700 text-sm">
                      <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: '#f59e0b' }} />{item}
                    </li>
                  ))}
                </ul>
              )}
              {activeTab === 'finishes' && (
                <div className="flex flex-wrap gap-2">
                  {data?.commonData?.finishes?.map((item, i) => (
                    <span key={i} className="text-xs font-semibold px-3 py-1.5 rounded-full"
                      style={{ background: '#fef3c7', border: '1px solid #fde68a', color: '#92400e' }}>
                      {item}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* ── BOTTOM SECTION: Description full width ── */}
          <div className="p-5">
            {(hasInfo || parsed.bullets.length > 0) ? (
              <div className="rounded-xl p-4 mb-4" style={{ background: '#fffbf0', border: '1px solid #fde68a' }}>
                <div className="text-xs font-bold uppercase tracking-wider mb-3" style={{ color: '#b45309' }}>
                  Product Information
                </div>
                {/* Info grid: model/weight/length/size */}
                {hasInfo && (
                  <div className="grid grid-cols-2 gap-x-8 gap-y-3 mb-3">
                    {parsed.modelName && (
                      <div>
                        <div className="text-[11px] text-slate-400 mb-0.5">Model Name</div>
                        <div className="text-sm font-bold text-slate-800">{parsed.modelName}</div>
                      </div>
                    )}
                    {parsed.weight && (
                      <div>
                        <div className="text-[11px] text-slate-400 mb-0.5">Weight</div>
                        <div className="text-sm font-bold text-slate-800">{parsed.weight}</div>
                      </div>
                    )}
                    {parsed.length && (
                      <div>
                        <div className="text-[11px] text-slate-400 mb-0.5">Length</div>
                        <div className="text-sm font-bold text-slate-800">{parsed.length}</div>
                      </div>
                    )}
                    {parsed.profileSize && (
                      <div>
                        <div className="text-[11px] text-slate-400 mb-0.5">Profile Size</div>
                        <div className="text-sm font-bold text-slate-800">{parsed.profileSize}</div>
                      </div>
                    )}
                  </div>
                )}
                {/* Bullet points */}
                {parsed.bullets.length > 0 && (
                  <ul className="space-y-1.5">
                    {parsed.bullets.map((b, i) => (
                      <li key={i} className="flex items-start gap-2 text-slate-600 text-sm leading-relaxed">
                        <span className="w-1.5 h-1.5 rounded-full flex-shrink-0 mt-1.5" style={{ background: '#f59e0b' }} />
                        {b}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ) : (
              /* If no parsed info, show raw description */
              product.description && (
                <div className="rounded-xl p-4 mb-4" style={{ background: '#f8fafc', border: '1px solid #e2e8f0' }}>
                  <div className="text-xs font-bold uppercase tracking-wider mb-2" style={{ color: '#64748b' }}>Description</div>
                  <p className="text-sm text-slate-600 leading-relaxed">{product.description}</p>
                </div>
              )
            )}

            {/* CTA Buttons */}
            <div className="flex gap-3">
              <a
                href={`https://wa.me/919000916120?text=${encodeURIComponent(`Hello! I'm interested in ${product.name}. Please provide more details.`)}`}
                target="_blank" rel="noopener noreferrer"
                className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl font-bold text-sm text-white"
                style={{ background: '#22c55e' }}
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                </svg>
                WhatsApp Enquiry
              </a>
              <Link to="/contact"
                className="flex-1 flex items-center justify-center py-3 rounded-xl font-bold text-sm text-white"
                style={{ background: '#f59e0b' }}>
                Get Free Quote
              </Link>
            </div>
          </div>
        </div>
      </div>

      {lightbox && (
        <ImageLightbox images={lightbox.images} startIndex={lightbox.index} onClose={() => setLightbox(null)} />
      )}
    </>
  );
};

// ── Main Page ─────────────────────────────────────────────────
const ProductsPage = () => {
  const { categoryId } = useParams();
  const [allCategories, setAllCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch('/data/products.json').then(r => r.json()).then(data => {
      setData(data);
      const cats = data.categories;
      setAllCategories(cats);
      if (categoryId) {
        const cat = cats.find(c => c.id === categoryId);
        setSelectedCategory(cat);
        setFilteredProducts((cat?.products || []).map(p => ({ ...p, categoryName: cat.name })));
      } else {
        setFilteredProducts(cats.flatMap(c => (c.products || []).map(p => ({ ...p, categoryName: c.name }))));
      }
    }).catch(console.error);
  }, [categoryId]);

  useEffect(() => {
    const base = selectedCategory
      ? (selectedCategory.products || []).map(p => ({ ...p, categoryName: selectedCategory.name }))
      : allCategories.flatMap(c => (c.products || []).map(p => ({ ...p, categoryName: c.name })));
    setFilteredProducts(base.filter(p => p.name.toLowerCase().includes(searchTerm.toLowerCase())));
  }, [searchTerm, selectedCategory, allCategories]);

  return (
    <div className="min-h-screen bg-slate-50">
      <section className="bg-gradient-to-r from-slate-900 to-slate-800 text-white py-12 w-full">
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

      <section className="bg-white shadow-sm py-4 sticky top-0 z-10 w-full">
        <div className="w-full px-4">
          <div className="flex gap-4 items-center">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input type="text" placeholder="Search products..." value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 text-sm" />
            </div>
            <div className="flex items-center gap-1.5 text-slate-600 text-sm">
              <Filter className="w-4 h-4" />
              <span className="font-medium">{filteredProducts.length}</span>
            </div>
          </div>
        </div>
      </section>

      <section className="py-10">
        <div className="w-full px-4">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-2 md:gap-4">
            {filteredProducts.map((product, idx) => (
              <div key={product.id} onClick={() => setSelectedProduct(product)}
                className="bg-white rounded-xl shadow-md overflow-hidden group cursor-pointer hover:shadow-lg transition-shadow">
                <div className="aspect-square overflow-hidden bg-slate-100">
                  <img src={product.images?.[0]} alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    onError={e => { e.target.style.display = 'none'; }} />
                </div>
                <div className="p-3">
                  <h3 className="font-semibold text-sm text-slate-800 mb-0.5 line-clamp-2 group-hover:text-amber-600 transition-colors">{product.name}</h3>
                  <p className="text-[11px] text-slate-500">{product.categoryName}</p>
                  <button className="text-xs text-amber-600 font-medium mt-2 hover:underline">View Details →</button>
                </div>
              </div>
            ))}
          </div>
          {filteredProducts.length === 0 && (
            <div className="text-center py-20"><p className="text-slate-600">No products found.</p></div>
          )}
        </div>
      </section>

      {selectedProduct && (
        <ProductModal
          product={selectedProduct}
          data={data}
          onClose={() => setSelectedProduct(null)}
        />
      )}
    </div>
  );
};

export default ProductsPage;
