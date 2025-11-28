import React from 'react';
import { Leaf, Heart, Sparkles, Award, Users, Globe } from 'lucide-react';

const AboutPage: React.FC = () => {
  const values = [
    {
      icon: Leaf,
      title: "Natural Ingredients",
      description: "We believe in the power of nature. Every ingredient is carefully selected for its purity, effectiveness, and sustainability."
    },
    {
      icon: Heart,
      title: "Cruelty-Free",
      description: "All our products are cruelty-free and never tested on animals. Beauty should never come at the cost of innocent lives."
    },
    {
      icon: Sparkles,
      title: "Visible Results",
      description: "Our formulations are backed by science and proven to deliver real, visible results that enhance your natural beauty."
    },
    {
      icon: Award,
      title: "Quality First",
      description: "We maintain the highest standards of quality, ensuring every product meets our rigorous testing and safety protocols."
    },
    {
      icon: Users,
      title: "Customer Focus",
      description: "Your satisfaction is our priority. We're committed to providing exceptional customer service and personalized skincare advice."
    },
    {
      icon: Globe,
      title: "Sustainable Future",
      description: "We're committed to protecting our planet through eco-friendly packaging and sustainable sourcing practices."
    }
  ];

  const features = [
    {
      title: "Handcrafted with Love",
      description: "Each product is carefully crafted in small batches to ensure freshness and quality. We pay attention to every detail, from ingredient selection to final packaging."
    },
    {
      title: "Botanical Expertise",
      description: "Our team of botanical experts and skincare specialists work together to create formulations that harness the best of nature while delivering proven results."
    },
    {
      title: "Transparent Ingredients",
      description: "We believe in full transparency. Every ingredient is clearly listed, and we explain the benefits of each component so you know exactly what you're putting on your skin."
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-green-50 to-green-100 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Leaf className="h-16 w-16 mx-auto text-green-600 mb-6" />
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            About Eterna
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Founded with a passion for natural beauty and a commitment to sustainability, 
            Eterna represents the perfect harmony between nature's wisdom and modern skincare science.
          </p>
        </div>
      </div>

      {/* Our Story Section */}
      <div className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h2 className="text-4xl font-bold text-gray-900">Our Story</h2>
              <p className="text-lg text-gray-600 leading-relaxed">
                It all began in a small kitchen, where our founder experimented with natural ingredients 
                to create gentle, effective skincare solutions for sensitive skin. What started as a 
                personal journey quickly evolved into a mission to share the transformative power of 
                nature with others.
              </p>
              <p className="text-lg text-gray-600 leading-relaxed">
                Today, Eterna stands as a testament to the belief that true beauty comes from within, 
                and our role is to enhance your natural radiance with products that work in harmony 
                with your skin and respect our planet.
              </p>
              <div className="pt-4">
                <img
                  src="https://trae-api-sg.mchost.guru/api/ide/v1/text_to_image?prompt=Natural%20skincare%20laboratory%20with%20botanical%20ingredients%2C%20essential%20oils%2C%20and%20organic%20plants%20on%20white%20surfaces%2C%20clean%20and%20professional%20setup%2C%20soft%20natural%20lighting&image_size=portrait_4_3"
                  alt="Our skincare laboratory"
                  className="rounded-2xl shadow-lg w-full h-64 object-cover"
                />
              </div>
            </div>
            <div className="space-y-6">
              <img
                src="https://trae-api-sg.mchost.guru/api/ide/v1/text_to_image?prompt=Founder%20of%20natural%20skincare%20brand%20working%20with%20botanical%20ingredients%2C%20passionate%20and%20dedicated%20expression%2C%20professional%20yet%20warm%20atmosphere%2C%20natural%20lighting&image_size=portrait_4_3"
                alt="Our founder"
                className="rounded-2xl shadow-lg w-full h-80 object-cover"
              />
              <blockquote className="bg-green-50 p-6 rounded-2xl">
                <p className="text-lg text-gray-700 italic leading-relaxed">
                  "I believe that everyone deserves to feel confident in their own skin. 
                  Our products are more than just skincare – they're a daily ritual of self-care 
                  and a celebration of natural beauty."
                </p>
                <footer className="mt-4 text-sm text-gray-600">
                  — Founder, Eterna Skincare
                </footer>
              </blockquote>
            </div>
          </div>
        </div>
      </div>

      {/* Our Values Section */}
      <div className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Values</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Everything we do is guided by our core values, which reflect our commitment to 
              natural beauty, sustainability, and customer satisfaction.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <div key={index} className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
                <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mb-6">
                  <value.icon className="h-8 w-8 text-green-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">{value.title}</h3>
                <p className="text-gray-600 leading-relaxed">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Why Choose Us Section */}
      <div className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Why Choose Eterna?</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We're not just another skincare brand. Here's what makes us different:
            </p>
          </div>

          <div className="space-y-16">
            {features.map((feature, index) => (
              <div key={index} className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${
                index % 2 === 1 ? 'lg:flex-row-reverse' : ''
              }`}>
                <div className={index % 2 === 1 ? 'lg:order-2' : ''}>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">{feature.title}</h3>
                  <p className="text-lg text-gray-600 leading-relaxed">{feature.description}</p>
                </div>
                <div className={index % 2 === 1 ? 'lg:order-1' : ''}>
                  <img
                    src={`https://trae-api-sg.mchost.guru/api/ide/v1/text_to_image?prompt=Natural%20skincare%20${feature.title.toLowerCase().replace(' ', '%20')}%20scene%20with%20botanical%20ingredients%2C%20professional%20photography%2C%20soft%20natural%20lighting&image_size=portrait_4_3`}
                    alt={feature.title}
                    className="rounded-2xl shadow-lg w-full h-64 object-cover"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-20 bg-green-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Ready to Experience Natural Beauty?
          </h2>
          <p className="text-xl text-green-100 mb-8 max-w-2xl mx-auto">
            Join thousands of satisfied customers who have made the switch to natural, 
            effective skincare. Your skin will thank you!
          </p>
          <a
            href="/shop"
            className="inline-flex items-center px-8 py-4 bg-white text-green-600 font-semibold rounded-full text-lg hover:bg-gray-100 transition-colors duration-300 shadow-lg"
          >
            Shop Now
            <span className="ml-2">→</span>
          </a>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;