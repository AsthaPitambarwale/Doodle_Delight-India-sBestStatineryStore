import {
  Facebook,
  Instagram,
  Twitter,
  Youtube,
  Mail,
  Phone,
  MapPin,
  ArrowRight,
  Send,
  ShieldCheck,
  Truck,
  BadgeCheck,
  Heart,
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
        `Thank you for subscribing! Updates will be sent to ${email}`,
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
    <footer className="relative mt-20 overflow-hidden bg-gradient-to-b from-[#fff7f2] via-[#fffaf7] to-[#fff3eb] border-t border-orange-100">
      {/* BACKGROUND EFFECTS */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 left-0 w-72 h-72 bg-orange-200/20 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-80 h-80 bg-red-200/20 rounded-full blur-3xl" />
      </div>

      {/* NEWSLETTER */}
      <div className="relative max-w-7xl mx-auto px-4 pt-16">
        <div className="relative overflow-hidden rounded-[32px] border border-orange-100 bg-gradient-to-r from-orange-500 via-red-500 to-pink-500 p-8 md:p-12 shadow-[0_20px_60px_rgba(255,115,0,0.25)]">
          <div className="absolute top-0 right-0 w-72 h-72 bg-white/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-60 h-60 bg-yellow-300/20 rounded-full blur-3xl" />

          <div className="relative flex flex-col lg:flex-row gap-8 items-center justify-between">
            <div className="max-w-xl text-white">
              <div className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-md px-4 py-2 rounded-full text-sm font-semibold mb-5 border border-white/20">
                <Send size={16} />
                Stay Updated
              </div>

              <h2 className="text-3xl md:text-5xl font-black leading-tight mb-4">
                Get Exclusive Deals & Latest Updates
              </h2>

              <p className="text-orange-50 text-base md:text-lg leading-relaxed">
                Join our newsletter and receive premium stationery offers,
                product launches, discounts, and special promotions.
              </p>
            </div>

            <form
              onSubmit={handleNewsletterSubmit}
              className="w-full lg:w-auto"
            >
              <div className="bg-white/15 backdrop-blur-xl border border-white/20 rounded-3xl p-3 flex flex-col sm:flex-row gap-3 shadow-2xl">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="
                    h-14 px-5 rounded-2xl
                    bg-white text-gray-900
                    min-w-[280px] md:min-w-[360px]
                    outline-none border-none
                    placeholder:text-gray-400
                    font-medium
                  "
                />

                <button
                  type="submit"
                  className="
                    h-14 px-8 rounded-2xl
                    bg-black hover:bg-gray-900
                    text-white font-bold
                    transition-all duration-300
                    hover:scale-[1.02]
                    flex items-center justify-center gap-2
                    shadow-xl
                  "
                >
                  Subscribe
                  <ArrowRight size={18} />
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* MAIN FOOTER */}
      <div className="relative max-w-7xl mx-auto px-4 py-16">
        {/* TOP FEATURES */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-16">
          <div className="bg-white border border-orange-100 rounded-3xl p-6 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
            <div className="w-14 h-14 rounded-2xl bg-orange-100 flex items-center justify-center mb-4">
              <Truck className="text-orange-600" size={26} />
            </div>

            <h3 className="font-bold text-xl text-gray-900 mb-2">
              Fast Delivery
            </h3>

            <p className="text-gray-500 leading-relaxed">
              Lightning-fast shipping across India with real-time tracking.
            </p>
          </div>

          <div className="bg-white border border-orange-100 rounded-3xl p-6 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
            <div className="w-14 h-14 rounded-2xl bg-green-100 flex items-center justify-center mb-4">
              <ShieldCheck className="text-green-600" size={26} />
            </div>

            <h3 className="font-bold text-xl text-gray-900 mb-2">
              Secure Payments
            </h3>

            <p className="text-gray-500 leading-relaxed">
              100% secure transactions with trusted payment gateways.
            </p>
          </div>

          <div className="bg-white border border-orange-100 rounded-3xl p-6 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
            <div className="w-14 h-14 rounded-2xl bg-pink-100 flex items-center justify-center mb-4">
              <BadgeCheck className="text-pink-600" size={26} />
            </div>

            <h3 className="font-bold text-xl text-gray-900 mb-2">
              Premium Quality
            </h3>

            <p className="text-gray-500 leading-relaxed">
              Genuine stationery products trusted by thousands of customers.
            </p>
          </div>
        </div>

        {/* FOOTER CONTENT */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* BRAND */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-5">
              <img
                src="assets/logos/Logo1.png"
                alt="Doodle Delight"
                className="h-14 w-auto"
              />
            </div>

            <p className="text-gray-600 leading-relaxed mb-6 max-w-md">
              Your premium destination for stationery, office essentials, and
              creative supplies crafted for students, professionals, and artists.
            </p>

            <div className="flex gap-3">
              {[
                Facebook,
                Instagram,
                Twitter,
                Youtube,
              ].map((Icon, i) => (
                <button
                  key={i}
                  className="
                    w-11 h-11 rounded-2xl
                    bg-white border border-orange-100
                    flex items-center justify-center
                    text-gray-700
                    hover:bg-gradient-to-r
                    hover:from-orange-500
                    hover:to-red-500
                    hover:text-white
                    hover:border-transparent
                    transition-all duration-300
                    shadow-sm hover:shadow-lg
                    hover:-translate-y-1
                  "
                >
                  <Icon size={18} />
                </button>
              ))}
            </div>
          </div>

          {/* QUICK LINKS */}
          <div>
            <h4 className="font-bold text-lg text-gray-900 mb-5">
              Quick Links
            </h4>

            <ul className="space-y-4">
              {[
                ["About Us", "about"],
                ["Contact Us", "contact"],
                ["Track Order", "track"],
                ["Bulk Orders", "bulk"],
                ["Careers", "careers"],
              ].map(([label, page]) => (
                <li key={page}>
                  <button
                    onClick={() => handleLinkClick(page)}
                    className="
                      text-gray-600 hover:text-orange-600
                      transition-all duration-300
                      hover:translate-x-1
                      flex items-center gap-2
                    "
                  >
                    <ArrowRight size={14} />
                    {label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* CUSTOMER SERVICE */}
          <div>
            <h4 className="font-bold text-lg text-gray-900 mb-5">
              Support
            </h4>

            <ul className="space-y-4">
              {[
                ["Help Center", "help"],
                ["Returns", "returns"],
                ["Shipping Info", "shipping"],
                ["Payment Methods", "payment"],
                ["FAQs", "faqs"],
              ].map(([label, page]) => (
                <li key={page}>
                  <button
                    onClick={() => handleLinkClick(page)}
                    className="
                      text-gray-600 hover:text-orange-600
                      transition-all duration-300
                      hover:translate-x-1
                      flex items-center gap-2
                    "
                  >
                    <ArrowRight size={14} />
                    {label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* CONTACT */}
          <div>
            <h4 className="font-bold text-lg text-gray-900 mb-5">
              Contact
            </h4>

            <div className="space-y-5">
              <div className="flex gap-3">
                <div className="w-11 h-11 rounded-2xl bg-orange-100 flex items-center justify-center flex-shrink-0">
                  <MapPin className="text-orange-600" size={18} />
                </div>

                <p className="text-gray-600 leading-relaxed">
                  Mumbai, Maharashtra, India
                </p>
              </div>

              <div className="flex gap-3">
                <div className="w-11 h-11 rounded-2xl bg-green-100 flex items-center justify-center flex-shrink-0">
                  <Phone className="text-green-600" size={18} />
                </div>

                <a
                  href="tel:+911234567890"
                  className="text-gray-600 hover:text-orange-600 transition-colors"
                >
                  +91 123 456 7890
                </a>
              </div>

              <div className="flex gap-3">
                <div className="w-11 h-11 rounded-2xl bg-pink-100 flex items-center justify-center flex-shrink-0">
                  <Mail className="text-pink-600" size={18} />
                </div>

                <a
                  href="mailto:info@doodledelight.com"
                  className="text-gray-600 hover:text-orange-600 transition-colors"
                >
                  info@doodledelight.com
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* PAYMENT SECTION */}
        <div className="mt-16 pt-8 border-t border-orange-100">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
            <div>
              <p className="text-gray-500 text-sm mb-3">
                Trusted Payment Partners
              </p>

              <div className="flex gap-3 flex-wrap">
                {[
                  "visa.png",
                  "card.png",
                  "RuPay.png",
                  "GPay.png",
                  "Paytm.png",
                  "PhonePe.png",
                ].map((logo, i) => (
                  <div
                    key={i}
                    className="
                      bg-white border border-gray-200
                      rounded-xl px-4 py-2
                      shadow-sm hover:shadow-md
                      transition-all duration-300
                    "
                  >
                    <img
                      src={`assets/logos/${logo}`}
                      alt={logo}
                      className="h-6 object-contain"
                    />
                  </div>
                ))}
              </div>
            </div>

            <div className="flex flex-wrap gap-5 text-sm text-gray-500">
              <button
                onClick={() => handleLinkClick("privacy")}
                className="hover:text-orange-600 transition-colors"
              >
                Privacy Policy
              </button>

              <button
                onClick={() => handleLinkClick("terms")}
                className="hover:text-orange-600 transition-colors"
              >
                Terms of Service
              </button>

              <button
                onClick={() => handleLinkClick("sitemap")}
                className="hover:text-orange-600 transition-colors"
              >
                Sitemap
              </button>
            </div>
          </div>
        </div>

        {/* COPYRIGHT */}
        <div className="mt-10 text-center">
          <p className="text-gray-500 text-sm flex items-center justify-center gap-2">
            © 2026 Doodle Delight — Made with
            <Heart className="text-red-500 fill-red-500" size={14} />
            for stationery lovers.
          </p>
        </div>
      </div>

      {/* TOAST */}
      {toast && (
        <div className="fixed top-5 left-1/2 -translate-x-1/2 z-[100] w-[92%] md:w-auto">
          <div
            className={`
              px-6 py-4 rounded-2xl shadow-2xl border backdrop-blur-xl
              animate-in fade-in slide-in-from-top
              ${
                toast.type === "success"
                  ? "bg-green-50/95 text-green-700 border-green-200"
                  : "bg-red-50/95 text-red-700 border-red-200"
              }
            `}
          >
            <p className="font-semibold">{toast.message}</p>
          </div>
        </div>
      )}
    </footer>
  );
}