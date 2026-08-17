import React, { useState } from 'react';
import { MOCK_PRODUCTS_DB } from '../api/mock-data';
import { Product as ProductType } from '../types';
import ProductSlideshow from '../components/ProductSlideshow';
import ProductGalleryModal from '../components/ProductGalleryModal';
import ImageLightboxModal from '../components/ImageLightboxModal';
import MouldsCollageGallery from '../components/MouldsCollageGallery';
import ComponentsGallery from '../components/ComponentsGallery';

interface ProductsProps {
  view: 'all' | 'moulds' | 'machinery' | 'end-components';
  title?: string;
  onRequestQuote?: (productName?: string) => void;
}

const Products: React.FC<ProductsProps> = ({ view, title, onRequestQuote }) => {
  const all      = MOCK_PRODUCTS_DB;
  const moulds   = all.filter(p => p.category === 'Mould');
  const cnc      = all.filter(p => p.category === 'CNC');
  const edm      = all.filter(p => p.category === 'EDM');
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
    all: 'All Products',
    moulds: 'Moulds',
    machinery: 'Workshop Machinery',
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
          <div className="container mx-auto flex items-center gap-3">
            <div className="w-1.5 h-8 bg-blue-600 rounded-full flex-shrink-0" />
            <div>
              <h1 className="text-2xl font-bold text-gray-900 leading-none">{pageTitle}</h1>
              <p className="text-xs text-gray-400 mt-1 uppercase tracking-wider font-semibold">Our Range & Capabilities</p>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-6 py-10">

          {/* ── MACHINERY: CNC & EDM (Kept as it is) ───────────── */}
          {(view === 'all' || view === 'machinery') && (
            <>
              <ProductSlideshow
                products={cnc}
                sectionTitle="CNC Machines"
                subtitle="High-precision milling, mold cavity detailing, electrode manufacturing, and small-to-medium component batch production"
                accentColor="text-purple-500"
              />
              <ProductSlideshow
                products={edm}
                sectionTitle="EDM Machines"
                subtitle="Electrical discharge machines for hardened steel & intricate profiles"
                accentColor="text-amber-500"
              />
            </>
          )}

          {/* ── MOULDS (Kept Slideshow + Photo Collage Grid Down Section) ─ */}
          {(view === 'all' || view === 'moulds') && (
            <div className="mb-20">
              {/* Slideshow kept exactly as it is */}
              <ProductSlideshow
                products={moulds}
                sectionTitle="Moulds Showcase"
                subtitle="Click any slide image to expand in big view"
                accentColor="text-blue-500"
                onSelectProduct={handleSlideshowProductClick}
                hideTextOverlay={true}
              />

              {/* Updated Down Section: All 16 Mould Images in Photo Collage Grid */}
              <MouldsCollageGallery
                images={allMouldImageUrls}
                onSelectImage={(idx) => setLightboxIndex(idx)}
              />
            </div>
          )}

          {/* ── END COMPONENTS (Gallery of Items with Big View) ─ */}
          {(view === 'all' || view === 'end-components') && (
            <ComponentsGallery
              products={endComps}
              onSelectItem={(item) => setSelectedProduct(item)}
              title="End Components Gallery"
              subtitle="Precision moulded plastic components — Click any item to view big"
            />
          )}

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
