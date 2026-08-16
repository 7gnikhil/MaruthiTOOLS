import React, { useState, useEffect } from 'react';
import { Page } from '../types';
import { NAV_LINKS_LEFT, NAV_LINKS_RIGHT } from '../constants';

interface HeaderProps {
  currentPage: Page;
  setCurrentPage: (page: Page) => void;
}

const Header: React.FC<HeaderProps> = ({ currentPage, setCurrentPage }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const NavLink: React.FC<{ pageName: Page }> = ({ pageName }) => (
    <button
      onClick={() => { setCurrentPage(pageName); setMobileOpen(false); }}
      className={`relative px-3 py-2 text-sm font-medium transition-colors duration-200 group ${
        currentPage === pageName ? 'text-blue-600' : 'text-gray-700 hover:text-blue-600'
      }`}
    >
      {pageName}
      <span className={`absolute bottom-0 left-0 h-0.5 bg-blue-600 transition-all duration-300 ${
        currentPage === pageName ? 'w-full' : 'w-0 group-hover:w-full'
      }`} />
    </button>
  );

  return (
    <header className={`sticky top-0 z-50 transition-all duration-300 ${
      scrolled
        ? 'bg-white shadow-lg border-b border-gray-100'
        : 'bg-white/95 backdrop-blur-md shadow-sm'
    }`}>
      {/* Top bar */}
      <div className="bg-blue-700 text-white text-xs py-1.5 hidden md:block">
        <div className="container mx-auto px-6 flex justify-between items-center">
          <span>📍 A-42/3, Rd Number 9, IDA Kukatpally, Hyderabad</span>
          <span>📞 +91 70951 70416 &nbsp;|&nbsp; ✉️ marutitooling@gmail.com</span>
        </div>
      </div>

      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between py-3">

          {/* ── LOGO ───────────────────────────────────────── */}
          <button
            onClick={() => { setCurrentPage('Home'); setMobileOpen(false); }}
            className="flex items-center group"
            aria-label="Go to homepage"
          >
            {/* Company logo image — file: frontend/public/images/logo.png */}
            <img
              src="/images/logo.png"
              alt="Maruthi Toolings"
              className="h-12 w-auto object-contain group-hover:opacity-90 transition-opacity duration-200"
              onError={(e) => {
                // Fallback text if logo.png not found yet
                (e.target as HTMLImageElement).style.display = 'none';
                const parent = (e.target as HTMLImageElement).parentElement;
                if (parent && !parent.querySelector('.logo-fallback')) {
                  const el = document.createElement('div');
                  el.className = 'logo-fallback flex flex-col leading-none';
                  el.innerHTML = '<span class="text-lg font-extrabold text-gray-900">Maruthi</span><span class="text-xs font-semibold text-blue-600 tracking-widest uppercase">Toolings</span>';
                  parent.appendChild(el);
                }
              }}
            />
          </button>

          {/* ── DESKTOP NAV ────────────────────────────────── */}
          <nav className="hidden lg:flex items-center gap-1">
            {NAV_LINKS_LEFT.map(link => <NavLink key={link} pageName={link} />)}
            <div className="w-px h-5 bg-gray-200 mx-2" />
            {NAV_LINKS_RIGHT.map(link => <NavLink key={link} pageName={link} />)}
          </nav>

          {/* ── CTA + Hamburger ────────────────────────────── */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setCurrentPage('Contact Us')}
              className="hidden md:inline-flex items-center bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold px-5 py-2 rounded-xl transition-all duration-200"
            >
              Get a Quote
            </button>
            <button
              className="lg:hidden p-2 rounded-lg text-gray-600 hover:bg-gray-100"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle menu"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {mobileOpen
                  ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* ── MOBILE MENU ──────────────────────────────────── */}
      {mobileOpen && (
        <div className="lg:hidden border-t border-gray-100 bg-white px-6 py-4 space-y-1">
          {[...NAV_LINKS_LEFT, ...NAV_LINKS_RIGHT].map(link => (
            <button
              key={link}
              onClick={() => { setCurrentPage(link); setMobileOpen(false); }}
              className={`block w-full text-left px-3 py-2.5 rounded-lg text-sm font-medium transition ${
                currentPage === link
                  ? 'bg-blue-50 text-blue-700'
                  : 'text-gray-700 hover:bg-gray-50'
              }`}
            >
              {link}
            </button>
          ))}
          <div className="pt-2">
            <button
              onClick={() => { setCurrentPage('Contact Us'); setMobileOpen(false); }}
              className="w-full bg-blue-600 text-white font-semibold py-2.5 rounded-xl"
            >
              Get a Quote
            </button>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
