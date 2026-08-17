import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Product as ProductType } from '../types';

const SLIDE_INTERVAL_MS = 4500;

interface SlideshowProps {
  products: ProductType[];
  sectionTitle: string;
  subtitle?: string;
  accentColor?: string;
  onSelectProduct?: (product: ProductType) => void;
  hideTextOverlay?: boolean;
}

const ProductSlideshow: React.FC<SlideshowProps> = ({
  products,
  sectionTitle,
  subtitle,
  accentColor = 'text-blue-400',
  onSelectProduct,
  hideTextOverlay = false,
}) => {
  const [current, setCurrent] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [paused, setPaused] = useState(false);
  const [transitioning, setTransitioning] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold: 0.2 }
    );
    if (wrapperRef.current) observer.observe(wrapperRef.current);
    return () => observer.disconnect();
  }, []);

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

  return (
    <section className="mb-14" ref={wrapperRef}>
      {/* Section Header */}
      <div className="flex items-center justify-between gap-4 mb-4">
        <div>
          <h2 className="text-xl md:text-2xl font-black text-gray-900 tracking-tight">{sectionTitle}</h2>
          {subtitle && <p className="text-xs text-gray-500 mt-0.5 font-medium">{subtitle}</p>}
        </div>
        <div className="flex items-center gap-3">
          <span className="text-xs font-bold bg-slate-900 text-cyan-400 px-3 py-1 rounded-full border border-slate-700 shadow-sm">
            {String(current + 1).padStart(2, '0')} / {String(products.length).padStart(2, '0')}
          </span>
        </div>
      </div>

      {/* Main Slideshow Viewport */}
      <div
        className={`relative overflow-hidden rounded-3xl shadow-2xl group border border-slate-800
                    transition-all duration-700 ease-out bg-gradient-to-b from-slate-950 via-slate-900 to-black
                    h-[280px] sm:h-[340px] md:h-[400px] lg:h-[440px] landscape:h-[260px] sm:landscape:h-[340px]
                    ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-[0.98]'}`}
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        {/* Main Image with Ken Burns Slow Zoom Effect */}
        <div
          className="absolute inset-0 flex items-center justify-center p-4 cursor-pointer overflow-hidden"
          onClick={(e) => {
            e.stopPropagation();
            onSelectProduct?.(slide);
          }}
          title="Click image to expand in Special View"
        >
          <img
            key={current}
            src={slide.imageUrl}
            alt={slide.name}
            className={`w-full h-full object-contain transition-opacity duration-500 ease-out
                        ${transitioning ? 'opacity-0 blur-sm' : 'opacity-100'}`}
            style={{
              animation: transitioning ? 'none' : `kenBurns ${SLIDE_INTERVAL_MS}ms ease-out forwards`,
            }}
            onError={(e) => { (e.target as HTMLImageElement).src = '/images/mould1.jpg'; }}
          />
        </div>

        {/* Text Overlay (Only if not hidden) */}
        {!hideTextOverlay && (
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-slate-950 via-slate-950/80 to-transparent p-6 pointer-events-none">
            <span className="inline-block text-[10px] font-extrabold uppercase tracking-widest px-2.5 py-0.5 rounded-full mb-1.5 bg-blue-500/20 text-cyan-300 border border-cyan-400/30">
              {slide.category}
            </span>
            <h3 className="text-lg md:text-xl font-extrabold text-white leading-snug">
              {slide.name}
            </h3>
            <p className="text-gray-300 text-xs mt-1 line-clamp-1">
              {slide.description}
            </p>
          </div>
        )}

        {/* Prev / Next Floating Navigation Arrows */}
        {products.length > 1 && (
          <>
            <button
              onClick={(e) => {
                e.stopPropagation();
                prev();
              }}
              className="absolute left-4 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full
                         bg-slate-900/80 hover:bg-blue-600 text-white border border-white/20 shadow-xl
                         backdrop-blur-md flex items-center justify-center transition-all duration-200
                         hover:scale-110 active:scale-95 z-20"
              aria-label="Previous Mould Image"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            <button
              onClick={(e) => {
                e.stopPropagation();
                next();
              }}
              className="absolute right-4 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full
                         bg-slate-900/80 hover:bg-blue-600 text-white border border-white/20 shadow-xl
                         backdrop-blur-md flex items-center justify-center transition-all duration-200
                         hover:scale-110 active:scale-95 z-20"
              aria-label="Next Mould Image"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </>
        )}

        {/* Smooth Bottom Progress Bar */}
        {!paused && products.length > 1 && (
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/10 z-10">
            <div
              className="h-full bg-gradient-to-r from-blue-500 via-cyan-400 to-blue-500"
              style={{
                animation: `progressBar ${SLIDE_INTERVAL_MS}ms linear infinite`,
              }}
            />
          </div>
        )}
      </div>

      {/* Clean Dot Indicators */}
      {products.length > 1 && (
        <div className="mt-3 flex items-center justify-center gap-2">
          {products.map((_, i) => (
            <button
              key={i}
              onClick={(e) => {
                e.stopPropagation();
                goTo(i);
              }}
              className={`rounded-full transition-all duration-300 ${
                i === current
                  ? 'w-6 h-2 bg-blue-600 shadow-sm'
                  : 'w-2 h-2 bg-gray-300 hover:bg-blue-400'
              }`}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>
      )}

      <style>{`
        @keyframes kenBurns {
          0% {
            transform: scale(1);
          }
          100% {
            transform: scale(1.08);
          }
        }
        @keyframes progressBar {
          from { width: 0%; }
          to   { width: 100%; }
        }
      `}</style>
    </section>
  );
};

export default ProductSlideshow;
