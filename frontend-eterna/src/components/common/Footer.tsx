import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, Instagram, MessageCircle, ShoppingBag, Send } from 'lucide-react';

interface FooterProps {
  onWhatsAppSignup: (name: string, phone: string) => void;
}

const Footer: React.FC<FooterProps> = ({ onWhatsAppSignup }) => {
  const [formData, setFormData] = useState({ name: '', phone: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState('');
  const [logoOk, setLogoOk] = useState(true);
  const [qrOk, setQrOk] = useState(true);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone) {
      setMessage('Please fill in all fields');
      return;
    }

    setIsSubmitting(true);
    try {
      await onWhatsAppSignup(formData.name, formData.phone);
      setMessage('Thank you! You\'ve been added to our WhatsApp group.');
      setFormData({ name: '', phone: '' });
      setTimeout(() => setMessage(''), 3000);
    } catch (error) {
      setMessage('Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              {logoOk ? (
                <>
                  <img src="/eterna-logo.png" alt="Eterna" className="h-10 w-auto" onError={() => setLogoOk(false)} />
                  <span className="text-xl font-bold">ETERNA</span>
                </>
              ) : (
                <span className="text-xl font-bold">ETERNA</span>
              )}
            </div>
            <p className="text-gray-300 text-sm leading-relaxed">
              Natural skincare products crafted with love and the finest organic ingredients. 
              Experience the power of nature for beautiful, healthy skin.
            </p>
            <div className="flex space-x-4">
              <a href="https://www.instagram.com/eternabyayman?igsh=ZnN6a2M5bGk2a2g2" target="_blank" rel="noreferrer" className="text-gray-400 hover:text-green-400 transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="https://wa.link/lzey2r" target="_blank" rel="noreferrer" className="text-gray-400 hover:text-green-400 transition-colors">
                <MessageCircle className="h-5 w-5" />
              </a>
              <a href="https://www.daraz.pk/shop/vrsizbwf/" target="_blank" rel="noreferrer" className="text-gray-400 hover:text-green-400 transition-colors">
                <ShoppingBag className="h-5 w-5" />
              </a>
            </div>
            <div className="mt-4">
              <p className="text-gray-300 text-sm mb-2">Scan to join our WhatsApp group</p>
              {qrOk ? (
                <img
                  src="/eterna-qr.png"
                  alt="WhatsApp group QR"
                  className="h-28 w-28 rounded-md border border-gray-700"
                  onError={() => setQrOk(false)}
                />
              ) : (
                <a
                  href="https://chat.whatsapp.com/LN3OuQHA2ehAoLTh2njCpE?mode=hqrc"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-block text-green-400 hover:text-green-300 text-sm"
                >
                  Join via link
                </a>
              )}
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-300 hover:text-green-400 transition-colors text-sm">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/shop" className="text-gray-300 hover:text-green-400 transition-colors text-sm">
                  Shop
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-300 hover:text-green-400 transition-colors text-sm">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-300 hover:text-green-400 transition-colors text-sm">
                  Contact
                </Link>
              </li>
              <li>
                <a href="/admin/login" className="text-gray-300 hover:text-green-400 transition-colors text-sm">
                  Admin Login
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Contact Us</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Phone className="h-4 w-4 text-green-400" />
                <span className="text-gray-300 text-sm">03215020044</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="h-4 w-4 text-green-400" />
                <span className="text-gray-300 text-sm">EternaByAyman@gmail.com</span>
              </div>
              <div className="flex items-center space-x-3">
                <MapPin className="h-4 w-4 text-green-400" />
                <span className="text-gray-300 text-sm">Islamabad</span>
              </div>
            </div>
          </div>

          {/* WhatsApp Signup */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Join Our WhatsApp</h3>
            <p className="text-gray-300 text-sm">
              Get exclusive updates, skincare tips, and special offers delivered to your WhatsApp.
            </p>
            <form onSubmit={handleSubmit} className="space-y-3">
              <input
                type="text"
                placeholder="Your Name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm"
                required
              />
              <input
                type="tel"
                placeholder="Your WhatsApp Number"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm"
                required
              />
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full inline-flex items-center justify-center px-3 py-2 bg-green-600 hover:bg-green-700 text-white text-sm font-medium rounded-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  'Joining...'
                ) : (
                  <>
                    <Send className="h-4 w-4 mr-2" />
                    Join WhatsApp Group
                  </>
                )}
              </button>
            </form>
            {message && (
              <p className={`text-sm ${message.includes('Thank you') ? 'text-green-400' : 'text-red-400'}`}>
                {message}
              </p>
            )}
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-gray-800">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-gray-400 text-sm">
              © 2024 Eterna Skincare. All rights reserved.
            </p>
            <div className="flex space-x-6 text-sm">
              <a href="#" className="text-gray-400 hover:text-green-400 transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="text-gray-400 hover:text-green-400 transition-colors">
                Terms of Service
              </a>
              <a href="#" className="text-gray-400 hover:text-green-400 transition-colors">
                Shipping Info
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;