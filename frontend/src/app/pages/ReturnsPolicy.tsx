import { RefreshCcw, PackageCheck, Ban, RotateCcw } from "lucide-react";
import { PageLayout } from "../components/PageLayout";

export function ReturnsPolicy() {
  return (
    <PageLayout>
      <div className="max-w-4xl mx-auto px-4 py-12">

        <h1 className="text-4xl font-bold text-gray-900 mb-6">
          Returns Policy
        </h1>

        <p className="text-gray-600 text-lg mb-10">
          Easy, transparent and hassle-free return process.
        </p>

        {/* RETURN POLICY */}
        <div className="bg-white p-6 rounded-2xl border-2 border-gray-200 mb-6">
          <PackageCheck className="w-8 h-8 text-green-500 mb-3" />
          <h3 className="text-xl font-bold mb-2">Return Policy</h3>
          <p className="text-gray-600 text-sm">
            We offer a 7-day return policy from the date of delivery. Products
            must be unused, in original packaging, and with all tags intact.
          </p>
        </div>

        {/* NON RETURNABLE */}
        <div className="bg-white p-6 rounded-2xl border-2 border-gray-200 mb-6">
          <Ban className="w-8 h-8 text-red-500 mb-3" />
          <h3 className="text-xl font-bold mb-2">Non-Returnable Items</h3>

          <ul className="text-gray-600 text-sm space-y-2">
            <li>• Customized or personalized products</li>
            <li>• Products marked as final sale</li>
            <li>• Opened stationery sets or writing instruments</li>
            <li>• Gift cards and vouchers</li>
          </ul>
        </div>

        {/* RETURN PROCESS */}
        <div className="bg-white p-6 rounded-2xl border-2 border-gray-200 mb-6">
          <RefreshCcw className="w-8 h-8 text-orange-500 mb-3" />
          <h3 className="text-xl font-bold mb-4">Return Process</h3>

          <ol className="text-gray-600 text-sm space-y-2 list-decimal list-inside">
            <li>Log in to your account and go to "My Orders"</li>
            <li>Select the order you want to return</li>
            <li>Click on "Return Item" and select reason</li>
            <li>We arrange pickup within 2–3 business days</li>
            <li>Refund is processed after inspection</li>
          </ol>
        </div>

        {/* REFUND */}
        <div className="bg-white p-6 rounded-2xl border-2 border-gray-200 mb-6">
          <RotateCcw className="w-8 h-8 text-blue-500 mb-3" />
          <h3 className="text-xl font-bold mb-2">Refund Processing</h3>
          <p className="text-gray-600 text-sm">
            Refunds are processed within 7–10 business days after receiving the
            returned item. Amount is credited to original payment method.
            Shipping charges are non-refundable.
          </p>
        </div>

        {/* EXCHANGES */}
        <div className="bg-white p-6 rounded-2xl border-2 border-gray-200 mb-10">
          <h3 className="text-xl font-bold mb-2">Exchanges</h3>
          <p className="text-gray-600 text-sm">
            We currently do not offer direct exchanges. You may return the item
            for a refund and place a new order.
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