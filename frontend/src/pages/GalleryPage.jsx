import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';

const GalleryPage = () => {
  const [galleryImages, setGalleryImages] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    fetch('/data/gallery.json')
      .then(res => res.json())
      .then(data => setGalleryImages(data.images))
      .catch(err => console.error('Error loading gallery:', err));
  }, []);

  // Demo images (will be replaced by user)
   return (
    <div className="min-h-screen bg-slate-50">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-slate-900 to-slate-800 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 animate-fade-in-up">
            Project <span className="gradient-text">Gallery</span>
          </h1>
          <p className="text-slate-300 text-lg max-w-2xl mx-auto">
            Explore our portfolio of completed projects and installations
          </p>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4 auto-rows-[10px]">
           {galleryImages.map((image, idx) => (
 <div
  key={image.id}
  className="group cursor-pointer w-full"
  style={{ gridRowEnd: "span 30" }}
    onClick={() => setSelectedImage(image)}
  >
    <div className="relative overflow-hidden rounded-xl shadow-lg hover-lift">
      <img
        src={image.image}
        alt={image.title}
        className="w-full h-auto group-hover:scale-110 transition-transform duration-500"
      />
      <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
    </div>
  </div>
))}
          </div>
        </div>
      </section>

      {/* Lightbox */}
      {selectedImage && (
        <div 
          className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4 animate-fade-in-up"
          onClick={() => setSelectedImage(null)}
        >
          <button
            onClick={() => setSelectedImage(null)}
            className="absolute top-4 right-4 w-12 h-12 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-colors"
          >
            <X className="w-6 h-6 text-white" />
          </button>
          <div className="max-w-5xl w-full" onClick={(e) => e.stopPropagation()}>
            <img
              src={selectedImage.image}
              alt={selectedImage.title}
              className="w-full h-auto max-h-[80vh] object-contain rounded-lg"
            />
            
          </div>
        </div>
      )}
    </div>
  );
};

export default GalleryPage;
