import { HelpCircle, MessageSquare, Phone, Mail } from "lucide-react";
import { PageLayout } from "../components/PageLayout";

export function HelpCenter() {
  return (
    <PageLayout>
      <div className="max-w-4xl mx-auto px-4 py-12">

        <h1 className="text-4xl font-bold mb-4">Help Center</h1>
        <p className="text-gray-600 text-lg mb-10">
          Get quick answers and support for your orders and account.
        </p>

        <div className="grid md:grid-cols-2 gap-6 mb-10">

          <div className="bg-white p-6 rounded-2xl border-2">
            <HelpCircle className="text-orange-500 mb-3" />
            <h3 className="font-bold text-xl">FAQs</h3>
            <p className="text-gray-600">Find answers to common questions.</p>
          </div>

          <div className="bg-white p-6 rounded-2xl border-2">
            <MessageSquare className="text-orange-500 mb-3" />
            <h3 className="font-bold text-xl">Live Chat</h3>
            <p className="text-gray-600">Talk to our support team instantly.</p>
          </div>

        </div>

        <div className="bg-white p-8 rounded-2xl border-2">
          <h2 className="text-2xl font-bold mb-6">Contact Support</h2>

          <div className="space-y-3 text-gray-700">
            <p className="flex items-center gap-2"><Phone className="w-4 h-4 text-orange-500" /> +91 12345 67890</p>
            <p className="flex items-center gap-2"><Mail className="w-4 h-4 text-orange-500" /> support@doodledelight.com</p>
          </div>
        </div>

      </div>
    </PageLayout>
  );
}