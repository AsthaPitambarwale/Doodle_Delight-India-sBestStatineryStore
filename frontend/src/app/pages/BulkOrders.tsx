import { Users, Package, TrendingUp, Phone } from "lucide-react";
import { PageLayout } from "../components/PageLayout";
export function BulkOrders() {
  return (
    <PageLayout>
      <div className="max-w-4xl mx-auto px-4 py-12">

        <h1 className="text-4xl font-bold mb-4">Bulk Orders</h1>
        <p className="text-gray-600 text-lg mb-10">
          Get wholesale pricing for schools, offices, and retailers.
        </p>

        {/* BENEFITS */}
        <div className="grid md:grid-cols-2 gap-6 mb-10">

          <div className="bg-white p-6 rounded-2xl border-2">
            <TrendingUp className="text-orange-500 mb-3" />
            <h3 className="font-bold text-xl mb-2">Up to 40% Discount</h3>
            <p className="text-gray-600">
              Save more when you order in bulk quantities.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border-2">
            <Users className="text-orange-500 mb-3" />
            <h3 className="font-bold text-xl mb-2">Corporate Supply</h3>
            <p className="text-gray-600">
              Trusted by schools, offices, and businesses.
            </p>
          </div>

        </div>

        {/* FORM */}
        <div className="bg-white p-8 rounded-2xl border-2">
          <h2 className="text-2xl font-bold mb-6">Request Bulk Quote</h2>

          <div className="space-y-4">
            <input className="w-full p-3 border rounded-xl" placeholder="Full Name" />
            <input className="w-full p-3 border rounded-xl" placeholder="Email" />
            <input className="w-full p-3 border rounded-xl" placeholder="Phone Number" />
            <textarea className="w-full p-3 border rounded-xl h-32" placeholder="Your requirements" />
          </div>

          <button className="mt-6 w-full bg-orange-500 text-white py-3 rounded-xl font-bold">
            Submit Request
          </button>

          <div className="mt-4 flex items-center gap-2 text-gray-600 text-sm">
            <Phone className="w-4 h-4" />
            Or call us directly for instant quotes
          </div>
        </div>
      </div>
    </PageLayout>
  );
}