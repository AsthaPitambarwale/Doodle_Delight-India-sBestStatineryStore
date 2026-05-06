import { Truck, Shield, Headphones, CreditCard } from 'lucide-react';

export function FeaturesSection() {
  const features = [
    {
      icon: Truck,
      title: 'Free Delivery',
      description: 'On orders above ₹500',
      color: 'from-blue-500 to-blue-600',
    },
    {
      icon: Shield,
      title: '100% Genuine',
      description: 'Authentic products only',
      color: 'from-green-500 to-green-600',
    },
    {
      icon: Headphones,
      title: '24/7 Support',
      description: 'Dedicated customer care',
      color: 'from-purple-500 to-purple-600',
    },
    {
      icon: CreditCard,
      title: 'Secure Payments',
      description: 'Safe & encrypted',
      color: 'from-orange-500 to-red-500',
    },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
      {features.map((feature, index) => {
        const Icon = feature.icon;
        return (
          <div
            key={index}
            className="bg-white rounded-2xl p-6 border border-gray-200 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 group"
          >
            <div className={`w-14 h-14 bg-gradient-to-br ${feature.color} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
              <Icon className="w-7 h-7 text-white" />
            </div>
            <h3 className="font-bold text-gray-900 mb-1">{feature.title}</h3>
            <p className="text-sm text-gray-600">{feature.description}</p>
          </div>
        );
      })}
    </div>
  );
}
