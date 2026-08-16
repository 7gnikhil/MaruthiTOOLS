import React, { useEffect, useRef } from 'react';
import { Page } from '../types';
import { MOCK_PRODUCTS_DB, MOCK_SERVICES_DB } from '../api/mock-data';

interface HomePageProps {
  setCurrentPage: (page: Page) => void;
}

// ── Stats counter ───────────────────────────────────────────────
const stats = [
  { value: '8+', label: 'Years of Experience' },
  { value: '500+', label: 'Moulds Delivered' },
  { value: '50+', label: 'Clients Served' },
  { value: '100%', label: 'Quality Assured' },
];

// ── Industry sectors ────────────────────────────────────────────
const sectors = [
  {
    icon: '💊',
    title: 'Pharmaceutical',
    desc: 'Precision moulds for syringe barrels, vial closures & pharma-grade components.',
  },
  {
    icon: '🏭',
    title: 'Packaging',
    desc: 'High-cavitation cap, closure and container moulds for FMCG packaging.',
  },
  {
    icon: '🚗',
    title: 'Automotive',
    desc: 'Complex 2K/3K moulds for dashboard and structural automotive parts.',
  },
  {
    icon: '⚡',
    title: 'Industrial',
    desc: 'Robust enclosure, connector and housing moulds for industrial applications.',
  },
];

// ── Why choose us ───────────────────────────────────────────────
const whyUs = [
  { icon: '🎯', title: 'Sub-Micron Precision', desc: 'CNC milling and EDM machining to tolerances of ±0.005 mm.' },
  { icon: '🔧', title: 'In-House Toolroom', desc: 'Full toolroom capability — design, machining, polishing, assembly under one roof.' },
  { icon: '⏱️', title: 'On-Time Delivery', desc: 'Rigorous project tracking ensures every mould ships on schedule.' },
  { icon: '✅', title: 'ISO-Grade Quality', desc: 'Every mould undergoes dimensional checks before dispatch.' },
  { icon: '🤝', title: 'Client-First Approach', desc: 'We work as an extension of your team with full transparency.' },
  { icon: '🔁', title: 'Mould Maintenance', desc: 'Ongoing repair and maintenance to maximise the life of your tooling.' },
];

const HomePage: React.FC<HomePageProps> = ({ setCurrentPage }) => {
  const featuredMoulds = MOCK_PRODUCTS_DB.filter(p => p.category === 'Mould').slice(0, 4);
  const heroRef = useRef<HTMLDivElement>(null);

  // Parallax on hero
  useEffect(() => {
    const handleScroll = () => {
      if (heroRef.current) {
        heroRef.current.style.transform = `translateY(${window.scrollY * 0.35}px)`;
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="bg-white">

      {/* ── HERO ─────────────────────────────────────────────── */}
      <section className="relative h-[92vh] min-h-[600px] flex items-center overflow-hidden bg-[#05101f]">
        {/* Parallax bg */}
        <div
          ref={heroRef}
          className="absolute inset-0 bg-cover bg-center opacity-30"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1565043589221-1a6fd9ae45c7?w=1600&q=80')" }}
        />
        {/* Blue gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#05101f] via-[#05101fcc] to-transparent" />

        <div className="relative z-10 container mx-auto px-6 md:px-16">
          <p className="text-blue-400 font-semibold uppercase tracking-widest text-sm mb-4">
            Precision Plastic Injection Mould Manufacturer
          </p>
          <h1 className="text-5xl md:text-7xl font-extrabold text-white leading-tight mb-6 max-w-3xl">
            Engineering<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">
              Precision
            </span>{' '}
            Moulds
          </h1>
          <p className="text-gray-300 text-lg md:text-xl max-w-xl mb-10 leading-relaxed">
            8+ years of expertise in high-cavitation, 2K/3K and pharma-grade injection
            moulds — manufactured in our state-of-the-art facility in Hyderabad.
          </p>
          <div className="flex flex-wrap gap-4">
            <button
              onClick={() => setCurrentPage('Contact Us')}
              className="bg-blue-600 hover:bg-blue-500 text-white font-bold px-8 py-4 rounded-xl transition-all duration-200 shadow-lg shadow-blue-900/40"
            >
              Get a Quote
            </button>
            <button
              onClick={() => setCurrentPage('Products')}
              className="border border-white/30 hover:border-blue-400 text-white font-semibold px-8 py-4 rounded-xl transition-all duration-200 backdrop-blur-sm"
            >
              View Our Moulds →
            </button>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-blue-400 animate-bounce">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </section>

      {/* ── STATS BAR ────────────────────────────────────────── */}
      <section className="bg-blue-700 py-10">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center text-white">
            {stats.map((s) => (
              <div key={s.label}>
                <p className="text-4xl font-extrabold">{s.value}</p>
                <p className="text-blue-200 text-sm mt-1 font-medium">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── ABOUT STRIP ──────────────────────────────────────── */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <p className="text-blue-600 font-semibold uppercase tracking-widest text-sm mb-3">About Us</p>
              <h2 className="text-4xl font-bold text-gray-900 mb-6 leading-tight">
                Maruthi Toolings —<br />Your Trusted Mould Partner
              </h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                Based in Hyderabad, we have been manufacturing high-precision plastic injection
                moulds for over 8 years. Our facility houses state-of-the-art CNC machining
                centres, EDM machines and a dedicated quality lab.
              </p>
              <p className="text-gray-600 leading-relaxed mb-8">
                From a simple prototype to a 64-cavity pharma mould, we deliver end-to-end
                tooling solutions with a commitment to precision, on-time delivery, and
                transparent communication.
              </p>
              <button
                onClick={() => setCurrentPage('About Us')}
                className="inline-flex items-center gap-2 text-blue-600 font-semibold hover:text-blue-800 transition"
              >
                Learn More About Us
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </button>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {whyUs.slice(0, 4).map((w) => (
                <div key={w.title} className="bg-gray-50 rounded-2xl p-5 border border-gray-100 hover:border-blue-200 hover:shadow-md transition-all">
                  <div className="text-3xl mb-3">{w.icon}</div>
                  <h3 className="font-bold text-gray-800 mb-1 text-sm">{w.title}</h3>
                  <p className="text-xs text-gray-500 leading-relaxed">{w.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── SECTORS ──────────────────────────────────────────── */}
      <section className="py-20 bg-[#05101f]">
        <div className="container mx-auto px-6">
          <div className="text-center mb-14">
            <p className="text-blue-400 font-semibold uppercase tracking-widest text-sm mb-2">Industries We Serve</p>
            <h2 className="text-4xl font-bold text-white">Solutions for Every Sector</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {sectors.map((s) => (
              <div
                key={s.title}
                className="group bg-white/5 hover:bg-blue-600 border border-white/10 hover:border-blue-500 rounded-2xl p-8 transition-all duration-300 cursor-default"
              >
                <div className="text-4xl mb-4">{s.icon}</div>
                <h3 className="text-white font-bold text-lg mb-2">{s.title}</h3>
                <p className="text-gray-400 group-hover:text-white text-sm leading-relaxed transition-colors">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FEATURED MOULDS ──────────────────────────────────── */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-12 gap-4">
            <div>
              <p className="text-blue-600 font-semibold uppercase tracking-widest text-sm mb-2">Our Work</p>
              <h2 className="text-4xl font-bold text-gray-900">Featured Moulds</h2>
            </div>
            <button
              onClick={() => setCurrentPage('Moulds')}
              className="inline-flex items-center gap-2 bg-blue-600 text-white font-semibold px-6 py-3 rounded-xl hover:bg-blue-700 transition"
            >
              View All Moulds
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredMoulds.map((p) => (
              <div
                key={p._id}
                onClick={() => setCurrentPage('Moulds')}
                className="group bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden cursor-pointer hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
              >
                <div className="h-44 bg-gray-50 overflow-hidden">
                  <img
                    src={p.imageUrl}
                    alt={p.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    onError={(e) => { (e.target as HTMLImageElement).src = '/images/placeholder-mould.svg'; }}
                  />
                </div>
                <div className="p-4">
                  <h3 className="text-sm font-bold text-gray-800 line-clamp-2 leading-snug">{p.name.trim()}</h3>
                  <p className="text-xs text-gray-400 mt-1 line-clamp-2">{p.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SERVICES STRIP ───────────────────────────────────── */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-14">
            <p className="text-blue-600 font-semibold uppercase tracking-widest text-sm mb-2">What We Do</p>
            <h2 className="text-4xl font-bold text-gray-900">Our Services</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            {MOCK_SERVICES_DB.map((s) => (
              <div key={s._id} className="flex gap-5 p-6 rounded-2xl border border-gray-100 hover:border-blue-200 hover:shadow-md transition-all">
                <div className="flex-shrink-0 w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center">
                  <div className="w-6 h-6 text-blue-600">
                    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M11.42 15.17L17.25 21A2.652 2.652 0 0021 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.528-1.036.94-2.197 1.088-3.386l-.738-2.152M11.42 15.17L6.873 20.717a2.625 2.625 0 003.712 3.712L15 9.75" />
                    </svg>
                  </div>
                </div>
                <div>
                  <h3 className="font-bold text-gray-800 mb-1">{s.title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">{s.description}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-10">
            <button
              onClick={() => setCurrentPage('Services')}
              className="inline-flex items-center gap-2 border border-blue-600 text-blue-600 font-semibold px-8 py-3 rounded-xl hover:bg-blue-600 hover:text-white transition"
            >
              All Services →
            </button>
          </div>
        </div>
      </section>

      {/* ── WHY US (full list) ────────────────────────────────── */}
      <section className="py-20 bg-blue-700">
        <div className="container mx-auto px-6">
          <div className="text-center mb-14">
            <p className="text-blue-200 font-semibold uppercase tracking-widest text-sm mb-2">Why Choose Us</p>
            <h2 className="text-4xl font-bold text-white">What Sets Us Apart</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {whyUs.map((w) => (
              <div key={w.title} className="flex gap-4 bg-white/10 rounded-2xl p-6 border border-white/10">
                <div className="text-2xl flex-shrink-0">{w.icon}</div>
                <div>
                  <h3 className="font-bold text-white mb-1">{w.title}</h3>
                  <p className="text-blue-100 text-sm leading-relaxed">{w.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA BANNER ───────────────────────────────────────── */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="bg-gradient-to-r from-blue-600 to-cyan-600 rounded-3xl p-12 text-center">
            <h2 className="text-4xl font-extrabold text-white mb-4">
              Have a Mould Requirement?
            </h2>
            <p className="text-blue-100 text-lg mb-8 max-w-xl mx-auto">
              Send us your design or describe your requirements — we'll get back to you within 24 hours.
            </p>
            <button
              onClick={() => setCurrentPage('Contact Us')}
              className="bg-white text-blue-700 font-bold px-10 py-4 rounded-xl hover:bg-blue-50 transition-all shadow-xl text-lg"
            >
              Contact Us Today
            </button>
          </div>
        </div>
      </section>

    </div>
  );
};

export default HomePage;
