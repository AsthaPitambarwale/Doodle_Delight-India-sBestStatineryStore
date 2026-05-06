import {
  Home,
  Info,
  Phone,
  HelpCircle,
  Truck,
  RotateCcw,
  Shield,
  CreditCard,
  Briefcase,
} from "lucide-react";
import { PageLayout } from "../components/PageLayout";

type SitemapProps = {
  onNavigate: (page: string) => void;
};

export function Sitemap({ onNavigate }: SitemapProps) {
  const pages = [
    {
      title: "Main Pages",
      items: [
        { name: "Home", path: "", icon: Home },
        { name: "About Us", path: "about", icon: Info },
        { name: "Contact Us", path: "contact", icon: Phone },
        { name: "Careers", path: "careers", icon: Briefcase },
      ],
    },
    {
      title: "Support",
      items: [
        { name: "FAQs", path: "faqs", icon: HelpCircle },
        { name: "Shipping Information", path: "shipping", icon: Truck },
        { name: "Returns Policy", path: "returns", icon: RotateCcw },
      ],
    },
    {
      title: "Legal",
      items: [
        { name: "Privacy Policy", path: "privacy", icon: Shield },
        { name: "Terms of Service", path: "terms", icon: Shield },
        { name: "Payment Methods", path: "payment", icon: CreditCard },
      ],
    },
  ];

  return (
    <PageLayout>
      <div className="max-w-5xl mx-auto px-4 py-12">

        <h1 className="text-4xl font-bold mb-3">Sitemap</h1>

        <p className="text-gray-600 mb-10">
          Navigate all pages of Doodle Delight easily.
        </p>

        <div className="space-y-10">
          {pages.map((section, idx) => (
            <div key={idx}>
              <h2 className="text-xl font-bold mb-4">
                {section.title}
              </h2>

              <div className="grid md:grid-cols-3 gap-4">
                {section.items.map((item, i) => {
                  const Icon = item.icon;

                  return (
                    <button
                      key={i}
                      onClick={() => onNavigate(item.path)}
                      className="bg-white border-2 border-gray-200 hover:border-orange-500  transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] rounded-2xl p-5 flex items-center gap-3 hover:shadow-md text-left"
                    >
                      <div className="w-10 h-10 bg-orange-100 rounded-xl flex items-center justify-center">
                        <Icon className="w-5 h-5 text-orange-600" />
                      </div>

                      <span className="font-semibold text-gray-800">
                        {item.name}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </PageLayout>
  );
}