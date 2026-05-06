import { Award, TrendingUp } from 'lucide-react';

export function FeaturedBrands() {
  const brands = [
    { name: 'Classmate', logo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ37OEfvE25ish7nE9m8_JQSN4j5TJdxLsKqw&s' },
    { name: 'Doms', logo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR2q8RlC1eg6s_bWGhafg6HnSK_3t55ndL1Ng&s' },
    { name: 'Camlin', logo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRMNAeNF1lZxT-nrxhBBr1GUAYE3fJ5sIidXA&s' },
    { name: 'Parker', logo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTGlGy8XRTIlrf1zJJSAMd4z-cG4qN4sJCXYw&s' },
    { name: 'Faber-Castell', logo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ9BDthJIzwy-qCaaXwPia89M6gPk-IULTT0w&s' },
    { name: 'Staedtler', logo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT29tCn_5EiTWZzvJg-ubMR3YKqZjOIrnFDLg&s' },
  ];

  return (
    <div className="mb-12 bg-gradient-to-br from-gray-50 to-orange-50 rounded-3xl p-8 border border-gray-200">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-500 rounded-full flex items-center justify-center">
          <Award className="w-6 h-6 text-white" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Featured Brands</h2>
          <p className="text-gray-600 text-sm">Shop from India's most trusted brands</p>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {brands.map((brand, index) => (
          <button
            key={index}
            className="bg-white rounded-xl p-6 border-2 border-gray-200 hover:border-orange-500 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 group"
          >
            <img
              src={brand.logo}
              alt={brand.name}
              className="w-full h-12 object-contain grayscale group-hover:grayscale-0 transition-all duration-300"
            />
          </button>
        ))}
      </div>
    </div>
  );
}
