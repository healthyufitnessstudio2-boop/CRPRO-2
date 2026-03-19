import React from 'react';
import { Shield, Award, Users, Target, Eye, Heart } from 'lucide-react';

const AboutPage = () => {
  return (
    <div className="min-h-screen bg-slate-50">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-slate-900 to-slate-800 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 animate-fade-in-up">
            About <span className="gradient-text">CR PRO RAILING</span>
          </h1>
          <p className="text-slate-300 text-lg max-w-3xl mx-auto">
            Leading manufacturer and supplier of premium aluminum, stainless steel, and glass railing systems
          </p>
        </div>
      </section>

      {/* Company Story */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="animate-slide-in-left">
                <h2 className="text-3xl font-bold text-slate-800 mb-6">
                  Crafting Excellence Since Our Inception
                </h2>
                <p className="text-slate-600 mb-4 leading-relaxed">
                  At CR PRO RAILING, we specialize in premium aluminum, stainless steel, and glass railings that blend design with durability. Each product reflects our commitment to innovation and aesthetic craftsmanship.
                </p>
                <p className="text-slate-600 mb-4 leading-relaxed">
                  We are perfectionists in introducing uniquely designed aluminum glass railing, modular railing, balcony railing, stainless steel balcony railing, glass stair railing, glass deck railing, and other railing solutions. Each piece in our portfolio excellently showcases the creativity of our designers, who put their imagination and strength into designing railings.
                </p>
                <p className="text-slate-600 leading-relaxed">
                  Our success is driven by reliable partnerships with architects, engineers, and contractors. We prioritize international standards and build lasting relationships with our valued clients.
                </p>
              </div>
              <div className="animate-slide-in-right">
                <img
                  src="https://images.unsplash.com/photo-1766156181041-0dc63ec093ff"
                  alt="CR PRO RAILING Workshop"
                  className="rounded-2xl shadow-2xl w-full"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-16 bg-gradient-to-br from-slate-50 to-slate-100">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-4">
              Our Core <span className="gradient-text">Values</span>
            </h2>
            <p className="text-slate-600 max-w-2xl mx-auto">
              The principles that guide our work and define our commitment to excellence
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[
              {
                icon: Target,
                title: 'Customized Solutions',
                desc: 'Tailored designs to meet your specific requirements and aesthetic preferences'
              },
              {
                icon: Shield,
                title: 'Durability & Safety Focus',
                desc: 'Engineered for maximum safety with materials that stand the test of time'
              },
              {
                icon: Award,
                title: 'Innovative Products',
                desc: 'Cutting-edge designs combining modern aesthetics with advanced functionality'
              },
              {
                icon: Users,
                title: 'End-to-End Support',
                desc: 'Comprehensive service from consultation to installation and after-sales support'
              },
              {
                icon: Eye,
                title: 'Quality Assurance',
                desc: 'Rigorous quality checks ensuring every product meets international standards'
              },
              {
                icon: Heart,
                title: 'Customer Satisfaction',
                desc: 'Dedicated to exceeding expectations and building long-term relationships'
              }
            ].map((value, idx) => (
              <div
                key={idx}
                className="bg-white p-6 rounded-xl shadow-lg hover-lift group"
              >
                <div className="w-14 h-14 bg-gradient-to-br from-amber-100 to-amber-200 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <value.icon className="w-7 h-7 text-amber-600" />
                </div>
                <h3 className="text-xl font-bold text-slate-800 mb-3">{value.title}</h3>
                <p className="text-slate-600 text-sm leading-relaxed">{value.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-8 text-center">
              Why Choose <span className="gradient-text">Us</span>
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              {[
                'ISO Certified Manufacturing',
                'Premium Quality Materials',
                'Expert Design Team',
                'Professional Installation',
                'Competitive Pricing',
                'Timely Project Delivery',
                'Lifetime Warranty',
                'Pan-India Service'
              ].map((item, idx) => (
                <div key={idx} className="flex items-center space-x-3 p-4 bg-slate-50 rounded-lg hover:bg-amber-50 transition-colors">
                  <div className="w-2 h-2 bg-amber-500 rounded-full"></div>
                  <span className="text-slate-700 font-medium">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-slate-900 to-slate-800 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Let's Build Something Amazing Together
          </h2>
          <p className="text-slate-300 text-lg mb-8 max-w-2xl mx-auto">
            Contact us today to discuss your project requirements and get a customized solution.
          </p>
          <a
            href="/contact"
            className="inline-block bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white px-8 py-4 rounded-lg font-semibold transition-all transform hover:scale-105"
          >
            Get in Touch
          </a>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;