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
  Tag,
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
  const [tab, setTab] = useState("overview");
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
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex justify-center items-end md:items-center p-0 md:p-2">
      <div
        className="
      bg-white w-full md:max-w-7xl
      rounded-t-2xl md:rounded-2xl
      overflow-hidden shadow-2xl
      animate-in fade-in zoom-in duration-200
      max-h-[95vh] md:max-h-[85vh]
      flex flex-col
    "
      >
        {/* HEADER */}
        <div className="flex justify-between items-center px-4 md:px-5 py-3 md:py-4 bg-gradient-to-r from-orange-500 to-red-500 text-white">
          <div>
            <h2 className="font-bold text-lg">Product Details</h2>
            <p className="text-xs opacity-80">Doodle Delight</p>
          </div>
          <button onClick={onClose}>
            <X />
          </button>
        </div>

        {/* BODY */}
        <div className="grid md:grid-cols-12 gap-4 md:gap-6 p-4 md:p-5 overflow-y-auto flex-1 pb-24 md:pb-0">
          {/* LEFT IMAGE SECTION */}
          <div className="md:col-span-5 space-y-3">
            {/* MAIN IMAGE */}
            <div className="border rounded-xl overflow-hidden bg-gray-100">
              {images.length > 0 ? (
                <img
                  src={images?.[activeImage] || "/placeholder.png"}
                  className="w-full h-[280px] md:h-[420px] object-contain bg-white transition duration-300"
                />
              ) : (
                <div className="w-full h-[420px] flex items-center justify-center text-gray-400">
                  No Image Available
                </div>
              )}
            </div>

            {/* THUMBNAILS */}
            <div className="flex gap-2 overflow-x-auto pb-1">
              {images.map((img: string, i: number) => (
                <img
                  key={i}
                  src={img}
                  onClick={() => setActiveImage(i)}
                  className={`w-16 h-16 object-cover rounded-md border cursor-pointer ${
                    activeImage === i ? "border-orange-500" : ""
                  }`}
                />
              ))}
            </div>

            {/* WISHLIST */}
            <button
              onClick={() => onToggleWishlist(product)}
              className={`w-full py-2 rounded-lg flex items-center justify-center gap-2 ${
                isInWishlist
                  ? "bg-red-500 text-white"
                  : "bg-gray-100 hover:bg-gray-200"
              }`}
            >
              <Heart className={isInWishlist ? "fill-white" : ""} />
              {isInWishlist ? "Saved" : "Add to Wishlist"}
            </button>
          </div>

          {/* RIGHT INFO SECTION */}
          <div className="md:col-span-7 space-y-4">
            {/* BRAND + RATING */}
            <div className="flex justify-between items-center">
              <span className="px-3 py-1 text-xs bg-orange-100 text-orange-600 rounded-full">
                {safeProduct.brand}
              </span>

              <div className="flex items-center gap-1 text-yellow-500">
                <Star size={16} fill="currentColor" />
                <span className="font-semibold">4.4</span>
                <span className="text-gray-500 text-sm">(2,341)</span>
              </div>
            </div>

            {/* TITLE */}
            <h1 className="text-2xl font-bold">{safeProduct.name}</h1>

            {/* PRICE BLOCK */}
            <div className="bg-orange-50 border p-4 rounded-xl">
              <div className="flex items-center gap-3">
                <h2 className="text-2xl md:text-3xl font-bold text-orange-600">
                  ₹{price}
                </h2>

                {userType === "wholesale" && (
                  <>
                    <span className="line-through text-gray-400">
                      ₹{safeProduct.price}
                    </span>
                    <span className="bg-red-500 text-white px-2 py-1 text-xs rounded">
                      {discount}% OFF
                    </span>
                  </>
                )}
              </div>
            </div>

            {/* DELIVERY INFO */}
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Truck size={16} />
              Delivery by <b>2–4 days</b>
            </div>
            <div className="text-sm font-medium text-red-600">{stockText}</div>

            {/* QTY */}
            <div className="flex items-center gap-3">
              <button
                onClick={() => setQty((q) => Math.max(1, q - 1))}
                className="p-2 bg-gray-100 rounded"
              >
                <Minus size={16} />
              </button>
              <span>{qty}</span>
              <button
                onClick={() => setQty((q) => q + 1)}
                className="p-2 bg-gray-100 rounded"
              >
                <Plus size={16} />
              </button>
            </div>

            {variants.length > 0 && (
              <div>
                <h3 className="text-sm font-semibold mb-2">Choose Option</h3>

                <div className="flex gap-2 flex-wrap">
                  {variants.map((v: any, i: number) => (
                    <button
                      key={i}
                      onClick={() => setVariant(v)}
                      className={`px-3 py-1 border rounded-lg text-sm ${
                        variant?.label === v.label
                          ? "bg-orange-500 text-white border-orange-500"
                          : "bg-gray-100 hover:bg-gray-200"
                      }`}
                    >
                      {v.label}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* CTA */}
            <div className="flex gap-2 md:gap-3">
              <button
                onClick={buyNow}
                className="flex-1 bg-black text-white py-3 rounded-xl flex items-center justify-center gap-2"
              >
                <Zap size={16} />
                Buy Now
              </button>

              <button
                onClick={() => {
                  onAddToCart({ ...product, quantity: qty });

                  setShowAddedToast(true);

                  setTimeout(() => {
                    setShowAddedToast(false);
                  }, 2500);
                }}
                className="flex-1 bg-orange-500 text-white py-3 rounded-xl flex items-center justify-center gap-2"
              >
                <ShoppingCart size={16} />
                Add to Cart
              </button>
            </div>

            {/* TRUST BADGES */}
            <div className="grid grid-cols-2 gap-2 text-xs text-gray-600">
              <div className="flex items-center gap-2">
                <Shield size={14} /> Secure Payment
              </div>
              <div className="flex items-center gap-2">
                <Truck size={14} /> Fast Delivery
              </div>
            </div>

            {/* TABS */}
            <div className="border-t pt-3">
              <div className="flex gap-2 text-xs md:text-sm overflow-x-auto">
                {["Overview", "Specs", "Reviews"].map((t) => (
                  <button
                    key={t}
                    onClick={() => setTab(t)}
                    className={`px-3 py-1 rounded whitespace-nowrap ${
                      tab === t ? "bg-orange-500 text-white" : "bg-gray-100"
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>

              <div className="text-sm text-gray-600 mt-2">
                {tab === "Overview" && (
                  <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                    <h3 className="text-xs uppercase tracking-wider text-gray-500 mb-2">
                      Product Description
                    </h3>

                    <p className="text-sm text-gray-700 leading-relaxed">
                      {safeProduct.description || product.desc ? (
                        safeProduct.description || product.desc
                      ) : (
                        <span className="text-gray-400 italic">
                          No description available for this product.
                        </span>
                      )}
                    </p>
                  </div>
                )}

                {tab === "Specs" && (
                  <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                    <ul className="space-y-2 text-sm text-gray-700">
                      <li className="flex items-start gap-2">
                        <span className="text-green-500 mt-0.5">✓</span>
                        Premium Quality Material
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-green-500 mt-0.5">✓</span>
                        Durable Build
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-green-500 mt-0.5">✓</span>
                        Imported Finish
                      </li>
                    </ul>
                  </div>
                )}

                {tab === "Reviews" && (
                  <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                    <div className="text-sm text-gray-700 space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="text-yellow-500">⭐</span>
                        <span className="font-medium text-gray-900">4.4</span>
                        <span className="text-gray-500">average rating</span>
                      </div>

                      <div className="text-gray-500">
                        2,341 verified reviews
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {showAddedToast && (
          <div className="fixed top-6 left-1/2 -translate-x-1/2 z-[100] bg-white shadow-2xl rounded-xl px-5 py-3 border flex items-center gap-4 animate-in fade-in slide-in-from-top">
            <div className="text-green-600 font-semibold">
              {product ? `${product.name} added to cart` : "Added to cart"}
            </div>

            <button
              onClick={() => {
                onClose();
                // open cart modal (you handle from parent)
              }}
              className="text-blue-600 font-semibold"
            >
              View Cart
            </button>

            <button
              onClick={() => {
                onClose();
                window.location.href = "/checkout";
              }}
              className="bg-orange-500 text-white px-3 py-1 rounded-lg"
            >
              Checkout
            </button>
          </div>
        )}

        {/* MOBILE STICKY BAR */}
        <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t p-3 flex gap-2 z-50 pb-[env(safe-area-inset-bottom)]">
          <button
            onClick={buyNow}
            className="flex-1 bg-black text-white py-2 rounded"
          >
            Buy Now
          </button>
          <button
            onClick={() => onAddToCart({ ...product, quantity: qty })}
            className="flex-1 bg-orange-500 text-white py-2 rounded"
          >
            Cart
          </button>
        </div>
      </div>
    </div>
  );
}
