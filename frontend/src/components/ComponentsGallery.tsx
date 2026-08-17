import React from 'react';
import { Product } from '../types';

interface ComponentsGalleryProps {
  products: Product[];
  onSelectItem: (product: Product) => void;
  title?: string;
  subtitle?: string;
}

const ComponentsGallery: React.FC<ComponentsGalleryProps> = ({
  products,
  onSelectItem,
  title = "End Components Gallery",
  subtitle = "Precision injection moulded plastic components — Click any image to view in high resolution",
}) => {
  if (!products.length) return null;

  return (
    <section className="mb-20">
      {/* Section Header */}
      <div className="flex items-center gap-4 mb-8">
        <div>
          <h2 className="text-xl md:text-3xl font-bold text-gray-900">{title}</h2>
          {subtitle && <p className="text-sm text-gray-500 mt-1">{subtitle}</p>}
        </div>
        <div className="flex-1 h-px bg-gradient-to-r from-emerald-300 to-transparent" />
        <span className="text-xs font-semibold text-emerald-600 bg-emerald-50 px-3 py-1.5 rounded-full border border-emerald-200">
          {products.length} Items
        </span>
      </div>

      {/* Grid Gallery displaying Pure Images (No count numbers or badges on images) */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-4">
        {products.map((item, index) => (
          <div
            key={item._id || index}
            onClick={() => onSelectItem(item)}
            className="group relative bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 cursor-pointer h-52 sm:h-60 md:h-64 flex items-center justify-center p-4"
          >
            {/* Pure Component Image */}
            <img
              src={item.imageUrl}
              alt={`End Component ${index + 1}`}
              className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500"
              onError={(e) => { (e.target as HTMLImageElement).src = '/images/comp_item_1.jpg'; }}
            />

            {/* Hover Overlay with Magnifier Icon */}
            <div className="absolute inset-0 bg-emerald-950/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center backdrop-blur-[2px]">
              <div className="bg-emerald-600 text-white p-3 rounded-full shadow-lg transform group-hover:scale-110 transition-transform duration-200">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v6m3-3H7" />
                </svg>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ComponentsGallery;
