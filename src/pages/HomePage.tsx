import React, { useState } from 'react';
import HeroSection from '../components/landing/HeroSection';
import AboutSection from '../components/landing/AboutSection';
import FeaturedProducts from '../components/landing/FeaturedProducts';
import ProductModal from '../components/shop/ProductModal';

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

const HomePage: React.FC = () => {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const handleProductClick = (product: Product) => {
    setSelectedProduct(product);
  };

  const handleCloseModal = () => {
    setSelectedProduct(null);
  };

  return (
    <div className="min-h-screen">
      <HeroSection />
      <AboutSection />
      <FeaturedProducts onProductClick={handleProductClick} />
      
      {/* Product Modal */}
      {selectedProduct && (
        <ProductModal
          product={selectedProduct}
          isOpen={!!selectedProduct}
          onClose={handleCloseModal}
        />
      )}
    </div>
  );
};

export default HomePage;