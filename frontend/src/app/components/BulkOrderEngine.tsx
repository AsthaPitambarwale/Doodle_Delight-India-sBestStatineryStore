import { useEffect, useState } from "react";
import { X, Plus, Trash2 } from "lucide-react";

type Mode = "fast" | "repeat" | "split";

interface Props {
  mode: Mode;
  onClose: () => void;
  onSubmit: (data: any) => void;
  userId?: string;
}

const BASE_URL =
  import.meta.env.VITE_BASE_URL || "http://localhost:5000/api";

export function BulkOrderEngine({
  mode,
  onClose,
  onSubmit,
  userId,
}: Props) {
  const [activeTab, setActiveTab] = useState<Mode>(mode);

  const [inputText, setInputText] = useState("");
  const [orderHistory, setOrderHistory] = useState<any[]>([]);
  const [loadingHistory, setLoadingHistory] = useState(false);

  const [suggestions, setSuggestions] = useState<any[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<any | null>(null);

  const [selectedQty, setSelectedQty] = useState(1);

  const quantityOptions = [10, 25, 50, 75, 100, 200, 500, 1000];

  const [selectedItems, setSelectedItems] = useState<any[]>([]);

  const [toast, setToast] = useState<any>(null);

  const showToast = (message: string, type: "success" | "error" = "success") => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 2500);
  };

  type SplitAddress = {
    fullName: string;
    phone: string;
    addressLine: string;
    city: string;
    state: string;
    pincode: string;
    quantities: Record<string, number>;
  };

  const [splitAddresses, setSplitAddresses] = useState<SplitAddress[]>([
    {
      fullName: "",
      phone: "",
      addressLine: "",
      city: "",
      state: "",
      pincode: "",
      quantities: {},
    },
  ]);

  // RESET TAB
  useEffect(() => {
    setActiveTab(mode);
  }, [mode]);

  // LOAD ORDER HISTORY
  useEffect(() => {
    if (activeTab !== "repeat" || !userId) return;

    const fetchOrders = async () => {
      try {
        setLoadingHistory(true);

        const res = await fetch(`${BASE_URL}/orders/${userId}`);
        const data = await res.json();

        setOrderHistory(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoadingHistory(false);
      }
    };

    fetchOrders();
  }, [activeTab, userId]);

  // PRODUCT SUGGESTIONS
  useEffect(() => {
    if (!inputText.trim()) {
      setSuggestions([]);
      return;
    }

    const lastLine = inputText.split("\n").pop()?.trim();

    if (!lastLine || lastLine.length < 2) {
      setSuggestions([]);
      return;
    }

    const timer = setTimeout(async () => {
      try {
        const res = await fetch(
          `${BASE_URL}/products/search?q=${encodeURIComponent(lastLine)}`
        );

        const data = await res.json();

        setSuggestions(Array.isArray(data) ? data.slice(0, 6) : []);
      } catch (err) {
        console.error("Suggestion error", err);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [inputText]);

  // APPLY PRODUCT
  const applySuggestion = (product: any) => {
    setSelectedProduct(product);
    setSuggestions([]);
  };

  // FAST SUBMIT
  const handleFastSubmit = () => {
    if (selectedItems.length === 0) return;

    onSubmit({
      orderType: "fast",

      items: selectedItems.map((item) => ({
        ...item,
        _id: item._id,
        quantity: item.quantity,
      })),
    });
  };

  // REPEAT ORDER
  const handleRepeat = (order: any) => {
    const items = (order.items || []).map((i: any) => ({
      ...i,
      productId: i.productId || i._id,
      quantity: i.quantity,
    }));

    onSubmit({
      orderType: "repeat",
      items,
      sourceOrderId: order._id,
    });
  };

  // SPLIT DELIVERY
  const handleSplitSubmit = () => {
    const validDeliveries = splitAddresses.filter(
      (d) =>
        d.fullName &&
        d.phone &&
        d.addressLine &&
        d.city &&
        d.state &&
        d.pincode
    );

    if (validDeliveries.length === 0) {
      showToast("Please add at least one address", "error");
      return;
    }

    for (const product of selectedItems) {
      const allocated = validDeliveries.reduce(
        (sum, addr) =>
          sum + (Number(addr.quantities?.[product._id]) || 0),
        0
      );

      if (allocated !== product.quantity) {
        showToast(
          `${product.name} allocation mismatch. Total required: ${product.quantity}, Allocated: ${allocated}`, "error"
        );
        return;
      }
    }

    onSubmit({
      orderType: "split",
      items: selectedItems,
      deliveries: validDeliveries,
    });
  };

  // SPLIT DELIVERY
  const updateSplitQuantity = (
    addressIndex: number,
    productId: string,
    qty: number
  ) => {
    setSplitAddresses((prev) =>
      prev.map((addr, idx) =>
        idx === addressIndex
          ? {
            ...addr,
            quantities: {
              ...addr.quantities,
              [productId]: qty,
            },
          }
          : addr
      )
    );
  };

  const updateAddressField = (
    index: number,
    field: keyof SplitAddress,
    value: string
  ) => {
    setSplitAddresses((prev) =>
      prev.map((addr, idx) =>
        idx === index
          ? {
            ...addr,
            [field]: value,
          }
          : addr
      )
    );
  };

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
      <div className="bg-white w-full max-w-6xl rounded-2xl p-6 relative shadow-2xl max-h-[95vh] overflow-auto">

        {/* CLOSE */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 hover:bg-gray-100 p-2 rounded-full"
        >
          <X />
        </button>

        {/* HEADER */}
        <div className="mb-5">
          <h1 className="text-2xl font-bold">
            Bulk Order Center
          </h1>

          <p className="text-sm text-gray-500 mt-1">
            Smart B2B ordering with quick add, reorder & split delivery
          </p>
        </div>

        {/* TABS */}
        <div className="flex gap-3 border-b pb-3 mb-6 overflow-auto">
          {(["fast", "repeat", "split"] as Mode[]).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 rounded-xl text-sm font-semibold whitespace-nowrap transition-all ${activeTab === tab
                ? "bg-black text-white"
                : "bg-gray-100 hover:bg-gray-200"
                }`}
            >
              {tab === "fast" && "⚡ Bulk Quick Order"}
              {tab === "repeat" && "🔁 Reorder"}
              {tab === "split" && "📦 Split Delivery"}
            </button>
          ))}
        </div>

        {/* ================= FAST MODE ================= */}
        {activeTab === "fast" && (
          <div className="grid lg:grid-cols-2 gap-6">

            {/* LEFT */}
            <div className="relative">

              <h2 className="font-bold text-lg mb-2">
                Smart Product Search
              </h2>

              <p className="text-sm text-gray-500 mb-3">
                Search products instantly and assign bulk quantities
              </p>

              <textarea
                className="w-full border p-4 rounded-2xl h-15 focus:outline-none focus:ring-2 focus:ring-black resize-none"
                placeholder={`Examples: Blue Pen/ Pencil/ Desk/ Tiffin/ others...`}
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
              />

              {/* SUGGESTIONS */}
              {suggestions.length > 0 && (
                <div className="absolute z-50 bg-white border shadow-2xl w-full max-h-72 overflow-auto rounded-2xl mt-2">

                  {suggestions.map((product) => (
                    <div
                      key={product._id}
                      onClick={() => applySuggestion(product)}
                      className="flex items-center gap-3 p-3 hover:bg-gray-100 cursor-pointer border-b"
                    >

                      {/* IMAGE */}
                      <img
                        src={
                          Array.isArray(product.images) &&
                            product.images.length > 0
                            ? product.images[0]
                            : "/placeholder.png"
                        }
                        alt={product.name}
                        className="w-12 h-12 object-cover rounded-xl border"
                      />

                      {/* DETAILS */}
                      <div className="flex-1">
                        <p className="font-medium text-sm">
                          {product.name}
                        </p>

                        <p className="text-xs text-gray-500">
                          {product.brand} • ₹{product.price}
                        </p>
                      </div>

                      <span className="text-xs bg-black text-white px-3 py-1 rounded-full">
                        Select
                      </span>
                    </div>
                  ))}
                </div>
              )}

              {/* SELECTED PRODUCT */}
              {selectedProduct && (
                <div className="mt-4 border rounded-2xl p-4 bg-gray-50">

                  {/* PRODUCT */}
                  <div className="flex items-center gap-3 mb-4">

                    <img
                      src={
                        Array.isArray(selectedProduct.images) &&
                          selectedProduct.images.length > 0
                          ? selectedProduct.images[0]
                          : "/placeholder.png"
                      }
                      alt={selectedProduct.name}
                      className="w-16 h-16 rounded-xl object-cover border"
                    />

                    <div>
                      <p className="font-semibold">
                        {selectedProduct.name}
                      </p>

                      <p className="text-sm text-gray-500">
                        {selectedProduct.brand}
                      </p>

                      <p className="text-sm font-semibold mt-1">
                        ₹{selectedProduct.price}
                      </p>
                    </div>
                  </div>

                  {/* QUANTITY OPTIONS */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {quantityOptions.map((qty) => (
                      <button
                        key={qty}
                        onClick={() => setSelectedQty(qty)}
                        className={`px-4 py-2 rounded-xl border text-sm font-medium transition-all ${selectedQty === qty
                          ? "bg-black text-white border-black"
                          : "bg-white hover:bg-gray-100"
                          }`}
                      >
                        {qty}
                      </button>
                    ))}
                  </div>

                  {/* CUSTOM QTY */}
                  <input
                    type="number"
                    min={1}
                    value={selectedQty}
                    onChange={(e) =>
                      setSelectedQty(Number(e.target.value))
                    }
                    className="w-full border rounded-xl p-3 mb-4"
                    placeholder="Custom quantity"
                  />

                  {/* ADD */}
                  <button
                    onClick={() => {
                      setSelectedItems((prev) => {
                        const existing = prev.find(
                          (p) => p._id === selectedProduct._id
                        );

                        if (existing) {
                          return prev.map((p) =>
                            p._id === selectedProduct._id
                              ? {
                                ...p,
                                quantity: p.quantity + selectedQty,
                              }
                              : p
                          );
                        }

                        return [
                          ...prev,
                          {
                            ...selectedProduct,
                            quantity: selectedQty,
                          },
                        ];
                      });

                      setSelectedProduct(null);
                      setSelectedQty(1);
                      setInputText("");
                    }}
                    className="w-full bg-black hover:bg-gray-800 text-white py-3 rounded-xl font-semibold"
                  >
                    Add to Preview
                  </button>
                </div>
              )}
            </div>

            {/* RIGHT */}
            <div>

              <div className="flex items-center justify-between mb-3">
                <h2 className="font-bold text-lg">
                  Order Preview
                </h2>

                <span className="text-sm text-gray-500">
                  {selectedItems.length} items
                </span>
              </div>

              <div className="border rounded-2xl p-4 h-[320px] overflow-auto bg-gray-50">

                {selectedItems.length === 0 ? (
                  <div className="h-full flex items-center justify-center text-center">
                    <div>
                      <p className="text-gray-400 font-medium">
                        No products selected
                      </p>

                      <p className="text-xs text-gray-400 mt-1">
                        Search and add products to build your bulk order
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-3">

                    {selectedItems.map((item, i) => (
                      <div
                        key={i}
                        className="flex items-center justify-between bg-white border rounded-xl p-3"
                      >

                        <div className="flex items-center gap-3">

                          <img
                            src={
                              Array.isArray(item.images) &&
                                item.images.length > 0
                                ? item.images[0]
                                : "/placeholder.png"
                            }
                            alt={item.name}
                            className="w-12 h-12 rounded-xl object-cover border"
                          />

                          <div>
                            <p className="font-medium text-sm">
                              {item.name}
                            </p>

                            <p className="text-xs text-gray-500">
                              Qty: {item.quantity}
                            </p>
                          </div>
                        </div>

                        <button
                          onClick={() =>
                            setSelectedItems((prev) =>
                              prev.filter((_, idx) => idx !== i)
                            )
                          }
                          className="text-red-500 text-sm hover:text-red-700"
                        >
                          Remove
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* ACTION BUTTONS */}
              <div className="mt-4 grid grid-cols-2 gap-3">

                {/* CHECKOUT */}
                <button
                  onClick={handleFastSubmit}
                  disabled={selectedItems.length === 0}
                  className="bg-black hover:bg-gray-800 disabled:opacity-50 text-white px-4 py-3 rounded-xl w-full font-semibold"
                >
                  Proceed to Checkout
                </button>

                {/* SPLIT ORDER */}
                <button
                  onClick={() => setActiveTab("split")}
                  disabled={selectedItems.length === 0}
                  className="bg-orange-500 hover:bg-orange-600 disabled:opacity-50 text-white px-4 py-3 rounded-xl w-full font-semibold"
                >
                  Split Order
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ================= REPEAT MODE ================= */}
        {activeTab === "repeat" && (
          <div className="max-h-[500px] overflow-auto space-y-3">
            <h2 className="font-bold text-lg mb-4">
              Reorder History
            </h2>

            {loadingHistory ? (
              <p>Loading...</p>
            ) : (
              <>
                {
                  orderHistory.map((order) => (
                    <div
                      key={order._id}
                      className="border rounded-3xl p-5 bg-white shadow-sm"
                    >
                      {/* TOP */}
                      <div className="flex items-start justify-between gap-4 mb-5">
                        <div>
                          <h3 className="font-black text-lg text-slate-800">
                            Order #{order._id.slice(-6)}
                          </h3>

                          <p className="text-sm text-slate-500 mt-1">
                            {order.items?.length || 0} items
                          </p>

                          <p className="text-sm text-slate-400">
                            Total: ₹{order.totalAmount?.toFixed(2) || 0}
                          </p>
                        </div>

                        <button
                          onClick={() => handleRepeat(order)}
                          className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-2xl font-semibold shadow"
                        >
                          Reorder
                        </button>
                      </div>

                      {/* ITEMS */}
                      <div className="space-y-3">
                        {(order.items || []).map((item: any, idx: number) => {
                          const image =
                            item.image ||
                            (Array.isArray(item.images) && item.images.length > 0
                              ? item.images[0]
                              : "/placeholder.png");

                          return (
                            <div
                              key={idx}
                              className="flex items-center gap-4 border rounded-2xl p-3 hover:bg-slate-50 transition"
                            >
                              {/* IMAGE */}
                              <div className="w-20 h-20 rounded-2xl overflow-hidden border bg-slate-100 shrink-0">
                                <img
                                  src={image}
                                  alt={item.name}
                                  className="w-full h-full object-cover"
                                />
                              </div>

                              {/* INFO */}
                              <div className="flex-1 min-w-0">
                                <h4 className="font-bold text-slate-800 line-clamp-1">
                                  {item.name}
                                </h4>

                                <p className="text-sm text-slate-500 mt-1">
                                  {item.brand}
                                </p>

                                <div className="flex items-center gap-3 mt-3 flex-wrap">
                                  <span className="bg-orange-100 text-orange-700 px-3 py-1 rounded-xl text-xs font-bold">
                                    Qty: {item.quantity}
                                  </span>

                                  <span className="bg-slate-100 text-slate-700 px-3 py-1 rounded-xl text-xs font-semibold">
                                    ₹
                                    {(
                                      (item.price || item.wholesalePrice || 0) *
                                      item.quantity
                                    ).toFixed(2)}
                                  </span>
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  ))
                }
                {!loadingHistory && orderHistory.length === 0 && (
                  <div className="text-center py-10 text-slate-500">
                    No previous orders found
                  </div>
                )}
              </>
            )}
          </div>
        )}

        {/* ================= SPLIT MODE ================= */}
        {activeTab === "split" && (
          <div className="space-y-6">

            {/* HEADER */}
            <div className="flex items-center justify-between">
              <div>
                <h2 className="font-black text-2xl text-slate-800">
                  Split Delivery
                </h2>

                <p className="text-sm text-slate-500 mt-1">
                  Deliver products to multiple locations
                </p>
              </div>

              <button
                onClick={() =>
                  setSplitAddresses((prev) => [
                    ...prev,
                    {
                      fullName: "",
                      phone: "",
                      addressLine: "",
                      city: "",
                      state: "",
                      pincode: "",
                      quantities: {},
                    }
                  ])
                }
                className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-5 py-3 rounded-2xl font-semibold shadow"
              >
                <Plus size={18} />
                Add Address
              </button>
            </div>

            {/* EMPTY STATE */}
            {selectedItems.length === 0 ? (
              <div className="border rounded-3xl p-10 text-center bg-slate-50">
                <p className="text-lg font-semibold text-slate-700">
                  No products selected
                </p>

                <p className="text-sm text-slate-500 mt-2">
                  Add products from Bulk Quick Order first
                </p>
              </div>
            ) : (
              <>
                {/* ADDRESS LIST */}
                <div className="space-y-4">
                  {splitAddresses.map((addr, i) => (
                    <div
                      key={i}
                      className="border-2 border-slate-200 rounded-3xl p-5 bg-white shadow-sm"
                    >

                      {/* TOP */}
                      <div className="flex justify-between items-start gap-4 mb-4">
                        <div>
                          <h3 className="font-bold text-slate-800">
                            Delivery Address #{i + 1}
                          </h3>

                          <p className="text-sm text-slate-500">
                            Assign quantities for this location
                          </p>
                        </div>

                        {splitAddresses.length > 1 && (
                          <button
                            onClick={() =>
                              setSplitAddresses((p) =>
                                p.filter((_, idx) => idx !== i)
                              )
                            }
                            className="text-red-500 hover:text-red-700"
                          >
                            <Trash2 size={20} />
                          </button>
                        )}
                      </div>

                      {/* ADDRESS */}
                      <div className="grid md:grid-cols-2 gap-4">
                        <input
                          type="text"
                          placeholder="Full Name"
                          value={addr.fullName}
                          onChange={(e) =>
                            updateAddressField(i, "fullName", e.target.value)
                          }
                          className="border rounded-2xl p-3"
                        />

                        <input
                          type="text"
                          placeholder="Phone Number"
                          value={addr.phone}
                          onChange={(e) =>
                            updateAddressField(i, "phone", e.target.value)
                          }
                          className="border rounded-2xl p-3"
                        />

                        <input
                          type="text"
                          placeholder="City"
                          value={addr.city}
                          onChange={(e) =>
                            updateAddressField(i, "city", e.target.value)
                          }
                          className="border rounded-2xl p-3"
                        />

                        <input
                          type="text"
                          placeholder="State"
                          value={addr.state}
                          onChange={(e) =>
                            updateAddressField(i, "state", e.target.value)
                          }
                          className="border rounded-2xl p-3"
                        />

                        <input
                          type="text"
                          placeholder="Pincode"
                          value={addr.pincode}
                          onChange={(e) =>
                            updateAddressField(i, "pincode", e.target.value)
                          }
                          className="border rounded-2xl p-3"
                        />

                        <div className="md:col-span-2">
                          <textarea
                            placeholder="House No, Street, Area"
                            value={addr.addressLine}
                            onChange={(e) =>
                              updateAddressField(i, "addressLine", e.target.value)
                            }
                            className="w-full border rounded-2xl p-4 min-h-[100px]"
                          />
                        </div>
                      </div>

                      {/* PRODUCTS */}
                      <div className="mt-5 space-y-3">
                        <h4 className="font-bold text-slate-700">
                          Product Quantity Allocation
                        </h4>

                        {selectedItems.map((product: any) => {
                          const image =
                            product.image ||
                            (Array.isArray(product.images) &&
                              product.images.length > 0
                              ? product.images[0]
                              : "/placeholder.png");

                          return (
                            <div
                              key={product._id}
                              className="flex items-center justify-between border rounded-2xl p-3"
                            >

                              {/* PRODUCT */}
                              <div className="flex items-center gap-3">
                                <img
                                  src={image}
                                  alt={product.name}
                                  className="w-14 h-14 rounded-xl object-cover border"
                                />

                                <div>
                                  <p className="font-semibold text-slate-800">
                                    {product.name}
                                  </p>

                                  <p className="text-xs text-slate-500">
                                    Total Qty: {product.quantity}
                                  </p>
                                </div>
                              </div>

                              {/* QTY */}
                              <input
                                type="number"
                                min="0"
                                max={product.quantity}
                                className="w-24 border rounded-xl px-3 py-2"
                                placeholder="Qty"
                                value={addr.quantities?.[product._id] || ""}
                                onChange={(e) =>
                                  updateSplitQuantity(
                                    i,
                                    product._id,
                                    Number(e.target.value)
                                  )
                                }
                              />
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  ))}
                </div>

                {/* SUMMARY */}
                <div className="border rounded-3xl p-5 bg-slate-50">
                  <h3 className="font-bold text-lg mb-4">
                    Split Summary
                  </h3>

                  <div className="space-y-3">
                    {selectedItems.map((product: any) => {
                      const allocated = splitAddresses.reduce(
                        (sum, addr) =>
                          sum + (Number(addr.quantities?.[product._id]) || 0),
                        0
                      );

                      const remaining = product.quantity - allocated;

                      return (
                        <div
                          key={product._id}
                          className="flex justify-between text-sm"
                        >
                          <span className="font-medium">
                            {product.name}
                          </span>

                          <span
                            className={
                              remaining === 0
                                ? "text-green-600 font-bold"
                                : "text-red-500 font-bold"
                            }
                          >
                            Allocated: {allocated} / {product.quantity}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* SUBMIT */}
                <button
                  onClick={handleSplitSubmit}
                  className="w-full bg-gradient-to-r from-black to-slate-800 hover:opacity-90 text-white py-4 rounded-2xl font-bold text-lg shadow-lg"
                >
                  Submit Split Delivery Order
                </button>
              </>
            )}
          </div>
        )}
      </div>

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