import React, { useState } from 'react';
import { MOCK_PRODUCTS_DB } from '../api/mock-data';
import { Product as ProductType } from '../types';
import ProductSlideshow from '../components/ProductSlideshow';
import ProductGalleryModal from '../components/ProductGalleryModal';

// ─────────────────────────────────────────────────────────────────
// ANATOMY — Products page layout:
//
// WHICH PRODUCTS SHOW → filter arrays below (moulds, cnc, edm, endComps)
//   e.g. add a new category by adding another filter + <ProductSlideshow>
//
// SECTION ORDER → rearrange the JSX blocks below (MACHINERY / MOULDS / END COMPONENTS)
//
// PAGE TITLE → change `pageTitle` string values in the map object
//
// COMPACT HEADER → bg-white strip at top — edit text inside <h1> and <p>
//
// SLIDESHOW SETTINGS → open src/components/ProductSlideshow.tsx
//   • SLIDE_INTERVAL_MS  → auto-play speed
//   • CATEGORY_GRADIENT  → gradient overlay colour per category
//   • h-[60vh]           → slide image height
//   • accentColor prop   → colour of the "X / Y" counter text
// ─────────────────────────────────────────────────────────────────

interface ProductsProps {
  view: 'all' | 'moulds' | 'machinery' | 'end-components';
  title?: string;
}

const Products: React.FC<ProductsProps> = ({ view, title }) => {
  const [selectedProduct, setSelectedProduct] = useState<ProductType | null>(null);

  const all      = MOCK_PRODUCTS_DB;
  const moulds   = all.filter(p => p.category === 'Mould');
  const cnc      = all.filter(p => p.category === 'CNC');
  const edm      = all.filter(p => p.category === 'EDM');
  const endComps = all.filter(p => p.category === 'End Component');

  const pageTitle = title || {
    all: 'All Products',
    moulds: 'Moulds',
    machinery: 'Workshop Machinery',
    'end-components': 'End Components',
  }[view];

  return (
    <>
      <div className="min-h-screen bg-gray-50">

        {/* ── Compact page header ──────────────────────────────── */}
        <div className="bg-white border-b border-gray-100 px-6 py-5">
          <div className="container mx-auto flex items-center gap-3">
            <div className="w-1 h-8 bg-blue-600 rounded-full flex-shrink-0" />
            <div>
              <h1 className="text-2xl font-bold text-gray-900 leading-none">{pageTitle}</h1>
              <p className="text-xs text-gray-400 mt-0.5 uppercase tracking-wider">Our Range</p>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-6 py-10">

          {/* ── MACHINERY: CNC ─────────────────────────────────── */}
          {(view === 'all' || view === 'machinery') && (
            <>
              <ProductSlideshow
                products={cnc}
                sectionTitle="CNC Machines"
                subtitle="High-precision machining centres for mould cavity production"
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

          {/* ── MOULDS ─────────────────────────────────────────── */}
          {(view === 'all' || view === 'moulds') && (
            <ProductSlideshow
              products={moulds}
              sectionTitle="Moulds"
              subtitle="High-cavitation, 2K/3K and custom injection moulds"
              accentColor="text-blue-500"
            />
          )}

          {/* ── END COMPONENTS ─────────────────────────────────── */}
          {(view === 'all' || view === 'end-components') && (
            <ProductSlideshow
              products={endComps}
              sectionTitle="End Components"
              subtitle="Precision moulded plastic components ready for use"
              accentColor="text-emerald-500"
            />
          )}

        </div>
      </div>

      {selectedProduct && (
        <ProductGalleryModal product={selectedProduct} onClose={() => setSelectedProduct(null)} />
      )}
    </>
  );
};

export default Products;
