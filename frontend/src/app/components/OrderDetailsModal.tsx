import {
  Truck,
  Package,
  CheckCircle,
  RefreshCcw,
  XCircle,
  RotateCcw,
  BadgeCheck,
} from "lucide-react";

export default function OrderDetailsModal({
  order,
  onClose,
  onReorder,
}: any) {
  if (!order) return null;

  // Dynamic Steps
  const getSteps = (status: string) => {
    if (status === "cancelled") {
      return ["placed", "cancelled"];
    }

    if (["refund_requested", "refunded"].includes(status)) {
      return [
        "placed",
        "paid",
        "shipped",
        "delivered",
        "refund_requested",
        "refunded",
      ];
    }

    return ["placed", "paid", "shipped", "delivered"];
  };

  const steps = getSteps(order.status);

  const getStepIndex = (status: string) => {
    return steps.indexOf(status);
  };

  const currentStep = getStepIndex(order.status);

  const getStepIcon = (step: string) => {
    switch (step) {
      case "placed":
      case "paid":
        return <Package size={18} />;

      case "shipped":
        return <Truck size={18} />;

      case "delivered":
        return <CheckCircle size={18} />;

      case "cancelled":
        return <XCircle size={18} />;

      case "refund_requested":
        return <RotateCcw size={18} />;

      case "refunded":
        return <BadgeCheck size={18} />;

      default:
        return <Package size={18} />;
    }
  };

  const getStepColor = (step: string, active: boolean) => {
    if (!active) {
      return "bg-gray-200 text-gray-400";
    }

    if (step === "cancelled") {
      return "bg-red-500 text-white";
    }

    if (["refund_requested", "refunded"].includes(step)) {
      return "bg-yellow-500 text-white";
    }

    return "bg-green-500 text-white";
  };

  // Line Colors
  const getLineColor = (step: string, active: boolean) => {
    if (!active) {
      return "bg-gray-200";
    }

    if (step === "cancelled") {
      return "bg-red-500";
    }

    if (["refund_requested", "refunded"].includes(step)) {
      return "bg-yellow-500";
    }

    return "bg-green-500";
  };

  return (
    <div className="fixed inset-0 bg-black/60 z-50 flex justify-center items-center p-4">
      <div className="bg-white rounded-2xl w-full max-w-2xl shadow-2xl overflow-hidden max-h-[95vh] overflow-y-auto">
        
        {/* HEADER */}
        <div className="flex justify-between items-center p-5 border-b">
          <div>
            <h2 className="font-bold text-xl">Order #{order._id}</h2>

            <p className="text-sm text-gray-500">
              {new Date(order.createdAt).toLocaleString()}
            </p>
          </div>

          {/* STATUS BADGE */}
          <span
            className={`px-3 py-1 rounded-full text-xs font-bold
              ${
                order.status === "cancelled"
                  ? "bg-red-100 text-red-700"
                  : order.status === "refund_requested"
                    ? "bg-yellow-100 text-yellow-700"
                    : order.status === "refunded"
                      ? "bg-green-100 text-green-700"
                      : order.status === "delivered"
                        ? "bg-green-100 text-green-700"
                        : "bg-blue-100 text-blue-700"
              }
            `}
          >
            {order.status.replace("_", " ")}
          </span>
        </div>

        {/* TRACKING TIMELINE */}
        <div className="p-5">
          <h3 className="font-semibold mb-6">Tracking</h3>

          <div className="flex justify-between items-start gap-2 overflow-x-auto pb-2">
            {steps.map((step, index) => {
              const isActive = index <= currentStep;

              return (
                <div
                  key={step}
                  className="flex-1 text-center relative min-w-[90px]"
                >
                  {/* LINE */}
                  {index < steps.length - 1 && (
                    <div
                      className={`absolute top-5 left-1/2 w-full h-1 z-0
                        ${getLineColor(step, index < currentStep)}
                      `}
                    />
                  )}

                  {/* ICON */}
                  <div
                    className={`relative z-10 w-10 h-10 mx-auto rounded-full flex items-center justify-center
                      ${getStepColor(step, isActive)}
                    `}
                  >
                    {getStepIcon(step)}
                  </div>

                  {/* LABEL */}
                  <p
                    className={`text-xs mt-2 capitalize font-medium
                      ${
                        isActive
                          ? "text-gray-800"
                          : "text-gray-400"
                      }
                    `}
                  >
                    {step.replace("_", " ")}
                  </p>
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
                  <p className="font-semibold text-gray-900">
                    {item.name}
                  </p>

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