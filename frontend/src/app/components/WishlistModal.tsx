import { X, Heart, ShoppingCart, Trash2 } from "lucide-react";

export interface Product {
  _id: string;
  name: string;
  price: number;
  wholesalePrice: number;
  brand: string;
  image: string;
  stock: number;
}

interface WishlistModalProps {
  isOpen: boolean;
  onClose: () => void;
  items: Product[];
  userType: "retail" | "wholesale";
  onAddToCart: (product: Product) => void;
  onRemoveFromWishlist: (product: Product) => void;
  onViewDetails: (product: Product) => void;
  onClearWishlist: () => void;
}

export function WishlistModal({
  isOpen,
  onClose,
  items,
  userType,
  onAddToCart,
  onRemoveFromWishlist,
  onViewDetails,
  onClearWishlist,
}: WishlistModalProps) {
  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 animate-in fade-in duration-200"
        onClick={onClose}
      />

      {/* Wishlist sidebar */}
      <div className="fixed right-0 top-0 bottom-0 w-full max-w-lg bg-white shadow-2xl z-50 flex flex-col animate-in slide-in-from-right duration-300">
        {/* Header */}
        <div className="flex items-center justify-between p-6 bg-gradient-to-r from-purple-500 to-pink-500 text-white">
          <div>
            <h2 className="text-2xl font-bold">My Wishlist</h2>
            <p className="text-purple-100 text-sm">
              {items.length} {items.length === 1 ? "item" : "items"}
            </p>
          </div>

          <button
            onClick={onClose}
            className="p-2 hover:bg-white/20 rounded-full transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto p-6 bg-gray-50">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-gray-400">
              <Heart className="w-24 h-24 mb-4 text-gray-300" />
              <p className="text-lg font-semibold text-gray-600">
                Your wishlist is empty
              </p>
              <p className="text-sm">Add products you love!</p>
            </div>
          ) : (
            <div className="space-y-4">
              {items.map((item) => {
                const price =
                  userType === "wholesale" ? item.wholesalePrice : item.price;

                const discount =
                  userType === "wholesale"
                    ? Math.round(
                        ((item.price - item.wholesalePrice) / item.price) * 100,
                      )
                    : 0;

                return (
                  <div
                    key={item._id}
                    className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 hover:shadow-md transition-shadow"
                  >
                    <div className="flex gap-4">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-24 h-24 object-cover rounded-lg cursor-pointer hover:opacity-80 transition-opacity"
                        onClick={() => onViewDetails(item)}
                      />

                      <div className="flex-1">
                        <h3
                          className="font-bold text-gray-900 mb-1 line-clamp-2 cursor-pointer hover:text-orange-600 transition-colors"
                          onClick={() => onViewDetails(item)}
                        >
                          {item.name}
                        </h3>

                        <p className="text-xs text-orange-600 font-semibold mb-2">
                          {item.brand}
                        </p>

                        <div className="flex items-center gap-2 mb-3">
                          <span className="text-lg font-bold text-transparent bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text">
                            ₹{price}
                          </span>

                          {userType === "wholesale" && (
                            <>
                              <span className="text-sm text-gray-400 line-through">
                                ₹{item.price}
                              </span>

                              <span className="bg-red-100 text-red-600 px-2 py-0.5 rounded-full text-xs font-bold">
                                {discount}% OFF
                              </span>
                            </>
                          )}
                        </div>

                        <div className="flex gap-2">
                          <button
                            onClick={() => {
                              onAddToCart(item);
                              onRemoveFromWishlist(item);
                            }}
                            disabled={item.stock === 0}
                            className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-orange-500 to-red-500 text-white py-2 px-3 rounded-lg hover:from-orange-600 hover:to-red-600 disabled:from-gray-300 disabled:to-gray-400 disabled:cursor-not-allowed font-semibold text-sm"
                          >
                            <ShoppingCart className="w-4 h-4" />
                            {item.stock === 0 ? "Out of Stock" : "Add to Cart"}
                          </button>

                          <button
                            onClick={() => onRemoveFromWishlist(item)}
                            className="p-2 hover:bg-red-100 text-red-600 rounded-lg transition-colors"
                          >
                            <Trash2 className="w-5 h-5" />
                          </button>
                        </div>

                        {item.stock > 0 && item.stock < 10 && (
                          <p className="text-xs text-orange-600 mt-2">
                            Only {item.stock} left in stock!
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="border-t border-gray-200 bg-white p-6 space-y-3">
            {/*Move All to Cart */}
            <button
              onClick={() => {
                items.forEach((item) => {
                  if (item.stock > 0) onAddToCart(item);
                });

                onClearWishlist(); // 🚀 cleaner
              }}
              className="w-full bg-gradient-to-r from-orange-500 to-red-500 text-white py-3 px-4 rounded-xl font-semibold hover:from-orange-600 hover:to-red-600 transition-all"
            >
              Move All to Cart
            </button>

            {/* Continue shopping */}
            <button
              onClick={onClose}
              className="w-full border-2 border-gray-300 py-3 px-4 rounded-xl hover:bg-gray-50 font-semibold"
            >
              Continue Shopping
            </button>
          </div>
        )}
      </div>
    </>
  );
}
