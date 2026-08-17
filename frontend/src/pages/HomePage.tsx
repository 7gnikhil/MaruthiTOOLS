import React, { useState, useEffect, useRef } from 'react';
import { Page } from '../types';
import { MOCK_PRODUCTS_DB, MOCK_SERVICES_DB } from '../api/mock-data';

interface HomePageProps {
  setCurrentPage: (page: Page) => void;
}

// ── Hero background slides ──────────────────────────────────────
const HERO_SLIDES = [
  '/images/cnc-cosmos-cvm1060.png',
  '/images/cnc-ams-mcv400.png',
  '/images/edm-hero-2.png',
  '/images/toolroom-facility-4.png',
];

// ── Stats counter ───────────────────────────────────────────────
const stats = [
  { value: '25+', label: 'Years of Experience' },
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
    desc: 'Moulds for dashboard and structural automotive parts.',
  },
  {
    icon: '⚡',
    title: 'Industrial',
    desc: 'Robust enclosure, connector and housing moulds for industrial applications.',
  },
  {
    icon: '🌾',
    title: 'Agro',
    desc: 'High-durability precision moulds for agricultural sprayers, drip irrigation fittings & agrochemical containers.',
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
  const [scrollY, setScrollY] = useState(0);
  const [isGlowing, setIsGlowing] = useState(false);
  const [activeSlide, setActiveSlide] = useState(0);

  // Auto-play hero background slideshow loop (5s crossfade)
  useEffect(() => {
    const slideTimer = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 5000);
    return () => clearInterval(slideTimer);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
      if (heroRef.current) {
        heroRef.current.style.transform = `translateY(${window.scrollY * 0.35}px)`;
      }
    };

    const handleCompanyNameClick = () => {
      setIsGlowing(true);
      setTimeout(() => setIsGlowing(false), 1200);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('company-name-click', handleCompanyNameClick);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('company-name-click', handleCompanyNameClick);
    };
  }, []);

  // Dynamic transition parameters based on scroll down
  const headingOpacity = Math.max(0, 1 - scrollY / 160);
  const headingTranslateY = -Math.min(scrollY * 0.5, 60);
  const headingScale = Math.max(0.85, 1 - scrollY / 600);

  return (
    <div className="bg-white pt-16">

      {/* ── HERO BANNER ───────────────────────────────────────── */}
      <section className="relative h-[92vh] min-h-[600px] flex items-center overflow-hidden bg-[#05101f]">
        
        {/* Clean Fading Background Slideshow (No text overlay box) */}
        <div ref={heroRef} className="absolute inset-0 transition-transform duration-300">
          {HERO_SLIDES.map((url, idx) => (
            <div
              key={url}
              className={`absolute inset-0 bg-cover bg-center transition-opacity duration-1000 ease-in-out ${
                activeSlide === idx ? 'opacity-40 scale-105' : 'opacity-0 scale-100'
              }`}
              style={{
                backgroundImage: `url('${url}')`,
                transitionProperty: 'opacity, transform',
              }}
            />
          ))}
        </div>

        {/* Dark Blue gradient overlay for maximum text readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#05101f] via-[#05101fe6] to-[#05101f66]" />

        <div className="relative z-10 container mx-auto px-6 md:px-16">
          
          {/* ── COMPANY NAME TRANSITION ── */}
          <div
            id="hero-company-heading"
            className={`transition-all duration-500 ease-out origin-left mb-6 ${
              isGlowing ? 'scale-105 filter drop-shadow-[0_0_25px_rgba(59,130,246,0.8)]' : ''
            }`}
            style={{
              opacity: headingOpacity,
              transform: `translateY(${headingTranslateY}px) scale(${headingScale})`,
            }}
          >
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/20 border border-blue-400/30 text-cyan-300 text-xs font-extrabold uppercase tracking-widest mb-3 backdrop-blur-md">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse"></span>
              Precision Plastic Injection Moulding
            </div>
            
            <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black text-white leading-tight tracking-tight">
              MARUTHI{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-300 to-white">
                TOOLINGS
              </span>
            </h1>
          </div>

          <h2 className="text-2xl md:text-4xl font-bold text-gray-200 mb-6 max-w-3xl leading-snug">
            Precision Injection Moulds 
          </h2>

          <p className="text-gray-300 text-lg md:text-xl max-w-xl mb-10 leading-relaxed">
            25+ years of expertise in Injection Moulds, Compression Moulds— manufactured in our facility in Hyderabad.
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

      {/* ── SECTION 1: ABOUT SNAPSHOT (ALIGNED TO THE LEFT ON INITIAL SCROLL) ── */}
      <section className="py-20 bg-white border-b border-gray-100">
        <div className="container mx-auto px-6 md:px-16">
          <div className="max-w-3xl text-left">
            <span className="text-blue-600 font-extrabold uppercase tracking-widest text-xs mb-2 block">
              About Maruthi Toolings
            </span>
            <h2 className="text-3xl md:text-5xl font-black text-gray-900 mb-6 leading-tight">
              25+ Years of Engineering Excellence
            </h2>
            <p className="text-gray-600 text-lg md:text-xl leading-relaxed mb-6">
              Based in Hyderabad, we have been manufacturing high-precision plastic injection
              moulds with experience of over 25+ years. Our facility houses state-of-the-art CNC machining
              centres, EDM machines and a dedicated quality ToolRoom.
            </p>
            <p className="text-gray-600 text-base md:text-lg leading-relaxed mb-8">
              From a simple prototype to a 48-cavity Caps & Closures mould, we deliver end-to-end
              tooling solutions with a commitment to precision, on-time delivery, and
              transparent communication.
            </p>
            <button
              onClick={() => setCurrentPage('About Us')}
              className="inline-flex items-center gap-2 bg-blue-50 text-blue-600 hover:bg-blue-600 hover:text-white border border-blue-200 font-bold px-6 py-3.5 rounded-xl transition duration-300 shadow-sm"
            >
              Read Full Company History →
            </button>
          </div>
        </div>
      </section>

      {/* ── SECTION 2: WHY CHOOSE US (ALIGNED TO THE RIGHT ON FURTHER SCROLL) ── */}
      <section className="py-20 bg-gray-50 border-b border-gray-100">
        <div className="container mx-auto px-6 md:px-16">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            
            {/* Feature Cards on Left */}
            <div className="grid grid-cols-2 gap-4 order-2 md:order-1">
              {whyUs.slice(0, 4).map((w) => (
                <div key={w.title} className="bg-white rounded-2xl p-5 border border-gray-200 shadow-sm hover:border-blue-300 hover:shadow-md transition-all">
                  <div className="text-3xl mb-3">{w.icon}</div>
                  <h3 className="font-bold text-gray-800 mb-1 text-sm">{w.title}</h3>
                  <p className="text-xs text-gray-500 leading-relaxed">{w.desc}</p>
                </div>
              ))}
            </div>

            {/* Main Text Content Aligned to the RIGHT */}
            <div className="text-left md:text-right order-1 md:order-2">
              <span className="text-blue-600 font-extrabold uppercase tracking-widest text-xs mb-2 block">
                Our Advantage
              </span>
              <h2 className="text-3xl md:text-5xl font-black text-gray-900 mb-6 leading-tight">
                Why Partner With Us?
              </h2>
              <p className="text-gray-600 text-base md:text-lg leading-relaxed mb-8">
                We combine decades of hands-on mould-making experience with modern CNC and EDM machinery to ensure your tooling runs reliably from day one.
              </p>
              <button
                onClick={() => setCurrentPage('Contact Us')}
                className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-8 py-4 rounded-xl transition inline-flex items-center gap-2 shadow-lg shadow-blue-600/30"
              >
                Discuss Your Project
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </button>
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
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
            {sectors.map((s) => (
              <div
                key={s.title}
                className="group bg-white/5 hover:bg-blue-600 border border-white/10 hover:border-blue-500 rounded-2xl p-6 transition-all duration-300 cursor-default"
              >
                <div className="text-4xl mb-4">{s.icon}</div>
                <h3 className="text-white font-bold text-lg mb-2">{s.title}</h3>
                <p className="text-gray-400 group-hover:text-white text-xs leading-relaxed transition-colors">{s.desc}</p>
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
                <div className="h-48 bg-white overflow-hidden p-3 flex items-center justify-center border-b border-gray-100">
                  <img
                    src={p.imageUrl}
                    alt={p.name}
                    className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-500"
                    onError={(e) => { (e.target as HTMLImageElement).src = '/images/placeholder-mould.svg'; }}
                  />
                </div>
                <div className="p-4">
                  <h3 className="text-sm font-bold text-gray-800 line-clamp-2 leading-snug">{p.name.trim()}</h3>
                  <p className="text-xs text-gray-500 mt-1 line-clamp-2">{p.description}</p>
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
                  <p className="text-xs text-gray-500 leading-relaxed">{s.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA BANNER ───────────────────────────────────────── */}
      <section className="bg-gradient-to-r from-blue-900 via-blue-800 to-slate-900 text-white py-16">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Start Your Mould Project?</h2>
          <p className="text-blue-200 max-w-xl mx-auto mb-8 text-base">
            Contact our engineering team today for technical advice, feasibility feedback, or a competitive quote.
          </p>
          <button
            onClick={() => setCurrentPage('Contact Us')}
            className="bg-white text-blue-900 font-bold px-8 py-4 rounded-xl hover:bg-blue-50 transition shadow-xl text-base"
          >
            Request a Free Quote
          </button>
        </div>
      </section>

    </div>
  );
};

export default HomePage;
