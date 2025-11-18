import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Leaf, Sparkles, Heart } from 'lucide-react';

interface HeroSlide {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  ctaText: string;
}

const heroSlides: HeroSlide[] = [
  {
    id: 1,
    title: "Natural Beauty, Naturally You",
    subtitle: "Eterna Skincare",
    description: "Discover the power of nature with our premium skincare products crafted from the finest natural ingredients.",
    image: "https://trae-api-sg.mchost.guru/api/ide/v1/text_to_image?prompt=Natural%20skincare%20products%20arranged%20beautifully%20on%20marble%20surface%20with%20green%20leaves%20and%20botanical%20elements%2C%20soft%20natural%20lighting%2C%20elegant%20and%20minimalist%20style&image_size=landscape_16_9",
    ctaText: "Shop Now"
  },
  {
    id: 2,
    title: "Pure Ingredients, Real Results",
    subtitle: "Botanical Excellence",
    description: "Experience skincare that works in harmony with your skin using organic botanicals and essential oils.",
    image: "https://trae-api-sg.mchost.guru/api/ide/v1/text_to_image?prompt=Botanical%20skincare%20ingredients%20like%20lavender%2C%20rose%20petals%2C%20and%20essential%20oils%20arranged%20artistically%20on%20white%20background%2C%20soft%20pastel%20colors%2C%20spa%20and%20wellness%20aesthetic&image_size=landscape_16_9",
    ctaText: "Explore Products"
  },
  {
    id: 3,
    title: "Sustainable Beauty Choices",
    subtitle: "Eco-Friendly Skincare",
    description: "Join us in our commitment to sustainable beauty with cruelty-free, environmentally conscious products.",
    image: "https://trae-api-sg.mchost.guru/api/ide/v1/text_to_image?prompt=Sustainable%20eco-friendly%20skincare%20products%20in%20recyclable%20packaging%20with%20green%20plants%20and%20natural%20elements%2C%20earth%20tones%2C%20environmental%20consciousness%20theme&image_size=landscape_16_9",
    ctaText: "Learn More"
  }
];

const HeroSection: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length);
  };

  return (
    <section className="relative h-screen overflow-hidden">
      {/* Background Images */}
      <div className="absolute inset-0">
        {heroSlides.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentSlide ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <img
              src={slide.image}
              alt={slide.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black bg-opacity-40"></div>
          </div>
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10 h-full flex items-center justify-center text-center text-white px-4">
        <div className="max-w-4xl mx-auto">
          <div className="mb-4">
            <Leaf className="h-12 w-12 mx-auto text-green-400 mb-4" />
          </div>
          
          <div className="space-y-6">
            <div className="space-y-2">
              <p className="text-xl md:text-2xl font-light text-green-200">
                {heroSlides[currentSlide].subtitle}
              </p>
              <h1 className="text-4xl md:text-6xl font-bold leading-tight">
                {heroSlides[currentSlide].title}
              </h1>
            </div>
            
            <p className="text-lg md:text-xl text-gray-200 max-w-2xl mx-auto leading-relaxed">
              {heroSlides[currentSlide].description}
            </p>
            
            <div className="pt-6">
              <button className="bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-full text-lg font-semibold transition-colors duration-300 shadow-lg hover:shadow-xl">
                {heroSlides[currentSlide].ctaText}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 z-20 bg-white bg-opacity-20 hover:bg-opacity-30 text-white p-3 rounded-full transition-all duration-300"
      >
        <ChevronLeft className="h-6 w-6" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 z-20 bg-white bg-opacity-20 hover:bg-opacity-30 text-white p-3 rounded-full transition-all duration-300"
      >
        <ChevronRight className="h-6 w-6" />
      </button>

      {/* Slide Indicators */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 flex space-x-2">
        {heroSlides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentSlide
                ? 'bg-green-400 scale-125'
                : 'bg-white bg-opacity-50 hover:bg-opacity-75'
            }`}
          ></button>
        ))}
      </div>
    </section>
  );
};

export default HeroSection;