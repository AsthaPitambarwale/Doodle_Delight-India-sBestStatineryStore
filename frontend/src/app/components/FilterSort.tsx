import { SlidersHorizontal, ChevronDown } from "lucide-react";
import { useState } from "react";

export interface FilterOptions {
  priceRange: [number, number];
  brands: string[];
  inStock: boolean;
}

interface FilterSortProps {
  onFilterChange: (filters: FilterOptions) => void;
  onSortChange: (sort: string) => void;
  currentSort: string;
}

export function FilterSort({
  onFilterChange,
  onSortChange,
  currentSort,
}: FilterSortProps) {
  const [showFilters, setShowFilters] = useState(false);

  const [filters, setFilters] = useState<FilterOptions>({
    priceRange: [0, 5000],
    brands: [],
    inStock: false,
  });

  const brands = [
    "Classic Notes",
    "WriteWell",
    "ArtPro",
    "OfficeMax",
    "StudyBuddy",
    "EcoDesk",
  ];

  const updateFilters = (newFilters: FilterOptions) => {
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const handleBrandToggle = (brand: string) => {
    updateFilters({
      ...filters,
      brands: filters.brands.includes(brand)
        ? filters.brands.filter((b) => b !== brand)
        : [...filters.brands, brand],
    });
  };

  const handlePriceChange = (value: number, index: number) => {
    const newRange: [number, number] = [...filters.priceRange];
    newRange[index] = value;

    updateFilters({
      ...filters,
      priceRange: newRange,
    });
  };

  const handleStockToggle = () => {
    updateFilters({
      ...filters,
      inStock: !filters.inStock,
    });
  };

  const clearFilters = () => {
    updateFilters({
      priceRange: [0, 5000],
      brands: [],
      inStock: false,
    });
  };

  return (
    <div className="mb-6">
      {/* TOP BAR */}
      <div className="flex items-center justify-between mb-4">
        <button
          onClick={() => setShowFilters(!showFilters)}
          className="flex items-center gap-2 px-4 py-2 border rounded-xl bg-white shadow-sm"
        >
          <SlidersHorizontal className="w-5 h-5" />
          Filters
        </button>

        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-600">Sort:</span>

          <div className="relative">
            <select
              value={currentSort}
              onChange={(e) => onSortChange(e.target.value)}
              className="px-4 py-2 pr-8 border rounded-xl bg-white"
            >
              <option value="featured">Featured</option>
              <option value="price-low">Low → High</option>
              <option value="price-high">High → Low</option>
              <option value="name-asc">A → Z</option>
              <option value="name-desc">Z → A</option>
              <option value="newest">Newest</option>
            </select>

            <ChevronDown className="absolute right-2 top-2.5 w-4 h-4 text-gray-400 pointer-events-none" />
          </div>
        </div>
      </div>

      {/* FILTER PANEL */}
      {showFilters && (
        <div className="bg-white border rounded-2xl p-5 space-y-6 shadow-sm">
          {/* HEADER */}
          <div className="flex justify-between items-center">
            <h3 className="font-semibold text-lg">Filters</h3>

            <button onClick={clearFilters} className="text-sm text-orange-600">
              Clear All
            </button>
          </div>

          {/* PRICE RANGE (ONLY MAX SLIDER) */}
          <div>
            <h4 className="font-semibold mb-2">Price Range</h4>

            {/* LIVE DISPLAY */}
            <div className="flex justify-between text-sm text-gray-600 mb-2">
              <span>Min: ₹0</span>
              <span>Max: ₹{filters.priceRange[1]}</span>
            </div>

            {/* SINGLE MAX SLIDER ONLY */}
            <input
              type="range"
              min="0"
              max="5000"
              value={filters.priceRange[1]}
              onChange={(e) => handlePriceChange(Number(e.target.value), 1)}
              className="w-full accent-orange-500"
            />
          </div>

          {/* BRANDS */}
          <div>
            <h4 className="font-semibold mb-2">Brands</h4>

            <div className="grid grid-cols-2 gap-2">
              {brands.map((brand) => (
                <label key={brand} className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={filters.brands.includes(brand)}
                    onChange={() => handleBrandToggle(brand)}
                  />
                  <span className="text-sm">{brand}</span>
                </label>
              ))}
            </div>
          </div>

          {/* STOCK */}
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={filters.inStock}
              onChange={handleStockToggle}
            />
            In Stock Only
          </label>
        </div>
      )}
    </div>
  );
}
