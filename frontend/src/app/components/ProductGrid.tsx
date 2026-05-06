import { useState, useMemo } from "react";
import { ProductCard } from "./ProductCard";

type Product = any;

interface ProductGridProps {
  products: Product[];
  userType: "retail" | "wholesale";
  onAddToCart: (product: Product) => void;
  onViewDetails: (product: Product) => void;
  onToggleWishlist: (product: Product) => void;
  isInWishlist: (productId: string) => boolean;
  title?: string;
}

export function ProductGrid({
  products,
  userType,
  onAddToCart,
  onViewDetails,
  onToggleWishlist,
  isInWishlist,
  title,
}: ProductGridProps) {
  const [visibleCount, setVisibleCount] = useState(8);

  const visibleProducts = useMemo(() => {
    return Array.isArray(products) ? products.slice(0, visibleCount) : [];
  }, [products, visibleCount]);

  if (!Array.isArray(products) || products.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-slate-500 text-lg">No products found</p>
      </div>
    );
  }

  return (
    <div>
      {/* TITLE */}
      {title && (
        <h2 className="text-2xl font-bold text-slate-900 mb-6">{title}</h2>
      )}

      {/* GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {visibleProducts.map((product) => (
          <ProductCard
            key={product?._id}
            product={{
              ...product,
              image: product.images?.[0] || product.image || "/placeholder.png",
            }}
            userType={userType}
            onAddToCart={onAddToCart}
            onViewDetails={onViewDetails}
            onToggleWishlist={onToggleWishlist}
            isInWishlist={isInWishlist(product?._id)}
          />
        ))}
      </div>

      {/* VIEW MORE BUTTON */}
      {visibleCount < products.length && (
        <div className="flex justify-center mt-8">
          <button
            onClick={() => setVisibleCount((prev) => prev + 8)}
            className="
              px-6 py-3 rounded-xl
              bg-orange-500 text-white
              hover:bg-orange-600
              transition-all
              font-semibold
              shadow-md active:scale-95
            "
          >
            View More Products
          </button>
        </div>
      )}
    </div>
  );
}
