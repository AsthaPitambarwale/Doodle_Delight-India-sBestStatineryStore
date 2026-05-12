import { ChevronRight, Sparkles, TrendingUp, Package } from "lucide-react";

interface HeroBannerProps {
  onNavigate?: (page: string) => void;
  onCategorySelect?: (category: string) => void;
  user?: any;
  onRequireLogin?: () => void;
  onAllProductsClick?: () => void;
  onOpenMysteryBox?: () => void;
  onOpenBulkOrderFast?: () => void;
  onOpenBulkOrderRepeat?: () => void;
  onOpenBulkOrderSplit?: () => void;
}

export function HeroBanner({
  onNavigate,
  onCategorySelect,
  user,
  onRequireLogin,
  onAllProductsClick,
  onOpenMysteryBox,
  onOpenBulkOrderFast,
  onOpenBulkOrderRepeat,
  onOpenBulkOrderSplit,
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

  const openMysteryBox = () => {
    if (!user) {
      requireLogin();
      return;
    }

    onOpenMysteryBox?.();
  };

  const openProducts = () => {
    if (!user) {
      requireLogin();
      return;
    }

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
            Shop 5000+ products from top brands. Free delivery on orders above ₹500
          </p>

          <div className="flex flex-wrap gap-3">
            <button
              onClick={(e) => {
                e.stopPropagation();
                openProducts();
              }}
              className="bg-white text-orange-600 px-6 py-2 rounded-full"
            >
              Shop Now
            </button>

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

      <div className="flex flex-col gap-4">

        {/* MYSTERY BOX */}
        <div
          onClick={(e) => {
            e.stopPropagation();
            openMysteryBox();
          }}
          className={`
            relative text-white rounded-2xl overflow-hidden p-6 cursor-pointer 
            hover:shadow-2xl transition-all flex-1
            ${user?.userType === "wholesale"
              ? "bg-gradient-to-br from-indigo-600 via-blue-600 to-cyan-600"
              : "bg-gradient-to-br from-purple-500 via-pink-500 to-orange-500"
            }
          `}
        >
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16" />

          <div className="relative z-10">

            <div
              className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold mb-3
              ${user?.userType === "wholesale"
                  ? "bg-yellow-400 text-indigo-900"
                  : "bg-white text-purple-600"
                }`}
            >
              {user?.userType === "wholesale" ? "💼 WHOLESALE" : "🎁 RETAIL"}
            </div>

            <h3 className="text-xl font-bold mb-2">
              {user?.userType === "wholesale"
                ? "Bulk Mystery Box"
                : "Build Your Own Kit"}
            </h3>

            <p className={`text-sm mb-4 ${user?.userType === "wholesale"
              ? "text-blue-100"
              : "text-pink-100"
              }`}>
              {user?.userType === "wholesale"
                ? "Create high-volume kits & save up to 40%"
                : "Mix & match products and save more"}
            </p>

            <button className="text-sm font-semibold flex items-center gap-1">
              {user?.userType === "wholesale"
                ? "Build Bulk Kit"
                : "Create Kit"}
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* LOGIN / SCHOOL ESSENTIALS */}
        {!user ? (
          <div
            onClick={requireLogin}
            className="relative bg-gradient-to-br from-gray-700 to-gray-900 text-white rounded-2xl overflow-hidden p-6 cursor-pointer hover:shadow-xl transition-all flex-1"
          >
            <div className="relative z-10">
              <div className="inline-flex items-center gap-1 bg-white text-black px-3 py-1 rounded-full text-xs font-bold mb-3">
                🔒 LOGIN REQUIRED
              </div>

              <h3 className="text-xl font-bold mb-2">
                Unlock Member Benefits
              </h3>

              <p className="text-sm text-gray-200 mb-4">
                Sign in to access retail deals, bulk pricing & mystery boxes
              </p>

              <button className="text-sm font-semibold flex items-center gap-1">
                Login / Sign Up <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        ) : (
          <>
            {user?.userType === "retail" && (
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

                  <h3 className="text-xl font-bold mb-2">
                    School Essentials
                  </h3>

                  <p className="text-sm text-green-100 mb-4">
                    Complete range starting at ₹49
                  </p>

                  <button className="text-sm font-semibold flex items-center gap-1 hover:gap-2 transition-all">
                    Shop Now <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}
            {user?.userType === "wholesale" && (
              <div
                onClick={(e) => {
                  e.stopPropagation();
                  onOpenBulkOrderFast?.(); 
                }}
                className="relative bg-gradient-to-br from-slate-700 to-slate-900 text-white rounded-2xl overflow-hidden p-6 group cursor-pointer hover:shadow-xl transition-all flex-1"              >
                <div className="absolute bottom-0 right-0 w-24 h-24 bg-white/10 rounded-full translate-y-12 translate-x-12 pointer-events-none" />

                <div className="relative z-10">
                  <div className="inline-flex items-center gap-1 bg-white text-blue-700 px-3 py-1 rounded-full text-xs font-bold mb-3">
                    <Package className="w-3 h-3" />
                    BULK ORDER HUB
                  </div>

                  <h3 className="text-xl font-bold mb-2">
                    Wholesale Ordering
                  </h3>

                  <p className="text-sm text-blue-100 mb-4">
                    Bulk pricing • Split delivery • Corporate reorder
                  </p>

                  <button className="text-sm font-semibold flex items-center gap-1 hover:gap-2 transition-all">
                    Open Order Center <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}
          </>
        )}

      </div>
    </div>
  );
}