import { useEffect, useState } from "react";
import api from "../api/api";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import { Users, Package, ShoppingCart, IndianRupee } from "lucide-react";

export default function Dashboard() {
  const [stats, setStats] = useState<any>({});
  const [orders, setOrders] = useState<any[]>([]);
  const [topUsers, setTopUsers] = useState<any[]>([]);
  const [lowStock, setLowStock] = useState<any[]>([]);
  const [userMap, setUserMap] = useState<any>({});

  useEffect(() => {
    fetchAll();
    fetchUsers();
    const interval = setInterval(fetchAll, 5000);
    return () => clearInterval(interval);
  }, []);

  const fetchUsers = async () => {
    const res = await api.get("/admin/users");

    const map: any = {};
    res.data.forEach((u: any) => {
      map[u._id] = u;
    });

    setUserMap(map);
  };

  const getUserName = (order: any) => {
    if (!order.userId) return "Guest User";

    if (typeof order.userId === "object") {
      return order.userId.name || order.userId.email || "Unknown User";
    }

    return "User ID: " + order.userId.slice(-6);
  };

  const fetchAll = async () => {
    try {
      const statsRes = await api.get("/admin/stats");
      console.log("stats OK");

      const orderRes = await api.get("/admin/orders");
      console.log("orders OK");

      const stockRes = await api.get("/admin/low-stock");
      console.log("stock OK");

      const topRes = await api.get("/admin/top-customers");
      console.log("top customers OK");

      setStats(statsRes.data);
      setOrders(orderRes.data.slice(0, 6));
      setLowStock(stockRes.data);
      setTopUsers(topRes.data);
    } catch (err: any) {
      console.log("❌ ERROR:", err?.response?.data || err.message);
    }
  };

  return (
    <div className="p-3 sm:p-4 md:p-6 bg-gradient-to-br from-gray-100 to-gray-200 min-h-screen">
      {/* HEADER */}
      <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-3 mb-6 md:mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold">Dashboard</h1>
        <div className="text-xs bg-green-500/10 text-green-600 px-3 py-1 rounded-full w-fit">
          ● Live
        </div>
      </div>

      {/* STATS */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6 mb-6 md:mb-8">
        <Card title="Users" value={stats.users} icon={<Users />} />
        <Card title="Orders" value={stats.orders} icon={<ShoppingCart />} />
        <Card title="Products" value={stats.products} icon={<Package />} />
        <Card
          title="Revenue"
          value={`₹${(stats.revenue || 0).toLocaleString()}`}
          icon={<IndianRupee />}
        />
      </div>

      {/* GRID */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-4 md:gap-6">
        {/* CHART */}
        <div className="xl:col-span-2 bg-white/80 backdrop-blur p-4 md:p-6 rounded-2xl shadow">
          <h2 className="font-semibold text-base md:text-lg mb-4">
            Revenue Overview
          </h2>

          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={stats.revenueChart || []}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="revenue"
                stroke="#4f46e5"
                strokeWidth={3}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* LOW STOCK */}
        <div className="bg-white/80 backdrop-blur p-4 md:p-6 rounded-2xl shadow hover:shadow-md transition">
          <div className="flex justify-between items-center mb-4">
            <h2 className="font-semibold text-base md:text-lg">Low Stock</h2>
            <span className="text-xs text-red-500 font-medium">
              {lowStock.length} items
            </span>
          </div>

          <div className="max-h-[260px] overflow-y-auto pr-2 space-y-2">
            {lowStock.length === 0 ? (
              <p className="text-gray-400 text-sm">No low stock items 🎉</p>
            ) : (
              lowStock.map((item) => (
                <div
                  key={item._id}
                  className="flex justify-between items-center p-3 rounded-lg hover:bg-gray-50 transition"
                >
                  <span className="text-sm font-medium text-gray-700 truncate max-w-[70%]">
                    {item.name || "Unnamed"}
                  </span>

                  <span className="min-w-[40px] text-center text-red-500 font-bold text-sm bg-red-100 px-2 py-1 rounded">
                    {item.stock ?? 0}
                  </span>
                </div>
              ))
            )}
          </div>
        </div>

        {/* RECENT ORDERS */}
        <div className="xl:col-span-2 bg-white/70 backdrop-blur-xl border border-gray-200 p-4 md:p-6 rounded-3xl shadow-sm hover:shadow-lg transition">
          <div className="flex justify-between items-center mb-5">
            <h2 className="font-semibold text-lg md:text-xl">Recent Orders</h2>
            <span className="text-xs bg-gray-100 px-3 py-1 rounded-full text-gray-600">
              {orders.length} orders
            </span>
          </div>

          {/* MOBILE CARDS */}
          <div className="md:hidden space-y-3">
            {orders.map((o) => {
              const name = getUserName(o);

              return (
                <div
                  key={o._id}
                  className="p-4 rounded-xl border bg-white shadow-sm"
                >
                  <div className="flex justify-between items-center">
                    <p className="font-semibold text-gray-800">{name}</p>
                    <StatusBadge status={o.status} />
                  </div>

                  <p className="text-sm text-gray-500 mt-1">
                    ₹{(o.totalAmount || 0).toLocaleString()}
                  </p>
                </div>
              );
            })}
          </div>

          {/* DESKTOP TABLE */}
          <div className="hidden md:block overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="sticky top-0 bg-white/90 backdrop-blur border-b z-10">
                <tr className="text-gray-500 text-xs uppercase">
                  <th className="py-3 text-left">Customer</th>
                  <th className="text-left">Amount</th>
                  <th className="text-left">Status</th>
                </tr>
              </thead>

              <tbody>
                {orders.map((o) => {
                  const name = getUserName(o);

                  return (
                    <tr
                      key={o._id}
                      className="border-b hover:bg-gray-50 transition"
                    >
                      <td className="py-4 font-medium text-gray-800">{name}</td>

                      <td className="font-semibold text-gray-800">
                        ₹{(o.totalAmount || 0).toLocaleString()}
                      </td>

                      <td>
                        <StatusBadge status={o.status} />
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* TOP CUSTOMERS */}
        <div className="bg-white/70 backdrop-blur-xl border border-gray-200 p-4 md:p-6 rounded-3xl shadow-sm hover:shadow-lg transition">
          <div className="flex justify-between items-center mb-5">
            <h2 className="font-semibold text-lg md:text-xl">Top Customers</h2>
            <span className="text-xs bg-green-100 text-green-600 px-3 py-1 rounded-full">
              Top {topUsers.length}
            </span>
          </div>

          <div className="space-y-3 max-h-[340px] overflow-y-auto">
            {topUsers.length === 0 ? (
              <p className="text-gray-400 text-sm text-center py-4">
                No data available
              </p>
            ) : (
              topUsers.map((u, i) => {
                const name = u.name;

                return (
                  <div
                    key={u._id}
                    className="flex justify-between items-center p-3 rounded-xl hover:bg-gray-50 transition"
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold text-white
                        ${
                          i === 0
                            ? "bg-yellow-500"
                            : i === 1
                              ? "bg-gray-500"
                              : i === 2
                                ? "bg-orange-500"
                                : "bg-indigo-500"
                        }`}
                      >
                        {i + 1}
                      </div>

                      <div>
                        {name ? (
                          <p className="font-semibold text-gray-800">{name}</p>
                        ) : (
                          <p className="text-gray-400 text-sm italic">—</p>
                        )}

                        <p className="text-xs text-gray-400">
                          {u.orders ?? 0} orders
                        </p>
                      </div>
                    </div>

                    <div className="text-right">
                      <p className="font-bold text-green-600">
                        ₹{(u.spent || 0).toLocaleString()}
                      </p>
                      <p className="text-xs text-gray-400">revenue</p>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function StatusBadge({ status }: any) {
  const colors: any = {
    delivered: "bg-green-100 text-green-700",
    shipped: "bg-blue-100 text-blue-700",
    placed: "bg-yellow-100 text-yellow-700",
    cancelled: "bg-red-100 text-red-700",
    paid: "bg-orange-100 text-orange-700",
  };

  return (
    <span
      className={`px-2 py-1 text-xs rounded ${colors[status] || "bg-gray-100"}`}
    >
      {status}
    </span>
  );
}

function Card({ title, value, icon }: any) {
  return (
    <div className="bg-white/80 backdrop-blur p-4 md:p-5 rounded-2xl shadow flex justify-between items-center hover:scale-[1.02] transition">
      <div>
        <p className="text-gray-500 text-xs sm:text-sm">{title}</p>
        <h2 className="text-lg sm:text-2xl font-bold mt-1">{value ?? 0}</h2>
      </div>

      <div className="bg-gray-100 p-2 md:p-3 rounded-xl">{icon}</div>
    </div>
  );
}
