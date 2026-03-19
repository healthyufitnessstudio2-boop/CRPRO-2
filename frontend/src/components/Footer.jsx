import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Company Info */}
          <div className="space-y-4">
            <img 
              src="https://customer-assets.emergentagent.com/job_81edeaf8-217a-4db9-99ef-2f4d72cfd1fa/artifacts/0fgexlav_ChatGPT%20Image%20Mar%2019%2C%202026%2C%2005_13_39%20PM.png"
              alt="CR PRO RAILING" 
              className="h-16 w-auto"
            />
            <p className="text-slate-300 text-sm leading-relaxed">
              CR PRO RAILING specializes in premium aluminum, stainless steel, and glass railings with custom design solutions.
            </p>
            <div className="flex space-x-4">
              <a 
                href="https://www.facebook.com/share/1ApX5UYCHB/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-slate-700 hover:bg-amber-500 flex items-center justify-center transition-colors"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>
              <a 
                href="https://www.instagram.com/cr_pro_railing?igsh=MWU2aDZ6a2Nxcnd3aw==" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-slate-700 hover:bg-amber-500 flex items-center justify-center transition-colors"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-amber-400">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link to="/" className="text-slate-300 hover:text-amber-400 transition-colors">Home</Link></li>
              <li><Link to="/categories" className="text-slate-300 hover:text-amber-400 transition-colors">Categories</Link></li>
              <li><Link to="/products" className="text-slate-300 hover:text-amber-400 transition-colors">Products</Link></li>
              <li><Link to="/gallery" className="text-slate-300 hover:text-amber-400 transition-colors">Gallery</Link></li>
              <li><Link to="/about" className="text-slate-300 hover:text-amber-400 transition-colors">About Us</Link></li>
              <li><Link to="/contact" className="text-slate-300 hover:text-amber-400 transition-colors">Contact</Link></li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-amber-400">Our Services</h3>
            <ul className="space-y-2 text-sm">
              <li className="text-slate-300">Aluminium Glass Balcony Railing</li>
              <li className="text-slate-300">Aluminium T Birket Profile</li>
              <li className="text-slate-300">SS Steel & Glass Railing</li>
              <li className="text-slate-300">SS Steel PVD Powder Coating</li>
              <li className="text-slate-300">UPVC Window Door Partition</li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-amber-400">Contact Us</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start space-x-2">
                <MapPin className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
                <span className="text-slate-300">
                  Pilar 180 Near Kotak Bank, Attapur, Upparpally<br />
                  Rajendra Nagar, Hyderabad<br />
                  Telangana - 500048
                </span>
              </li>
              <li className="flex items-center space-x-2">
                <Phone className="w-5 h-5 text-amber-400 flex-shrink-0" />
                <div className="text-slate-300">
                  <a href="tel:9000916120" className="hover:text-amber-400 transition-colors">9000916120</a>
                  <span className="mx-1">/</span>
                  <a href="tel:9581901555" className="hover:text-amber-400 transition-colors">9581901555</a>
                </div>
              </li>
              <li className="flex items-center space-x-2">
                <Mail className="w-5 h-5 text-amber-400 flex-shrink-0" />
                <a href="mailto:crprorailing@gmail.com" className="text-slate-300 hover:text-amber-400 transition-colors">
                  crprorailing@gmail.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-slate-700 pt-6 mt-6">
          <div className="flex flex-col md:flex-row justify-between items-center text-sm text-slate-400">
            <p>&copy; 2025 CR PRO RAILING. All rights reserved.</p>
            <p className="mt-2 md:mt-0">
              Website Developed by{' '}
              <a 
                href="https://www.idesign4u.in" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-amber-400 hover:text-amber-300 transition-colors font-medium"
              >
                www.idesign4u.in
              </a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;