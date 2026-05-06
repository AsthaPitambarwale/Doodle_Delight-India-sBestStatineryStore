import {
  Search,
  ShoppingCart,
  User,
  Heart,
  MapPin,
  Percent,
  Phone,
  Mail,
} from "lucide-react";

interface HeaderProps {
  cartCount: number;
  wishlistCount: number;
  onCartClick: () => void;
  onWishlistClick: () => void;
  onAccountClick: () => void;
  onSearchChange: (query: string) => void;
  onCategoryClick: (slug: string | null) => void;
  userType: "retail" | "wholesale";
  onUserTypeChange: (type: "retail" | "wholesale") => void;
  user: any;
  onBulkOrderClick: () => void;
  onAllProductsClick: () => void;
}

export function Header({
  cartCount,
  wishlistCount,
  onCartClick,
  onWishlistClick,
  onAccountClick,
  onSearchChange,
  onCategoryClick,
  userType,
  onUserTypeChange,
  user,
  onBulkOrderClick,
  onAllProductsClick,
}: HeaderProps) {
  return (
    <header className="sticky top-0 z-50 bg-white shadow-md">
      {/* Top promotional bar */}
      <div className="bg-gradient-to-r from-orange-500 via-orange-600 to-red-500 text-white">
        <div className="max-w-7xl mx-auto px-4 py-2">
          <div className="flex justify-between items-center text-xs sm:text-sm">
            <div className="flex items-center gap-2 truncate">
              <Percent className="w-4 h-4 shrink-0" />
              <span className="font-semibold truncate">
                Special Offer: Get FLAT 20% OFF on orders above ₹999
              </span>
            </div>

            <div className="hidden md:flex gap-4 items-center">
              <a
                href="tel:+911234567890"
                className="flex items-center gap-1 hover:text-orange-100"
              >
                <Phone className="w-3 h-3" />
                <span>+91 123 456 7890</span>
              </a>
              <span>|</span>
              <a
                href="mailto:info@Doodle Delight.com"
                className="flex items-center gap-1 hover:text-orange-100"
              >
                <Mail className="w-3 h-3" />
                <span>info@Doodledelight.com</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Main header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-3 md:py-4">
          {/* 🔥 Responsive Flex */}
          <div className="flex flex-col md:flex-row md:items-center gap-3 md:gap-6">
            {/* Row 1 (Logo + icons on mobile) */}
            <div className="flex items-center justify-between w-full md:w-auto">
              {/* Logo */}
              <button
                onClick={() => onCategoryClick(null)}
                className="flex items-center gap-3 group"
              >
                <img
                  src="assets/logos/Logo1.png"
                  alt="Doodle Delight logo"
                  className="h-12 sm:h-14 md:h-18 w-auto"
                />
              </button>

              {/* Mobile Icons */}
              <div className="flex md:hidden items-center gap-3">
                <button onClick={onWishlistClick} className="relative">
                  <Heart className="w-5 h-5" />
                  {wishlistCount > 0 && (
                    <span className="absolute -top-1 -right-1 bg-purple-500 text-white text-xs px-1 rounded-full">
                      {wishlistCount}
                    </span>
                  )}
                </button>

                <button onClick={onAccountClick}>
                  <User className="w-5 h-5" />
                </button>

                <button onClick={onCartClick} className="relative">
                  <ShoppingCart className="w-5 h-5" />
                  {cartCount > 0 && (
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs px-1 rounded-full">
                      {cartCount}
                    </span>
                  )}
                </button>
              </div>
            </div>

            {/* Search */}
            <div className="flex-1 max-w-full md:max-w-2xl">
              <div className="relative group">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search for Notebooks, Pens, Art Supplies..."
                  className="w-full pl-12 pr-4 py-2 md:py-3 border-2 border-gray-200 rounded-full focus:outline-none focus:border-orange-500 focus:ring-4 focus:ring-orange-100 transition-all text-sm md:text-base"
                  onChange={(e) => onSearchChange(e.target.value)}
                />
              </div>
            </div>

            {/* Desktop Actions */}
            <div className="hidden md:flex items-center gap-3">
              {/* User type toggle */}
              <div className="hidden lg:flex bg-gray-100 rounded-full p-1 gap-1"></div>

              {/* Wishlist */}
              <button
                onClick={onWishlistClick}
                className="relative flex flex-col items-center"
              >
                <Heart className="w-6 h-6" />
                <span className="text-xs">Wishlist</span>
                {wishlistCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-purple-500 text-white text-xs min-w-[20px] h-5 rounded-full flex items-center justify-center px-1.5 font-semibold">
                    {wishlistCount}
                  </span>
                )}
              </button>

              {/* Account */}
              <button
                onClick={onAccountClick}
                className="flex flex-col items-center"
              >
                <User className="w-6 h-6" />
                <span className="text-xs">
                  {user?.name ? user.name.split(" ")[0] : "Account"}
                </span>
              </button>

              {/* Cart */}
              <button
                onClick={onCartClick}
                className="relative flex flex-col items-center"
              >
                <ShoppingCart className="w-6 h-6" />
                <span className="text-xs">Cart</span>
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs min-w-[20px] h-5 rounded-full flex items-center justify-center px-1.5 font-semibold animate-pulse">
                    {cartCount}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Wholesale Banner (unchanged) */}
      {userType === "wholesale" && (
        <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white border-t border-blue-900">
          <div className="max-w-7xl mx-auto px-4 py-2 flex justify-between items-center text-xs sm:text-sm">
            <span className="font-semibold truncate">
              Need bulk quantities? Get custom quotes with exclusive wholesale
              pricing!
            </span>
            <button
              onClick={onBulkOrderClick}
              className="bg-white text-blue-600 px-3 py-1 rounded-full font-bold text-xs sm:text-sm"
            >
              Request Quote
            </button>
          </div>
        </div>
      )}

      {/* Navigation (scroll stays same) */}
      <div className="bg-gray-50 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4">
          <nav className="flex gap-1 overflow-x-auto py-2 scrollbar-hide text-sm">
            <button
              onClick={onAllProductsClick}
              className="whitespace-nowrap px-4 py-2 rounded-lg hover:bg-orange-500 hover:text-white"
            >
              All Products
            </button>
            <button
              onClick={() => onCategoryClick("notebooks")}
              className="whitespace-nowrap px-4 py-2 rounded-lg hover:bg-orange-500 hover:text-white"
            >
              Notebooks & Diaries
            </button>
            <button
              onClick={() => onCategoryClick("pens-pencils")}
              className="whitespace-nowrap px-4 py-2 rounded-lg hover:bg-orange-500 hover:text-white"
            >
              Pens & Pencils
            </button>
            <button
              onClick={() => onCategoryClick("art-supplies")}
              className="whitespace-nowrap px-4 py-2 rounded-lg hover:bg-orange-500 hover:text-white"
            >
              Art Supplies
            </button>
            <button
              onClick={() => onCategoryClick("office-supplies")}
              className="whitespace-nowrap px-4 py-2 rounded-lg hover:bg-orange-500 hover:text-white"
            >
              Office Supplies
            </button>
            <button
              onClick={() => onCategoryClick("school-essentials")}
              className="whitespace-nowrap px-4 py-2 rounded-lg hover:bg-orange-500 hover:text-white"
            >
              School Essentials
            </button>
            <button
              onClick={() => onCategoryClick("desk-organizers")}
              className="whitespace-nowrap px-4 py-2 rounded-lg hover:bg-orange-500 hover:text-white"
            >
              Desk Organizers
            </button>
          </nav>
        </div>
      </div>
    </header>
  );
}
