import { Award } from "lucide-react";

export function FeaturedBrands() {
  const brands = [
    {
      name: "Classmate",
      logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ37OEfvE25ish7nE9m8_JQSN4j5TJdxLsKqw&s",
    },
    {
      name: "Doms",
      logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR2q8RlC1eg6s_bWGhafg6HnSK_3t55ndL1Ng&s",
    },
    {
      name: "Camlin",
      logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRMNAeNF1lZxT-nrxhBBr1GUAYE3fJ5sIidXA&s",
    },
    {
      name: "Parker",
      logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTGlGy8XRTIlrf1zJJSAMd4z-cG4qN4sJCXYw&s",
    },
    {
      name: "Faber-Castell",
      logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ9BDthJIzwy-qCaaXwPia89M6gPk-IULTT0w&s",
    },
    {
      name: "Staedtler",
      logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT29tCn_5EiTWZzvJg-ubMR3YKqZjOIrnFDLg&s",
    },
  ];

  return (
    <div className="mb-10 md:mb-14 relative overflow-hidden rounded-3xl bg-gradient-to-br from-orange-50 via-white to-red-50 border border-orange-100 p-4 sm:p-6 md:p-8 shadow-xl">
      {/* Glow Background */}
      <div className="absolute top-0 left-0 w-40 h-40 bg-orange-400/20 blur-3xl rounded-full animate-pulse" />
      <div className="absolute bottom-0 right-0 w-52 h-52 bg-red-400/20 blur-3xl rounded-full animate-pulse" />

      {/* Header */}
      <div className="relative flex items-center gap-3 mb-6 md:mb-8">
        <div className="w-12 h-12 md:w-14 md:h-14 bg-gradient-to-br from-orange-500 to-red-500 rounded-2xl flex items-center justify-center shadow-lg shadow-orange-500/40">
          <Award className="w-6 h-6 md:w-7 md:h-7 text-white" />
        </div>

        <div>
          <h2 className="text-xl md:text-3xl font-bold text-gray-900">
            Featured Brands
          </h2>

          <p className="text-gray-600 text-xs md:text-sm mt-1">
            Shop from India's most trusted stationery brands
          </p>
        </div>
      </div>

      {/* Brands Grid */}
      <div className="relative grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 md:gap-5">
        {brands.map((brand, index) => (
          <button
            key={index}
            className="
              group relative overflow-hidden
              bg-white/80 backdrop-blur-md
              rounded-2xl
              p-4 md:p-5
              border border-white/60
              shadow-md
              transition-all duration-300
              hover:-translate-y-2
              hover:shadow-2xl hover:shadow-orange-500/30
              active:scale-95
              active:border-orange-400
              active:shadow-2xl active:shadow-orange-500/30
            "
          >
            {/* Glow Effect */}
            <div
              className="
                absolute inset-0 opacity-0
                group-hover:opacity-100
                group-active:opacity-100
                transition-opacity duration-300
                bg-gradient-to-br from-orange-200/40 to-red-200/40
                blur-xl
              "
            />

            {/* Animated Border Glow */}
            <div
              className="
                absolute inset-0 rounded-2xl
                border border-transparent
                group-hover:border-orange-300
                group-active:border-orange-300
                transition-all duration-300
              "
            />

            <div className="relative flex flex-col items-center justify-center">
              <img
                src={brand.logo}
                alt={brand.name}
                className="
                  h-10 md:h-14 w-full object-contain
                  grayscale
                  group-hover:grayscale-0
                  group-active:grayscale-0
                  transition-all duration-300
                "
              />

              <p
                className="
                  mt-3 text-xs md:text-sm font-semibold
                  text-gray-700
                  group-hover:text-orange-600
                  group-active:text-orange-600
                  transition-colors text-center
                "
              >
                {brand.name}
              </p>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
