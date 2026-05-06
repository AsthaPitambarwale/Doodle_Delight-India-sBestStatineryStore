import { ShoppingCart, Eye, Heart, Star } from "lucide-react";

interface Product {
  _id: string;
  name: string;
  images?: string[];
  image?: string; // fallback support
  brand: string;
  price: number;
  wholesalePrice: number;
  stock: number;
  featured?: boolean;
}

interface ProductCardProps {
  product: Product;
  userType: "retail" | "wholesale";
  onAddToCart: (product: Product) => void;
  onViewDetails: (product: Product) => void;
  onToggleWishlist: (product: Product) => void;
  isInWishlist: boolean;
}

export function ProductCard({
  product,
  userType,
  onAddToCart,
  onViewDetails,
  onToggleWishlist,
  isInWishlist,
}: ProductCardProps) {
  const price =
    userType === "wholesale"
      ? product.wholesalePrice || product.price
      : product.price;

  const discount =
    product.wholesalePrice && product.price
      ? Math.round(
          ((product.price - product.wholesalePrice) / product.price) * 100,
        )
      : 0;

  const mainImage =
    (product.images && product.images.length > 0 && product.images[0]) ||
    product.image ||
    "/placeholder.png";

  return (
    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-2xl hover:border-orange-300 transition-all duration-300 group transform hover:-translate-y-1">
      {/* Image */}
      <div className="relative aspect-square bg-white flex items-center justify-center p-3">
        <img
          src={mainImage}
          alt={product.name}
          className="max-h-full max-w-full object-contain transition-transform duration-300 group-hover:scale-105"
        />

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-2">
          {userType === "wholesale" && discount > 0 && (
            <div className="bg-gradient-to-r from-red-500 to-pink-500 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg">
              {discount}% OFF
            </div>
          )}
          {product.featured && (
            <div className="bg-gradient-to-r from-yellow-400 to-orange-400 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg flex items-center gap-1">
              <Star className="w-3 h-3 fill-current" />
              Bestseller
            </div>
          )}
        </div>

        {product.stock > 0 && product.stock < 10 && (
          <div className="absolute top-3 right-3 bg-orange-500 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg animate-pulse">
            Only {product.stock} left!
          </div>
        )}

        {/* Hover Actions */}
        {/* Hover / Mobile Actions */}
        <div
          className="
    absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent
    opacity-100 md:opacity-0 md:group-hover:opacity-100
    transition-all duration-300
  "
        >
          <div
            className="
    absolute bottom-4 left-1/2 -translate-x-1/2
    flex gap-3 md:gap-2
    opacity-100 md:opacity-0 md:group-hover:opacity-100
  "
          >
            {/* VIEW BUTTON */}
            <button
              onClick={() => onViewDetails(product)}
              className="
        bg-white text-gray-900 p-3 rounded-full
        hover:bg-orange-500 hover:text-white
        transition-all shadow-lg active:scale-95
      "
            >
              <Eye className="w-5 h-5" />
            </button>

            {/* WISHLIST BUTTON */}
            <button
              onClick={() => onToggleWishlist(product)}
              className={`
        p-3 rounded-full transition-all shadow-lg active:scale-95
        ${
          isInWishlist
            ? "bg-red-500 text-white"
            : "bg-white text-gray-900 hover:bg-red-500 hover:text-white"
        }
      `}
            >
              <Heart
                className={`w-5 h-5 ${isInWishlist ? "fill-current" : ""}`}
              />
            </button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        <div className="flex items-center justify-between mb-2">
          <p className="text-xs font-semibold text-orange-600 uppercase tracking-wide">
            {product.brand || "Brand"}
          </p>

          <div className="flex items-center gap-1">
            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
            <span className="text-xs font-semibold text-gray-700">4.5</span>
          </div>
        </div>

        <h3 className="font-semibold text-gray-900 mb-3 line-clamp-2 min-h-[2.5rem] group-hover:text-orange-600 transition-colors">
          {product.name}
        </h3>

        <div className="flex items-center justify-between mb-4">
          <div>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
                ₹{price}
              </span>

              {userType === "wholesale" && product.wholesalePrice && (
                <span className="text-sm text-gray-400 line-through">
                  ₹{product.price}
                </span>
              )}
            </div>

            <p className="text-xs text-gray-500 mt-0.5">
              {userType === "wholesale"
                ? "Wholesale Price"
                : "Inclusive of all taxes"}
            </p>
          </div>
        </div>

        <button
          onClick={() => onAddToCart(product)}
          disabled={!product.stock}
          className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-orange-500 to-red-500 text-white py-3 px-4 rounded-lg hover:from-orange-600 hover:to-red-600 disabled:from-gray-300 disabled:to-gray-400 disabled:cursor-not-allowed font-semibold shadow-lg hover:shadow-xl transition-all transform active:scale-95"
        >
          <ShoppingCart className="w-5 h-5" />
          {!product.stock ? "Out of Stock" : "Add to Cart"}
        </button>
      </div>
    </div>
  );
}
