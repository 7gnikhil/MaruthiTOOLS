import React, { useState } from 'react';
import { Product } from '../types';

interface SpecialMouldViewProps {
  product: Product;
  allMoulds: Product[];
  onSelectMould: (mould: Product) => void;
}

const SpecialMouldView: React.FC<SpecialMouldViewProps> = ({
  product,
  allMoulds,
  onSelectMould,
}) => {
  const currentIndex = allMoulds.findIndex(m => m._id === product._id);
  const safeIndex = currentIndex >= 0 ? currentIndex : 0;

  const handlePrev = () => {
    const prevIdx = (safeIndex - 1 + allMoulds.length) % allMoulds.length;
    onSelectMould(allMoulds[prevIdx]);
  };

  const handleNext = () => {
    const nextIdx = (safeIndex + 1) % allMoulds.length;
    onSelectMould(allMoulds[nextIdx]);
  };

  return (
    <div
      id="special-mould-view"
      className="bg-slate-950 text-white rounded-3xl p-6 md:p-8 shadow-2xl border border-white/10 my-10 transition-all duration-500"
    >
      {/* ── MAIN PHOTO DISPLAY ── */}
      <div className="relative rounded-2xl overflow-hidden bg-gradient-to-b from-slate-900 via-slate-950 to-black border border-white/10 h-[300px] sm:h-[450px] md:h-[580px] lg:h-[640px] landscape:h-[280px] sm:landscape:h-[450px] flex items-center justify-center shadow-inner">
        <img
          key={product._id}
          src={product.imageUrl}
          alt="Mould Special View Photo"
          className="w-full h-full object-contain p-4 transition-all duration-500"
          onError={(e) => { (e.target as HTMLImageElement).src = '/images/mould1.jpg'; }}
        />

        {/* Counter badge */}
        <div className="absolute top-4 left-4 bg-black/70 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/15 text-xs font-semibold text-gray-200">
          Mould {safeIndex + 1} of {allMoulds.length}
        </div>

        {/* Prev / Next floating arrows directly on viewer */}
        {allMoulds.length > 1 && (
          <>
            <button
              onClick={handlePrev}
              className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-black/60 hover:bg-blue-600 border border-white/20 text-white flex items-center justify-center transition-all duration-200 hover:scale-110 active:scale-95 shadow-xl backdrop-blur-md z-10"
              aria-label="Previous Mould"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              onClick={handleNext}
              className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-black/60 hover:bg-blue-600 border border-white/20 text-white flex items-center justify-center transition-all duration-200 hover:scale-110 active:scale-95 shadow-xl backdrop-blur-md z-10"
              aria-label="Next Mould"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </>
        )}
      </div>

      {/* ── SINGLE CLEAN THUMBNAIL BAR ── */}
      {allMoulds.length > 1 && (
        <div className="mt-6">
          <div className="flex items-center gap-3 overflow-x-auto pb-2 justify-center">
            {allMoulds.map((m, idx) => {
              const isSelected = idx === safeIndex;
              return (
                <button
                  key={m._id}
                  onClick={() => onSelectMould(m)}
                  className={`relative w-20 h-16 rounded-xl border-2 overflow-hidden flex-shrink-0 transition-all duration-200 ${
                    isSelected
                      ? 'border-blue-500 scale-105 ring-2 ring-blue-500/50 opacity-100'
                      : 'border-white/10 opacity-50 hover:opacity-100 hover:border-white/30'
                  }`}
                >
                  <img src={m.imageUrl} alt={`Thumbnail ${idx + 1}`} className="w-full h-full object-cover" />
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default SpecialMouldView;
