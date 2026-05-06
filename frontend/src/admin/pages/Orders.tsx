import { useEffect, useMemo, useState } from "react";
import api from "../api/api";

const statuses = [
  "placed",
  "paid",
  "shipped",
  "delivered",
  "cancelled",
  "refund_requested",
  "refunded",
];

export default function Orders() {
  const [orders, setOrders] = useState<any[]>([]);
  const [openOrder, setOpenOrder] = useState<any | null>(null);
  const [toast, setToast] = useState<any>(null);

  const [statusFilter, setStatusFilter] = useState("all");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const showToast = (message: string, type: "success" | "error" = "success") => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 2500);
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const res = await api.get("/admin/orders");
      setOrders(res.data);
    } catch {
      showToast("Failed to load orders", "error");
    }
  };

  const updateStatus = async (id: string, status: string) => {
    try {
      const res = await api.patch(`/admin/orders/${id}/status`, { status });
      setOrders((prev) => prev.map((o) => (o._id === id ? res.data : o)));
      showToast("Order updated", "success");
    } catch (err: any) {
      showToast(err?.response?.data?.message || "Update failed", "error");
    }
  };

  const getNextAction = (order: any) => {
    const isCOD = order.paymentMethod === "cod";

    switch (order.status) {
      case "placed":
        return { label: "Mark Paid", next: "paid", color: "bg-blue-600" };
      case "paid":
        return { label: "Ship Order", next: "shipped", color: "bg-indigo-600" };
      case "shipped":
        return { label: "Mark Delivered", next: "delivered", color: "bg-green-600" };
      case "delivered":
        if (isCOD && !order.paymentReceived) {
          return { label: "Confirm COD", next: "refunded", color: "bg-emerald-600" };
        }
        return null;
      default:
        return null;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "delivered":
        return "bg-green-100 text-green-700";
      case "shipped":
        return "bg-blue-100 text-blue-700";
      case "paid":
        return "bg-purple-100 text-purple-700";
      case "cancelled":
        return "bg-red-100 text-red-700";
      case "refund_requested":
        return "bg-yellow-100 text-yellow-700";
      case "refunded":
        return "bg-gray-200 text-gray-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  const steps = ["placed", "paid", "shipped", "delivered"];

  const getStepIndex = (status: string) => steps.indexOf(status);

  const filteredOrders = useMemo(() => {
    let data = [...orders];

    if (statusFilter !== "all") {
      data = data.filter((o) => o.status === statusFilter);
    }

    if (startDate) {
      data = data.filter((o) => new Date(o.createdAt) >= new Date(startDate));
    }

    if (endDate) {
      data = data.filter((o) => new Date(o.createdAt) <= new Date(endDate));
    }

    return data;
  }, [orders, statusFilter, startDate, endDate]);

  return (
    <div className="p-3 md:p-6 bg-gray-50 min-h-screen">

      {/* HEADER */}
      <h1 className="text-2xl md:text-3xl font-bold mb-4 md:mb-6">
        Order Management
      </h1>

      {/* FILTER */}
      <div className="bg-white p-3 md:p-4 rounded-xl shadow flex flex-col md:flex-row gap-3 mb-5 md:mb-6">
        <select
          className="border p-2 rounded-lg w-full md:w-auto"
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option value="all">All Status</option>
          {statuses.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>

        <input
          type="date"
          className="border p-2 rounded-lg w-full md:w-auto"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
        />

        <input
          type="date"
          className="border p-2 rounded-lg w-full md:w-auto"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
        />
      </div>

      {/* GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">

        {filteredOrders.map((o) => {
          const action = getNextAction(o);
          const currentStep = getStepIndex(o.status);

          return (
            <div
              key={o._id}
              className="bg-white rounded-2xl shadow-sm hover:shadow-md transition p-4 md:p-5 border"
            >

              {/* TOP */}
              <div className="flex justify-between items-start gap-3">
                <div className="min-w-0">
                  <h2 className="font-semibold text-base md:text-lg truncate">
                    {o.orderId || `ORD-${o._id.slice(-6)}`}
                  </h2>
                  <p className="text-gray-500 text-sm">
                    ₹{o.totalAmount}
                  </p>
                </div>

                <span
                  className={`text-[11px] md:text-xs px-3 py-1 rounded-full whitespace-nowrap ${getStatusColor(o.status)}`}
                >
                  {o.status}
                </span>
              </div>

              {/* TIMELINE */}
              <div className="mt-4 flex flex-wrap gap-2 text-xs">
                {steps.map((step, i) => (
                  <div key={step} className="flex items-center gap-1">
                    <div
                      className={`w-2.5 h-2.5 rounded-full ${i <= currentStep ? "bg-green-500" : "bg-gray-300"
                        }`}
                    />
                    <span className="capitalize text-gray-600">
                      {step}
                    </span>
                  </div>
                ))}
              </div>

              {/* ACTIONS */}
              <div className="mt-5 flex flex-col sm:flex-row gap-2 sm:justify-between">

                <button
                  onClick={() => setOpenOrder(o)}
                  className="text-blue-600 text-sm font-medium text-left"
                >
                  View Details
                </button>

                {action && (
                  <button
                    onClick={() => updateStatus(o._id, action.next)}
                    className={`${action.color} text-white px-4 py-2 rounded-lg text-xs font-semibold w-full sm:w-auto`}
                  >
                    {action.label}
                  </button>
                )}

              </div>

            </div>
          );
        })}
      </div>

      {/* MODAL (RESPONSIVE FIX) */}
      {openOrder && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center p-3 z-[9999]">

          <div className="bg-white w-full max-w-md rounded-2xl p-5 shadow-xl">

            <div className="flex justify-between items-center">
              <h2 className="text-lg font-bold">Order Details</h2>
              <button onClick={() => setOpenOrder(null)}>✕</button>
            </div>

            <p className="text-sm text-gray-500 mt-2 break-all">
              {openOrder.orderId || openOrder._id}
            </p>

            <div className="mt-5 border-t pt-4">
              <h3 className="font-semibold mb-2">Items</h3>

              <div className="space-y-2 max-h-60 overflow-y-auto">
                {openOrder.items?.map((item: any, i: number) => (
                  <div
                    key={i}
                    className="flex justify-between text-sm gap-2"
                  >
                    <span className="truncate">{item.name}</span>
                    <span className="whitespace-nowrap">
                      ₹{item.price} × {item.quantity}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <button
              onClick={() => setOpenOrder(null)}
              className="mt-5 w-full bg-black text-white py-2 rounded-lg"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* TOAST */}
      {toast && (
        <div className="fixed top-5 left-1/2 -translate-x-1/2 z-[99999]">
          <div
            className={`px-4 py-2 rounded-xl shadow text-sm ${toast.type === "success"
                ? "bg-green-100 text-green-700"
                : "bg-red-100 text-red-700"
              }`}
          >
            {toast.message}
          </div>
        </div>
      )}
    </div>
  );
}