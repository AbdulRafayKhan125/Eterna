import React, { useState } from 'react';
import { X, ChevronLeft, ChevronRight, ShoppingBag, Leaf, Heart } from 'lucide-react';

interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
  images: string[];
  ingredients?: string;
  usage?: string;
  category: {
    _id: string;
    name: string;
  };
}

interface ProductModalProps {
  product: Product;
  isOpen: boolean;
  onClose: () => void;
}

const ProductModal: React.FC<ProductModalProps> = ({ product, isOpen, onClose }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  if (!isOpen) return null;

  const nextImage = () => {
    setCurrentImageIndex((prev) => 
      prev === product.images.length - 1 ? 0 : prev + 1
    );
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => 
      prev === 0 ? product.images.length - 1 : prev - 1
    );
  };

  const handleWhatsAppClick = () => {
    const message = `Hi! I'm interested in purchasing the ${product.name}. Can you provide more information about pricing and availability?`;
    const whatsappUrl = `https://wa.me/923215020044?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black bg-opacity-50 transition-opacity" onClick={onClose}></div>

      {/* Modal */}
      <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-4xl sm:w-full">
          <div className="bg-white">
            {/* Header */}
            <div className="flex justify-between items-center p-6 border-b border-gray-200">
              <h2 className="text-2xl font-bold text-gray-900">Product Details</h2>
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-gray-500 transition-colors"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            {/* Content */}
            <div className="p-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Image Gallery */}
                <div className="space-y-4">
                  <div className="relative aspect-w-4 aspect-h-3 bg-gray-100 rounded-lg overflow-hidden">
                    {product.images.length > 0 ? (
                      <img
                        src={product.images[currentImageIndex].startsWith('/uploads') ? `${import.meta.env.VITE_API_URL || 'http://localhost:3001'}${product.images[currentImageIndex]}` : product.images[currentImageIndex]}
                        alt={product.name}
                        className="w-full h-80 object-contain bg-white"
                      />
                    ) : (
                      <div className="w-full h-80 bg-gray-200 flex items-center justify-center">
                        <ShoppingBag className="h-16 w-16 text-gray-400" />
                      </div>
                    )}
                    
                    {/* Navigation Arrows */}
                    {product.images.length > 1 && (
                      <>
                        <button
                          onClick={prevImage}
                          className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-80 hover:bg-opacity-100 rounded-full p-2 shadow-lg transition-all"
                        >
                          <ChevronLeft className="h-5 w-5 text-gray-700" />
                        </button>
                        <button
                          onClick={nextImage}
                          className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-80 hover:bg-opacity-100 rounded-full p-2 shadow-lg transition-all"
                        >
                          <ChevronRight className="h-5 w-5 text-gray-700" />
                        </button>
                      </>
                    )}
                  </div>

                  {/* Thumbnail Images */}
                  {product.images.length > 1 && (
                    <div className="flex space-x-2">
                      {product.images.map((image, index) => (
                        <button
                          key={index}
                          onClick={() => setCurrentImageIndex(index)}
                          className={`w-16 h-16 rounded-lg overflow-hidden border-2 transition-all ${
                            index === currentImageIndex
                              ? 'border-green-500 ring-2 ring-green-200'
                              : 'border-gray-200 hover:border-gray-300'
                          }`}
                        >
                          <img
                            src={image.startsWith('/uploads') ? `${import.meta.env.VITE_API_URL || 'http://localhost:3001'}${image}` : image}
                            alt={`${product.name} ${index + 1}`}
                            className="w-full h-full object-cover"
                          />
                        </button>
                      ))}
                    </div>
                  )}

                  {/* Action Buttons under images */}
                  <div className="pt-2 flex items-center justify-start gap-3">
                    <button
                      onClick={handleWhatsAppClick}
                      className="bg-green-600 hover:bg-green-700 text-white py-3 px-5 rounded-lg font-semibold transition-colors duration-300 flex items-center space-x-2"
                    >
                      <Heart className="h-5 w-5" />
                      <span>Buy via WhatsApp</span>
                    </button>

                    <button
                      onClick={onClose}
                      className="bg-gray-100 hover:bg-gray-200 text-gray-700 py-3 px-5 rounded-lg font-medium transition-colors duration-300"
                    >
                      Close
                    </button>
                  </div>
                </div>

                {/* Product Information */}
                <div className="space-y-6">
                  {/* Category and Title */}
                  <div>
                    <span className="inline-block bg-green-100 text-green-800 text-xs font-semibold px-3 py-1 rounded-full mb-2">
                      {product.category.name}
                    </span>
                    <h3 className="text-3xl font-bold text-gray-900">{product.name}</h3>
                  </div>

                  {/* Price */}
                  <div className="text-4xl font-bold text-green-600">
                    Rs {product.price.toFixed(2)}
                  </div>

                  {/* Description */}
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900 mb-2">Description</h4>
                    <p className="text-gray-600 leading-relaxed">{product.description}</p>
                  </div>

                  {/* Ingredients */}
                  {product.ingredients && (
                    <div>
                      <h4 className="text-lg font-semibold text-gray-900 mb-2 flex items-center">
                        <Leaf className="h-5 w-5 mr-2 text-green-600" />
                        Key Ingredients
                      </h4>
                      <p className="text-gray-600 leading-relaxed">{product.ingredients}</p>
                    </div>
                  )}

                  {/* Usage Instructions */}
                  {product.usage && (
                    <div>
                      <h4 className="text-lg font-semibold text-gray-900 mb-2">How to Use</h4>
                      <p className="text-gray-600 leading-relaxed">{product.usage}</p>
                    </div>
                  )}

                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductModal;
