import React from 'react';
import { Sparkles, Heart, Leaf } from 'lucide-react';

const AboutSection: React.FC = () => {
  const features = [
    {
      icon: Leaf,
      title: "100% Natural Ingredients",
      description: "We carefully select only the finest natural ingredients, sourced sustainably from nature's bounty."
    },
    {
      icon: Heart,
      title: "Cruelty-Free Promise",
      description: "All our products are cruelty-free and never tested on animals. We believe in beauty without harm."
    },
    {
      icon: Sparkles,
      title: "Visible Results",
      description: "Experience the transformative power of nature with products that deliver real, visible results."
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <h2 className="text-4xl font-bold text-gray-900 leading-tight">
                About Eterna
              </h2>
              <p className="text-lg text-gray-600 leading-relaxed">
                Founded with a passion for natural beauty, Eterna represents the perfect harmony between 
                nature's wisdom and modern skincare science. We believe that true beauty comes from within, 
                and our role is to enhance your natural radiance with products that work in harmony with your skin.
              </p>
            </div>

            <div className="space-y-6">
              {features.map((feature, index) => (
                <div key={index} className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                      <feature.icon className="h-6 w-6 text-green-600" />
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-gray-600">
                      {feature.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-6">
              <p className="text-gray-600 leading-relaxed">
                Our mission is to provide you with skincare products that not only nourish your skin 
                but also respect the environment. Every product is crafted with love, care, and a deep 
                respect for the natural world that inspires us.
              </p>
            </div>
          </div>

          {/* Image */}
          <div className="relative">
            <div className="aspect-w-4 aspect-h-3 rounded-2xl overflow-hidden shadow-2xl">
              <img
                src="https://trae-api-sg.mchost.guru/api/ide/v1/text_to_image?prompt=Natural%20skincare%20ingredients%20like%20aloe%20vera%2C%20rose%20petals%2C%20lavender%2C%20and%20essential%20oils%20arranged%20beautifully%20on%20white%20marble%20surface%2C%20soft%20natural%20lighting%2C%20elegant%20and%20minimalist%20composition&image_size=portrait_4_3"
                alt="Natural skincare ingredients"
                className="w-full h-full object-cover"
              />
            </div>
            
            {/* Decorative elements */}
            <div className="absolute -top-4 -right-4 w-20 h-20 bg-green-200 rounded-full opacity-20"></div>
            <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-green-300 rounded-full opacity-20"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;