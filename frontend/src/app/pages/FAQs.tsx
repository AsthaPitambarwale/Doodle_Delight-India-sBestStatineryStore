import { ChevronDown, Search } from "lucide-react";
import { useState } from "react";
import { PageLayout } from "../components/PageLayout";

export function FAQs() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const [searchQuery, setSearchQuery] = useState("");

  const faqs = [
    {
      category: "Orders & Shipping",
      questions: [
        {
          q: "How long does delivery take?",
          a: "Standard delivery takes 3-5 business days. Express delivery (available in select cities) takes 1-2 business days. Free delivery is available on orders above ₹500.",
        },
        {
          q: "Can I track my order?",
          a: 'Yes! Once your order is shipped, you will receive a tracking number via email and SMS. You can track your order in the "My Account" section or use the tracking link provided.',
        },
        {
          q: "What are the shipping charges?",
          a: "Shipping is FREE for orders above ₹500. For orders below ₹500, a nominal shipping fee of ₹50 applies.",
        },
      ],
    },
    {
      category: "Payment & Pricing",
      questions: [
        {
          q: "What payment methods do you accept?",
          a: "We accept all major payment methods including Credit/Debit Cards (Visa, Mastercard, RuPay), UPI, Net Banking, Paytm, PhonePe, and Cash on Delivery (COD) for eligible orders.",
        },
        {
          q: "Is it safe to use my credit card on your site?",
          a: "Absolutely! We use industry-standard SSL encryption to protect your payment information. We never store your complete card details on our servers.",
        },
        {
          q: "What is wholesale pricing?",
          a: "Wholesale pricing is special discounted pricing (up to 40% OFF) available for bulk orders. Create a wholesale account to view wholesale prices and place bulk orders.",
        },
      ],
    },
    {
      category: "Returns & Refunds",
      questions: [
        {
          q: "What is your return policy?",
          a: "We offer a 7-day return policy for most products. Items must be unused, in original packaging, and with all tags intact. Some products like stationery sets may have specific return conditions.",
        },
        {
          q: "How do I return a product?",
          a: 'Go to "My Account" > "My Orders", select the order, and click "Return Item". Our team will arrange a pickup within 2-3 business days. Refunds are processed within 7-10 business days after we receive the returned item.',
        },
        {
          q: "When will I receive my refund?",
          a: "Refunds are typically processed within 7-10 business days after the returned product reaches our warehouse. The amount will be credited to your original payment method.",
        },
      ],
    },
    {
      category: "Account & Membership",
      questions: [
        {
          q: "Do I need an account to place an order?",
          a: "Yes, creating an account helps you track orders, save addresses, maintain wishlist, and get personalized recommendations. Account creation is quick and free!",
        },
        {
          q: "How do I reset my password?",
          a: 'Click on "Forgot Password" on the login page. Enter your registered email address, and we will send you a password reset link.',
        },
        {
          q: "Can I change my registered email or phone number?",
          a: 'Yes, you can update your contact information from the Settings section in "My Account".',
        },
      ],
    },
    {
      category: "Products & Availability",
      questions: [
        {
          q: "Are all products 100% genuine?",
          a: "Yes! We source all products directly from authorized distributors and manufacturers. We guarantee 100% authenticity for all products listed on our platform.",
        },
        {
          q: "How do I know if a product is in stock?",
          a: 'Product availability is shown on each product page. If a product shows "Low Stock", it means limited quantities are available. Out of stock items cannot be added to cart.',
        },
        {
          q: "Can I request a product that is not available?",
          a: "Absolutely! Contact our customer support with your requirement, and we will try our best to make it available for you.",
        },
      ],
    },
  ];

  const filteredFAQs = faqs
    .map((category) => ({
      ...category,
      questions: category.questions.filter(
        (faq) =>
          faq.q.toLowerCase().includes(searchQuery.toLowerCase()) ||
          faq.a.toLowerCase().includes(searchQuery.toLowerCase()),
      ),
    }))
    .filter((category) => category.questions.length > 0);

  return (
    <PageLayout>
      <div className="max-w-4xl mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Frequently Asked Questions
        </h1>
        <p className="text-gray-600 text-lg mb-8">
          Find answers to common questions about our products and services
        </p>

        {/* Search */}
        <div className="relative mb-8">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search FAQs..."
            className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-orange-500 transition-colors"
          />
        </div>

        {/* FAQs */}
        <div className="space-y-8">
          {filteredFAQs.map((category, catIndex) => (
            <div key={catIndex}>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                {category.category}
              </h2>
              <div className="space-y-3">
                {category.questions.map((faq, faqIndex) => {
                  const globalIndex = catIndex * 100 + faqIndex;
                  return (
                    <div
                      key={faqIndex}
                      className="bg-white border-2 border-gray-200 rounded-xl overflow-hidden"
                    >
                      <button
                        onClick={() =>
                          setOpenIndex(
                            openIndex === globalIndex ? null : globalIndex,
                          )
                        }
                        className="w-full flex items-center justify-between p-4 text-left hover:bg-gray-50 transition-colors"
                      >
                        <span className="font-semibold text-gray-900 pr-4">
                          {faq.q}
                        </span>
                        <ChevronDown
                          className={`w-5 h-5 text-gray-500 flex-shrink-0 transition-transform ${
                            openIndex === globalIndex ? "rotate-180" : ""
                          }`}
                        />
                      </button>
                      {openIndex === globalIndex && (
                        <div className="px-4 pb-4 text-gray-600 border-t border-gray-100 pt-4">
                          {faq.a}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {filteredFAQs.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">No FAQs found matching your search.</p>
          </div>
        )}

        <div className="mt-12 bg-gradient-to-r from-orange-50 to-red-50 border border-orange-200 rounded-2xl p-8 text-center">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">
            Still have questions?
          </h3>
          <p className="text-gray-600 mb-6">
            Can't find the answer you're looking for? Our customer support team
            is here to help!
          </p>
          <button
            // onClick={onBack}
            className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-8 py-3 rounded-xl hover:from-orange-600 hover:to-red-600 font-bold shadow-lg hover:shadow-xl transition-all"
          >
            Contact Support
          </button>
        </div>
      </div>
    </PageLayout>
  );
}
