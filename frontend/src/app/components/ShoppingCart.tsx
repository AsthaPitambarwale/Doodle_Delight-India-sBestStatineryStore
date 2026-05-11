import {
  X,
  Minus,
  Plus,
  Trash2,
  ShoppingBag,
  CheckCircle2,
  Sparkles,
} from "lucide-react";
import { useState } from "react";

export interface Product {
  _id: string;
  productId?: string;
  name: string;
  price: number;
  wholesalePrice: number;
  tierPricing?: {
    minQty: number;
    price: number;
  }[];
  image?: string;
  images?: string[];
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
  onCheckoutNavigate,
}: ShoppingCartProps) {
  const [toast, setToast] = useState<{
    message: string;
    type: "success" | "error";
  } | null>(null);

  const safeItems = Array.isArray(items) ? items : [];

  const getId = (item: any) => item._id || item.productId;

  const showToast = (
    message: string,
    type: "success" | "error" = "success",
  ) => {
    setToast({ message, type });

    setTimeout(() => {
      setToast(null);
    }, 2500);
  };

  const getImage = (item: CartItem) => {
    if (item.image) return item.image;

    if (Array.isArray(item.images) && item.images.length > 0) {
      return item.images[0];
    }

    return "/placeholder.png";
  };

  const getBasePrice = (item: CartItem) => {
    return userType === "wholesale"
      ? item.wholesalePrice || item.price
      : item.price;
  };

  const getTierPrice = (item: CartItem) => {
    const basePrice = getBasePrice(item);

    if (!Array.isArray(item.tierPricing) || item.tierPricing.length === 0) {
      return basePrice;
    }

    const sortedTiers = [...item.tierPricing].sort(
      (a, b) => a.minQty - b.minQty,
    );

    let finalPrice = basePrice;

    sortedTiers.forEach((tier) => {
      if (item.quantity >= tier.minQty) {
        finalPrice = tier.price;
      }
    });

    return finalPrice;
  };

  if (!isOpen) return null;

  return (
    <>
      {/* BACKDROP */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
        onClick={onClose}
      />

      {/* CART */}
      <div className="fixed right-0 top-0 bottom-0 w-full max-w-xl bg-white shadow-2xl z-50 flex flex-col">
        {/* HEADER */}
        <div className="relative overflow-hidden bg-gradient-to-r from-orange-500 via-red-500 to-pink-500 text-white p-6">
          <div className="absolute inset-0 opacity-20">
            <div className="absolute top-0 right-0 w-40 h-40 bg-white rounded-full blur-3xl" />
          </div>

          <div className="relative flex items-center justify-between">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <Sparkles className="w-4 h-4" />

                <p className="text-xs uppercase tracking-widest font-semibold">
                  Premium Cart
                </p>
              </div>

              <h2 className="text-3xl font-black">Shopping Cart</h2>

              <p className="text-sm text-orange-100 mt-1">
                {safeItems.length} {safeItems.length === 1 ? "item" : "items"}
              </p>
            </div>

            <button
              onClick={onClose}
              className="w-11 h-11 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center transition"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* ITEMS */}
        <div className="flex-1 overflow-y-auto bg-gradient-to-b from-gray-50 to-white p-5">
          {safeItems.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center">
              <div className="w-28 h-28 rounded-full bg-orange-100 flex items-center justify-center mb-5">
                <ShoppingBag className="w-14 h-14 text-orange-500" />
              </div>

              <h3 className="text-2xl font-bold text-gray-800">
                Your cart is empty
              </h3>

              <p className="text-gray-500 mt-2">
                Add products to continue shopping
              </p>
            </div>
          ) : (
            <div className="space-y-5">
              {safeItems.map((item) => {
                const originalPrice = getBasePrice(item);
                const currentPrice = getTierPrice(item);

                return (
                  <div
                    key={getId(item)}
                    className="group relative bg-white rounded-3xl border border-gray-200 shadow-sm hover:shadow-2xl transition-all duration-300 overflow-hidden"
                  >
                    {/* ACTIVE TIER GLOW */}
                    {currentPrice < originalPrice && (
                      <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-green-400 to-emerald-500" />
                    )}

                    <div className="p-4">
                      <div className="flex gap-4">
                        {/* IMAGE */}
                        <div className="relative">
                          <div className="w-28 h-28 rounded-2xl bg-gray-100 overflow-hidden border">
                            <img
                              src={getImage(item)}
                              alt={item.name}
                              className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                            />
                          </div>

                          {currentPrice < originalPrice && (
                            <div className="absolute -top-2 -right-2 bg-green-500 text-white text-[10px] font-bold px-2 py-1 rounded-full shadow-lg">
                              SAVING
                            </div>
                          )}
                        </div>

                        {/* CONTENT */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-3">
                            <div>
                              <p className="text-xs font-bold uppercase tracking-wide text-orange-600">
                                {item.brand}
                              </p>

                              <h3 className="font-bold text-gray-900 text-lg leading-tight mt-1">
                                {item.name}
                              </h3>
                            </div>

                            <button
                              onClick={() => onRemoveItem(getId(item))}
                              className="text-gray-400 hover:text-red-500 transition"
                            >
                              <Trash2 className="w-5 h-5" />
                            </button>
                          </div>

                          {/* BULK PRICING */}
                          {item.tierPricing &&
                            item.tierPricing.length > 0 &&
                            (() => {
                              const sortedTiers = [...item.tierPricing].sort(
                                (a, b) => a.minQty - b.minQty,
                              );

                              const activeTier =
                                [...sortedTiers]
                                  .reverse()
                                  .find(
                                    (tier) => item.quantity >= tier.minQty,
                                  ) || null;

                              return (
                                <div className="mt-4">
                                  <div className="flex items-center gap-2 mb-3">
                                    <CheckCircle2 className="w-4 h-4 text-green-600" />

                                    <p className="text-xs font-bold uppercase tracking-wider text-gray-500">
                                      Bulk Pricing
                                    </p>
                                  </div>

                                  <div className="flex flex-wrap gap-2">
                                    {sortedTiers.map(
                                      (tier: any, idx: number) => {
                                        const active =
                                          userType === "wholesale" &&
                                          activeTier?.minQty === tier.minQty;

                                        const savings =
                                          originalPrice > tier.price
                                            ? Math.round(
                                              ((originalPrice - tier.price) /
                                                originalPrice) *
                                              100,
                                            )
                                            : 0;

                                        return (
                                          <div
                                            key={idx}
                                            className={`
                relative overflow-hidden rounded-2xl border px-3 py-2 min-w-[90px]
                transition-all duration-300
                ${active
                                                ? "bg-gradient-to-r from-green-500 to-emerald-500 text-white border-green-500 shadow-lg scale-105"
                                                : "bg-gray-50 border-gray-200 text-gray-700"
                                              }
              `}
                                          >
                                            {active && (
                                              <div className="absolute top-0 right-0 text-[9px] bg-white/20 px-2 py-0.5 rounded-bl-xl">
                                                ACTIVE
                                              </div>
                                            )}

                                            <div className="text-[11px] font-bold">
                                              Buy {tier.minQty}+
                                            </div>

                                            <div className="text-base font-black">
                                              ₹{tier.price}
                                            </div>

                                            {savings > 0 && (
                                              <div
                                                className={`text-[10px] font-semibold ${active
                                                    ? "text-green-100"
                                                    : "text-green-600"
                                                  }`}
                                              >
                                                Save {savings}%
                                              </div>
                                            )}
                                          </div>
                                        );
                                      },
                                    )}
                                  </div>
                                </div>
                              );
                            })()}

                          {/* PRICE + QUANTITY SECTION */}
                          <div className="mt-5 bg-gradient-to-br from-gray-50 to-white border border-gray-200 rounded-3xl p-4 shadow-sm">
                            <div className="flex items-center justify-between gap-4 flex-wrap">
                              {/* LEFT SIDE */}
                              <div className="space-y-3">
                                {/* SINGLE PRICE */}
                                <div>
                                  <p className="text-[11px] uppercase tracking-widest text-gray-500 font-bold mb-1">
                                    Per Item Price
                                  </p>

                                  <div className="flex items-center gap-3">
                                    <span className="text-3xl font-black bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">
                                      ₹{currentPrice.toFixed(2)}
                                    </span>

                                    {currentPrice < originalPrice && (
                                      <span className="text-lg text-gray-400 line-through font-semibold">
                                        ₹{originalPrice.toFixed(2)}
                                      </span>
                                    )}
                                  </div>
                                </div>

                                {/* QUANTITY X PRICE */}
                                <div className="flex items-center gap-2 flex-wrap">
                                  <div className="bg-orange-100 text-orange-700 px-3 py-1 rounded-xl text-sm font-black">
                                    {item.quantity} Qty
                                  </div>

                                  <span className="text-gray-400 font-bold">
                                    ×
                                  </span>

                                  <div className="bg-gray-100 text-gray-700 px-3 py-1 rounded-xl text-sm font-bold">
                                    ₹{currentPrice.toFixed(2)}
                                  </div>
                                </div>

                                {/* FINAL TOTAL */}
                                <div>
                                  <p className="text-[11px] uppercase tracking-widest text-gray-500 font-bold mb-1">
                                    Item Total
                                  </p>

                                  <div className="flex items-center gap-3">
                                    <span className="text-4xl font-black bg-gradient-to-r from-green-500 to-emerald-500 bg-clip-text text-transparent">
                                      ₹
                                      {(currentPrice * item.quantity).toFixed(
                                        2,
                                      )}
                                    </span>

                                    {currentPrice < originalPrice && (
                                      <div className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-black">
                                        Saved ₹
                                        {(
                                          (originalPrice - currentPrice) *
                                          item.quantity
                                        ).toFixed(2)}
                                      </div>
                                    )}
                                  </div>
                                </div>
                              </div>

                              {/* QUANTITY CONTROLS */}
                              <div className="flex flex-col items-center gap-3">
                                <p className="text-[11px] uppercase tracking-widest text-gray-500 font-bold">
                                  Quantity
                                </p>

                                <div className="flex items-center gap-2 bg-white border border-gray-200 rounded-2xl p-2 shadow-sm">
                                  {/* MINUS */}
                                  <button
                                    onClick={() =>
                                      item.quantity > 1 &&
                                      onUpdateQuantity(
                                        getId(item),
                                        item.quantity - 1,
                                      )
                                    }
                                    disabled={item.quantity <= 1}
                                    className="
            w-11 h-11
            rounded-xl
            bg-gray-50
            hover:bg-orange-100
            text-gray-700
            disabled:opacity-40
            transition-all
            flex items-center justify-center
          "
                                  >
                                    <Minus className="w-5 h-5" />
                                  </button>

                                  {/* QTY */}
                                  <div className="w-14 text-center">
                                    <div className="text-2xl font-black text-gray-900">
                                      {item.quantity}
                                    </div>

                                    <div className="text-[10px] text-gray-400 font-semibold uppercase tracking-wide">
                                      Units
                                    </div>
                                  </div>

                                  {/* PLUS */}
                                  <button
                                    onClick={() =>
                                      onUpdateQuantity(
                                        getId(item),
                                        item.quantity + 1,
                                      )
                                    }
                                    disabled={item.quantity >= item.stock}
                                    className="
            w-11 h-11
            rounded-xl
            bg-gray-50
            hover:bg-green-100
            text-gray-700
            disabled:opacity-40
            transition-all
            flex items-center justify-center
          "
                                  >
                                    <Plus className="w-5 h-5" />
                                  </button>
                                </div>

                                {/* STOCK */}
                                <div className="text-xs font-bold text-gray-500">
                                  Stock: {item.stock}
                                </div>
                              </div>
                            </div>
                          </div>

                          {/* LIVE SAVINGS MESSAGE */}
                          {item.tierPricing && item.tierPricing.length > 0 && (
                            <div className="mt-4">
                              {(() => {
                                const nextTier = [...item.tierPricing]
                                  .sort((a, b) => a.minQty - b.minQty)
                                  .find((tier) => item.quantity < tier.minQty);

                                if (!nextTier) {
                                  return (
                                    <div className="bg-green-50 border border-green-200 text-green-700 text-xs font-bold px-4 py-3 rounded-2xl">
                                      🎉 Maximum bulk discount unlocked
                                    </div>
                                  );
                                }

                                return (
                                  <div className="bg-orange-50 border border-orange-200 text-orange-700 text-xs font-bold px-4 py-3 rounded-2xl">
                                    Add {nextTier.minQty - item.quantity} more
                                    to unlock ₹{nextTier.price} pricing
                                  </div>
                                );
                              })()}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* FOOTER */}
        {safeItems.length > 0 && (
          <div className="border-t bg-white p-5">
            <button
              onClick={() => {
                if (!user?._id) {
                  onRequireLogin?.();
                  showToast("Please login to continue", "error");
                  return;
                }

                onCheckoutNavigate?.();
              }}
              className="w-full h-14 rounded-2xl bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-bold text-lg shadow-xl hover:shadow-2xl transition-all duration-300"
            >
              Proceed to Checkout
            </button>

            <button
              onClick={onClose}
              className="w-full mt-3 h-12 rounded-2xl border border-gray-200 hover:bg-gray-50 font-semibold text-gray-700 transition"
            >
              Continue Shopping
            </button>
          </div>
        )}
      </div>

      {/* TOAST */}
      {toast && (
        <div className="fixed top-5 left-1/2 -translate-x-1/2 z-[100]">
          <div
            className={`
              px-6 py-4 rounded-2xl shadow-2xl border
              flex items-center gap-3 animate-in fade-in slide-in-from-top
              ${toast.type === "success"
                ? "bg-green-50 text-green-700 border-green-200"
                : "bg-red-50 text-red-700 border-red-200"
              }
            `}
          >
            <span className="font-bold">{toast.message}</span>
          </div>
        </div>
      )}
    </>
  );
}
