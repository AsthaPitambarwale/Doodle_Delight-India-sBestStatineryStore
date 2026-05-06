import { PackageSearch, Truck, MapPin, Clock } from "lucide-react";
import { PageLayout } from "../components/PageLayout";
import { useState, useEffect } from "react";

const BASE_URL = import.meta.env.VITE_BASE_URL || "http://localhost:5000/api";

export function TrackOrder({ orderId: initialOrderId }: { orderId?: string }) {
  const [orderId, setOrderId] = useState(initialOrderId || "");
  const [order, setOrder] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState<{
    message: string;
    type: "success" | "error";
  } | null>(null);

  useEffect(() => {
    if (initialOrderId) {
      setOrderId(initialOrderId);
      handleTrack(initialOrderId);
    }
  }, [initialOrderId]);

  const showToast = (
    message: string,
    type: "success" | "error" = "success",
  ) => {
    setToast({ message, type });

    setTimeout(() => {
      setToast(null);
    }, 2500);
  };

  const handleTrack = async (idParam?: string) => {
    const id = idParam || orderId;
    if (!id) return;

    setLoading(true);

    try {
      const res = await fetch(`${BASE_URL}/orders/track/${id}`);
      const data = await res.json();

      if (!data || data.error) {
        showToast("Order not found", "error");
        setOrder(null);
      } else {
        setOrder(data);
      }
    } catch (err) {
      console.error(err);
      showToast("Error fetching order", "error");
    }

    setLoading(false);
  };

  // ✅ FIXED LOGIC
  const steps = ["placed", "paid", "shipped", "delivered"];

  const getStepIndex = (status: string) => {
    switch (status) {
      case "placed":
        return 0; // COD
      case "paid":
        return 1; // Online paid
      case "shipped":
        return 2;
      case "delivered":
        return 3;
      default:
        return 0;
    }
  };

  return (
    <PageLayout>
      <div className="max-w-4xl mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold mb-4">Track Your Order</h1>

        {/* SEARCH */}
        <div className="bg-white p-8 rounded-2xl border mb-8">
          <div className="flex gap-3 mb-4 items-center">
            <PackageSearch className="text-orange-500" />
            <h2 className="text-xl font-bold">Order Tracking</h2>
          </div>

          <input
            value={orderId}
            onChange={(e) => setOrderId(e.target.value)}
            placeholder="Enter Order ID"
            className="w-full px-4 py-3 border rounded-xl mb-4"
          />

          <button
            onClick={() => handleTrack()}
            className="w-full bg-orange-500 text-white py-3 rounded-xl"
          >
            {loading ? "Tracking..." : "Track Order"}
          </button>
        </div>

        {/* RESULT */}
        {order && (
          <div className="bg-white p-8 rounded-2xl border mt-8">
            <h2 className="text-xl font-bold mb-6">Order Status</h2>

            {/* ✅ STEPPER */}
            {(() => {
              const currentStep = getStepIndex(order.status);

              return (
                <div className="flex justify-between mb-10">
                  {steps.map((step, i) => {
                    const active = i <= currentStep;

                    return (
                      <div key={step} className="text-center flex-1">
                        <div
                          className={`w-10 h-10 mx-auto rounded-full flex items-center justify-center text-white ${
                            active ? "bg-green-500" : "bg-gray-300"
                          }`}
                        >
                          {i + 1}
                        </div>

                        <p className="text-sm mt-2 capitalize">{step}</p>
                      </div>
                    );
                  })}
                </div>
              );
            })()}

            {/* ITEMS */}
            <div className="space-y-4 mb-6">
              {order?.items?.length > 0 ? (
                order.items.map((item: any, i: number) => (
                  <div key={i} className="flex gap-4 border-b pb-3">
                    <img
                      src={item.image}
                      className="w-16 h-16 rounded-lg border"
                    />

                    <div className="flex-1">
                      <p className="font-semibold">{item.name}</p>
                      <p className="text-sm text-gray-500">
                        Qty: {item.quantity}
                      </p>
                    </div>

                    <p className="font-bold">₹{item.price}</p>
                  </div>
                ))
              ) : (
                <p className="text-gray-500">No items found</p>
              )}
            </div>

            <div className="flex justify-between font-bold text-lg">
              <span>Total</span>
              <span>₹{order.totalAmount}</span>
            </div>
          </div>
        )}

        <br />

        {/* SAMPLE UI */}
        <div className="bg-white p-8 rounded-2xl border-2 border-gray-200">
          <h2 className="text-xl font-bold mb-6">Sample Tracking Status</h2>

          <div className="space-y-6">
            <div className="flex items-start gap-4">
              <Clock className="text-green-500" />
              <div>
                <h3 className="font-bold">Order Placed</h3>
                <p className="text-gray-600 text-sm">
                  Your order has been confirmed.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <PackageSearch className="text-blue-500" />
              <div>
                <h3 className="font-bold">Packed</h3>
                <p className="text-gray-600 text-sm">
                  Your items are being packed.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <Truck className="text-orange-500" />
              <div>
                <h3 className="font-bold">Out for Delivery</h3>
                <p className="text-gray-600 text-sm">
                  Your order is on the way.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <MapPin className="text-gray-400" />
              <div>
                <h3 className="font-bold text-gray-400">Delivered</h3>
                <p className="text-gray-600 text-sm">
                  Pending delivery completion.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* TOAST */}
        {toast && (
          <div className="fixed top-4 md:top-6 left-1/2 -translate-x-1/2 z-[100] w-[90%] md:w-auto">
            <div
              className={`px-6 py-3 rounded-xl shadow-2xl border flex items-center gap-3 animate-in fade-in slide-in-from-top ${
                toast.type === "success"
                  ? "bg-green-50 text-green-700 border-green-200"
                  : "bg-red-50 text-red-700 border-red-200"
              }`}
            >
              <span className="font-semibold">{toast.message}</span>
            </div>
          </div>
        )}
      </div>
    </PageLayout>
  );
}