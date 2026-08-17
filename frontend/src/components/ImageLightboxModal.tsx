import React, { useState, useEffect } from 'react';

interface ImageLightboxModalProps {
  images: string[];
  initialIndex?: number;
  onClose: () => void;
}

const ImageLightboxModal: React.FC<ImageLightboxModalProps> = ({
  images,
  initialIndex = 0,
  onClose,
}) => {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);

  useEffect(() => {
    setCurrentIndex(initialIndex);
  }, [initialIndex]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') goToPrev();
      if (e.key === 'ArrowRight') goToNext();
    };

    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [currentIndex, images.length]);

  const goToPrev = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  if (!images || images.length === 0) return null;

  return (
    <div
      className="fixed inset-0 z-50 bg-black/90 backdrop-blur-xl flex flex-col justify-between p-4 md:p-8 animate-fadeIn transition-all duration-300"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
    >
      {/* Top Bar with Counter & Close */}
      <div className="flex items-center justify-between text-white z-20" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center gap-3">
          <span className="text-xs md:text-sm font-bold bg-white/10 px-4 py-1.5 rounded-full border border-white/15 backdrop-blur-md">
            Mould Photo {currentIndex + 1} of {images.length}
          </span>
        </div>

        <button
          onClick={onClose}
          className="w-11 h-11 rounded-full bg-white/10 hover:bg-red-600 text-white flex items-center justify-center transition-all duration-200 hover:scale-110 active:scale-95 border border-white/20 backdrop-blur-md shadow-xl"
          aria-label="Close Lightbox"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      {/* Main Image Center Display */}
      <div
        className="relative flex-grow flex items-center justify-center my-4 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <img
          key={currentIndex}
          src={images[currentIndex]}
          alt={`Mould big view ${currentIndex + 1}`}
          className="max-h-[75vh] w-auto max-w-full object-contain rounded-2xl shadow-2xl transition-all duration-300 transform scale-100"
          onError={(e) => { (e.target as HTMLImageElement).src = '/images/mould1.jpg'; }}
        />

        {/* Previous & Next Navigation Buttons */}
        {images.length > 1 && (
          <>
            <button
              onClick={goToPrev}
              className="absolute left-2 md:left-6 top-1/2 -translate-y-1/2 w-12 h-12 md:w-14 md:h-14 rounded-full bg-black/60 hover:bg-blue-600 border border-white/20 text-white flex items-center justify-center transition-all duration-200 hover:scale-110 active:scale-95 shadow-2xl backdrop-blur-md z-30"
              aria-label="Previous Image"
            >
              <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            <button
              onClick={goToNext}
              className="absolute right-2 md:right-6 top-1/2 -translate-y-1/2 w-12 h-12 md:w-14 md:h-14 rounded-full bg-black/60 hover:bg-blue-600 border border-white/20 text-white flex items-center justify-center transition-all duration-200 hover:scale-110 active:scale-95 shadow-2xl backdrop-blur-md z-30"
              aria-label="Next Image"
            >
              <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </>
        )}
      </div>

      {/* Bottom Thumbnail Strip Selector */}
      {images.length > 1 && (
        <div className="z-20 overflow-x-auto py-2 flex justify-center" onClick={(e) => e.stopPropagation()}>
          <div className="flex items-center gap-2 overflow-x-auto max-w-full px-4 py-1">
            {images.map((img, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                className={`w-16 h-12 rounded-lg border-2 overflow-hidden flex-shrink-0 transition-all duration-200 ${
                  currentIndex === idx
                    ? 'border-cyan-400 scale-105 ring-2 ring-cyan-400/50 opacity-100'
                    : 'border-white/20 opacity-50 hover:opacity-100 hover:border-white/40'
                }`}
              >
                <img src={img} alt={`Thumbnail ${idx + 1}`} className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ImageLightboxModal;
