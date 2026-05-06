import { ChevronRight, Sparkles, TrendingUp } from "lucide-react";

interface HeroBannerProps {
  onNavigate?: (page: string) => void;
  onCategorySelect?: (category: string) => void;
  user?: any;
  onRequireLogin?: () => void;
  onAllProductsClick?: () => void;
}

export function HeroBanner({
  onNavigate,
  onCategorySelect,
  user,
  onRequireLogin,
  onAllProductsClick,
}: HeroBannerProps) {
  const goTo = (path: string) => {
    if (onNavigate) onNavigate(path);
    else window.location.href = `/${path}`;
  };

  const goToCategory = (cat: string) => {
    if (onCategorySelect) onCategorySelect(cat);
    else window.location.href = `/category/${cat}`;
  };

  const requireLogin = () => {
    if (onRequireLogin) onRequireLogin();
    else window.location.href = "/login";
  };

  const openProducts = () => {
    if (!user) {
      requireLogin();
      return;
    }

    // ✅ IMPORTANT: this must trigger parent state change
    onAllProductsClick?.();
  };

  return (
    <div className="grid md:grid-cols-3 gap-4 mb-8">
      {/* MAIN BANNER */}
      <div
        onClick={() => goToCategory("all")}
        className="md:col-span-2 relative bg-gradient-to-br from-orange-500 via-orange-600 to-red-600 text-white rounded-2xl overflow-hidden group cursor-pointer"
      >
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1517842645767-c639042777db?w=1200')] opacity-20 bg-cover bg-center pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/40 to-transparent pointer-events-none" />

        <div className="relative z-10 px-8 py-12 md:py-16 h-full flex flex-col justify-center">
          <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full w-fit mb-4">
            <Sparkles className="w-4 h-4" />
            <span className="text-sm font-semibold">Limited Time Offer</span>
          </div>

          <h1 className="text-3xl md:text-5xl font-bold mb-3 leading-tight">
            Premium Stationery
            <br />
            at Unbeatable Prices
          </h1>

          <p className="text-lg md:text-xl mb-6 text-orange-50 max-w-lg">
            Shop 5000+ products from top brands. Free delivery on orders above
            ₹500
          </p>

          <div className="flex flex-wrap gap-3">
            {/* SHOP NOW */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                openProducts();
              }}
              className="bg-white text-orange-600 px-6 py-2 rounded-full"
            >
              Shop Now
            </button>

            {/* EXPLORE DEALS */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                openProducts();
              }}
              className="border-2 border-white px-8 py-3 rounded-full font-bold hover:bg-white/10"
            >
              Explore Deals
            </button>
          </div>
        </div>
      </div>

      {/* SIDE BANNERS */}
      <div className="flex flex-col gap-4">
        {/* BULK ORDERS */}
        <div
          onClick={() => {
            if (!user) return requireLogin();
            goTo("bulk");
          }}
          className="relative bg-gradient-to-br from-blue-600 to-blue-800 text-white rounded-2xl overflow-hidden p-6 group cursor-pointer hover:shadow-xl transition-all flex-1"
        >
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16 pointer-events-none" />

          <div className="relative z-10">
            <div className="inline-flex items-center gap-1 bg-yellow-400 text-blue-900 px-3 py-1 rounded-full text-xs font-bold mb-3">
              <TrendingUp className="w-3 h-3" />
              BEST DEAL
            </div>

            <h3 className="text-xl font-bold mb-2">Wholesale Prices</h3>

            <p className="text-sm text-blue-100 mb-4">
              Up to 40% OFF on bulk orders
            </p>

            <button className="text-sm font-semibold flex items-center gap-1 hover:gap-2 transition-all">
              Learn More <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* SCHOOL ESSENTIALS */}
        <div
          onClick={() => goToCategory("school-essentials")}
          className="relative bg-gradient-to-br from-green-500 to-emerald-600 text-white rounded-2xl overflow-hidden p-6 group cursor-pointer hover:shadow-xl transition-all flex-1"
        >
          <div className="absolute bottom-0 right-0 w-24 h-24 bg-white/10 rounded-full translate-y-12 translate-x-12 pointer-events-none" />

          <div className="relative z-10">
            <div className="inline-flex items-center gap-1 bg-white text-green-700 px-3 py-1 rounded-full text-xs font-bold mb-3">
              <Sparkles className="w-3 h-3" />
              NEW ARRIVAL
            </div>

            <h3 className="text-xl font-bold mb-2">School Essentials</h3>

            <p className="text-sm text-green-100 mb-4">
              Complete range starting at ₹49
            </p>

            <button className="text-sm font-semibold flex items-center gap-1 hover:gap-2 transition-all">
              Shop Now <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
