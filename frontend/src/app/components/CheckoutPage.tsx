import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const BASE_URL = import.meta.env.VITE_BASE_URL || "http://localhost:5000/api";

export default function CheckoutPage({
  items,
  user,
  userType,
  onClose,
  onClearCart,
}: any) {
  const [paymentMethod, setPaymentMethod] = useState<"razorpay" | "cod">(
    "razorpay",
  );
  const [orderSuccess, setOrderSuccess] = useState(false);
  const [toast, setToast] = useState<{
    message: string;
    type: "success" | "error";
  } | null>(null);
  const navigate = useNavigate();

  const showToast = (
    message: string,
    type: "success" | "error" = "success",
  ) => {
    setToast({ message, type });

    setTimeout(() => {
      setToast(null);
    }, 2500);
  };

  useEffect(() => {
    if (!orderSuccess) return;

    const timer = setTimeout(() => {
      onClearCart?.();
      onClose?.();

      navigate("/");
    }, 5000);

    return () => clearTimeout(timer);
  }, [orderSuccess]);

  // FIXED PRICE LOGIC
  const subtotal = items.reduce((sum: number, item: any) => {
    const price =
      userType === "wholesale" ? item.wholesalePrice || 0 : item.price || 0;

    return sum + price * item.quantity;
  }, 0);

  const discount = subtotal >= 999 ? subtotal * 0.2 : 0;
  const tax = (subtotal - discount) * 0.18;
  const delivery = subtotal >= 500 ? 0 : 50;
  const total = subtotal - discount + tax + delivery;

  // RAZORPAY
  const handleRazorpay = async () => {
    if (!(window as any).Razorpay) {
      showToast("Razorpay SDK not loaded", "error");
      return;
    }

    const res = await fetch(`${BASE_URL}/payment/create-order`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ amount: total }),
    });

    const order = await res.json();

    const options = {
      key: "rzp_test_SgXqmZaJmeBdes",
      amount: order.amount,
      currency: "INR",
      order_id: order.id,

      handler: async (response: any) => {
        const verify = await fetch(`${BASE_URL}/payment/verify-payment`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ...response,
            userId: user._id,
            cartItems: items,
            totalAmount: total,
          }),
        });

        const data = await verify.json();

        if (data.success) {
          setOrderSuccess(true);
        }
      },
    };

    const rzp = new (window as any).Razorpay(options);
    rzp.open();
  };

  //COD
  const handleCOD = async () => {
    const res = await fetch(`${BASE_URL}/payment/cod-order`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId: user._id,
        cartItems: items,
        totalAmount: total,
      }),
    });

    const data = await res.json();

    if (data.success) {
      setOrderSuccess(true);
    }
  };

  const handlePlaceOrder = () => {
    if (!user?._id) {
      showToast("Please login first", "error");
      return;
    }

    if (paymentMethod === "razorpay") {
      handleRazorpay();
    } else {
      handleCOD();
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-100 z-50 overflow-y-auto">
      <div className="max-w-6xl mx-auto p-6 grid md:grid-cols-3 gap-6">
        {/* LEFT SIDE */}
        <div className="md:col-span-2 space-y-6">
          {/* HEADER */}
          <h2 className="text-2xl font-bold">Checkout</h2>

          {/* CART ITEMS */}
          <div className="bg-white p-5 rounded-xl shadow">
            <h3 className="font-semibold mb-4">Your Items</h3>

            {items.map((item: any) => {
              const price =
                userType === "wholesale"
                  ? item.wholesalePrice || 0
                  : item.price || 0;

              return (
                <div
                  key={item._id}
                  className="flex gap-4 py-4 border-b last:border-none"
                >
                  {/* IMAGE */}
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-20 h-20 object-cover rounded-lg border"
                  />

                  {/* DETAILS */}
                  <div className="flex-1">
                    <p className="font-semibold text-gray-800">{item.name}</p>
                    <p className="text-sm text-gray-500">{item.brand}</p>

                    <div className="flex justify-between mt-2">
                      <span className="text-sm">Qty: {item.quantity}</span>
                      <span className="font-bold text-orange-600">
                        ₹{(price * item.quantity).toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* PAYMENT METHOD */}
          <div className="bg-white p-5 rounded-xl shadow">
            <h3 className="font-semibold mb-4">Payment Method</h3>

            <div className="space-y-3">
              {/* Razorpay */}
              <div
                onClick={() => setPaymentMethod("razorpay")}
                className={`border p-4 rounded-xl cursor-pointer ${
                  paymentMethod === "razorpay"
                    ? "border-green-500 bg-green-50"
                    : ""
                }`}
              >
                💳 Pay Online (Razorpay)
              </div>

              {/* COD */}
              <div
                onClick={() => setPaymentMethod("cod")}
                className={`border p-4 rounded-xl cursor-pointer ${
                  paymentMethod === "cod" ? "border-green-500 bg-green-50" : ""
                }`}
              >
                💵 Cash on Delivery
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT SIDE - BILL */}
        <div className="bg-white p-5 rounded-xl shadow h-fit sticky top-6">
          <h3 className="font-semibold mb-4">Order Summary</h3>

          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>₹{subtotal.toFixed(2)}</span>
            </div>

            <div className="flex justify-between text-green-600">
              <span>Discount</span>
              <span>-₹{discount.toFixed(2)}</span>
            </div>

            <div className="flex justify-between">
              <span>Tax (18%)</span>
              <span>₹{tax.toFixed(2)}</span>
            </div>

            <div className="flex justify-between">
              <span>Delivery</span>
              <span>{delivery === 0 ? "Free" : `₹${delivery}`}</span>
            </div>

            <hr />

            <div className="flex justify-between font-bold text-lg">
              <span>Total</span>
              <span>₹{total.toFixed(2)}</span>
            </div>
          </div>

          <button
            onClick={handlePlaceOrder}
            className="w-full mt-5 bg-green-500 hover:bg-green-600 text-white py-3 rounded-xl font-semibold"
          >
            Place Order
          </button>

          <button
            onClick={onClose}
            className="w-full mt-2 border py-2 rounded-xl"
          >
            Cancel
          </button>
        </div>
      </div>
      {orderSuccess && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[200]">
          <div className="bg-white p-8 rounded-2xl shadow-2xl text-center max-w-sm">
            <h2 className="text-2xl font-bold text-green-600 mb-2">
              🎉 Order Placed!
            </h2>
            <p className="text-gray-600 mb-4">
              Your order has been placed successfully.
            </p>

            <p className="text-sm text-gray-400">
              Redirecting to home in 5 seconds...
            </p>
          </div>
        </div>
      )}
      {toast && (
        <div className="fixed top-4 md:top-6 left-1/2 -translate-x-1/2 z-[100] w-[90%] md:w-auto">
          <div
            className={`px-6 py-3 rounded-xl shadow-2xl border flex items-center gap-3 animate-in fade-in slide-in-from-top
      ${
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
  );
}
