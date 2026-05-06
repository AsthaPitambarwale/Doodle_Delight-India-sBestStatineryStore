import {
  Facebook,
  Instagram,
  Twitter,
  Youtube,
  Mail,
  Phone,
  MapPin,
} from "lucide-react";
import { useState } from "react";

interface FooterProps {
  onNavigate?: (page: string) => void;
}

export function Footer({ onNavigate }: FooterProps = {}) {
  const [email, setEmail] = useState("");
  const [toast, setToast] = useState<{
    message: string;
    type: "success" | "error";
  } | null>(null);

  const showToast = (
    message: string,
    type: "success" | "error" = "success",
  ) => {
    setToast({ message, type });

    setTimeout(() => {
      setToast(null);
    }, 2500);
  };

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      showToast(
        `Thank you for subscribing! We'll send updates to ${email}`,
        "success",
      );
      setEmail("");
    }
  };

  const handleLinkClick = (page: string) => {
    if (onNavigate) {
      onNavigate(page);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <footer className="bg-gray-900 text-white mt-16">
      {/* Newsletter Section */}
      <div className="bg-gradient-to-r from-orange-600 to-red-600">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="text-2xl font-bold mb-2">
                Subscribe to Our Newsletter
              </h3>
              <p className="text-orange-100">
                Get exclusive deals and updates directly in your inbox
              </p>
            </div>
            <form
              onSubmit={handleNewsletterSubmit}
              className="flex gap-2 w-full md:w-auto"
            >
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="px-4 py-3 rounded-lg text-gray-900 flex-1 md:w-80 focus:outline-none focus:ring-2 focus:ring-white"
              />
              <button
                type="submit"
                className="bg-gray-900 px-6 py-3 rounded-lg font-semibold hover:bg-gray-800 transition-colors whitespace-nowrap"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-8">
          {/* Company Info */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <img
                src="assets/logos/Logo1.png"
                alt="Doodle Delight logo"
                className="h-12 sm:h-14 md:h-18 w-auto"
              />
            </div>
            <p className="text-gray-400 mb-4 leading-relaxed">
              Your one-stop destination for premium quality stationery products.
              From students to professionals, we serve everyone with the best
              prices and genuine products.
            </p>
            <div className="flex gap-3">
              <button className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-orange-500 transition-colors">
                <Facebook className="w-5 h-5" />
              </button>
              <button className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-orange-500 transition-colors">
                <Instagram className="w-5 h-5" />
              </button>
              <button className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-orange-500 transition-colors">
                <Twitter className="w-5 h-5" />
              </button>
              <button className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-orange-500 transition-colors">
                <Youtube className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold text-lg mb-4">Quick Links</h4>
            <ul className="space-y-3">
              <li>
                <button
                  onClick={() => handleLinkClick("about")}
                  className="text-gray-400 hover:text-orange-500 transition-colors"
                >
                  About Us
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleLinkClick("contact")}
                  className="text-gray-400 hover:text-orange-500 transition-colors"
                >
                  Contact Us
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleLinkClick("track")}
                  className="text-gray-400 hover:text-orange-500 transition-colors"
                >
                  Track Order
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleLinkClick("bulk")}
                  className="text-gray-400 hover:text-orange-500 transition-colors"
                >
                  Bulk Orders
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleLinkClick("careers")}
                  className="text-gray-400 hover:text-orange-500 transition-colors"
                >
                  Careers
                </button>
              </li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h4 className="font-bold text-lg mb-4">Customer Service</h4>
            <ul className="space-y-3">
              <li>
                <button
                  onClick={() => handleLinkClick("help")}
                  className="text-gray-400 hover:text-orange-500 transition-colors"
                >
                  Help Center
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleLinkClick("returns")}
                  className="text-gray-400 hover:text-orange-500 transition-colors"
                >
                  Returns
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleLinkClick("shipping")}
                  className="text-gray-400 hover:text-orange-500 transition-colors"
                >
                  Shipping Info
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleLinkClick("payment")}
                  className="text-gray-400 hover:text-orange-500 transition-colors"
                >
                  Payment Methods
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleLinkClick("faqs")}
                  className="text-gray-400 hover:text-orange-500 transition-colors"
                >
                  FAQs
                </button>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-bold text-lg mb-4">Contact Info</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-gray-400">
                <MapPin className="w-5 h-5 text-orange-500 flex-shrink-0 mt-0.5" />
                <span>123 Stationery Street, Mumbai, Maharashtra 400001</span>
              </li>
              <li className="flex items-center gap-3 text-gray-400">
                <Phone className="w-5 h-5 text-orange-500 flex-shrink-0" />
                <a
                  href="tel:+911234567890"
                  className="hover:text-orange-500 transition-colors"
                >
                  +91 123 456 7890
                </a>
              </li>
              <li className="flex items-center gap-3 text-gray-400">
                <Mail className="w-5 h-5 text-orange-500 flex-shrink-0" />
                <a
                  href="mailto:info@Doodledelight.com"
                  className="hover:text-orange-500 transition-colors"
                >
                  info@Doodledelight.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 pt-8 mt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-400 text-sm text-center md:text-left">
              © 2026 Doodledelight. All rights reserved. Designed with care for
              stationery lovers.
            </p>
            <div className="flex gap-6 text-sm">
              <button
                onClick={() => handleLinkClick("privacy")}
                className="text-gray-400 hover:text-orange-500 transition-colors"
              >
                Privacy Policy
              </button>
              <button
                onClick={() => handleLinkClick("terms")}
                className="text-gray-400 hover:text-orange-500 transition-colors"
              >
                Terms of Service
              </button>
              <button
                onClick={() => handleLinkClick("sitemap")}
                className="text-gray-400 hover:text-orange-500 transition-colors"
              >
                Sitemap
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Payment Methods */}
      <div className="bg-gray-950 border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-gray-500 text-sm">We Accept:</p>
            <div className="flex gap-3 flex-wrap justify-center">
              <img src="assets/logos/visa.png" alt="Visa" className="h-6" />
              <img
                src="assets/logos/card.png"
                alt="Mastercard"
                className="h-6"
              />
              <img src="assets/logos/RuPay.png" alt="RuPay" className="h-6" />
              <img src="assets/logos/GPay.png" alt="GPay" className="h-6" />
              <img src="assets/logos/Paytm.png" alt="Paytm" className="h-6" />
              <img
                src="assets/logos/PhonePe.png"
                alt="PhonePe"
                className="h-6"
              />
            </div>
          </div>
        </div>
        {toast && (
          <div className="fixed top-4 md:top-6 left-1/2 -translate-x-1/2 z-[100] w-[90%] md:w-auto">
            <div
              className={`px-6 py-3 rounded-xl shadow-2xl border flex items-center gap-3 animate-in fade-in slide-in-from-top
      ${
        toast.type === "success"
          ? "bg-green-50 text-green-700 border-green-200"
          : "bg-red-50 text-red-700 border-red-200"
      }`}
            >
              <span className="font-semibold">{toast.message}</span>
            </div>
          </div>
        )}
      </div>
    </footer>
  );
}
