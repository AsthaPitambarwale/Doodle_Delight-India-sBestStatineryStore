import {
  X,
  User,
  Package,
  MapPin,
  Heart,
  LogOut,
  Settings,
  TrendingUp,
  Download,
  Truck,
  Edit,
  Save,
  ShoppingBag,
  Wallet,
  CheckCircle2,
  Clock3,
  RotateCcw,
  CreditCard,
  Sparkles,
  ChevronRight,
} from "lucide-react";

import { useEffect, useMemo, useState } from "react";
import { AddressManager } from "../components/AddressManager";
import OrderDetailsModal from "../components/OrderDetailsModal";

interface MyAccountProps {
  isOpen: boolean;
  onClose: () => void;
  user: any;
  orders: any[];
  wishlistItems: any[];
  onLogout: () => void;
  onUpdateProfile: (data: any) => void;
  onTrackOrder: (id: string) => void;
  onDownloadInvoice: (id: string) => void;
  onRefreshOrders: () => void;
  onPreviewInvoice: (id: string) => void;

  defaultTab?:
  | "overview"
  | "orders"
  | "addresses"
  | "wishlist"
  | "settings";
}

const BASE_URL =
  import.meta.env.VITE_API_URL || "http://localhost:5000/api";

export function MyAccount({
  isOpen,
  onClose,
  user,
  orders,
  wishlistItems,
  onLogout,
  onUpdateProfile,
  onDownloadInvoice,
  onTrackOrder,
  onRefreshOrders,
  onPreviewInvoice,
  defaultTab = "overview",
}: MyAccountProps) {
  const [activeTab, setActiveTab] = useState<
    "overview" | "orders" | "addresses" | "wishlist" | "settings"
  >(defaultTab);
  const [showAccount, setShowAccount] = useState(false);

  const [isEditing, setIsEditing] = useState(false);
  const [editedUser, setEditedUser] = useState(user || {});
  const [selectedOrder, setSelectedOrder] = useState<any | null>(null);

  const [toast, setToast] = useState<{
    message: string;
    type: "success" | "error";
  } | null>(null);

  const showToast = (
    message: string,
    type: "success" | "error" = "success",
  ) => {
    setToast({ message, type });

    setTimeout(() => {
      setToast(null);
    }, 3000);
  };

  useEffect(() => {
    if (defaultTab) {
      setActiveTab(defaultTab);
    }
  }, [defaultTab]);

  const totalSpent = useMemo(() => {
    return orders.reduce((sum, o) => sum + (o.totalAmount || 0), 0);
  }, [orders]);

  const deliveredOrders = orders.filter(
    (o) => o.status === "delivered",
  ).length;

  const pendingOrders = orders.filter(
    (o) =>
      o.status === "placed" ||
      o.status === "paid" ||
      o.status === "shipped",
  ).length;

  const handleSaveProfile = () => {
    onUpdateProfile(editedUser);
    setIsEditing(false);
    showToast("Profile updated successfully");
  };

  const handleCancelOrder = async (id: string) => {
    try {
      const res = await fetch(`${BASE_URL}/orders/cancel/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Cancel failed");
      }

      showToast(data.message || "Order cancelled");
      onRefreshOrders();
    } catch (err: any) {
      showToast(err.message || "Server error", "error");
    }
  };

  const handleReturnOrder = async (id: string) => {
    try {
      const res = await fetch(`${BASE_URL}/orders/return/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Refund request failed");
      }

      showToast(data.message || "Refund request submitted");
      onRefreshOrders();
    } catch (err: any) {
      showToast(err.message || "Server error", "error");
    }
  };

  const getStatusStyle = (status: string) => {
    switch (status) {
      case "delivered":
        return "bg-green-100 text-green-700 border-green-200";

      case "cancelled":
        return "bg-red-100 text-red-700 border-red-200";

      case "refund_requested":
        return "bg-yellow-100 text-yellow-700 border-yellow-200";

      case "shipped":
        return "bg-blue-100 text-blue-700 border-blue-200";

      default:
        return "bg-orange-100 text-orange-700 border-orange-200";
    }
  };

  if (!isOpen || !user) return null;

  return (
    <>
      {/* BACKDROP */}
      <div
        className="fixed inset-0 z-50 bg-black/60 backdrop-blur-md"
        onClick={onClose}
      />

      {/* MODAL */}
      <div className="fixed inset-0 z-50 overflow-y-auto">
        <div className="min-h-screen flex justify-center items-start md:items-center p-0 md:p-6">
          <div
            className="
            bg-[#f8fafc]
            w-full
            md:max-w-7xl
            h-screen
            md:h-[95vh]
            rounded-none
            md:rounded-[32px]
            overflow-hidden
            shadow-2xl
            flex
            flex-col
          "
          >
            {/* HEADER */}
            <div className="relative overflow-hidden bg-gradient-to-r from-orange-500 via-red-500 to-pink-500 px-6 py-6 md:px-8">
              <div className="absolute top-0 right-0 w-72 h-72 bg-white/10 rounded-full blur-3xl" />

              <div className="relative flex justify-between items-start">
                <div className="flex items-center gap-5">
                  <div
                    className="
                    w-20 h-20 rounded-3xl
                    bg-white/20 backdrop-blur-md
                    border border-white/20
                    flex items-center justify-center
                  "
                  >
                    <User className="w-10 h-10 text-white" />
                  </div>

                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <h2 className="text-3xl font-black text-white">
                        My Account
                      </h2>

                      <Sparkles className="w-5 h-5 text-yellow-300" />
                    </div>

                    <p className="text-white/90 text-lg font-semibold">
                      {user.name}
                    </p>

                    <p className="text-white/80 text-sm">{user.email}</p>

                    <div className="mt-3 inline-flex items-center gap-2 bg-white/20 backdrop-blur-md px-4 py-1.5 rounded-full border border-white/20">
                      <Wallet className="w-4 h-4 text-white" />

                      <span className="text-sm font-semibold text-white">
                        {user.userType === "wholesale"
                          ? "Wholesale Customer"
                          : "Retail Customer"}
                      </span>
                    </div>
                  </div>
                </div>

                <button
                  onClick={onClose}
                  className="
                    w-12 h-12 rounded-2xl
                    bg-white/20 hover:bg-white/30
                    border border-white/20
                    flex items-center justify-center
                    transition-all
                  "
                >
                  <X className="w-6 h-6 text-white" />
                </button>
              </div>
            </div>

            {/* BODY */}
            <div className="flex flex-1 overflow-hidden">
              {/* SIDEBAR */}
              <div
                className="
                hidden md:flex
                w-[280px]
                bg-white
                border-r
                border-gray-200
                p-5
                flex-col
                gap-3
              "
              >
                {[
                  {
                    key: "overview",
                    label: "Overview",
                    icon: User,
                  },
                  {
                    key: "orders",
                    label: `Orders (${orders.length})`,
                    icon: Package,
                  },
                  {
                    key: "addresses",
                    label: "Addresses",
                    icon: MapPin,
                  },
                  {
                    key: "wishlist",
                    label: `Wishlist (${wishlistItems.length})`,
                    icon: Heart,
                  },
                  {
                    key: "settings",
                    label: "Settings",
                    icon: Settings,
                  },
                ].map((tab: any) => {
                  const Icon = tab.icon;

                  return (
                    <button
                      key={tab.key}
                      onClick={() => setActiveTab(tab.key)}
                      className={`
                        flex items-center justify-between
                        px-4 py-4 rounded-2xl
                        transition-all
                        font-semibold
                        ${activeTab === tab.key
                          ? "bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-lg"
                          : "hover:bg-orange-50 text-gray-700"
                        }
                      `}
                    >
                      <div className="flex items-center gap-3">
                        <Icon className="w-5 h-5" />
                        {tab.label}
                      </div>

                      <ChevronRight className="w-4 h-4" />
                    </button>
                  );
                })}

                <div className="mt-auto">
                  <button
                    onClick={() => {
                      onLogout();
                      onClose();
                    }}
                    className="
                      w-full
                      flex items-center justify-center gap-3
                      bg-red-500 hover:bg-red-600
                      text-white
                      py-4 rounded-2xl
                      font-bold
                      transition-all
                    "
                  >
                    <LogOut className="w-5 h-5" />
                    Logout
                  </button>
                </div>
              </div>

              {/* MAIN */}
              <div className="flex-1 overflow-y-auto p-5 md:p-8">
                {/* MOBILE TABS */}
                <div className="md:hidden flex gap-2 overflow-x-auto mb-5 pb-1">
                  {[
                    "overview",
                    "orders",
                    "addresses",
                    "wishlist",
                    "settings",
                  ].map((tab) => (
                    <button
                      key={tab}
                      onClick={() => setActiveTab(tab as any)}
                      className={`
                        px-5 py-3 rounded-2xl whitespace-nowrap
                        font-semibold capitalize
                        ${activeTab === tab
                          ? "bg-orange-500 text-white"
                          : "bg-white border"
                        }
                      `}
                    >
                      {tab}
                    </button>
                  ))}
                </div>

                {/* OVERVIEW */}
                {activeTab === "overview" && (
                  <div className="space-y-8">
                    {/* STATS */}
                    <div className="grid grid-cols-2 xl:grid-cols-4 gap-5">
                      <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
                        <ShoppingBag className="w-10 h-10 text-orange-500 mb-4" />

                        <p className="text-4xl font-black text-gray-900">
                          {orders.length}
                        </p>

                        <p className="text-gray-500 font-medium mt-1">
                          Total Orders
                        </p>
                      </div>

                      <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
                        <Wallet className="w-10 h-10 text-green-500 mb-4" />

                        <p className="text-4xl font-black text-gray-900">
                          ₹{Math.round(totalSpent)}
                        </p>

                        <p className="text-gray-500 font-medium mt-1">
                          Total Spent
                        </p>
                      </div>

                      <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
                        <CheckCircle2 className="w-10 h-10 text-blue-500 mb-4" />

                        <p className="text-4xl font-black text-gray-900">
                          {deliveredOrders}
                        </p>

                        <p className="text-gray-500 font-medium mt-1">
                          Delivered
                        </p>
                      </div>

                      <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
                        <Clock3 className="w-10 h-10 text-purple-500 mb-4" />

                        <p className="text-4xl font-black text-gray-900">
                          {pendingOrders}
                        </p>

                        <p className="text-gray-500 font-medium mt-1">
                          Pending
                        </p>
                      </div>
                    </div>

                    {/* ACCOUNT CARD */}
                    <div className="bg-white rounded-3xl p-7 shadow-sm border border-gray-100">
                      <h3 className="text-2xl font-black mb-6">
                        Account Information
                      </h3>

                      <div className="grid md:grid-cols-2 gap-5">
                        <div className="bg-gray-50 rounded-2xl p-5">
                          <p className="text-sm text-gray-500 mb-1">
                            Full Name
                          </p>

                          <p className="font-bold text-lg text-gray-900">
                            {user.name}
                          </p>
                        </div>

                        <div className="bg-gray-50 rounded-2xl p-5">
                          <p className="text-sm text-gray-500 mb-1">Email</p>

                          <p className="font-bold text-lg text-gray-900 break-all">
                            {user.email}
                          </p>
                        </div>

                        <div className="bg-gray-50 rounded-2xl p-5">
                          <p className="text-sm text-gray-500 mb-1">Phone</p>

                          <p className="font-bold text-lg text-gray-900">
                            {user.phone || "Not Added"}
                          </p>
                        </div>

                        <div className="bg-gray-50 rounded-2xl p-5">
                          <p className="text-sm text-gray-500 mb-1">
                            Account Type
                          </p>

                          <p className="font-bold text-lg text-gray-900">
                            {user.userType === "wholesale"
                              ? "Wholesale"
                              : "Retail"}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* ORDERS */}
                {activeTab === "orders" && (
                  <div>
                    <div className="flex items-center justify-between mb-6">
                      <h3 className="text-3xl font-black text-gray-900">
                        My Orders
                      </h3>

                      <div className="bg-orange-100 text-orange-700 px-4 py-2 rounded-full font-bold">
                        {orders.length} Orders
                      </div>
                    </div>

                    {orders.length === 0 ? (
                      <div className="bg-white rounded-3xl p-14 text-center border">
                        <Package className="w-20 h-20 text-gray-300 mx-auto mb-5" />

                        <h4 className="text-2xl font-bold text-gray-800 mb-2">
                          No Orders Yet
                        </h4>

                        <p className="text-gray-500">
                          Start shopping to see your orders here.
                        </p>
                      </div>
                    ) : (
                      <div className="space-y-5">
                        {orders.map((order) => {
                          const id = order._id || order.id;

                          return (
                            <div
                              key={id}
                              onClick={() => setSelectedOrder(order)}
                              className="
                                bg-white
                                rounded-3xl
                                border border-gray-200
                                p-5
                                hover:shadow-xl
                                transition-all
                                cursor-pointer
                              "
                            >
                              {/* TOP */}
                              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5">
                                <div>
                                  <div className="flex items-center gap-3 flex-wrap">
                                    <h4 className="text-xl font-black text-gray-900">
                                      Order #{id.slice(-8)}
                                    </h4>

                                    <span
                                      className={`
                                        px-4 py-1 rounded-full text-sm font-bold border
                                        ${getStatusStyle(order.status)}
                                      `}
                                    >
                                      {order.status === "refund_requested"
                                        ? "Refund Requested"
                                        : order.status}
                                    </span>
                                  </div>

                                  <p className="text-gray-500 mt-2">
                                    Ordered on{" "}
                                    {new Date(
                                      order.createdAt,
                                    ).toLocaleDateString()}
                                  </p>
                                </div>

                                <div className="text-left lg:text-right">
                                  <p className="text-gray-500 text-sm">
                                    Total Amount
                                  </p>

                                  <p className="text-3xl font-black text-orange-600">
                                    ₹{Math.round(order.totalAmount)}
                                  </p>
                                </div>
                              </div>

                              {/* ITEMS */}
                              <div className="mt-6 grid gap-3">
                                {order.items?.slice(0, 2).map((item: any) => (
                                  <div
                                    key={item._id}
                                    className="flex items-center gap-4 bg-gray-50 rounded-2xl p-3"
                                  >
                                    <img
                                      src={item.image}
                                      alt={item.name}
                                      className="w-20 h-20 rounded-2xl object-cover border"
                                    />

                                    <div className="flex-1">
                                      <p className="font-bold text-gray-900">
                                        {item.name}
                                      </p>

                                      <p className="text-sm text-gray-500">
                                        Qty: {item.quantity}
                                      </p>
                                    </div>

                                    <p className="font-black text-lg text-orange-600">
                                      ₹{item.price}
                                    </p>
                                  </div>
                                ))}
                              </div>

                              {/* BUTTONS */}
                              <div className="grid grid-cols-2 lg:flex gap-3 mt-6">
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    onTrackOrder(id);
                                  }}
                                  className="
                                    flex-1
                                    flex items-center justify-center gap-2
                                    bg-gradient-to-r from-blue-500 to-indigo-600
                                    text-white
                                    py-3 rounded-2xl
                                    font-bold
                                    hover:scale-[1.02]
                                    transition-all
                                  "
                                >
                                  <Truck className="w-5 h-5" />
                                  Track Order
                                </button>

                                {(order.status === "placed" ||
                                  order.status === "paid") && (
                                    <button
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        handleCancelOrder(id);
                                      }}
                                      className="
                                      flex-1
                                      bg-red-500 hover:bg-red-600
                                      text-white
                                      py-3 rounded-2xl
                                      font-bold
                                      transition-all
                                    "
                                    >
                                      Cancel
                                    </button>
                                  )}

                                {order.status === "delivered" && (
                                  <button
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      handleReturnOrder(id);
                                    }}
                                    className="
                                      flex-1
                                      flex items-center justify-center gap-2
                                      bg-yellow-500 hover:bg-yellow-600
                                      text-white
                                      py-3 rounded-2xl
                                      font-bold
                                      transition-all
                                    "
                                  >
                                    <RotateCcw className="w-5 h-5" />
                                    Return
                                  </button>
                                )}

                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    onPreviewInvoice(id);
                                  }}
                                  className="
                                    flex-1
                                    bg-gray-100 hover:bg-gray-200
                                    py-3 rounded-2xl
                                    font-bold
                                    transition-all
                                  "
                                >
                                  Preview Invoice
                                </button>

                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    onDownloadInvoice(id);
                                  }}
                                  className="
                                    flex-1
                                    flex items-center justify-center gap-2
                                    bg-black hover:bg-gray-900
                                    text-white
                                    py-3 rounded-2xl
                                    font-bold
                                    transition-all
                                  "
                                >
                                  <Download className="w-5 h-5" />
                                  Invoice
                                </button>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </div>
                )}

                {/* ADDRESS */}
                {activeTab === "addresses" && (
                  <AddressManager user={user} />
                )}

                {/* WISHLIST */}
                {activeTab === "wishlist" && (
                  <div>
                    <h3 className="text-3xl font-black mb-6">
                      Wishlist
                    </h3>

                    {wishlistItems.length === 0 ? (
                      <div className="bg-white rounded-3xl p-14 text-center border">
                        <Heart className="w-20 h-20 text-gray-300 mx-auto mb-5" />

                        <h4 className="text-2xl font-bold text-gray-800 mb-2">
                          Wishlist Empty
                        </h4>

                        <p className="text-gray-500">
                          Save products you love here.
                        </p>
                      </div>
                    ) : (
                      <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-5">
                        {wishlistItems.map((item) => (
                          <div
                            key={item._id}
                            className="
                              bg-white rounded-3xl border
                              overflow-hidden
                              hover:shadow-xl
                              transition-all
                            "
                          >
                            <img
                              src={item.image}
                              alt={item.name}
                              className="w-full h-56 object-cover"
                            />

                            <div className="p-5">
                              <h4 className="font-black text-lg text-gray-900">
                                {item.name}
                              </h4>

                              <p className="text-orange-500 font-semibold mt-1">
                                {item.brand}
                              </p>

                              <div className="mt-4 flex items-center justify-between">
                                <p className="text-2xl font-black text-orange-600">
                                  ₹
                                  {user.userType === "wholesale"
                                    ? item.wholesalePrice
                                    : item.price}
                                </p>

                                <button className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-xl font-bold">
                                  Add
                                </button>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}

                {/* SETTINGS */}
                {activeTab === "settings" && (
                  <div className="max-w-3xl">
                    <div className="bg-white rounded-3xl p-7 border">
                      <div className="flex items-center justify-between mb-8">
                        <h3 className="text-3xl font-black">
                          Account Settings
                        </h3>

                        {!isEditing && (
                          <button
                            onClick={() => {
                              setEditedUser(user);
                              setIsEditing(true);
                            }}
                            className="
                              flex items-center gap-2
                              bg-orange-500 hover:bg-orange-600
                              text-white
                              px-5 py-3 rounded-2xl
                              font-bold
                            "
                          >
                            <Edit className="w-4 h-4" />
                            Edit
                          </button>
                        )}
                      </div>

                      {!isEditing ? (
                        <div className="space-y-5">
                          <div className="bg-gray-50 rounded-2xl p-5">
                            <p className="text-sm text-gray-500 mb-1">
                              Full Name
                            </p>

                            <p className="font-bold text-lg">
                              {user.name}
                            </p>
                          </div>

                          <div className="bg-gray-50 rounded-2xl p-5">
                            <p className="text-sm text-gray-500 mb-1">
                              Phone
                            </p>

                            <p className="font-bold text-lg">
                              {user.phone || "Not Added"}
                            </p>
                          </div>

                          <div className="bg-gray-50 rounded-2xl p-5">
                            <p className="text-sm text-gray-500 mb-1">
                              Email
                            </p>

                            <p className="font-bold text-lg break-all">
                              {user.email}
                            </p>
                          </div>
                        </div>
                      ) : (
                        <div className="space-y-5">
                          <div>
                            <label className="block font-semibold mb-2">
                              Full Name
                            </label>

                            <input
                              value={editedUser.name || ""}
                              onChange={(e) =>
                                setEditedUser({
                                  ...editedUser,
                                  name: e.target.value,
                                })
                              }
                              className="
                                w-full
                                border-2 border-gray-200
                                focus:border-orange-500
                                rounded-2xl
                                px-5 py-4
                                outline-none
                              "
                            />
                          </div>

                          <div>
                            <label className="block font-semibold mb-2">
                              Phone
                            </label>

                            <input
                              value={editedUser.phone || ""}
                              onChange={(e) =>
                                setEditedUser({
                                  ...editedUser,
                                  phone: e.target.value,
                                })
                              }
                              className="
                                w-full
                                border-2 border-gray-200
                                focus:border-orange-500
                                rounded-2xl
                                px-5 py-4
                                outline-none
                              "
                            />
                          </div>

                          <div className="flex gap-3 pt-2">
                            <button
                              onClick={handleSaveProfile}
                              className="
                                flex-1
                                bg-gradient-to-r from-orange-500 to-red-500
                                text-white
                                py-4 rounded-2xl
                                font-bold
                                flex items-center justify-center gap-2
                              "
                            >
                              <Save className="w-5 h-5" />
                              Save Changes
                            </button>

                            <button
                              onClick={() => setIsEditing(false)}
                              className="
                                flex-1
                                border-2 border-gray-300
                                py-4 rounded-2xl
                                font-bold
                              "
                            >
                              Cancel
                            </button>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* DANGER ZONE */}
                    <div className="mt-6 bg-red-50 border border-red-200 rounded-3xl p-6">
                      <h4 className="text-2xl font-black text-red-600 mb-3">
                        Danger Zone
                      </h4>

                      <p className="text-gray-600 mb-5">
                        Deleting your account is permanent and cannot be undone.
                      </p>

                      <button className="bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-2xl font-bold">
                        Delete Account
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ORDER DETAILS */}
      {selectedOrder && (
        <OrderDetailsModal
          order={selectedOrder}
          onClose={() => setSelectedOrder(null)}
        />
      )}

      {/* TOAST */}
      {toast && (
        <div className="fixed top-6 left-1/2 -translate-x-1/2 z-[999]">
          <div
            className={`
              px-6 py-4 rounded-2xl shadow-2xl border
              backdrop-blur-xl
              font-bold
              animate-in fade-in slide-in-from-top
              ${toast.type === "success"
                ? "bg-green-50 text-green-700 border-green-200"
                : "bg-red-50 text-red-700 border-red-200"
              }
            `}
          >
            {toast.message}
          </div>
        </div>
      )}
    </>
  );
}