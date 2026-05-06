import { Truck, MapPin, Clock, Package, Search } from "lucide-react";
import { PageLayout } from "../components/PageLayout";

export function ShippingInformation() {
  return (
    <PageLayout>
      <div className="max-w-4xl mx-auto px-4 py-12">

        <h1 className="text-4xl font-bold text-gray-900 mb-6">
          Shipping Information
        </h1>

        <p className="text-gray-600 text-lg mb-10">
          Fast, reliable and secure delivery across India.
        </p>

        {/* SHIPPING METHODS */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">

          <div className="bg-white p-6 rounded-2xl border-2 border-gray-200">
            <Truck className="w-8 h-8 text-orange-500 mb-3" />
            <h3 className="text-xl font-bold mb-3">Shipping Methods</h3>
            <ul className="text-gray-600 text-sm space-y-2">
              <li>• Standard Shipping: 3–5 business days</li>
              <li>• Express Shipping: 1–2 business days (select cities)</li>
            </ul>
          </div>

          <div className="bg-white p-6 rounded-2xl border-2 border-gray-200">
            <Package className="w-8 h-8 text-blue-500 mb-3" />
            <h3 className="text-xl font-bold mb-3">Shipping Charges</h3>
            <ul className="text-gray-600 text-sm space-y-2">
              <li>• FREE shipping above ₹500</li>
              <li>• ₹50 for orders below ₹500</li>
              <li>• Express shipping: +₹100</li>
            </ul>
          </div>

        </div>

        {/* DELIVERY LOCATIONS */}
        <div className="bg-white p-6 rounded-2xl border-2 border-gray-200 mb-6">
          <MapPin className="w-8 h-8 text-green-500 mb-3" />
          <h3 className="text-xl font-bold mb-2">Delivery Locations</h3>
          <p className="text-gray-600 text-sm">
            We deliver across all serviceable pin codes in India.
            Enter your pin code at checkout to check availability.
          </p>
        </div>

        {/* ORDER PROCESSING */}
        <div className="bg-white p-6 rounded-2xl border-2 border-gray-200 mb-6">
          <Clock className="w-8 h-8 text-purple-500 mb-3" />
          <h3 className="text-xl font-bold mb-2">Order Processing</h3>
          <p className="text-gray-600 text-sm">
            Orders are processed within 1–2 business days (excluding weekends & holidays).
            You will receive a confirmation email once shipped with tracking details.
          </p>
        </div>

        {/* TRACKING */}
        <div className="bg-white p-6 rounded-2xl border-2 border-gray-200 mb-6">
          <Search className="w-8 h-8 text-orange-500 mb-3" />
          <h3 className="text-xl font-bold mb-2">Tracking Your Order</h3>
          <p className="text-gray-600 text-sm">
            Once shipped, you will receive a tracking ID via email and SMS.
            You can track your order anytime on our website or courier partner’s site.
          </p>
        </div>

        {/* DELIVERY ISSUES */}
        <div className="bg-white p-6 rounded-2xl border-2 border-gray-200 mb-10">
          <h3 className="text-xl font-bold mb-2">Delivery Issues</h3>
          <p className="text-gray-600 text-sm">
            For delays, damages, or missing packages, contact support immediately.
            We will coordinate with the courier to resolve the issue quickly.
          </p>
        </div>

        {/* FOOTER NOTE */}
        <div className="bg-gradient-to-r from-orange-50 to-red-50 border border-orange-200 rounded-2xl p-6">
          <p className="text-gray-700 text-sm">
            <strong>Last Updated:</strong> May 2, 2026
          </p>
          <p className="text-gray-600 text-sm mt-2">
            For support contact:{" "}
            <span className="text-orange-600 font-semibold">
              info@Doodledelight.com
            </span>
          </p>
        </div>

      </div>
    </PageLayout>
  );
}