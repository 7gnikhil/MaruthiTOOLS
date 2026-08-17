import React from 'react';

interface MouldsCollageGalleryProps {
  images: string[];
  onSelectImage: (index: number) => void;
}

const MouldsCollageGallery: React.FC<MouldsCollageGalleryProps> = ({
  images,
  onSelectImage,
}) => {
  if (!images || images.length === 0) return null;

  return (
    <div className="mt-12">
      {/* Section Title */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-xl md:text-2xl font-black text-gray-900 tracking-tight">
            Full Mould Photo Gallery ({images.length} Photos)
          </h3>
          <p className="text-xs text-gray-500 font-medium mt-1">
            Click any image to enlarge in full-screen high-resolution view
          </p>
        </div>
      </div>

      {/* Photo Collage Grid Layout (Pure Images, No Count Badges) */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-4">
        {images.map((imgUrl, index) => (
          <div
            key={index}
            onClick={() => onSelectImage(index)}
            className="group relative rounded-2xl overflow-hidden bg-slate-950 border border-gray-200 hover:border-blue-500 shadow-md hover:shadow-2xl transition-all duration-300 cursor-pointer h-48 sm:h-56 md:h-64 flex items-center justify-center p-3"
          >
            {/* Pure Image */}
            <img
              src={imgUrl}
              alt={`Mould Gallery Photo ${index + 1}`}
              className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-105"
              onError={(e) => { (e.target as HTMLImageElement).src = '/images/mould1.jpg'; }}
            />

            {/* Hover Overlay */}
            <div className="absolute inset-0 bg-slate-900/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center backdrop-blur-[2px]">
              <div className="bg-blue-600 text-white p-3 rounded-full shadow-lg transform group-hover:scale-110 transition-transform duration-200">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v6m3-3H7" />
                </svg>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MouldsCollageGallery;
