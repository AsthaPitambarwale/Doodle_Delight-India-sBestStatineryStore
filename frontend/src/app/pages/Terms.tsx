import {
  FileText,
  AlertTriangle,
  ShoppingCart,
  CreditCard,
  Truck,
  Shield,
} from "lucide-react";
import { PageLayout } from "../components/PageLayout";

export function TermsOfService() {
  return (
    <PageLayout>
      <div className="max-w-4xl mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-6">
          Terms of Service
        </h1>

        <p className="text-gray-600 text-lg mb-10">
          Please read these terms carefully before using Doodledelight.
        </p>

        {/* ACCEPTANCE */}
        <div className="bg-white p-6 rounded-2xl border-2 border-gray-200 mb-6">
          <FileText className="w-8 h-8 text-orange-500 mb-3" />
          <h3 className="text-xl font-bold mb-2">Acceptance of Terms</h3>
          <p className="text-gray-600 text-sm">
            By accessing and using Doodledelight, you agree to be bound by these
            terms. If you do not agree, please do not use our services.
          </p>
        </div>

        {/* PRODUCT INFO */}
        <div className="bg-white p-6 rounded-2xl border-2 border-gray-200 mb-6">
          <AlertTriangle className="w-8 h-8 text-yellow-500 mb-3" />
          <h3 className="text-xl font-bold mb-2">Product Information</h3>
          <p className="text-gray-600 text-sm mb-3">
            We try to ensure all product details and prices are accurate, but
            errors may occur.
          </p>
          <p className="text-gray-600 text-sm">
            We reserve the right to correct errors or update information anytime
            without prior notice.
          </p>
        </div>

        {/* ORDER ACCEPTANCE */}
        <div className="bg-white p-6 rounded-2xl border-2 border-gray-200 mb-6">
          <ShoppingCart className="w-8 h-8 text-green-500 mb-3" />
          <h3 className="text-xl font-bold mb-2">Order Acceptance</h3>
          <p className="text-gray-600 text-sm">
            We may cancel or refuse orders due to stock issues, pricing errors,
            or suspected fraudulent activity.
          </p>
        </div>

        {/* PAYMENT */}
        <div className="bg-white p-6 rounded-2xl border-2 border-gray-200 mb-6">
          <CreditCard className="w-8 h-8 text-blue-500 mb-3" />
          <h3 className="text-xl font-bold mb-2">Pricing & Payment</h3>
          <p className="text-gray-600 text-sm">
            All prices are in INR and include applicable taxes unless stated
            otherwise. Payment must be completed before shipment.
          </p>
        </div>

        {/* SHIPPING */}
        <div className="bg-white p-6 rounded-2xl border-2 border-gray-200 mb-6">
          <Truck className="w-8 h-8 text-purple-500 mb-3" />
          <h3 className="text-xl font-bold mb-2">Shipping & Delivery</h3>
          <p className="text-gray-600 text-sm">
            Delivery timelines are estimates. We are not responsible for delays
            caused by courier services or external factors.
          </p>
        </div>

        {/* LIABILITY */}
        <div className="bg-white p-6 rounded-2xl border-2 border-gray-200 mb-10">
          <Shield className="w-8 h-8 text-red-500 mb-3" />
          <h3 className="text-xl font-bold mb-2">Limitation of Liability</h3>
          <p className="text-gray-600 text-sm">
            Doodledelight is not liable for any indirect or consequential
            damages arising from the use of our services.
          </p>
        </div>

        {/* FOOTER NOTE */}
        <div className="bg-gradient-to-r from-orange-50 to-red-50 border border-orange-200 rounded-2xl p-6">
          <p className="text-gray-700 text-sm">
            <strong>Last Updated:</strong> May 2, 2026
          </p>
          <p className="text-gray-600 text-sm mt-2">
            Contact:{" "}
            <span className="text-orange-600 font-semibold">
              info@Doodledelight.com
            </span>
          </p>
        </div>
      </div>
    </PageLayout>
  );
}
