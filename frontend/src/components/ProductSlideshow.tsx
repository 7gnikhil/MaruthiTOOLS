import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Product as ProductType } from '../types';

// ─────────────────────────────────────────────────────────────────
// ANATOMY — How to edit this slideshow:
//
// AUTO-PLAY SPEED   → Change `SLIDE_INTERVAL_MS` below (ms per slide)
// SLIDE COLOURS     → `CATEGORY_GRADIENT` map — change from/to colours
// IMAGE HEIGHT      → h-[60vh] on the img wrapper div
// ZOOM STRENGTH     → scale() value in the `style` prop of the img
// OVERLAY DARKNESS  → bg-black/XX on the gradient overlay div
// TRANSITION SPEED  → duration-700 on the img className
// DOT STYLE         → the `<button>` inside the dot map at the bottom
// ARROW ICONS       → SVG paths in the prev/next button elements
// TEXT POSITION     → the `absolute bottom-0` info panel
// ADD A NEW SLIDE   → add to the `products` array in mock-data.ts
// ─────────────────────────────────────────────────────────────────

const SLIDE_INTERVAL_MS = 4000; // ← Change auto-play speed here

const CATEGORY_GRADIENT: Record<string, string> = {
  'Mould':         'from-blue-900 to-blue-700',
  'CNC':           'from-purple-900 to-purple-700',
  'EDM':           'from-amber-900 to-amber-700',
  'End Component': 'from-emerald-900 to-emerald-700',
};

interface SlideshowProps {
  products: ProductType[];
  sectionTitle: string;
  subtitle?: string;
  accentColor?: string; // Tailwind text colour class e.g. 'text-blue-400'
}

const ProductSlideshow: React.FC<SlideshowProps> = ({
  products,
  sectionTitle,
  subtitle,
  accentColor = 'text-blue-400',
}) => {
  const [current, setCurrent] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [paused, setPaused] = useState(false);
  const [transitioning, setTransitioning] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // ── Scroll-triggered visibility (zoom-in effect) ──────────────
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold: 0.3 }
    );
    if (wrapperRef.current) observer.observe(wrapperRef.current);
    return () => observer.disconnect();
  }, []);

  // ── Auto-play ───────────────────────────────────────────────────
  const goTo = useCallback((index: number) => {
    if (transitioning) return;
    setTransitioning(true);
    setTimeout(() => {
      setCurrent(index);
      setTransitioning(false);
    }, 350);
  }, [transitioning]);

  const next = useCallback(() => goTo((current + 1) % products.length), [current, products.length, goTo]);
  const prev = useCallback(() => goTo((current - 1 + products.length) % products.length), [current, products.length, goTo]);

  useEffect(() => {
    if (paused || products.length <= 1) return;
    timerRef.current = setInterval(next, SLIDE_INTERVAL_MS);
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [next, paused, products.length]);

  if (!products.length) return null;

  const slide = products[current];
  const gradient = CATEGORY_GRADIENT[slide.category] || 'from-gray-900 to-gray-700';

  return (
    <section className="mb-20" ref={wrapperRef}>
      {/* Section heading */}
      <div className="flex items-center gap-4 mb-6 px-0">
        <div>
          <h2 className="text-xl md:text-2xl font-bold text-gray-800">{sectionTitle}</h2>
          {subtitle && <p className="text-sm text-gray-400 mt-0.5">{subtitle}</p>}
        </div>
        <div className="flex-1 h-px bg-gradient-to-r from-blue-200 to-transparent" />
        <span className={`text-xs font-semibold ${accentColor}`}>
          {current + 1} / {products.length}
        </span>
      </div>

      {/* Main slideshow viewport */}
      <div
        className={`relative overflow-hidden rounded-3xl shadow-2xl cursor-pointer
                    transition-all duration-700 ease-out
                    ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-[0.97]'}`}
        style={{ height: '60vh', minHeight: '360px', maxHeight: '520px' }}
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        {/* Background image with parallax zoom */}
        <div className="absolute inset-0 overflow-hidden">
          <img
            key={current}
            src={slide.imageUrl}
            alt={slide.name}
            className={`w-full h-full object-cover transition-all duration-700 ease-out
                        ${transitioning ? 'opacity-0 scale-110' : 'opacity-100'}
                        ${isVisible ? 'scale-105' : 'scale-100'}`}
            style={{
              // Extra zoom when scrolled into view
              transform: isVisible && !transitioning ? 'scale(1.06)' : 'scale(1)',
              transition: 'transform 1s ease-out, opacity 0.35s ease',
            }}
            onError={(e) => { (e.target as HTMLImageElement).src = '/images/placeholder-mould.svg'; }}
          />
        </div>

        {/* Dark gradient overlay */}
        <div className={`absolute inset-0 bg-gradient-to-t ${gradient} opacity-70`} />
        <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-transparent to-transparent" />

        {/* ── Left info panel ─────────────────────────────── */}
        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
          <div className="max-w-xl">
            <span className={`inline-block text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full mb-3
                             bg-white/15 backdrop-blur-sm text-white`}>
              {slide.category}
            </span>
            <h3 className="text-xl md:text-2xl font-bold text-white leading-snug mb-2">
              {slide.name.trim()}
            </h3>
            <p className="text-white/75 text-sm leading-relaxed line-clamp-2">
              {slide.description}
            </p>
          </div>
        </div>

        {/* ── Prev / Next arrows ───────────────────────────── */}
        {products.length > 1 && (
          <>
            <button
              onClick={prev}
              className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full
                         bg-white/15 hover:bg-white/30 backdrop-blur-sm text-white
                         flex items-center justify-center transition-all duration-200
                         hover:scale-110 active:scale-95"
              aria-label="Previous"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              onClick={next}
              className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full
                         bg-white/15 hover:bg-white/30 backdrop-blur-sm text-white
                         flex items-center justify-center transition-all duration-200
                         hover:scale-110 active:scale-95"
              aria-label="Next"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </>
        )}

        {/* ── Progress bar (auto-play indicator) ───────────── */}
        {!paused && products.length > 1 && (
          <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-white/20">
            <div
              className="h-full bg-white/70"
              style={{
                animation: `progressBar ${SLIDE_INTERVAL_MS}ms linear infinite`,
              }}
            />
          </div>
        )}
      </div>

      {/* ── Dot navigation + thumbnails ─────────────────────── */}
      {products.length > 1 && (
        <div className="mt-4 flex items-center justify-center gap-2">
          {products.map((p, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              title={p.name}
              className={`rounded-full transition-all duration-300 ${
                i === current
                  ? 'w-8 h-2.5 bg-blue-600'
                  : 'w-2.5 h-2.5 bg-gray-300 hover:bg-blue-300'
              }`}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>
      )}

      {/* CSS keyframe for progress bar */}
      <style>{`
        @keyframes progressBar {
          from { width: 0%; }
          to   { width: 100%; }
        }
      `}</style>
    </section>
  );
};

export default ProductSlideshow;
