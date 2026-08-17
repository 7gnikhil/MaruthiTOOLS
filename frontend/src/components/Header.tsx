import React, { useState, useEffect } from 'react';
import { Page } from '../types';
import { NAV_LINKS_LEFT, NAV_LINKS_RIGHT } from '../constants';

interface HeaderProps {
  currentPage: Page;
  setCurrentPage: (page: Page) => void;
}

const Header: React.FC<HeaderProps> = ({ currentPage, setCurrentPage }) => {
  const [scrolled, setScrolled] = useState(false);
  const [visible, setVisible] = useState(true);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [transitioningLogo, setTransitioningLogo] = useState(false);

  useEffect(() => {
    let lastScrollY = window.scrollY;

    const onScroll = () => {
      const currentScrollY = window.scrollY;

      // Header style change on scroll past 20px
      setScrolled(currentScrollY > 20);

      // Total navbar scroll hide / show logic (Requirement 4)
      if (currentScrollY <= 20) {
        setVisible(true); // Always visible at top
      } else {
        if (currentScrollY > lastScrollY && currentScrollY - lastScrollY > 4) {
          // Scrolling down -> hide navbar completely
          setVisible(false);
        } else if (lastScrollY - currentScrollY > 4) {
          // Scrolling up -> show navbar
          setVisible(true);
        }
      }

      lastScrollY = currentScrollY;
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleCompanyNameClick = () => {
    setMobileOpen(false);
    setTransitioningLogo(true);

    if (currentPage === 'Home') {
      // Scroll smoothly to top so hero company heading comes into full view
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      setCurrentPage('Home');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    // Trigger transition event for HomePage hero heading
    window.dispatchEvent(new CustomEvent('company-name-click'));

    setTimeout(() => {
      setTransitioningLogo(false);
    }, 800);
  };

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
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out ${
        visible ? 'translate-y-0' : '-translate-y-full pointer-events-none'
      } ${
        scrolled
          ? 'bg-white/95 backdrop-blur-md shadow-lg border-b border-gray-100'
          : 'bg-white/95 backdrop-blur-md shadow-sm'
      }`}
    >
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between py-3">

          {/* ── LOGO / COMPANY NAME (Requirement 5) ─────────── */}
          <button
            onClick={handleCompanyNameClick}
            className={`flex items-center gap-3 group transition-transform duration-300 ${
              transitioningLogo ? 'scale-105 opacity-90' : 'scale-100'
            }`}
            aria-label="Go to homepage and feature company name"
          >
            {/* Logo Image */}
            <img
              src="/images/logo.png"
              alt="Maruthi Toolings"
              className="h-10 w-auto object-contain group-hover:scale-105 transition-transform duration-200"
              onError={(e) => {
                (e.target as HTMLImageElement).style.display = 'none';
              }}
            />
            {/* Company Name Text (Navbar Header Title) */}
            <div className="flex flex-col leading-none text-left">
              <span className="text-lg font-black text-gray-900 group-hover:text-blue-600 transition-colors tracking-tight">
                MARUTHI
              </span>
              <span className="text-[10px] font-extrabold text-blue-600 tracking-widest uppercase">
                TOOLINGS
              </span>
            </div>
          </button>

          {/* ── DESKTOP NAV ────────────────────────────────── */}
          <nav className="hidden lg:flex items-center gap-1">
            {NAV_LINKS_LEFT.map(link => <NavLink key={link} pageName={link} />)}
            <div className="w-px h-5 bg-gray-200 mx-2" />
            {NAV_LINKS_RIGHT.map(link => <NavLink key={link} pageName={link} />)}
          </nav>

          {/* ── CTA + Mobile Toggle ────────────────────────── */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setCurrentPage('Contact Us')}
              className="hidden md:inline-flex items-center bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold px-5 py-2 rounded-xl transition-all duration-200 shadow-md shadow-blue-600/20"
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
        <div className="lg:hidden border-t border-gray-100 bg-white px-6 py-4 space-y-1 shadow-xl">
          {[...NAV_LINKS_LEFT, ...NAV_LINKS_RIGHT].map(link => (
            <button
              key={link}
              onClick={() => { setCurrentPage(link); setMobileOpen(false); }}
              className={`block w-full text-left px-3 py-2.5 rounded-lg text-sm font-medium transition ${
                currentPage === link
                  ? 'bg-blue-50 text-blue-700 font-bold'
                  : 'text-gray-700 hover:bg-gray-50'
              }`}
            >
              {link}
            </button>
          ))}
          <div className="pt-2">
            <button
              onClick={() => { setCurrentPage('Contact Us'); setMobileOpen(false); }}
              className="w-full bg-blue-600 text-white font-semibold py-2.5 rounded-xl shadow-md"
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
