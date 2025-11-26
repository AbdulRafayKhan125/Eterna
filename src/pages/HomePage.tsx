import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
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

  const reviews: { author: string; text: string }[] = [
    {
      author: 'Rubinarubi Hunza',
      text:
        "I received my hair oil which I have order and it was in perfect condition. I’ve been using it for one week and the result are really good I actually love it and also the texture the smell and how it feels on my hair ! I’m hopeful to keep seeing benefits, and I will definitely order more from you further!"
    },
    {
      author: 'Najiyeh',
      text:
        "I recently came across Eterna Soaps, a lovely home-based organic brand run by a talented mother-daughter duo, and I was instantly drawn to the beauty of their products. Even before using them myself, the craftsmanship, elegant packaging and thoughtfully created blends really stood out."
    },
    {
      author: 'Gania',
      text:
        "I used eternas products and they were absolutely amazing. The soap especialy aloe glow left my skin fresh and my skin had this really soft feeling. Also the complexion also became lighter. Applying the glow reboot has become a daily routine for me. The texture of this cream is so good and fun to touch and after applying it my skin shines."
    },
    {
      author: 'Saima',
      text:
        "I recently tried several products from Eternal by Ayman, including their organic soap, cream, and shampoo. I had a great experience with all of them! The quality is excellent, and the products feel truly natural and gentle on the skin and hair. I'm very satisfied with the results and would highly recommend Eternal by Ayman to anyone looking for effective organic products"
    },
    {
      author: 'Mariam',
      text:
        "The Aloe Vera Soap is a game-changer. It's gentle, soothing, and perfect for sensitive skin. The aloe vera extract helps to calm irritated skin, reduce redness, and lock in moisture. It's also great for acne-prone skin, as it helps to reduce acne. Plus, it's suitable for all skin types. As for the night cream, it's a velvet-like cream that nourishes and softens your skin overnight."
    },
    {
      author: 'Mariam',
      text:
        "This gentle, herbal, and organic shampoo is amazing. It leaves my hair feeling soft, smooth, and hydrated. Overall, I'm really happy with this shampoo and would definitely recommend it to anyone looking for a natural, effective, and eco-friendly hair care product."
    },
    {
      author: 'Afshan',
      text:
        "Aoa ayman,I must say that soaps are amazing, my skin become fresher and hydrated without moisturizer.previously after washing face my skin becomes dry with ordinary soap and any cleanser but with your soaps skin look amazing and not dry and every soap has its own unique texture."
    },
    {
      author: 'Mariam',
      text:
        "This gentle, herbal, and organic shampoo is amazing. It leaves my hair feeling soft, smooth, and hydrated. Overall, I'm really happy with this shampoo and would definitely recommend it to anyone looking for a natural, effective, and eco-friendly hair care product."
    },
    {
      author: 'Zainab',
      text:
        "My experience on this vitamin c soap is really good it is hydrating it keeps it moisturized and make the skin healthy no side effect"
    }
  ];

  const [reviewPage, setReviewPage] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const pageSize = isMobile ? 1 : 3;
  const totalPages = Math.ceil(reviews.length / pageSize);
  const startIndex = reviewPage * pageSize;
  const visibleReviews = reviews.slice(startIndex, startIndex + pageSize);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    setReviewPage(0);
  }, [pageSize]);

  return (
    <div className="min-h-screen">
      <HeroSection />
      <AboutSection />
      <FeaturedProducts onProductClick={handleProductClick} />
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900">Reviews</h2>
            <p className="mt-3 text-gray-600">What our customers say</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 min-h-[22rem]">
            {visibleReviews.map((rev, idx) => (
              <div key={idx} className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-md transition-shadow flex flex-col items-center justify-center text-center h-72">
                <p className="text-gray-700 leading-relaxed">{rev.text}</p>
                <div className="mt-4">
                  <span className="text-sm font-semibold text-gray-900">{rev.author}</span>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-8 flex items-center justify-center space-x-4">
            <button
              onClick={() => setReviewPage((prev) => (prev - 1 + totalPages) % totalPages)}
              className="inline-flex items-center px-4 py-2 rounded-md border border-gray-300 bg-white text-gray-700 hover:bg-gray-50"
            >
              <ChevronLeft className="h-5 w-5 mr-2" />
              Previous
            </button>
            <span className="text-sm text-gray-600">Page {reviewPage + 1} of {totalPages}</span>
            <button
              onClick={() => setReviewPage((prev) => (prev + 1) % totalPages)}
              className="inline-flex items-center px-4 py-2 rounded-md border border-gray-300 bg-white text-gray-700 hover:bg-gray-50"
            >
              Next
              <ChevronRight className="h-5 w-5 ml-2" />
            </button>
          </div>
        </div>
      </section>
      
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