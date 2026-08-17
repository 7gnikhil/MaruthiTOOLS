import React, { useState } from 'react';
import { MOCK_PRODUCTS_DB } from '../api/mock-data';
import { Product as ProductType } from '../types';
import ProductSlideshow from '../components/ProductSlideshow';
import ProductGalleryModal from '../components/ProductGalleryModal';
import ImageLightboxModal from '../components/ImageLightboxModal';
import MouldsCollageGallery from '../components/MouldsCollageGallery';
import ComponentsGallery from '../components/ComponentsGallery';

interface ProductsProps {
  view: 'all' | 'moulds' | 'end-components';
  title?: string;
  onRequestQuote?: (productName?: string) => void;
}

const Products: React.FC<ProductsProps> = ({ view, title, onRequestQuote }) => {
  const all      = MOCK_PRODUCTS_DB;
  const moulds   = all.filter(p => p.category === 'Mould');
  const endComps = all.filter(p => p.category === 'End Component');

  // Collect all distinct mould image URLs across all mould items
  const allMouldImageUrls = Array.from(
    new Set(
      moulds.flatMap((m) => [m.imageUrl, ...(m.gallery || [])])
    )
  );

  const [selectedProduct, setSelectedProduct] = useState<ProductType | null>(null);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const pageTitle = title || {
    all: 'All Products & Tooling',
    moulds: 'Moulds',
    'end-components': 'End Components',
  }[view];

  const handleSlideshowProductClick = (product: ProductType) => {
    const foundIdx = allMouldImageUrls.indexOf(product.imageUrl);
    setLightboxIndex(foundIdx >= 0 ? foundIdx : 0);
  };

  return (
    <>
      <div className="min-h-screen bg-gray-50 pt-20">

        {/* ── Compact page header ──────────────────────────────── */}
        <div className="bg-white border-b border-gray-100 px-6 py-5 shadow-sm">
          <div className="container mx-auto flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-1.5 h-8 bg-blue-600 rounded-full flex-shrink-0" />
              <div>
                <h1 className="text-2xl font-bold text-gray-900 leading-none">{pageTitle}</h1>
                <p className="text-xs text-gray-400 mt-1 uppercase tracking-wider font-semibold">Precision Tooling & Components</p>
              </div>
            </div>

            {onRequestQuote && (
              <button
                onClick={() => onRequestQuote()}
                className="bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs px-4 py-2 rounded-lg transition"
              >
                Request Quote
              </button>
            )}
          </div>
        </div>

        <div className="container mx-auto px-6 py-10">

          {/* ── MOULDS (Slideshow + Photo Collage Grid) ──────────── */}
          {(view === 'all' || view === 'moulds') && (
            <div className="mb-20">
              <ProductSlideshow
                products={moulds}
                sectionTitle="Moulds Showcase"
                subtitle="Click any slide image to expand in big view"
                accentColor="text-blue-500"
                onSelectProduct={handleSlideshowProductClick}
                hideTextOverlay={true}
              />

              <MouldsCollageGallery
                images={allMouldImageUrls}
                onSelectImage={(idx) => setLightboxIndex(idx)}
              />
            </div>
          )}

          {/* ── END COMPONENTS GALLERY ─────────────────────────── */}
          {(view === 'all' || view === 'end-components') && (
            <div className="mb-20">
              <ComponentsGallery
                products={endComps}
                onSelectItem={(item) => setSelectedProduct(item)}
                title="End Components Gallery"
                subtitle="Precision moulded plastic components — Click any item to view big"
              />
            </div>
          )}

          {/* ── FACILITY & EQUIPMENT TECHNICAL DETAILS (Customizable Placeholder) ─ */}
          <div className="bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 text-white rounded-3xl p-8 sm:p-12 border border-white/10 shadow-2xl">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 mb-8 border-b border-white/10 pb-6">
              <div>
                <span className="text-cyan-400 font-extrabold uppercase tracking-widest text-xs block mb-1">
                  Toolroom Infrastructure
                </span>
                <h2 className="text-2xl sm:text-3xl font-black">Facility & Technical Specifications</h2>
              </div>
              <span className="text-xs text-gray-400 bg-white/5 border border-white/10 px-3 py-1.5 rounded-full">
                ✏️ Technical text details (Updateable)
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white/5 p-6 rounded-2xl border border-white/10 hover:border-blue-400/40 transition">
                <div className="text-cyan-400 font-bold text-sm mb-2 uppercase tracking-wide">01. Precision Machining</div>
                <h3 className="text-lg font-bold mb-2">High-Speed VMCs & Tooling</h3>
                <p className="text-xs text-gray-300 leading-relaxed">
                  Equipped with high-precision Vertical Machining Centers (Cosmos CVM 1060 & AMS MCV 400) for complex cavity cutting, sub-micron electrode milling, and hard die steel machining.
                </p>
              </div>

              <div className="bg-white/5 p-6 rounded-2xl border border-white/10 hover:border-blue-400/40 transition">
                <div className="text-cyan-400 font-bold text-sm mb-2 uppercase tracking-wide">02. Spark Erosion & EDM</div>
                <h3 className="text-lg font-bold mb-2">ZNC / CNC EDM Capabilities</h3>
                <p className="text-xs text-gray-300 leading-relaxed">
                  Precision spark erosion (Sparkronix ZNC EDM) machines for complex ribs, deep ribs, sharp internal radii, and mirror-polished surface finish requirements.
                </p>
              </div>

              <div className="bg-white/5 p-6 rounded-2xl border border-white/10 hover:border-blue-400/40 transition">
                <div className="text-cyan-400 font-bold text-sm mb-2 uppercase tracking-wide">03. Toolroom Machinery</div>
                <h3 className="text-lg font-bold mb-2">Grinding, Lathe & Drilling</h3>
                <p className="text-xs text-gray-300 leading-relaxed">
                  Surface grinding, precision lathe, and radial drilling machinery for plate squareness, core pin fitting, and complete in-house tool assembly under one roof.
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Lightbox Modal Popup for Moulds BIG View */}
      {lightboxIndex !== null && (
        <ImageLightboxModal
          images={allMouldImageUrls}
          initialIndex={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
        />
      )}

      {/* Lightbox / Modal for Enlarged Component View */}
      {selectedProduct && (
        <ProductGalleryModal product={selectedProduct} onClose={() => setSelectedProduct(null)} />
      )}
    </>
  );
};

export default Products;
