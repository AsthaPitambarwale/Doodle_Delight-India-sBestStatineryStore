import { ArrowRight } from "lucide-react";

interface Category {
  _id: string;
  name: string;
  slug: string;
  image: string;
  productCount: number;
}

interface CategoryShowcaseProps {
  categories: Category[];
  onCategoryClick: (slug: string) => void;
  onViewAll?: () => void;
}

export function CategoryShowcase({
  categories,
  onCategoryClick,
  onViewAll,
}: CategoryShowcaseProps) {
  return (
    <div className="mb-12">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-3xl font-bold text-gray-900 mb-1">
            Shop by Category
          </h2>
          <p className="text-gray-600">
            Explore our wide range of stationery products
          </p>
        </div>
        {onViewAll && (
          <button
            onClick={onViewAll}
            className="hidden md:flex items-center gap-2 text-orange-600 font-semibold hover:gap-3 transition-all"
          >
            View All <ArrowRight className="w-5 h-5" />
          </button>
        )}
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {categories.map((category) => (
          <button
            key={category._id}
            onClick={() => onCategoryClick(category.slug)}
            className="group bg-white rounded-2xl border-2 border-gray-200 overflow-hidden hover:shadow-2xl hover:border-orange-500 transition-all duration-300 transform hover:-translate-y-2"
          >
            <div className="aspect-square overflow-hidden bg-gradient-to-br from-orange-50 to-red-50 relative">
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <img
                src={category.image}
                alt={category.name}
                className="w-full h-full object-cover group-hover:scale-125 transition-transform duration-500"
              />
            </div>
            <div className="p-4 bg-gradient-to-b from-white to-gray-50 group-hover:from-orange-50 group-hover:to-orange-100 transition-all duration-300">
              <h3 className="font-bold text-sm mb-1 text-gray-900 group-hover:text-orange-600 transition-colors">
                {category.name}
              </h3>
              <p className="text-xs text-gray-600 group-hover:text-orange-700">
                {category.productCount || 0}+ items
              </p>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
