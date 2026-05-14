import { useState, useEffect, useMemo, useRef } from "react";
import {
  CreditCard,
  Wallet,
  Ticket,
  ShieldCheck,
  Truck,
  CheckCircle2,
  X,
  Tag,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const BASE_URL = import.meta.env.VITE_BASE_URL || "http://localhost:5000/api";

const AVAILABLE_COUPONS = [
  {
    code: "SAVE10",
    type: "percentage",
    value: 10,
    minOrder: 499,
    description: "Get 10% OFF on orders above ₹499",
  },
  {
    code: "WELCOME20",
    type: "percentage",
    value: 20,
    minOrder: 1499,
    description: "20% OFF for premium shoppers",
  },
  {
    code: "FLAT100",
    type: "flat",
    value: 100,
    minOrder: 999,
    description: "Flat ₹100 OFF",
  },
];
interface CheckoutPageProps {
  items: any[];
  user: any;
  userType: string;
  onClose: () => void;
  onClearCart?: () => void;
  onBack?: () => void;
  onOrderPlaced?: () => void;
  deliveries?: any[];
}

export default function CheckoutPage({
  items,
  user,
  userType,
  onClose,
  onClearCart,
  onBack,
  onOrderPlaced,
  deliveries,
}: CheckoutPageProps) {
  const navigate = useNavigate();

  const isSplitOrder =
    Array.isArray(deliveries) && deliveries.length > 0;

  const [paymentMethod, setPaymentMethod] = useState<"razorpay" | "cod">(
    "razorpay",
  );

  const [orderSuccess, setOrderSuccess] = useState(false);

  const [coupon, setCoupon] = useState("");
  const [appliedCoupon, setAppliedCoupon] = useState<any>(null);
  const [couponDiscount, setCouponDiscount] = useState(0);

  const [loading, setLoading] = useState(false);

  const [addresses, setAddresses] = useState<any[]>([]);
  const [selectedAddress, setSelectedAddress] = useState<any>(null);
  const [addressLoading, setAddressLoading] = useState(false);
  const addressInitialized = useRef(false);

  const [ecoPackaging, setEcoPackaging] = useState(false);
  const ECO_PACKAGING_FEE = 25;
  const [toast, setToast] = useState<any>(null);

  const showToast = (message: string, type: "success" | "error" = "success") => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 2500);
  };

  useEffect(() => {
    if (!user?._id || addressInitialized.current) return;

    const fetchAddresses = async () => {
      try {
        setAddressLoading(true);

        const res = await fetch(`${BASE_URL}/address/${user._id}`);
        const data = await res.json();

        const safe = Array.isArray(data) ? data : [];

        setAddresses(safe);
        if (safe.length > 0) setSelectedAddress(safe[0]);

        addressInitialized.current = true;
      } finally {
        setAddressLoading(false);
      }
    };

    fetchAddresses();
  }, [user?._id]);

  const subtotal = useMemo(() => {
    return items.reduce((sum: number, item: any) => {
      const price =
        userType === "wholesale"
          ? Number(
            item.wholesalePrice ??
            item.price ??
            item.finalPrice ??
            item.salePrice ??
            item.mysteryBoxPrice ??
            0
          )
          : Number(
            item.price ??
            item.finalPrice ??
            item.salePrice ??
            item.mysteryBoxPrice ??
            item.wholesalePrice ??
            0
          );

      return sum + price * item.quantity;
    }, 0);
  }, [items, userType]);

  const autoDiscount = subtotal >= 999 ? subtotal * 0.2 : 0;
  const ecoFee = ecoPackaging ? ECO_PACKAGING_FEE : 0;

  const taxBase = Math.max(subtotal - autoDiscount - couponDiscount, 0);
  const tax = taxBase * 0.18;

  const delivery = taxBase >= 500 ? 0 : 50;

  const total =
    taxBase + tax + delivery + ecoFee;

  const applyCoupon = () => {
    const found = AVAILABLE_COUPONS.find(
      (c) => c.code.toLowerCase() === coupon.toLowerCase(),
    );

    if (!found) return showToast("Invalid coupon", "error");

    if (subtotal < found.minOrder)
      return showToast(`Min ₹${found.minOrder} required`, "error");

    const discount =
      found.type === "percentage"
        ? (subtotal * found.value) / 100
        : found.value;

    setAppliedCoupon(found);
    setCouponDiscount(discount);

    showToast("Coupon applied");
  };

  const removeCoupon = () => {
    setAppliedCoupon(null);
    setCouponDiscount(0);
    setCoupon("");
  };

  const payloadExtras = {
    ecoPackaging,
    ecoPackagingFee: ecoFee,
  };

  const handleRazorpay = async () => {
    try {
      setLoading(true);

      const res = await fetch(`${BASE_URL}/payment/create-order`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount: total }),
      });

      const order = await res.json();

      const options = {
        key: "rzp_test_SgXqmZaJmeBdes",
        amount: order.amount,
        currency: "INR",
        order_id: order.id,
        name: "Doodle Delight",

        handler: async (response: any) => {
          const verify = await fetch(`${BASE_URL}/payment/verify-payment`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              ...response,
              userId: user._id,
              cartItems: items,
              totalAmount: total,
              coupon: appliedCoupon?.code || null,
              couponDiscount,
              address: selectedAddress,
              splitDeliveries: deliveries || [],
              isSplitOrder,
              ...payloadExtras,
            }),
          });

          const data = await verify.json();

          if (data.success) {
            setOrderSuccess(true);

            setTimeout(() => {
              onOrderPlaced?.();
              onClearCart?.();
              onClose();
            }, 2000);
          }
          else showToast("Payment failed", "error");
        },
      };

      new (window as any).Razorpay(options).open();
    } finally {
      setLoading(false);
    }
  };

  const handleCOD = async () => {
    const res = await fetch(`${BASE_URL}/payment/cod-order`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        userId: user._id,
        cartItems: items,
        totalAmount: total,
        coupon: appliedCoupon?.code || null,
        couponDiscount,
        address: selectedAddress,
        splitDeliveries: deliveries || [],
        isSplitOrder,
        ...payloadExtras,
      }),
    });

    const data = await res.json();

    if (data.success) {
      setOrderSuccess(true);

      setTimeout(() => {
        onOrderPlaced?.();
        onClearCart?.();
        onClose();
      }, 2000);
    }
    else showToast("Order failed", "error");
  };

  const handlePlaceOrder = () => {
    if (!user?._id) return showToast("Login required", "error");
    if (!isSplitOrder && !selectedAddress)
      return showToast("Select address", "error");

    paymentMethod === "razorpay" ? handleRazorpay() : handleCOD();
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-100 overflow-y-auto">
      <div className="max-w-7xl mx-auto p-4 md:p-8">
        {/* TOP BAR */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-black text-slate-900">
              Secure Checkout
            </h1>

            <p className="text-slate-500 mt-1">Complete your purchase safely</p>
          </div>

          <div className="flex items-center gap-3">
            {onBack && (
              <button
                onClick={onBack}
                className="px-4 py-2 bg-white rounded-xl shadow font-medium hover:bg-slate-50"
              >
                Back
              </button>
            )}

            <button
              onClick={onClose}
              className="p-3 bg-white rounded-full shadow hover:scale-105 transition"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* LEFT SIDE */}
          <div className="lg:col-span-2 space-y-6">
            {/* DELIVERY INFO */}
            <div className="bg-white rounded-3xl p-6 shadow-sm border">
              <div className="flex items-center gap-3 mb-4">
                <Truck className="w-6 h-6 text-orange-500" />
                <h2 className="text-xl font-bold">Delivery Information</h2>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <input
                  value={user?.name || ""}
                  readOnly
                  className="border rounded-xl px-4 py-3 bg-slate-50"
                />

                <input
                  value={user?.email || ""}
                  readOnly
                  className="border rounded-xl px-4 py-3 bg-slate-50"
                />
              </div>
            </div>

            {/* ADDRESS SECTION */}
            <div className="bg-white rounded-3xl p-6 shadow-sm border">
              <div className="flex items-center justify-between mb-5">
                <div>
                  <h2 className="text-xl font-bold text-slate-800">
                    Delivery Address
                  </h2>

                  <p className="text-sm text-slate-500">
                    Select where you want your order delivered
                  </p>
                </div>

                <button
                  onClick={() =>
                    navigate("/account", {
                      state: {
                        activeTab: "addresses",
                      },
                    })
                  }
                  className="text-orange-500 font-semibold text-sm hover:text-orange-600 transition"
                >
                  Manage
                </button>
              </div>

              {addressLoading ? (
                <div className="space-y-3">
                  {[1, 2].map((i) => (
                    <div
                      key={i}
                      className="border rounded-2xl p-4 animate-pulse"
                    >
                      <div className="h-4 bg-slate-200 rounded w-40 mb-3"></div>
                      <div className="h-3 bg-slate-200 rounded w-full mb-2"></div>
                      <div className="h-3 bg-slate-200 rounded w-32"></div>
                    </div>
                  ))}
                </div>
              ) : addresses.length === 0 ? (
                <div className="border-2 border-dashed border-slate-200 rounded-2xl p-8 text-center">
                  <p className="text-slate-500">No saved addresses found</p>

                  <button
                    onClick={() => navigate("/account")}
                    className="mt-4 bg-orange-500 hover:bg-orange-600 text-white px-5 py-2 rounded-xl font-semibold"
                  >
                    Add Address
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  {addresses.map((address) => {
                    const active = selectedAddress?._id === address._id;

                    return (
                      <div
                        key={address._id}
                        onClick={() => setSelectedAddress(address)}
                        className={`border-2 rounded-2xl p-5 cursor-pointer transition-all duration-200
            ${active
                            ? "border-orange-500 bg-orange-50"
                            : "border-slate-200 hover:border-orange-300"
                          }`}
                      >
                        <div className="flex justify-between gap-4">
                          <div>
                            <div className="flex items-center gap-2">
                              <h3 className="font-bold text-slate-800">
                                {address.name}
                              </h3>

                              {active && (
                                <span className="text-xs bg-orange-500 text-white px-2 py-1 rounded-full">
                                  Selected
                                </span>
                              )}
                            </div>

                            <p className="text-sm text-slate-500 mt-1">
                              {address.phone}
                            </p>

                            <p className="text-sm text-slate-700 mt-3">
                              {address.address}
                            </p>

                            <p className="text-sm text-slate-600">
                              {address.city} - {address.pincode}
                            </p>
                          </div>

                          {active && (
                            <CheckCircle2 className="text-orange-500 shrink-0" />
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            {/* SPLIT DELIVERY VIEW */}
            {isSplitOrder && (
              <div className="bg-white rounded-3xl p-6 shadow-sm border">
                <div className="flex items-center gap-3 mb-5">
                  <Truck className="w-6 h-6 text-orange-500" />

                  <div>
                    <h2 className="text-xl font-bold text-slate-800">
                      Split Delivery Addresses
                    </h2>

                    <p className="text-sm text-slate-500">
                      Products will be delivered to multiple locations
                    </p>
                  </div>
                </div>

                <div className="space-y-4">
                  {deliveries.map((delivery: any, index: number) => (
                    <div
                      key={index}
                      className="border rounded-2xl p-5 bg-slate-50"
                    >
                      <div className="flex items-center justify-between mb-3">
                        <h3 className="font-bold text-slate-800">
                          Address #{index + 1}
                        </h3>

                        <span className="text-xs bg-orange-100 text-orange-700 px-3 py-1 rounded-full font-semibold">
                          Split Delivery
                        </span>
                      </div>

                      <div className="space-y-1 text-sm text-slate-700">
                        <p className="font-bold text-slate-800">
                          {delivery.fullName}
                        </p>

                        <p>{delivery.phone}</p>

                        <p>{delivery.addressLine}</p>

                        <p>
                          {delivery.city}, {delivery.state} - {delivery.pincode}
                        </p>
                      </div>

                      <div className="mt-4 space-y-2">
                        {items.map((item: any) => {
                          const qty =
                            Number(
                              delivery.quantities?.[item._id]
                            ) || 0;

                          if (qty <= 0) return null;

                          return (
                            <div
                              key={item._id}
                              className="flex justify-between text-sm bg-white border rounded-xl px-3 py-2"
                            >
                              <span className="font-medium">
                                {item.name}
                              </span>

                              <span className="font-bold text-orange-600">
                                Qty: {qty}
                              </span>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="bg-white rounded-3xl p-6 shadow-sm border flex items-center justify-between hover:shadow-md transition">
              <div className="flex items-start gap-3">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition ${ecoPackaging ? "bg-green-100" : "bg-slate-100"
                  }`}>
                  <span className="text-lg">🌿</span>
                </div>

                <div>
                  <h2 className="text-xl font-bold text-slate-800">
                    Eco Packaging
                  </h2>

                  <p className="text-sm text-slate-500 mt-1">
                    Sustainable, recyclable packaging adds <span className="font-semibold text-slate-700">₹25</span> to your order
                  </p>

                  <p className={`text-xs mt-2 font-medium ${ecoPackaging ? "text-green-600" : "text-slate-400"
                    }`}>
                    {ecoPackaging
                      ? "Eco-friendly packaging is enabled"
                      : "You can enable eco packaging anytime"}
                  </p>
                </div>
              </div>

              <button
                onClick={() => {
                  setEcoPackaging((prev) => {
                    const newState = !prev;

                    showToast(
                      newState
                        ? "🌿 Eco packaging added (+₹25)"
                        : "Eco packaging removed",
                      "success"
                    );

                    return newState;
                  });
                }}
                className={`px-5 py-2 rounded-xl font-bold transition-all duration-200 active:scale-95 shadow-sm ${ecoPackaging
                  ? "bg-green-500 hover:bg-green-600 text-white"
                  : "bg-slate-200 hover:bg-slate-300 text-slate-700"
                  }`}
              >
                {ecoPackaging ? "Enabled" : "Add"}
              </button>
            </div>

            {/* ITEMS */}
            <div className="bg-white rounded-3xl p-6 shadow-sm border">
              <h2 className="text-xl font-bold mb-5">Order Items</h2>

              <div className="space-y-4">
                {items.map((item: any) => {
                  const price =
                    userType === "wholesale"
                      ? Number(
                        item.wholesalePrice ??
                        item.price ??
                        item.finalPrice ??
                        item.salePrice ??
                        item.mysteryBoxPrice ??
                        0
                      )
                      : Number(
                        item.price ??
                        item.finalPrice ??
                        item.salePrice ??
                        item.mysteryBoxPrice ??
                        item.wholesalePrice ??
                        0
                      );

                  return (
                    <div
                      key={item._id}
                      className="flex gap-4 border rounded-2xl p-4 hover:shadow-md transition"
                    >
                      <img
                        src={
                          item.image ||
                          (Array.isArray(item.images) && item.images.length > 0
                            ? item.images[0]
                            : "/placeholder.png")
                        }
                        alt={item.name}
                        className="w-24 h-24 rounded-2xl object-cover border"
                      />

                      <div className="flex-1">
                        <h3 className="font-bold text-slate-800">
                          {item.name}
                        </h3>

                        <p className="text-sm text-slate-500">{item.brand}</p>

                        <div className="flex justify-between mt-4">
                          <span className="text-sm text-slate-600">
                            Qty: {item.quantity}
                          </span>

                          <span className="font-black text-orange-600">
                            ₹{(price * item.quantity).toFixed(2)}
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* PAYMENT */}
            <div className="bg-white rounded-3xl p-6 shadow-sm border">
              <h2 className="text-xl font-bold mb-5">Payment Method</h2>

              <div className="space-y-4">
                <div
                  onClick={() => setPaymentMethod("razorpay")}
                  className={`border-2 rounded-2xl p-5 cursor-pointer transition-all ${paymentMethod === "razorpay"
                    ? "border-orange-500 bg-orange-50"
                    : "border-slate-200"
                    }`}
                >
                  <div className="flex items-center gap-3">
                    <CreditCard className="w-6 h-6 text-orange-500" />

                    <div>
                      <p className="font-bold">Pay Online</p>

                      <p className="text-sm text-slate-500">
                        UPI, Cards, Net Banking, Wallets
                      </p>
                    </div>
                  </div>
                </div>

                <div
                  onClick={() => setPaymentMethod("cod")}
                  className={`border-2 rounded-2xl p-5 cursor-pointer transition-all ${paymentMethod === "cod"
                    ? "border-orange-500 bg-orange-50"
                    : "border-slate-200"
                    }`}
                >
                  <div className="flex items-center gap-3">
                    <Wallet className="w-6 h-6 text-green-600" />

                    <div>
                      <p className="font-bold">Cash on Delivery</p>

                      <p className="text-sm text-slate-500">
                        Pay when your order arrives
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT SIDE */}
          <div className="space-y-6">
            {/* COUPON */}
            <div className="bg-white rounded-3xl p-6 shadow-sm border sticky top-6">
              <div className="flex items-center gap-2 mb-5">
                <Ticket className="w-5 h-5 text-orange-500" />

                <h2 className="text-xl font-bold">Apply Coupon</h2>
              </div>

              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Enter coupon code"
                  value={coupon}
                  onChange={(e) => setCoupon(e.target.value.toUpperCase())}
                  className="flex-1 border rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-orange-300"
                />

                <button
                  onClick={applyCoupon}
                  className="px-5 bg-orange-500 hover:bg-orange-600 text-white rounded-xl font-semibold"
                >
                  Apply
                </button>
              </div>

              {/* APPLIED */}
              {appliedCoupon && (
                <div className="mt-4 bg-green-50 border border-green-200 rounded-2xl p-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="font-bold text-green-700">
                        {appliedCoupon.code} Applied
                      </p>

                      <p className="text-sm text-green-600">
                        You saved ₹{couponDiscount.toFixed(2)}
                      </p>
                    </div>

                    <button
                      onClick={removeCoupon}
                      className="text-red-500 text-sm font-semibold"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              )}

              {/* AVAILABLE COUPONS */}
              <div className="mt-6 space-y-3">
                <p className="font-semibold text-slate-700">Available Offers</p>

                {AVAILABLE_COUPONS.map((c) => (
                  <div
                    key={c.code}
                    className="border rounded-2xl p-3 flex gap-3"
                  >
                    <Tag className="w-5 h-5 text-orange-500 mt-1" />

                    <div>
                      <p className="font-bold">{c.code}</p>

                      <p className="text-sm text-slate-500">{c.description}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* SUMMARY */}
              <div className="mt-8 border-t pt-5 space-y-3">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>₹{subtotal.toFixed(2)}</span>
                </div>

                <div className="flex justify-between text-green-600">
                  <span>Store Discount</span>
                  <span>-₹{autoDiscount.toFixed(2)}</span>
                </div>

                {couponDiscount > 0 && (
                  <div className="flex justify-between text-green-600">
                    <span>Coupon Discount</span>
                    <span>-₹{couponDiscount.toFixed(2)}</span>
                  </div>
                )}

                <div className="flex justify-between">
                  <span>Tax</span>
                  <span>₹{tax.toFixed(2)}</span>
                </div>

                <div className="flex justify-between">
                  <span>Delivery</span>

                  <span>{delivery === 0 ? "FREE" : `₹${delivery}`}</span>
                </div>

                <div className="border-t pt-4 flex justify-between text-2xl font-black">
                  <span>Total</span>

                  <span className="text-orange-600">₹{total.toFixed(2)}</span>
                </div>
              </div>

              {/* BUTTON */}
              <button
                onClick={handlePlaceOrder}
                disabled={loading}
                className="w-full mt-6 bg-gradient-to-r from-orange-500 to-red-500 hover:opacity-90 text-white py-4 rounded-2xl font-bold text-lg shadow-lg transition active:scale-95 disabled:opacity-50"
              >
                {loading
                  ? "Processing..."
                  : paymentMethod === "razorpay"
                    ? "Pay Securely"
                    : "Place COD Order"}
              </button>

              {/* SECURITY */}
              <div className="mt-5 flex items-center justify-center gap-2 text-sm text-slate-500">
                <ShieldCheck className="w-4 h-4 text-green-600" />
                100% Secure Checkout
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* SUCCESS MODAL */}
      {orderSuccess && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-[200]">
          <div className="bg-white rounded-3xl p-10 max-w-md w-full text-center shadow-2xl animate-in fade-in zoom-in">
            <CheckCircle2 className="w-20 h-20 text-green-500 mx-auto mb-4" />

            <h2 className="text-3xl font-black text-slate-800">
              Order Confirmed
            </h2>

            <p className="text-slate-500 mt-3">
              Thank you for shopping with us.
            </p>

            <p className="mt-2 text-sm text-slate-400">
              Redirecting to home...
            </p>
          </div>
        </div>
      )}

      {/* TOAST */}
      {toast && (
        <div className="fixed top-5 left-1/2 -translate-x-1/2 z-[300]">
          <div
            className={`px-6 py-4 rounded-2xl shadow-2xl font-semibold animate-in slide-in-from-top
            ${toast.type === "success"
                ? "bg-green-50 text-green-700 border border-green-200"
                : "bg-red-50 text-red-700 border border-red-200"
              }`}
          >
            {toast.message}
          </div>
        </div>
      )}
    </div>
  );
}
