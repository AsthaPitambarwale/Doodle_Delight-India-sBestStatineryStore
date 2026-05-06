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
  Plus,
  Save,
} from "lucide-react";
import { useState } from "react";
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
}

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
}: MyAccountProps) {
  const [activeTab, setActiveTab] = useState<
    "overview" | "orders" | "addresses" | "wishlist" | "settings"
  >("overview");
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
    }, 2500);
  };

  const handleSaveProfile = () => {
    onUpdateProfile(editedUser);
    setIsEditing(false);
  };

  const handleCancelOrder = async (id: string) => {
    try {
      const res = await fetch(`/api/orders/cancel/${id}`, {
        method: "PUT",
      });

      const data = await res.json();

      if (data.success) {
        showToast("Order cancelled", "success");
        onRefreshOrders();
      } else {
        showToast("Cancel failed", "error");
      }
    } catch (err) {
      console.error(err);
      showToast("Server error", "error");
    }
  };

  const handleReturnOrder = async (id: string) => {
    try {
      const res = await fetch(`/api/orders/return/${id}`, {
        method: "PUT",
      });

      const data = await res.json();

      if (data.success) {
        showToast("Return requested", "success");

        onRefreshOrders();
      } else {
        showToast("Return failed", "error");
      }
    } catch (err) {
      console.error(err);
      showToast("Server error", "error");
    }
  };

  if (!isOpen || !user) return null;

  return (
    <>
      <div
        className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 animate-in fade-in duration-200"
        onClick={onClose}
      />

      <div className="fixed inset-0 z-50 overflow-y-auto animate-in slide-in-from-right duration-300">
        <div className="flex min-h-full items-end md:items-center justify-center p-0 md:p-4">
          <div
            className="bg-white rounded-t-3xl md:rounded-3xl shadow-2xl w-full md:max-w-5xl 
h-[100dvh] md:h-[90vh] md:max-h-[90vh] 
flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="sticky top-0 z-10 bg-gradient-to-r from-orange-500 to-red-500 text-white p-4 md:p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h2 className="text-2xl font-bold mb-1">My Account</h2>
                  <p className="text-orange-100 text-sm">
                    Manage your profile and orders
                  </p>
                </div>
                <button
                  onClick={onClose}
                  className="p-2 hover:bg-white/20 rounded-full transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center">
                  <User className="w-8 h-8 text-orange-500" />
                </div>
                <div>
                  <h3 className="font-bold text-xl">{user.name}</h3>
                  <p className="text-orange-100 text-sm">{user.email}</p>
                  <span className="inline-block mt-1 bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-semibold">
                    {user.userType === "wholesale"
                      ? "Wholesale Customer"
                      : "Retail Customer"}
                  </span>
                </div>
              </div>
            </div>

            {/* Tabs */}
            <div className="flex gap-2 px-3 md:px-4 py-2 bg-gray-50 border-b border-gray-200 overflow-x-auto whitespace-nowrap scrollbar-hide">
              <button
                onClick={() => setActiveTab("overview")}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm md:text-base font-semibold transition-all ${
                  activeTab === "overview"
                    ? "bg-orange-500 text-white shadow-md"
                    : "text-gray-700 hover:bg-gray-200"
                }`}
              >
                <User className="w-4 h-4" />
                Overview
              </button>
              <button
                onClick={() => setActiveTab("orders")}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm md:text-base font-semibold transition-all ${
                  activeTab === "orders"
                    ? "bg-orange-500 text-white shadow-md"
                    : "text-gray-700 hover:bg-gray-200"
                }`}
              >
                <Package className="w-4 h-4" />
                Orders ({orders?.length || 0})
              </button>
              <button
                onClick={() => setActiveTab("addresses")}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm md:text-base font-semibold transition-all ${
                  activeTab === "addresses"
                    ? "bg-orange-500 text-white shadow-md"
                    : "text-gray-700 hover:bg-gray-200"
                }`}
              >
                <MapPin className="w-4 h-4" />
                Addresses
              </button>
              <button
                onClick={() => setActiveTab("wishlist")}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm md:text-base font-semibold transition-all ${
                  activeTab === "wishlist"
                    ? "bg-orange-500 text-white shadow-md"
                    : "text-gray-700 hover:bg-gray-200"
                }`}
              >
                <Heart className="w-4 h-4" />
                Wishlist ({wishlistItems.length})
              </button>
              <button
                onClick={() => setActiveTab("settings")}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm md:text-base font-semibold transition-all ${
                  activeTab === "settings"
                    ? "bg-orange-500 text-white shadow-md"
                    : "text-gray-700 hover:bg-gray-200"
                }`}
              >
                <Settings className="w-4 h-4" />
                Settings
              </button>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto px-4 md:px-6 py-5 space-y-6">
              {activeTab === "overview" && (
                <div className="space-y-6">
                  {/* Stats */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
                    <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-4 rounded-xl border border-blue-200">
                      <Package className="w-8 h-8 text-blue-600 mb-2" />
                      <p className="text-2xl font-bold text-gray-900">
                        {orders.length}
                      </p>
                      <p className="text-sm text-gray-600">Total Orders</p>
                    </div>
                    <div className="bg-gradient-to-br from-green-50 to-green-100 p-4 rounded-xl border border-green-200">
                      <TrendingUp className="w-8 h-8 text-green-600 mb-2" />
                      <p className="text-2xl font-bold text-gray-900">
                        ₹
                        {Math.round(
                          orders.reduce(
                            (sum, o) => sum + (o.totalAmount || 0),
                            0,
                          ),
                        )}
                      </p>
                      <p className="text-sm text-gray-600">Total Spent</p>
                    </div>
                    <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-4 rounded-xl border border-purple-200">
                      <Heart className="w-8 h-8 text-purple-600 mb-2" />
                      <p className="text-2xl font-bold text-gray-900">
                        {wishlistItems.length}
                      </p>
                      <p className="text-sm text-gray-600">Wishlist Items</p>
                    </div>
                  </div>

                  {/* Quick Actions */}
                  <div>
                    <h3 className="text-lg md:text-xl font-bold mb-4 text-gray-800">Quick Actions</h3>
                    <div className="grid grid-cols-2 gap-3">
                      <button
                        onClick={() => setActiveTab("orders")}
                        className="flex items-center gap-3 p-4 bg-white border-2 border-gray-200 rounded-xl hover:border-orange-500 hover:shadow-lg transition-all"
                      >
                        <Truck className="w-6 h-6 text-orange-500" />
                        <span className="font-semibold text-gray-900">
                          Track Order
                        </span>
                      </button>
                      <button
                        onClick={() =>
                          orders.length > 0 &&
                          onDownloadInvoice(orders[0]._id || orders[0].id)
                        }
                        disabled={orders.length === 0}
                        className="flex items-center gap-3 p-4 bg-white border-2 border-gray-200 rounded-xl hover:border-orange-500 hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <Download className="w-6 h-6 text-orange-500" />
                        <span className="font-semibold text-gray-900">
                          Download Invoice
                        </span>
                      </button>
                      <button
                        onClick={() => setActiveTab("settings")}
                        className="flex items-center gap-3 p-4 bg-white border-2 border-gray-200 rounded-xl hover:border-orange-500 hover:shadow-lg transition-all"
                      >
                        <Settings className="w-6 h-6 text-orange-500" />
                        <span className="font-semibold text-gray-900">
                          Settings
                        </span>
                      </button>
                      <button
                        onClick={() => {
                          onLogout();
                          onClose();
                        }}
                        className="flex items-center gap-3 p-4 bg-white border-2 border-red-200 rounded-xl hover:border-red-500 hover:bg-red-50 hover:shadow-lg transition-all"
                      >
                        <LogOut className="w-6 h-6 text-red-500" />
                        <span className="font-semibold text-red-600">
                          Logout
                        </span>
                      </button>
                    </div>
                  </div>

                  {/* User Info */}
                  <div>
                    <h3 className="text-lg md:text-xl font-bold mb-4 text-gray-800">
                      Account Information
                    </h3>
                    <div className="bg-gray-50 rounded-xl p-4 space-y-3">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Full Name:</span>
                        <span className="font-semibold text-gray-900">
                          {user.name}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Email:</span>
                        <span className="font-semibold text-gray-900">
                          {user.email}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Phone:</span>
                        <span className="font-semibold text-gray-900">
                          {user.phone || "Not added"}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Account Type:</span>
                        <span className="font-semibold text-gray-900">
                          {user.userType === "wholesale"
                            ? "Wholesale"
                            : "Retail"}
                        </span>
                      </div>
                      {user.userType === "wholesale" && (
                        <>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Company:</span>
                            <span className="font-semibold text-gray-900">
                              {user.companyName || "N/A"}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">GST Number:</span>
                            <span className="font-semibold text-gray-900">
                              {user.gstNumber || "N/A"}
                            </span>
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {activeTab === "orders" && (
                <div>
                  <h3 className="text-lg md:text-xl font-bold mb-4 text-gray-800">Order History</h3>

                  {!orders ? (
                    <p>Loading...</p>
                  ) : orders.length === 0 ? (
                    <div className="text-center py-12">
                      <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                      <p className="text-gray-600 font-semibold">
                        No orders yet
                      </p>
                      <p className="text-gray-500 text-sm">
                        Start shopping to see your orders here
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {orders.map((order) => {
                        const id = order._id || order.id;

                        return (
                          <div
                            key={id}
                            onClick={() => setSelectedOrder(order)}
                            className="bg-white border-2 border-gray-200 rounded-xl p-3 md:p-4 hover:border-orange-500 transition-colors cursor-pointer"
                          >
                            <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-2 mb-3">
                              <div className="flex justify-between items-start gap-2">
                                <div className="min-w-0">
                                  <p className="font-bold text-gray-900 break-words">
                                    Order #{id}
                                  </p>
                                  <p className="text-sm text-gray-600">
                                    {order.createdAt
                                      ? new Date(
                                          order.createdAt,
                                        ).toLocaleDateString()
                                      : "N/A"}
                                  </p>
                                </div>

                                <span className="shrink-0 px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-bold whitespace-nowrap">
                                  {order.status || "Processing"}
                                </span>
                              </div>
                            </div>
                            <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-2 mb-3">
                              <div>
                                <p className="text-sm text-gray-600">
                                  {order.items?.length || 0} items
                                </p>
                                <p className="font-bold text-orange-600">
                                  ₹{Math.round(order.totalAmount || 0)}
                                </p>
                              </div>

                              <span className="self-start md:self-auto px-3 py-1 bg-green-100 text-blue-700 rounded-full text-xs font-bold whitespace-nowrap">
                                {order.paymentMethod}
                              </span>
                            </div>

                            <div className="grid grid-cols-2 sm:grid-cols-3 md:flex gap-2">
                              {/* TRACK */}
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  onTrackOrder(id);
                                }}
                                className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-blue-500 to-blue-700 text-white py-2 px-4 rounded-lg hover:from-blue-600 hover:to-blue-800 font-semibold text-sm transition-all"
                              >
                                <Truck className="w-4 h-4" />
                                Track
                              </button>

                              {/* CANCEL */}
                              {order.status !== "cancelled" &&
                                order.status !== "delivered" && (
                                  <button
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      handleCancelOrder(id);
                                    }}
                                    className="flex-1 bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 font-semibold text-sm transition-all"
                                  >
                                    Cancel
                                  </button>
                                )}

                              {/* RETURN */}
                              {["paid", "delivered"].includes(order.status) && (
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleReturnOrder(id);
                                  }}
                                  className="flex-1 bg-yellow-500 text-white py-2 px-4 rounded-lg hover:bg-yellow-600 font-semibold text-sm transition-all"
                                >
                                  Return
                                </button>
                              )}

                              {/* INVOICE */}
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  onPreviewInvoice(id);
                                }}
                                className="flex-1 flex items-center justify-center gap-2 bg-gray-100 hover:bg-gray-200 py-2 px-4 rounded-lg font-semibold text-sm"
                              >
                                Preview Invoice
                              </button>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              )}

              {activeTab === "addresses" && <AddressManager user={user} />}

              {activeTab === "wishlist" && (
                <div>
                  <h3 className="text-lg md:text-xl font-bold mb-4 text-gray-800">
                    My Wishlist ({wishlistItems.length} items)
                  </h3>
                  {wishlistItems.length === 0 ? (
                    <div className="text-center py-12">
                      <Heart className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                      <p className="text-gray-600 font-semibold">
                        Your wishlist is empty
                      </p>
                      <p className="text-gray-500 text-sm">
                        Add products you love to your wishlist
                      </p>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 gap-4">
                      {wishlistItems.map((item) => (
                        <div
                          key={item._id}
                          className="bg-white border-2 border-gray-200 rounded-xl p-3 md:p-4 flex flex-col md:flex-row gap-3 md:gap-4 hover:border-orange-500 transition-colors"
                        >
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-24 h-24 object-cover rounded-xl border"
                          />
                          <div className="flex-1">
                            <h4 className="font-bold text-gray-900 mb-1">
                              {item.name}
                            </h4>
                            <p className="text-sm text-orange-600 font-semibold mb-2">
                              {item.brand}
                            </p>
                            <p className="text-lg font-bold text-orange-600">
                              ₹
                              {user.userType === "wholesale"
                                ? item.wholesalePrice
                                : item.price}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {activeTab === "settings" && (
                <div>
                  <h3 className="text-lg md:text-xl font-bold mb-4 text-gray-800">Account Settings</h3>
                  <div className="bg-white border-2 border-gray-200 rounded-xl p-6">
                    {!isEditing ? (
                      <div className="space-y-4">
                        <div className="flex justify-between items-center">
                          <h4 className="font-semibold text-gray-900">
                            Personal Information
                          </h4>
                          <button
                            onClick={() => {
                              setEditedUser(user);
                              setIsEditing(true);
                            }}
                            className="flex items-center gap-2 text-orange-600 hover:text-orange-700 font-semibold"
                          >
                            <Edit className="w-4 h-4" />
                            Edit
                          </button>
                        </div>
                        <div className="space-y-3 pt-4 border-t border-gray-200">
                          <div className="flex justify-between">
                            <span className="text-gray-600">Full Name:</span>
                            <span className="font-semibold text-gray-900">
                              {user.name}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Email:</span>
                            <span className="font-semibold text-gray-900">
                              {user.email}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Phone:</span>
                            <span className="font-semibold text-gray-900">
                              {user.phone || "Not added"}
                            </span>
                          </div>
                          {user.userType === "wholesale" && (
                            <>
                              <div className="flex justify-between">
                                <span className="text-gray-600">Company:</span>
                                <span className="font-semibold text-gray-900">
                                  {user.companyName || "N/A"}
                                </span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-gray-600">
                                  GST Number:
                                </span>
                                <span className="font-semibold text-gray-900">
                                  {user.gstNumber || "N/A"}
                                </span>
                              </div>
                            </>
                          )}
                        </div>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        <h4 className="font-semibold text-gray-900 mb-4">
                          Edit Personal Information
                        </h4>
                        <div>
                          <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Full Name
                          </label>
                          <input
                            type="text"
                            value={editedUser.name || ""}
                            onChange={(e) =>
                              setEditedUser({
                                ...editedUser,
                                name: e.target.value,
                              })
                            }
                            className="w-full px-4 py-3 md:py-2 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-orange-500 text-base"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Phone
                          </label>
                          <input
                            type="tel"
                            value={editedUser.phone || ""}
                            onChange={(e) =>
                              setEditedUser({
                                ...editedUser,
                                phone: e.target.value,
                              })
                            }
                            className="w-full px-4 py-3 md:py-2 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-orange-500 text-base"
                          />
                        </div>
                        {user.userType === "wholesale" && (
                          <>
                            <div>
                              <label className="block text-sm font-semibold text-gray-700 mb-2">
                                Company Name
                              </label>
                              <input
                                type="text"
                                value={editedUser.companyName || ""}
                                onChange={(e) =>
                                  setEditedUser({
                                    ...editedUser,
                                    companyName: e.target.value,
                                  })
                                }
                                className="w-full px-4 py-3 md:py-2 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-orange-500 text-base"
                              />
                            </div>
                            <div>
                              <label className="block text-sm font-semibold text-gray-700 mb-2">
                                GST Number
                              </label>
                              <input
                                type="text"
                                value={editedUser.gstNumber || ""}
                                onChange={(e) =>
                                  setEditedUser({
                                    ...editedUser,
                                    gstNumber: e.target.value,
                                  })
                                }
                                className="w-full px-4 py-3 md:py-2 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-orange-500 text-base"
                              />
                            </div>
                          </>
                        )}
                        <div className="flex gap-3 pt-4">
                          <button
                            onClick={handleSaveProfile}
                            className="flex-1 bg-gradient-to-r from-orange-500 to-red-500 text-white py-2 px-4 rounded-lg hover:from-orange-600 hover:to-red-600 font-semibold flex items-center justify-center gap-2"
                          >
                            <Save className="w-4 h-4" />
                            Save Changes
                          </button>
                          <button
                            onClick={() => setIsEditing(false)}
                            className="flex-1 border-2 border-gray-300 py-2 px-4 rounded-lg hover:bg-gray-50 font-semibold"
                          >
                            Cancel
                          </button>
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="mt-6 bg-gradient-to-r from-red-50 to-pink-50 border border-red-200 rounded-xl p-6">
                    <h4 className="font-semibold text-gray-900 mb-4">
                      Danger Zone
                    </h4>
                    <p className="text-gray-600 text-sm mb-4">
                      Once you delete your account, there is no going back.
                      Please be certain.
                    </p>
                    <button className="bg-red-500 text-white py-2 px-6 rounded-lg hover:bg-red-600 font-semibold">
                      Delete Account
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      {selectedOrder && (
        <OrderDetailsModal
          order={selectedOrder}
          onClose={() => setSelectedOrder(null)}
        />
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
    </>
  );
}
