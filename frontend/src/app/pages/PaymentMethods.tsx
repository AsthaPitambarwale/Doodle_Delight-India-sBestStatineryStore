import { CreditCard, ShieldCheck, Wallet, Banknote } from "lucide-react";
import { PageLayout } from "../components/PageLayout";

export function PaymentMethods() {
  return (
    <PageLayout>
      <div className="max-w-4xl mx-auto px-4 py-12">

        <h1 className="text-4xl font-bold text-gray-900 mb-6">
          Payment Methods
        </h1>

        <p className="text-gray-600 text-lg mb-10">
          We offer secure and flexible payment options for all our customers.
        </p>

        {/* PAYMENT OPTIONS */}
        <div className="grid md:grid-cols-2 gap-6 mb-10">

          <div className="bg-white p-6 rounded-2xl border-2 border-gray-200">
            <CreditCard className="w-8 h-8 text-orange-500 mb-3" />
            <h3 className="text-xl font-bold mb-2">Accepted Payment Methods</h3>
            <ul className="text-gray-600 space-y-2 text-sm">
              <li>• Credit Cards: Visa, Mastercard, RuPay, American Express</li>
              <li>• Debit Cards: All major Indian banks</li>
              <li>• UPI: Google Pay, PhonePe, Paytm, BHIM</li>
              <li>• Net Banking: All major Indian banks</li>
              <li>• Digital Wallets: Paytm, PhonePe, Amazon Pay</li>
              <li>• Cash on Delivery (COD): Available up to ₹5000</li>
            </ul>
          </div>

          <div className="bg-white p-6 rounded-2xl border-2 border-gray-200">
            <ShieldCheck className="w-8 h-8 text-green-500 mb-3" />
            <h3 className="text-xl font-bold mb-2">Payment Security</h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              All transactions are processed through secure payment gateways
              using 256-bit SSL encryption. We do not store your full card details.
              Your data is directly handled by trusted payment partners.
            </p>
          </div>

        </div>

        {/* COD SECTION */}
        <div className="bg-white p-6 rounded-2xl border-2 border-gray-200 mb-6">
          <Banknote className="w-8 h-8 text-blue-500 mb-3" />
          <h3 className="text-xl font-bold mb-2">Cash on Delivery (COD)</h3>
          <p className="text-gray-600 text-sm">
            COD is available for orders up to ₹5000. A nominal COD handling fee
            of ₹50 may apply. Please keep exact change ready at delivery time.
          </p>
        </div>

        {/* FAILED TRANSACTIONS */}
        <div className="bg-white p-6 rounded-2xl border-2 border-gray-200 mb-6">
          <h3 className="text-xl font-bold mb-2">Failed Transactions</h3>
          <p className="text-gray-600 text-sm">
            If your payment fails but amount is debited, it will be automatically
            refunded within 5–7 business days. You may retry or use another method.
          </p>
        </div>

        {/* EMI */}
        <div className="bg-white p-6 rounded-2xl border-2 border-gray-200 mb-10">
          <Wallet className="w-8 h-8 text-purple-500 mb-3" />
          <h3 className="text-xl font-bold mb-2">EMI Options</h3>
          <p className="text-gray-600 text-sm">
            EMI is available on credit cards for orders above ₹3000. Terms and
            interest rates depend on your bank.
          </p>
        </div>

        {/* FOOTER NOTE */}
        <div className="bg-gradient-to-r from-orange-50 to-red-50 border border-orange-200 rounded-2xl p-6">
          <p className="text-gray-700 text-sm">
            <strong>Last Updated:</strong> May 2, 2026
          </p>
          <p className="text-gray-600 text-sm mt-2">
            If you have any questions about this policy, contact us at{" "}
            <span className="text-orange-600 font-semibold">
              info@Doodledelight.com
            </span>
          </p>
        </div>

      </div>
    </PageLayout>
  );
}