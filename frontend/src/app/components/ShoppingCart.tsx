import { X, Minus, Plus, Trash2, ShoppingBag, Gift } from "lucide-react";
import { useState } from "react";

export interface Product {
  _id: string;
  name: string;
  price: number;
  wholesalePrice: number;
  image: string;
  brand: string;
  stock: number;
  description?: string;
}

export interface CartItem extends Product {
  quantity: number;
}

interface ShoppingCartProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  userType: "retail" | "wholesale";
  onUpdateQuantity: (productId: string, quantity: number) => void;
  onRemoveItem: (productId: string) => void;
  user: any;
  onRequireLogin?: () => void;
  onClearCart?: () => void;
  onCheckoutNavigate?: () => void;
}

export function ShoppingCart({
  isOpen,
  onClose,
  items,
  userType,
  onUpdateQuantity,
  onRemoveItem,
  user,
  onRequireLogin,
  onClearCart,
  onCheckoutNavigate,
}: ShoppingCartProps) {
  const safeItems = Array.isArray(items) ? items : [];

  const subtotal = safeItems.reduce((sum, item) => {
    const price =
      userType === "wholesale" ? item.wholesalePrice || 0 : item.price || 0;

    return sum + price * item.quantity;
  }, 0);

  const getId = (item: any) => item._id || item.productId;
  const discount = subtotal >= 999 ? subtotal * 0.2 : 0;
  const tax = (subtotal - discount) * 0.18;
  const delivery = subtotal >= 500 ? 0 : 50;
  const total = subtotal - discount + tax + delivery;
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

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
        onClick={onClose}
      />

      {/* Cart Sidebar */}
      <div className="fixed right-0 top-0 bottom-0 w-full max-w-lg bg-white shadow-2xl z-50 flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 bg-gradient-to-r from-orange-500 to-red-500 text-white">
          <div>
            <h2 className="text-2xl font-bold">Shopping Cart</h2>
            <p className="text-sm text-orange-100">
              {safeItems.length} {safeItems.length === 1 ? "item" : "items"}
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-white/20 rounded-full"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto p-6 bg-gray-50">
          {safeItems.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-gray-400">
              <ShoppingBag className="w-24 h-24 mb-4 text-gray-300" />
              <p className="text-lg font-semibold text-gray-600">
                Your cart is empty
              </p>
              <p className="text-sm">Add some products!</p>
            </div>
          ) : (
            <div className="space-y-4">
              {safeItems.map((item) => {
                const price =
                  userType === "wholesale"
                    ? item.wholesalePrice || 0
                    : item.price || 0;

                return (
                  <div
                    key={item._id}
                    className="flex gap-4 bg-white p-4 rounded-xl shadow-sm border"
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-24 h-24 object-cover rounded-lg"
                    />

                    <div className="flex-1">
                      <h3 className="font-bold text-gray-900">{item.name}</h3>

                      <p className="text-xs text-orange-600 font-semibold">
                        {item.brand}
                      </p>

                      <div className="flex items-center justify-between mt-2">
                        <span className="text-lg font-bold text-orange-600">
                          ₹{price}
                        </span>

                        <div className="flex items-center gap-1 bg-gray-100 rounded-lg p-1">
                          <button
                            onClick={() =>
                              item.quantity > 1 &&
                              onUpdateQuantity(item._id, item.quantity - 1)
                            }
                            disabled={item.quantity <= 1}
                          >
                            <Minus className="w-4 h-4" />
                          </button>

                          <span className="w-8 text-center">
                            {item.quantity}
                          </span>

                          <button
                            onClick={() =>
                              onUpdateQuantity(item._id, item.quantity + 1)
                            }
                            disabled={item.quantity >= item.stock}
                          >
                            <Plus className="w-4 h-4" />
                          </button>
                        </div>
                      </div>

                      <div className="flex justify-between mt-2">
                        <span className="text-sm">
                          ₹{(price * item.quantity).toFixed(2)}
                        </span>

                        <button
                          onClick={() => onRemoveItem(getId(item))}
                          className="text-red-500"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Footer */}
        {safeItems.length > 0 && (
          <div className="border-t p-6 space-y-4">
            <div className="flex justify-between text-lg font-bold">
              <span>Total</span>
              <span>₹{total.toFixed(2)}</span>
            </div>

            <button
              onClick={() => {
                if (!user?._id) {
                  onRequireLogin?.();
                  showToast("Please login to continue", "error");
                  return;
                }

                onCheckoutNavigate?.();
              }}
              className="w-full bg-orange-500 text-white py-3 rounded-lg"
            >
              Proceed to Checkout
            </button>

            <button onClick={onClose} className="w-full border py-2 rounded-lg">
              Continue Shopping
            </button>
          </div>
        )}
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
    </>
  );
}
