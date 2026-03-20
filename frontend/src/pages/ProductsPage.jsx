import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Search, Filter, X, ChevronLeft, ChevronRight, FileText } from 'lucide-react';

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
        <div className="bg-white rounded-2xl w-full my-auto" style={{ maxWidth: '700px' }}
          onClick={e => e.stopPropagation()}>

          {/* Header */}
          <div className="flex items-start justify-between px-5 py-4 border-b border-slate-100">
            <div>
              <h2 className="text-lg font-bold text-slate-800">{product.name}</h2>
              <span className="text-xs text-slate-400">{product.categoryName} · {product.id}</span>
            </div>
            <button onClick={onClose}
              className="w-8 h-8 rounded-full hover:bg-slate-100 flex items-center justify-center ml-2 flex-shrink-0 transition-colors">
              <X className="w-4 h-4 text-slate-500" />
            </button>
          </div>

          {/* TOP: Images LEFT | Tabs RIGHT */}
          <div className="flex flex-col md:flex-row border-b border-slate-100">

            {/* Images */}
            <div className="md:w-[45%] p-4 border-b md:border-b-0 md:border-r border-slate-100 flex flex-col gap-3">
              <div className="rounded-xl overflow-hidden bg-slate-50 cursor-zoom-in relative group"
                style={{ aspectRatio: '1/1', border: '1px solid #f0f0f0' }}
                onClick={() => setLightbox({ images, index: activeImg })}>
                <img src={images[activeImg]} alt={product.name}
                  className="w-full h-full object-contain p-4 group-hover:scale-105 transition-transform duration-300"
                  onError={e => { e.target.src = 'https://via.placeholder.com/400?text=No+Image'; }} />
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <span className="bg-black/50 text-white text-xs px-2 py-1 rounded-full">🔍 Zoom</span>
                </div>
              </div>
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

            {/* Tabs */}
            <div className="md:w-[55%] p-4">
              <div className="flex border-b border-slate-200 mb-4 gap-1">
                {['features', 'spec', 'glass', 'finishes'].map(tab => (
                  <button key={tab} onClick={() => setActiveTab(tab)}
                    className="pb-2 px-2 md:px-3 text-xs font-bold whitespace-nowrap transition-all"
                    style={{
                      color: activeTab === tab ? '#16a34a' : '#94a3b8',
                      borderBottom: `2px solid ${activeTab === tab ? '#16a34a' : 'transparent'}`,
                    }}>
                    {tab === 'spec' ? 'Specification' : tab.charAt(0).toUpperCase() + tab.slice(1)}
                  </button>
                ))}
              </div>
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

          {/* BOTTOM: Description + CTA */}
          <div className="p-4 md:p-5">

            {/* Product Info Box */}
            {(hasInfo || parsed.bullets.length > 0) && (
              <div className="rounded-xl mb-4" style={{ background: '#fffbf0', border: '1px solid #fde68a', padding: '10px 12px' }}>
                <div style={{ fontSize: '10px', fontWeight: 700, color: '#b45309', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '8px' }}>
                  Product Information
                </div>
                {hasInfo && (
                  <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: parsed.bullets.length > 0 ? '8px' : 0 }}>
                    <tbody>
                      {[['Model Name', parsed.modelName], ['Weight', parsed.weight], ['Length', parsed.length], ['Profile Size', parsed.profileSize]].filter(([, v]) => v).map(([label, value]) => (
                        <tr key={label} style={{ borderBottom: '1px solid #fde68a' }}>
                          <td style={{ padding: '3px 6px 3px 0', fontSize: '11px', color: '#94a3b8', whiteSpace: 'nowrap', width: '40%' }}>{label}</td>
                          <td style={{ padding: '3px 0', fontSize: '12px', fontWeight: 700, color: '#1e293b' }}>: {value}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
                {parsed.bullets.length > 0 && (
                  <ul style={{ margin: 0, padding: 0, listStyle: 'none' }}>
                    {parsed.bullets.map((b, i) => (
                      <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '6px', fontSize: '11px', color: '#475569', lineHeight: '1.4', padding: '2px 0' }}>
                        <span style={{ width: '5px', height: '5px', borderRadius: '50%', background: '#f59e0b', flexShrink: 0, marginTop: '4px' }} />
                        {b}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            )}

            {/* ── 2 Buttons: Get Quote + Download Catalog ── */}
            <div className="grid grid-cols-2 gap-2">

              {/* Get Free Quote */}
              <Link to="/contact"
                className="flex items-center justify-center gap-2 rounded-xl font-semibold text-white transition-all hover:opacity-90 active:scale-[0.98]"
                style={{
                  background: 'linear-gradient(135deg, #f59e0b, #d97706)',
                  padding: '11px 8px',
                  fontSize: '13px',
                  boxShadow: '0 3px 12px rgba(245,158,11,0.3)',
                  whiteSpace: 'nowrap',
                }}>
                <FileText className="w-4 h-4 flex-shrink-0" />
                <span>Get Free Quote</span>
              </Link>

              {/* Download Catalog */}
              <a
                href="/catalog/CR-PRO-RAILING-Catalog.pdf"
                download
                className="flex items-center justify-center gap-2 rounded-xl font-semibold transition-all hover:opacity-90 active:scale-[0.98]"
                style={{
                  background: 'linear-gradient(135deg, #1e293b, #0f172a)',
                  padding: '11px 8px',
                  fontSize: '13px',
                  color: '#fbbf24',
                  boxShadow: '0 3px 12px rgba(0,0,0,0.2)',
                  border: '1px solid rgba(245,158,11,0.3)',
                  whiteSpace: 'nowrap',
                }}>
                <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                    d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                <span>Download Catalog</span>
              </a>

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
          <h1 className="text-3xl md:text-4xl font-bold mb-2">
            {selectedCategory ? selectedCategory.name : 'All Products'}
          </h1>
          <p className="text-slate-300">
            {selectedCategory ? selectedCategory.description : 'Browse our complete product range'}
          </p>
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
            {filteredProducts.map((product) => (
              <div key={product.id} onClick={() => setSelectedProduct(product)}
                className="bg-white rounded-xl shadow-md overflow-hidden group cursor-pointer hover:shadow-lg transition-shadow">
                <div className="aspect-square overflow-hidden bg-slate-100">
                  <img src={product.images?.[0]} alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    onError={e => { e.target.style.display = 'none'; }} />
                </div>
                <div className="p-3">
                  <h3 className="font-semibold text-sm text-slate-800 mb-0.5 line-clamp-2 group-hover:text-amber-600 transition-colors">
                    {product.name}
                  </h3>
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
        <ProductModal product={selectedProduct} data={data} onClose={() => setSelectedProduct(null)} />
      )}
    </div>
  );
};

export default ProductsPage;
