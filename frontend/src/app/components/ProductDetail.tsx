import {
  X,
  ShoppingCart,
  Heart,
  Star,
  Truck,
  Shield,
  Minus,
  Plus,
  Zap,
  RotateCcw,
  CheckCircle2,
  Sparkles,
  BadgePercent,
  Eye,
  Share2,
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";

type Product = any;

interface Props {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
  userType: "retail" | "wholesale";
  onAddToCart: (product: Product & { quantity?: number }) => void;
  onToggleWishlist: (product: Product) => void;
  isInWishlist: boolean;
}

export function ProductDetail({
  product,
  isOpen,
  onClose,
  userType,
  onAddToCart,
  onToggleWishlist,
  isInWishlist,
}: Props) {
  const [qty, setQty] = useState(1);
  const [activeImage, setActiveImage] = useState(0);
  const [tab, setTab] = useState("Overview");
  const [variant, setVariant] = useState<any>(null);
  const [showAddedToast, setShowAddedToast] = useState(false);

  const getVariants = (product: any) => {
    if (!product) return [];

    switch (product.category) {
      case "notebooks":
        return [
          { label: "A5 - Soft Cover", price: product.price },
          { label: "A5 - Hard Cover", price: product.price + 100 },
          { label: "A4 - Hard Cover", price: product.price + 200 },
          { label: "Premium Leather", price: product.price + 400 },
        ];

      case "pens-pencils":
        return [
          { label: "Blue Ink", price: product.price },
          { label: "Black Ink", price: product.price },
          { label: "Red Ink", price: product.price },
          { label: "Pack of 100", price: product.price * 4 },
          { label: "Pack of 200", price: product.price * 8 },
        ];

      case "art-supplies":
        return [
          { label: "Basic Kit", price: product.price },
          { label: "Starter Kit", price: product.price + 200 },
          { label: "Professional Kit", price: product.price + 600 },
          { label: "Pack of 12 Colors", price: product.price },
          { label: "Pack of 24 Colors", price: product.price * 1.8 },
        ];

      case "office-supplies":
        return [
          { label: "Single Item", price: product.price },
          { label: "Pack of 3", price: product.price * 2.5 },
          { label: "Pack of 6", price: product.price * 4.5 },
          { label: "Bulk Pack", price: product.price * 8 },
        ];

      case "school-essentials":
        return [
          { label: "Basic Set", price: product.price },
          { label: "Standard Set", price: product.price + 200 },
          { label: "Full Kit", price: product.price + 500 },
          { label: "Back-to-School Combo", price: product.price + 800 },
        ];

      case "desk-organizers":
        return [
          { label: "Small", price: product.price },
          { label: "Medium", price: product.price + 200 },
          { label: "Large", price: product.price + 400 },
          { label: "Wooden Premium", price: product.price + 800 },
        ];

      default:
        return [];
    }
  };

  const variants = useMemo(() => getVariants(product), [product]);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "auto";
  }, [isOpen]);

  useEffect(() => {
    setActiveImage(0);
  }, [product]);

  useEffect(() => {
    if (variants.length > 0) {
      setVariant(variants[0]);
    } else {
      setVariant(null);
    }
  }, [variants]);

  const images = useMemo(() => {
    if (Array.isArray(product?.images) && product.images.length > 0) {
      return product.images.filter(
        (img: any) => typeof img === "string" && img.trim() !== "",
      );
    }

    if (typeof product?.image === "string" && product.image.trim() !== "") {
      return [product.image];
    }

    return ["https://via.placeholder.com/400"];
  }, [product]);

  if (!isOpen || !product?._id) return null;

  const safeProduct = {
    _id: product?._id || "",
    name: product?.name || "Untitled Product",
    price: Number(product?.price) || 0,
    wholesalePrice: Number(product?.wholesalePrice) || 0,
    stock: Number(product?.stock) || 0,
    brand: product?.brand || "Unknown",
    description: product?.description || product?.desc || "",
  };

  const basePrice =
    userType === "wholesale"
      ? safeProduct.wholesalePrice || safeProduct.price
      : safeProduct.price;

  const price = variant
    ? userType === "wholesale"
      ? variant.wholesalePrice || variant.price
      : variant.price
    : basePrice;

  const discount =
    safeProduct.wholesalePrice && safeProduct.price
      ? Math.round(
          ((safeProduct.price - safeProduct.wholesalePrice) /
            safeProduct.price) *
            100,
        )
      : 0;

  const stockText =
    safeProduct.stock > 10
      ? "In Stock"
      : safeProduct.stock > 0
        ? `Only ${safeProduct.stock} left`
        : "Out of Stock";

  const buyNow = () => {
    onAddToCart({
      ...product,
      selectedVariant: variant,
      quantity: qty,
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-md flex justify-center items-end md:items-center">
      <div
        className="
        bg-gradient-to-br from-white to-orange-50
        w-full md:max-w-7xl
        h-[100dvh] md:h-[92vh]
        rounded-t-[28px] md:rounded-[32px]
        overflow-hidden
        shadow-[0_20px_80px_rgba(0,0,0,0.35)]
        border border-white/40
        flex flex-col
        animate-in fade-in zoom-in duration-300
      "
      >
        {/* HEADER */}
        <div className="relative overflow-hidden bg-gradient-to-r from-orange-500 via-red-500 to-pink-500 text-white px-5 md:px-7 py-4">
          <div className="absolute inset-0 opacity-20">
            <div className="absolute -top-10 right-0 w-40 h-40 bg-white rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-10 w-32 h-32 bg-yellow-300 rounded-full blur-3xl" />
          </div>

          <div className="relative flex justify-between items-center">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <Sparkles className="w-4 h-4" />
                <p className="text-xs font-semibold uppercase tracking-widest">
                  Premium Collection
                </p>
              </div>

              <h2 className="font-bold text-xl md:text-2xl">Product Details</h2>
            </div>

            <button
              onClick={onClose}
              className="w-11 h-11 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center transition-all"
            >
              <X />
            </button>
          </div>
        </div>

        {/* BODY */}
        <div className="grid md:grid-cols-12 gap-6 p-4 md:p-6 overflow-y-auto flex-1">
          {/* LEFT */}
          <div className="md:col-span-5 space-y-4">
            {/* MAIN IMAGE */}
            <div className="relative overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-xl group">
              <div className="absolute top-4 left-4 z-10 flex gap-2">
                {discount > 0 && (
                  <div className="bg-red-500 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg flex items-center gap-1">
                    <BadgePercent size={14} />
                    {discount}% OFF
                  </div>
                )}

                <div className="bg-black/70 text-white px-3 py-1 rounded-full text-xs font-semibold backdrop-blur">
                  {safeProduct.brand}
                </div>
              </div>

              <img
                src={images?.[activeImage] || "/placeholder.png"}
                className="w-full h-[320px] md:h-[520px] object-contain bg-white p-6 transition duration-500 group-hover:scale-105"
              />

              <button className="absolute bottom-4 right-4 bg-white/90 backdrop-blur shadow-lg rounded-full p-3 hover:scale-110 transition">
                <Eye size={18} />
              </button>
            </div>

            {/* THUMBNAILS */}
            <div className="flex gap-3 overflow-x-auto pb-2">
              {images.map((img: string, i: number) => (
                <button
                  key={i}
                  onClick={() => setActiveImage(i)}
                  className={`
                    min-w-[80px] h-[80px]
                    rounded-2xl overflow-hidden border-2 transition-all
                    ${
                      activeImage === i
                        ? "border-orange-500 shadow-lg scale-105"
                        : "border-gray-200 hover:border-orange-300"
                    }
                  `}
                >
                  <img src={img} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>

            {/* ACTIONS */}
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => onToggleWishlist(product)}
                className={`
                  h-14 rounded-2xl font-semibold flex items-center justify-center gap-2 transition-all shadow-lg
                  ${
                    isInWishlist
                      ? "bg-red-500 text-white"
                      : "bg-white border border-gray-200 hover:border-red-400"
                  }
                `}
              >
                <Heart className={isInWishlist ? "fill-white" : ""} size={18} />
                {isInWishlist ? "Wishlisted" : "Wishlist"}
              </button>

              <button className="h-14 rounded-2xl bg-white border border-gray-200 hover:border-orange-400 font-semibold flex items-center justify-center gap-2 shadow-lg transition-all">
                <Share2 size={18} />
                Share
              </button>
            </div>

            {/* QTY */}
            <div className="bg-white border border-gray-200 rounded-2xl p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-bold text-gray-900">Quantity</p>
                  <p className="text-sm text-gray-500">
                    Select required quantity
                  </p>
                </div>

                <div className="flex items-center gap-3 bg-gray-100 rounded-2xl p-2">
                  <button
                    onClick={() => setQty((q) => Math.max(1, q - 1))}
                    className="w-10 h-10 rounded-xl bg-white shadow flex items-center justify-center hover:bg-orange-50"
                  >
                    <Minus size={18} />
                  </button>

                  <span className="w-10 text-center font-bold text-lg">
                    {qty}
                  </span>

                  <button
                    onClick={() => setQty((q) => q + 1)}
                    className="w-10 h-10 rounded-xl bg-white shadow flex items-center justify-center hover:bg-orange-50"
                  >
                    <Plus size={18} />
                  </button>
                </div>
              </div>
            </div>

            {/* CTA */}
            <div className="grid md:grid-cols-2 gap-4">
              <button
                onClick={buyNow}
                disabled={safeProduct.stock <= 0}
                className={`
    bg-black text-white py-4 rounded-2xl
    font-bold text-lg
    shadow-xl
    transition-all duration-300
    flex items-center justify-center gap-3
    ${
      safeProduct.stock <= 0
        ? "opacity-50 cursor-not-allowed"
        : "hover:bg-gray-900 hover:shadow-2xl hover:scale-[1.02]"
    }
  `}
              >
                <Zap size={20} />
                {safeProduct.stock <= 0 ? "Out of Stock" : "Buy Now"}
              </button>

              <button
                disabled={safeProduct.stock <= 0}
                onClick={() => {
                  if (safeProduct.stock <= 0) return;

                  onAddToCart({
                    ...product,
                    selectedVariant: variant,
                    quantity: qty,
                  });

                  setShowAddedToast(true);

                  setTimeout(() => {
                    setShowAddedToast(false);
                  }, 2500);
                }}
                className={`
    bg-gradient-to-r from-orange-500 to-red-500
    text-white py-4 rounded-2xl
    font-bold text-lg
    shadow-xl
    transition-all duration-300
    flex items-center justify-center gap-3
    ${
      safeProduct.stock <= 0
        ? "opacity-50 cursor-not-allowed"
        : "hover:from-orange-600 hover:to-red-600 hover:shadow-2xl hover:scale-[1.02]"
    }
  `}
              >
                <ShoppingCart size={20} />
                {safeProduct.stock <= 0 ? "Out of Stock" : "Add to Cart"}
              </button>
            </div>
          </div>

          {/* RIGHT */}
          <div className="md:col-span-7 space-y-5">
            {/* TOP */}
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-2 bg-green-100 text-green-700 px-4 py-2 rounded-full text-sm font-semibold">
                <CheckCircle2 size={16} />
                Verified Product
              </div>

              <div className="flex items-center gap-2 bg-yellow-50 px-4 py-2 rounded-full border border-yellow-200">
                <Star
                  size={18}
                  fill="currentColor"
                  className="text-yellow-500"
                />
                <span className="font-bold text-gray-900">4.8</span>
                <span className="text-gray-500 text-sm">(2,341 reviews)</span>
              </div>
            </div>

            {/* TITLE */}
            <div>
              <h1 className="text-3xl md:text-5xl font-black text-gray-900 leading-tight">
                {safeProduct.name}
              </h1>

              <p className="text-gray-500 mt-2 text-base">
                Premium quality stationery product crafted for students,
                professionals & creators.
              </p>
            </div>

            {/* PRICE */}
            <div className="bg-gradient-to-r from-orange-500 to-red-500 rounded-3xl p-6 text-white shadow-2xl">
              <div className="flex flex-wrap items-center gap-4">
                <div>
                  <p className="text-sm opacity-90 mb-1">Special Price</p>

                  <div className="flex items-center gap-3">
                    <h2 className="text-4xl md:text-5xl font-black">
                      ₹{price}
                    </h2>

                    {userType === "wholesale" && (
                      <span className="line-through text-white/70 text-xl">
                        ₹{safeProduct.price}
                      </span>
                    )}
                  </div>
                </div>

                <div className="ml-auto bg-white/20 backdrop-blur px-4 py-3 rounded-2xl">
                  <p className="text-xs opacity-80">You Save</p>
                  <p className="font-bold text-lg">{discount}% OFF</p>
                </div>
              </div>
            </div>

            {/* DELIVERY */}
            <div className="grid md:grid-cols-3 gap-3">
              <div className="bg-white border border-gray-200 rounded-2xl p-4 shadow-sm">
                <Truck className="text-orange-500 mb-2" size={22} />
                <p className="font-semibold text-gray-900">Fast Delivery</p>
                <p className="text-sm text-gray-500">2–4 business days</p>
              </div>

              <div className="bg-white border border-gray-200 rounded-2xl p-4 shadow-sm">
                <Shield className="text-green-500 mb-2" size={22} />
                <p className="font-semibold text-gray-900">Secure Payment</p>
                <p className="text-sm text-gray-500">100% protected</p>
              </div>

              <div className="bg-white border border-gray-200 rounded-2xl p-4 shadow-sm">
                <RotateCcw className="text-blue-500 mb-2" size={22} />
                <p className="font-semibold text-gray-900">Easy Returns</p>
                <p className="text-sm text-gray-500">7 day return policy</p>
              </div>
            </div>

            {/* STOCK */}
            <div className="flex items-center justify-between bg-white border border-gray-200 rounded-2xl p-4">
              <div>
                <p className="text-sm text-gray-500">Availability</p>

                <p
                  className={`font-bold text-lg ${
                    safeProduct.stock > 0 ? "text-green-600" : "text-red-500"
                  }`}
                >
                  {stockText}
                </p>
              </div>

              <div className="bg-orange-50 text-orange-600 px-4 py-2 rounded-full text-sm font-bold">
                {safeProduct.stock} Units Left
              </div>
            </div>

            {/* VARIANTS */}
            {variants.length > 0 && (
              <div className="bg-white border border-gray-200 rounded-2xl p-5">
                <h3 className="font-bold text-gray-900 mb-4 text-lg">
                  Choose Option
                </h3>

                <div className="flex flex-wrap gap-3">
                  {variants.map((v: any, i: number) => (
                    <button
                      key={i}
                      onClick={() => setVariant(v)}
                      className={`
                        px-4 py-3 rounded-2xl border font-semibold transition-all
                        ${
                          variant?.label === v.label
                            ? "bg-gradient-to-r from-orange-500 to-red-500 text-white border-orange-500 shadow-lg scale-105"
                            : "bg-gray-50 hover:bg-orange-50 border-gray-200"
                        }
                      `}
                    >
                      <div>{v.label}</div>
                      <div className="text-xs opacity-80">₹{v.price}</div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* TABS */}
            <div className="bg-white border border-gray-200 rounded-3xl overflow-hidden">
              <div className="flex overflow-x-auto border-b">
                {["Overview", "Specs", "Reviews"].map((t) => (
                  <button
                    key={t}
                    onClick={() => setTab(t)}
                    className={`
                      px-6 py-4 font-semibold transition-all whitespace-nowrap
                      ${
                        tab === t
                          ? "bg-gradient-to-r from-orange-500 to-red-500 text-white"
                          : "hover:bg-orange-50 text-gray-700"
                      }
                    `}
                  >
                    {t}
                  </button>
                ))}
              </div>

              <div className="p-5">
                {tab === "Overview" && (
                  <div className="space-y-4">
                    <p className="text-gray-700 leading-relaxed text-base">
                      {safeProduct.description || product.desc ? (
                        safeProduct.description || product.desc
                      ) : (
                        <span className="text-gray-400 italic">
                          No description available for this product.
                        </span>
                      )}
                    </p>

                    <div className="grid md:grid-cols-2 gap-3">
                      {[
                        "Premium Quality Finish",
                        "Long Lasting Build",
                        "Smooth User Experience",
                        "Trusted Brand Product",
                      ].map((f) => (
                        <div
                          key={f}
                          className="flex items-center gap-2 bg-green-50 border border-green-100 rounded-xl p-3"
                        >
                          <CheckCircle2 size={18} className="text-green-600" />
                          <span className="text-sm font-medium text-gray-700">
                            {f}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {tab === "Specs" && (
                  <div className="space-y-3">
                    {[
                      "Premium Quality Material",
                      "Durable Build & Finish",
                      "Professional Grade",
                      "Eco-Friendly Packaging",
                      "Modern Ergonomic Design",
                    ].map((item) => (
                      <div
                        key={item}
                        className="flex items-center gap-3 bg-gray-50 border border-gray-200 rounded-xl p-4"
                      >
                        <div className="w-2 h-2 bg-orange-500 rounded-full" />
                        <span className="text-gray-700">{item}</span>
                      </div>
                    ))}
                  </div>
                )}

                {tab === "Reviews" && (
                  <div className="space-y-5">
                    <div className="flex items-center gap-4">
                      <div className="text-5xl font-black text-gray-900">
                        4.8
                      </div>

                      <div>
                        <div className="flex text-yellow-500">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <Star key={i} size={18} fill="currentColor" />
                          ))}
                        </div>

                        <p className="text-gray-500 text-sm mt-1">
                          Based on 2,341 verified reviews
                        </p>
                      </div>
                    </div>

                    <div className="space-y-3">
                      {[
                        {
                          name: "Rahul",
                          review:
                            "Excellent quality and premium feel. Worth every rupee.",
                        },
                        {
                          name: "Sneha",
                          review:
                            "Packaging and delivery were amazing. Highly recommended.",
                        },
                      ].map((r, i) => (
                        <div
                          key={i}
                          className="bg-gray-50 border border-gray-200 rounded-2xl p-4"
                        >
                          <div className="flex items-center gap-2 mb-2">
                            <div className="w-10 h-10 rounded-full bg-gradient-to-r from-orange-500 to-red-500 text-white flex items-center justify-center font-bold">
                              {r.name.charAt(0)}
                            </div>

                            <div>
                              <p className="font-semibold text-gray-900">
                                {r.name}
                              </p>

                              <div className="flex text-yellow-500">
                                {Array.from({ length: 5 }).map((_, i) => (
                                  <Star key={i} size={14} fill="currentColor" />
                                ))}
                              </div>
                            </div>
                          </div>

                          <p className="text-gray-600 text-sm leading-relaxed">
                            {r.review}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* TOAST */}
        {showAddedToast && (
          <div className="fixed top-6 left-1/2 -translate-x-1/2 z-[100]">
            <div className="bg-white/95 backdrop-blur-xl border border-gray-200 shadow-[0_20px_60px_rgba(0,0,0,0.25)] rounded-2xl px-6 py-4 flex items-center gap-5 animate-in fade-in slide-in-from-top">
              <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
                <CheckCircle2 className="text-green-600" />
              </div>

              <div>
                <p className="font-bold text-gray-900">
                  Added to Cart Successfully
                </p>

                <p className="text-sm text-gray-500">{product?.name}</p>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={onClose}
                  className="px-4 py-2 rounded-xl border border-gray-200 hover:bg-gray-100 font-semibold"
                >
                  Continue
                </button>

                <button
                  onClick={() => {
                    onClose();
                    window.location.href = "/checkout";
                  }}
                  className="px-4 py-2 rounded-xl bg-gradient-to-r from-orange-500 to-red-500 text-white font-semibold"
                >
                  Checkout
                </button>
              </div>
            </div>
          </div>
        )}

        {/* MOBILE BAR */}
        <div className="md:hidden sticky bottom-0 bg-white/95 backdrop-blur-xl border-t border-gray-200 p-4 flex gap-3">
          <button
            onClick={buyNow}
            className="flex-1 bg-black text-white h-14 rounded-2xl font-bold"
          >
            Buy Now
          </button>

          <button
            onClick={() =>
              onAddToCart({
                ...product,
                selectedVariant: variant,
                quantity: qty,
              })
            }
            className="flex-1 bg-gradient-to-r from-orange-500 to-red-500 text-white h-14 rounded-2xl font-bold"
          >
            Add Cart
          </button>
        </div>
      </div>
    </div>
  );
}
