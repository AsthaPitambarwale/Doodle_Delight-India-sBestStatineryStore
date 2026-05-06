import {Truck, Package, CheckCircle, RefreshCcw } from "lucide-react";

export default function OrderDetailsModal({
  order,
  onClose,
  onReorder,
}: any) {
  if (!order) return null;

  const steps = ["placed", "packed", "shipped", "delivered"];

  const getStepIndex = (status: string) => {
    switch (status) {
      case "placed":
        return 0;
      case "paid":
        return 0;
      case "packed":
        return 1;
      case "shipped":
        return 2;
      case "delivered":
        return 3;
      default:
        return 0;
    }
  };

  const currentStep = getStepIndex(order.status);

  return (
    <div className="fixed inset-0 bg-black/60 z-50 flex justify-center items-center p-4">
      <div className="bg-white rounded-2xl w-full max-w-2xl shadow-2xl overflow-hidden">
        
        {/* HEADER */}
        <div className="flex justify-between items-center p-5 border-b">
          <div>
            <h2 className="font-bold text-xl">Order #{order._id}</h2>
            <p className="text-sm text-gray-500">
              {new Date(order.createdAt).toLocaleString()}
            </p>
          </div>
        </div>

        {/* TRACKING TIMELINE */}
        <div className="p-5">
          <h3 className="font-semibold mb-4">Tracking</h3>

          <div className="flex justify-between items-center">
            {steps.map((step, index) => {
              const isActive = index <= currentStep;

              return (
                <div key={step} className="flex-1 text-center relative">
                  <div
                    className={`w-10 h-10 mx-auto rounded-full flex items-center justify-center 
                    ${isActive ? "bg-green-500 text-white" : "bg-gray-200"}`}
                  >
                    {index === 0 && <Package size={18} />}
                    {index === 1 && <Package size={18} />}
                    {index === 2 && <Truck size={18} />}
                    {index === 3 && <CheckCircle size={18} />}
                  </div>

                  <p
                    className={`text-xs mt-2 capitalize ${
                      isActive ? "text-green-600 font-semibold" : "text-gray-400"
                    }`}
                  >
                    {step}
                  </p>

                  {/* Line */}
                  {index < steps.length - 1 && (
                    <div
                      className={`absolute top-5 left-1/2 w-full h-1 
                      ${index < currentStep ? "bg-green-500" : "bg-gray-200"}`}
                    />
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* ITEMS */}
        <div className="p-5 border-t">
          <h3 className="font-semibold mb-3">Items</h3>

          <div className="space-y-3 max-h-60 overflow-y-auto">
            {order.items.map((item: any, i: number) => (
              <div
                key={i}
                className="flex items-center gap-4 border rounded-lg p-3"
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-16 h-16 object-cover rounded-lg"
                />

                <div className="flex-1">
                  <p className="font-semibold text-gray-900">{item.name}</p>
                  <p className="text-sm text-gray-500">
                    Qty: {item.quantity}
                  </p>
                </div>

                <p className="font-bold text-orange-600">
                  ₹{item.price}
                </p>
              </div>
            ))}
          </div>

          <div className="text-right mt-4 text-lg font-bold">
            Total: ₹{Math.round(order.totalAmount)}
          </div>
        </div>

        {/* ACTIONS */}
        <div className="p-5 border-t flex gap-3">
          <button
            onClick={() => onReorder(order)}
            className="flex-1 bg-orange-500 text-white py-2 rounded-lg hover:bg-orange-600 flex items-center justify-center gap-2"
          >
            <RefreshCcw size={16} />
            Reorder
          </button>

          <button
            onClick={onClose}
            className="flex-1 border py-2 rounded-lg hover:bg-gray-100"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}