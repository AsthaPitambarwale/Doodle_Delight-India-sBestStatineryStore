import { Users, Target, Award, Heart } from 'lucide-react';
import { PageLayout } from "../components/PageLayout";

export function AboutUs() {
  return (
    <PageLayout>
        <div className="max-w-4xl mx-auto px-4 py-12">

          <h1 className="text-4xl font-bold text-gray-900 mb-6">About Doodle Delight</h1>

          <div className="prose prose-lg max-w-none">
            <p className="text-gray-600 text-lg mb-8">
              Welcome to Doodle Delight - India's most trusted online destination for premium quality stationery products.
              Since our inception, we've been committed to providing students, professionals, and businesses with the
              best stationery essentials at competitive prices.
            </p>

            <div className="grid md:grid-cols-2 gap-6 my-12">
              <div className="bg-white p-6 rounded-2xl border-2 border-gray-200 hover:border-orange-500 transition-all">
                <div className="w-14 h-14 bg-gradient-to-br from-orange-500 to-red-500 rounded-xl flex items-center justify-center mb-4">
                  <Target className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Our Mission</h3>
                <p className="text-gray-600">
                  To make quality stationery accessible to everyone across India, supporting education and creativity
                  through affordable pricing and excellent service.
                </p>
              </div>

              <div className="bg-white p-6 rounded-2xl border-2 border-gray-200 hover:border-orange-500 transition-all">
                <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-blue-700 rounded-xl flex items-center justify-center mb-4">
                  <Heart className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Our Values</h3>
                <p className="text-gray-600">
                  Customer satisfaction, product authenticity, competitive pricing, and fast delivery are at the core
                  of everything we do.
                </p>
              </div>

              <div className="bg-white p-6 rounded-2xl border-2 border-gray-200 hover:border-orange-500 transition-all">
                <div className="w-14 h-14 bg-gradient-to-br from-green-500 to-green-700 rounded-xl flex items-center justify-center mb-4">
                  <Users className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Our Team</h3>
                <p className="text-gray-600">
                  A dedicated team of 50+ professionals working round the clock to ensure your orders are processed
                  and delivered with care.
                </p>
              </div>

              <div className="bg-white p-6 rounded-2xl border-2 border-gray-200 hover:border-orange-500 transition-all">
                <div className="w-14 h-14 bg-gradient-to-br from-purple-500 to-purple-700 rounded-xl flex items-center justify-center mb-4">
                  <Award className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Our Achievement</h3>
                <p className="text-gray-600">
                  Serving over 100,000+ happy customers with 5000+ products from India's most trusted brands.
                </p>
              </div>
            </div>

            <h2 className="text-2xl font-bold text-gray-900 mb-4">Why Choose Us?</h2>
            <ul className="space-y-3 mb-8">
              <li className="flex items-start gap-3">
                <span className="w-6 h-6 bg-orange-500 rounded-full flex items-center justify-center text-white flex-shrink-0 mt-0.5">✓</span>
                <span className="text-gray-700"><strong>100% Genuine Products:</strong> We source directly from authorized distributors and manufacturers.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-6 h-6 bg-orange-500 rounded-full flex items-center justify-center text-white flex-shrink-0 mt-0.5">✓</span>
                <span className="text-gray-700"><strong>Wholesale Pricing:</strong> Special bulk order rates for schools, offices, and businesses.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-6 h-6 bg-orange-500 rounded-full flex items-center justify-center text-white flex-shrink-0 mt-0.5">✓</span>
                <span className="text-gray-700"><strong>Fast Delivery:</strong> Pan-India shipping with tracking facilities.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-6 h-6 bg-orange-500 rounded-full flex items-center justify-center text-white flex-shrink-0 mt-0.5">✓</span>
                <span className="text-gray-700"><strong>Easy Returns:</strong> 7-day hassle-free return policy.</span>
              </li>
            </ul>

            <div className="bg-gradient-to-r from-orange-50 to-red-50 border border-orange-200 rounded-2xl p-8 mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Our Story</h2>
              <p className="text-gray-700 mb-4">
                Founded in 2020, Doodle Delight started with a simple vision: to make quality stationery products
                accessible to everyone. What began as a small venture with 100 products has now grown into India's
                leading online stationery marketplace.
              </p>
              <p className="text-gray-700">
                We've partnered with over 50 trusted brands and serve customers across 500+ cities in India. Our
                commitment to quality, authenticity, and customer satisfaction has made us the preferred choice for
                students, professionals, and businesses alike.
              </p>
            </div>
          </div>
        </div>
    </PageLayout>
  );
}
