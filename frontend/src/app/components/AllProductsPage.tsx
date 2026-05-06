import { ArrowLeft } from "lucide-react";
import { useState, useEffect } from "react";
import { ProductGrid } from "./ProductGrid";
import { FilterSort, FilterOptions } from "./FilterSort";

export interface Product {
  id: string;
  name: string;
  price: number;
  brand: string;
  stock: number;
  createdAt: string;
}

interface AllProductsPageProps {
  products: Product[];
  userType: "retail" | "wholesale";
  onAddToCart: (product: Product) => void;
  onViewDetails: (product: Product) => void;
  onToggleWishlist: (product: Product) => void;
  isInWishlist: (productId: string) => boolean;
  onBack: () => void;
  currentSort: string;
  onSortChange: (sort: string) => void;
}

export function AllProductsPage({
  products,
  userType,
  onAddToCart,
  onViewDetails,
  onToggleWishlist,
  isInWishlist,
  onBack,
  currentSort,
  onSortChange,
}: AllProductsPageProps) {

  const [filteredProducts, setFilteredProducts] = useState<Product[]>(products);
  const [filters, setFilters] = useState<FilterOptions>({
    priceRange: [0, 5000],
    brands: [],
    inStock: false,
  });

  // sync when products change
  useEffect(() => {
    setFilteredProducts(products);
  }, [products]);

  // 🔥 APPLY FILTER + SORT TOGETHER (REALTIME FIX)
  useEffect(() => {
  let result = [...products];

  // FILTER ONLY
  result = result.filter(
    (p) =>
      p.price >= filters.priceRange[0] &&
      p.price <= filters.priceRange[1]
  );

  if (filters.brands.length > 0) {
    result = result.filter((p) => filters.brands.includes(p.brand));
  }

  if (filters.inStock) {
    result = result.filter((p) => p.stock > 0);
  }

  setFilteredProducts(result);
}, [products, filters]);



  // FILTER HANDLER
  const handleFilterChange = (newFilters: FilterOptions) => {
    setFilters(newFilters);
  };

  // SORT HANDLER
  const handleSortChange = (sort: string) => {
    onSortChange(sort);
  };

  return (
    <div className="min-h-screen">
      <div className="bg-gradient-to-r from-orange-50 to-red-50 border-b mb-8">
        <div className="max-w-7xl mx-auto px-4 py-8">

          <button
            onClick={onBack}
            className="flex items-center gap-2 text-orange-600 font-semibold mb-4"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to Home
          </button>

          <h1 className="text-4xl font-bold">All Products</h1>

          <p className="text-gray-600">
            Showing {filteredProducts.length} products
          </p>

        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 pb-12">

        <FilterSort
          onFilterChange={handleFilterChange}
          onSortChange={(value) => onSortChange(value)}
          currentSort={currentSort}
        />

        <ProductGrid
          products={filteredProducts}
          userType={userType}
          onAddToCart={onAddToCart}
          onViewDetails={onViewDetails}
          onToggleWishlist={onToggleWishlist}
          isInWishlist={isInWishlist}
        />
      </div>
    </div>
  );
}