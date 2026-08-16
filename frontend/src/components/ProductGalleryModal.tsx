import React, { useState, useEffect } from 'react';
import { Product as ProductType } from '../types';
import { XMarkIcon, ChevronLeftIcon, ChevronRightIcon } from './icons';

interface ProductGalleryModalProps {
  product: ProductType;
  onClose: () => void;
}

const ProductGalleryModal: React.FC<ProductGalleryModalProps> = ({ product, onClose }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const galleryImages = product.gallery && product.gallery.length > 0 ? product.gallery : [product.imageUrl];

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  const goToPrevious = () => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? galleryImages.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const goToNext = () => {
    const isLastSlide = currentIndex === galleryImages.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="gallery-title"
    >
      <div 
        className="bg-white rounded-lg shadow-2xl w-full max-w-4xl max-h-[90vh] flex flex-col relative"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-4 border-b flex justify-between items-center">
          <h2 id="gallery-title" className="text-xl font-bold text-gray-800">{product.name}</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-800" aria-label="Close gallery">
            <XMarkIcon className="h-6 w-6" />
          </button>
        </div>

        <div className="flex-grow p-4 md:p-6 flex flex-col md:flex-row gap-4 overflow-y-auto">
          <div className="relative w-full md:w-3/4 flex items-center justify-center bg-gray-100 rounded-lg">
            <img 
              src={galleryImages[currentIndex]} 
              alt={`${product.name} image ${currentIndex + 1}`} 
              className="max-h-[60vh] md:max-h-full w-auto h-auto object-contain rounded-md"
            />
             {galleryImages.length > 1 && (
              <>
                <button onClick={goToPrevious} className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/50 hover:bg-white p-2 rounded-full shadow-md" aria-label="Previous image">
                    <ChevronLeftIcon className="h-6 w-6 text-gray-800" />
                </button>
                <button onClick={goToNext} className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/50 hover:bg-white p-2 rounded-full shadow-md" aria-label="Next image">
                    <ChevronRightIcon className="h-6 w-6 text-gray-800" />
                </button>
              </>
             )}
          </div>
          <div className="w-full md:w-1/4">
            <h3 className="text-sm font-semibold mb-2 text-gray-700">Gallery</h3>
            <div className="grid grid-cols-3 md:grid-cols-2 gap-2 max-h-[60vh] md:max-h-[calc(90vh-150px)] overflow-y-auto">
              {galleryImages.map((image, index) => (
                <button 
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`border-2 rounded-md overflow-hidden transition-all duration-200 ${currentIndex === index ? 'border-blue-500 shadow-md' : 'border-transparent hover:border-blue-300'}`}
                  aria-current={currentIndex === index}
                >
                  <img 
                    src={image} 
                    alt={`Thumbnail ${index + 1}`} 
                    className="w-full h-20 object-cover"
                  />
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductGalleryModal;
