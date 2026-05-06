import { Shield, Eye, Lock, UserCheck } from "lucide-react";
import { PageLayout } from "../components/PageLayout";

export function PrivacyPolicy() {
  return (
    <PageLayout>
      <div className="max-w-4xl mx-auto px-4 py-12">

        <h1 className="text-4xl font-bold text-gray-900 mb-6">
          Privacy Policy
        </h1>

        <p className="text-gray-600 text-lg mb-10">
          Your privacy is important to us. This policy explains how we collect,
          use, and protect your information.
        </p>

        {/* INFORMATION WE COLLECT */}
        <div className="bg-white p-6 rounded-2xl border-2 border-gray-200 mb-6">
          <Eye className="w-8 h-8 text-orange-500 mb-3" />
          <h3 className="text-xl font-bold mb-3">Information We Collect</h3>
          <p className="text-gray-600 text-sm mb-3">
            We collect information you provide when creating an account, placing orders,
            subscribing to newsletters, or contacting support.
          </p>
          <p className="text-gray-600 text-sm">
            This includes name, email, phone number, shipping address, payment details,
            and order history.
          </p>
        </div>

        {/* HOW WE USE */}
        <div className="bg-white p-6 rounded-2xl border-2 border-gray-200 mb-6">
          <UserCheck className="w-8 h-8 text-green-500 mb-3" />
          <h3 className="text-xl font-bold mb-3">How We Use Your Information</h3>
          <ul className="text-gray-600 text-sm space-y-2">
            <li>• To process and deliver your orders</li>
            <li>• To communicate updates about purchases</li>
            <li>• To send marketing emails (with consent)</li>
            <li>• To improve website experience</li>
            <li>• To provide product recommendations</li>
          </ul>
        </div>

        {/* SHARING */}
        <div className="bg-white p-6 rounded-2xl border-2 border-gray-200 mb-6">
          <Lock className="w-8 h-8 text-blue-500 mb-3" />
          <h3 className="text-xl font-bold mb-2">Information Sharing</h3>
          <p className="text-gray-600 text-sm">
            We do not sell your personal data. We may share limited information
            with trusted partners like payment processors and shipping companies
            to complete your orders.
          </p>
        </div>

        {/* SECURITY */}
        <div className="bg-white p-6 rounded-2xl border-2 border-gray-200 mb-6">
          <Shield className="w-8 h-8 text-purple-500 mb-3" />
          <h3 className="text-xl font-bold mb-2">Data Security</h3>
          <p className="text-gray-600 text-sm">
            We use advanced security measures including encryption and secure servers.
            However, no online system is 100% secure.
          </p>
        </div>

        {/* RIGHTS */}
        <div className="bg-white p-6 rounded-2xl border-2 border-gray-200 mb-10">
          <h3 className="text-xl font-bold mb-2">Your Rights</h3>
          <p className="text-gray-600 text-sm">
            You can access, update, or delete your personal data anytime via your
            account settings or by contacting our support team.
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