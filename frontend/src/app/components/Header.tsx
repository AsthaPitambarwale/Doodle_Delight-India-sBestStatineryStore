import {
  Search,
  ShoppingCart,
  User,
  Heart,
  MapPin,
  Percent,
  Phone,
  Mail,
  Bell,
} from "lucide-react";
import { useState, useEffect, useRef } from "react";

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
  notifications?: any[];
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
  user,
  onBulkOrderClick,
  onAllProductsClick,
  notifications = [],
}: HeaderProps) {
  const [open, setOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  const unreadCount =
    notifications?.filter((n) => n?.read === false).length || 0;

  useEffect(() => {
    const handleClickOutside = (e: any) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

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
          {/* Responsive Flex */}
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
              <div className="flex md:hidden items-center gap-4 relative">
                {/* Notifications */}
                <div
                  ref={wrapperRef}
                  className="relative flex flex-col items-center cursor-pointer"
                  onClick={() => setOpen(!open)}
                >
                  <div className="relative">
                    <Bell className="w-6 h-6 text-gray-700" />

                    {unreadCount > 0 && !open && (
                      <span className="absolute -top-2 -right-2 bg-red-500 text-white text-[10px] min-w-[18px] h-[18px] rounded-full flex items-center justify-center font-bold">
                        {unreadCount}
                      </span>
                    )}
                  </div>

                  {/* MOBILE DROPDOWN */}
                  {open && (
                    <div className="absolute right-0 top-12 w-72 bg-white border border-gray-200 shadow-2xl rounded-xl z-50 overflow-hidden">
                      <div className="p-3 font-bold border-b bg-gray-50 text-gray-800">
                        Notifications
                      </div>

                      <div className="max-h-80 overflow-y-auto">
                        {!notifications || notifications.length === 0 ? (
                          <div className="p-4 text-sm text-gray-500 text-center">
                            No notifications
                          </div>
                        ) : (
                          notifications.map((n, i) => (
                            <div
                              key={i}
                              className="p-3 border-b hover:bg-gray-50 transition"
                            >
                              <p className="font-semibold text-sm text-gray-800">
                                {n.title}
                              </p>

                              <p className="text-sm text-gray-600 mt-1">
                                {n.message}
                              </p>
                            </div>
                          ))
                        )}
                      </div>
                    </div>
                  )}
                </div>

                {/* Wishlist */}
                <button
                  onClick={onWishlistClick}
                  className="relative flex flex-col items-center group"
                >
                  <div className="relative">
                    <Heart className="w-6 h-6 text-gray-700" />

                    {wishlistCount > 0 && (
                      <span className="absolute -top-2 -right-2 bg-purple-500 text-white text-[10px] min-w-[18px] h-[18px] rounded-full flex items-center justify-center font-bold">
                        {wishlistCount}
                      </span>
                    )}
                  </div>
                </button>

                {/* Account */}
                <button
                  onClick={onAccountClick}
                  className="flex flex-col items-center"
                >
                  <User className="w-6 h-6 text-gray-700" />
                </button>

                {/* Cart */}
                <button
                  onClick={onCartClick}
                  className="relative flex flex-col items-center"
                >
                  <div className="relative">
                    <ShoppingCart className="w-6 h-6 text-gray-700" />

                    {cartCount > 0 && (
                      <span className="absolute -top-2 -right-2 bg-red-500 text-white text-[10px] min-w-[18px] h-[18px] rounded-full flex items-center justify-center font-bold animate-pulse">
                        {cartCount}
                      </span>
                    )}
                  </div>
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
            <div className="hidden md:flex items-center gap-6 ml-auto">
              {/* Notifications */}
              <div
                ref={wrapperRef}
                className="relative flex flex-col items-center cursor-pointer"
                onClick={() => setOpen(!open)}
              >
                <div className="relative">
                  <Bell className="w-6 h-6 text-gray-700 hover:text-orange-500 transition" />

                  {unreadCount > 0 && !open && (
                    <span className="absolute -top-2 -right-2 bg-red-500 text-white text-[10px] min-w-[18px] h-[18px] rounded-full flex items-center justify-center font-bold">
                      {unreadCount}
                    </span>
                  )}
                </div>

                <span className="text-xs font-semibold mt-1 text-gray-700">
                  Notifications
                </span>

                {/* DESKTOP DROPDOWN */}
                {open && (
                  <div className="absolute right-0 top-14 w-80 bg-white border border-gray-200 shadow-2xl rounded-xl z-50 overflow-hidden">
                    <div className="p-3 font-bold border-b bg-gray-50 text-gray-800">
                      Notifications
                    </div>

                    <div className="max-h-96 overflow-y-auto">
                      {!notifications || notifications.length === 0 ? (
                        <div className="p-4 text-sm text-gray-500 text-center">
                          No notifications
                        </div>
                      ) : (
                        notifications.map((n, i) => (
                          <div
                            key={i}
                            className="p-3 border-b hover:bg-gray-50 transition"
                          >
                            <p className="font-semibold text-sm text-gray-800">
                              {n.title}
                            </p>

                            <p className="text-sm text-gray-600 mt-1">
                              {n.message}
                            </p>
                          </div>
                        ))
                      )}
                    </div>
                  </div>
                )}
              </div>

              {/* Wishlist */}
              <button
                onClick={onWishlistClick}
                className="relative flex flex-col items-center group"
              >
                <div className="relative">
                  <Heart className="w-6 h-6 text-gray-700 group-hover:text-pink-500 transition" />

                  {wishlistCount > 0 && (
                    <span className="absolute -top-2 -right-2 bg-purple-500 text-white text-[10px] min-w-[18px] h-[18px] rounded-full flex items-center justify-center font-bold">
                      {wishlistCount}
                    </span>
                  )}
                </div>

                <span className="text-xs font-semibold mt-1 text-gray-700">
                  Wishlist
                </span>
              </button>

              {/* Account */}
              <button
                onClick={onAccountClick}
                className="flex flex-col items-center group"
              >
                <User className="w-6 h-6 text-gray-700 group-hover:text-orange-500 transition" />

                <span className="text-xs font-semibold mt-1 text-gray-700">
                  {user?.name ? user.name.split(" ")[0] : "Account"}
                </span>
              </button>

              {/* Cart */}
              <button
                onClick={onCartClick}
                className="relative flex flex-col items-center group"
              >
                <div className="relative">
                  <ShoppingCart className="w-6 h-6 text-gray-700 group-hover:text-orange-500 transition" />

                  {cartCount > 0 && (
                    <span className="absolute -top-2 -right-2 bg-red-500 text-white text-[10px] min-w-[18px] h-[18px] rounded-full flex items-center justify-center font-bold animate-pulse">
                      {cartCount}
                    </span>
                  )}
                </div>

                <span className="text-xs font-semibold mt-1 text-gray-700">
                  Cart
                </span>
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
