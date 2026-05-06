import { useEffect, useMemo, useState } from "react";
import api from "../api/api";

export default function Users() {
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");
  const [filter, setFilter] = useState("all");

  const [selectedUser, setSelectedUser] = useState<any | null>(null);
  const [deleteUser, setDeleteUser] = useState<any | null>(null);

  const [toast, setToast] = useState<{
    message: string;
    type: "success" | "error";
  } | null>(null);

  const showToast = (
    message: string,
    type: "success" | "error" = "success",
  ) => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 2500);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const res = await api.get("/admin/users");
      setUsers(res.data);
    } catch {
      showToast("Failed to load users", "error");
    } finally {
      setLoading(false);
    }
  };

  const filteredUsers = useMemo(() => {
    let data = [...users];

    if (search.trim()) {
      const q = search.toLowerCase();
      data = data.filter(
        (u) =>
          u.name?.toLowerCase().includes(q) ||
          u.email?.toLowerCase().includes(q),
      );
    }

    if (filter !== "all") {
      data = data.filter((u) => (u.userType || "").toLowerCase() === filter);
    }

    data.sort((a, b) => {
      const aName = a.name?.toLowerCase() || "";
      const bName = b.name?.toLowerCase() || "";
      return sortOrder === "asc"
        ? aName.localeCompare(bName)
        : bName.localeCompare(aName);
    });

    return data;
  }, [users, search, sortOrder, filter]);

  const handleToggleStatus = async (user: any) => {
    try {
      const newStatus = !user.isActive;

      await api.patch(`/users/status/${user._id}`, {
        isActive: newStatus,
      });

      setUsers((prev) =>
        prev.map((u) =>
          u._id === user._id ? { ...u, isActive: newStatus } : u,
        ),
      );

      showToast(newStatus ? "User Activated" : "User Disabled", "success");
    } catch {
      showToast("Status update failed", "error");
    }
  };

  return (
    <div className="p-3 md:p-6 bg-gray-50 min-h-screen">
      {/* HEADER */}
      <h1 className="text-xl md:text-2xl font-bold mb-4">User Management</h1>

      {/* TOOLBAR */}
      <div className="bg-white shadow-sm rounded-xl p-3 md:p-4 flex flex-col md:flex-row gap-3 md:items-center md:justify-between mb-4">
        <input
          className="border px-3 py-2 rounded-lg w-full md:w-1/3"
          placeholder="Search users..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <div className="flex gap-2 md:gap-3">
          <select
            className="border px-3 py-2 rounded-lg"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          >
            <option value="all">All</option>
            <option value="retail">Retail</option>
            <option value="wholesale">Wholesale</option>
          </select>

          <select
            className="border px-3 py-2 rounded-lg"
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
          >
            <option value="asc">A → Z</option>
            <option value="desc">Z → A</option>
          </select>
        </div>
      </div>

      {/* ================= DESKTOP TABLE ================= */}
      <div className="hidden md:block bg-white shadow-sm rounded-xl border">
        {loading ? (
          <div className="p-10 text-center text-gray-500">Loading users...</div>
        ) : filteredUsers.length === 0 ? (
          <div className="p-10 text-center text-gray-500">No users found</div>
        ) : (
          <table className="w-full text-sm">
            <thead className="bg-gray-100 text-gray-600">
              <tr>
                <th className="p-4 text-left">Name</th>
                <th>Email</th>
                <th>Type</th>
                <th>Status</th>
                <th className="text-right p-4">Actions</th>
              </tr>
            </thead>

            <tbody>
              {filteredUsers.map((u) => (
                <tr key={u._id} className="border-t hover:bg-gray-50">
                  <td className="p-4 font-medium">{u.name}</td>
                  <td>{u.email}</td>

                  <td>
                    <span className="px-2 py-1 text-xs rounded-full bg-blue-50 text-blue-600">
                      {u.userType}
                    </span>
                  </td>

                  <td>
                    <span
                      className={`px-2 py-1 text-xs rounded-full ${
                        u.isActive
                          ? "bg-green-50 text-green-600"
                          : "bg-red-50 text-red-600"
                      }`}
                    >
                      {u.isActive ? "Active" : "Disabled"}
                    </span>
                  </td>

                  <td className="p-4">
                    <div className="flex justify-end gap-2">
                      <button
                        onClick={() => setSelectedUser(u)}
                        className="px-3 py-1 text-xs rounded bg-blue-50 text-blue-600"
                      >
                        View
                      </button>

                      <button
                        onClick={() => handleToggleStatus(u)}
                        className="px-3 py-1 text-xs rounded bg-purple-50 text-purple-600"
                      >
                        Toggle
                      </button>

                      <button
                        onClick={() => setDeleteUser(u)}
                        className="px-3 py-1 text-xs rounded bg-red-50 text-red-600"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* ================= MOBILE CARDS ================= */}
      <div className="md:hidden space-y-3">
        {filteredUsers.map((u) => (
          <div key={u._id} className="bg-white border rounded-xl p-4">
            <div className="flex justify-between">
              <div>
                <p className="font-semibold">{u.name}</p>
                <p className="text-xs text-gray-500">{u.email}</p>
              </div>

              <span
                className={`text-xs h-5 px-2 py-1 rounded-full ${
                  u.isActive
                    ? "bg-green-50 text-green-600"
                    : "bg-red-50 text-red-600"
                }`}
              >
                {u.isActive ? "Active" : "Disabled"}
              </span>
            </div>

            <div className="mt-2">
              <span className="text-xs px-2 py-1 bg-blue-50 text-blue-600 rounded-full">
                {u.userType}
              </span>
            </div>

            <div className="mt-3 grid grid-cols-3 gap-2">
              <button
                onClick={() => setSelectedUser(u)}
                className="text-xs py-2 bg-blue-50 text-blue-600 rounded"
              >
                View
              </button>

              <button
                onClick={() => handleToggleStatus(u)}
                className="text-xs py-2 bg-purple-50 text-purple-600 rounded"
              >
                Toggle
              </button>

              <button
                onClick={() => setDeleteUser(u)}
                className="text-xs py-2 bg-red-50 text-red-600 rounded"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* VIEW MODAL (MOBILE FIX) */}
      {selectedUser && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-md rounded-xl p-5 relative">
            <button
              onClick={() => setSelectedUser(null)}
              className="absolute top-3 right-3"
            >
              ✕
            </button>

            <h2 className="text-lg font-semibold mb-4">User Details</h2>

            <div className="space-y-2 text-sm">
              <p>
                <b>Name:</b> {selectedUser.name}
              </p>
              <p>
                <b>Email:</b> {selectedUser.email}
              </p>
              <p>
                <b>Type:</b> {selectedUser.userType}
              </p>
              <p>
                <b>Status:</b> {selectedUser.isActive ? "Active" : "Disabled"}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* DELETE MODAL (MOBILE FIX) */}
      {deleteUser && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-sm rounded-xl p-5">
            <h2 className="text-lg font-semibold mb-2">Confirm Delete</h2>

            <p className="text-sm text-gray-600 mb-5">
              Delete <b>{deleteUser.name}</b>?
            </p>

            <div className="flex gap-3 justify-end">
              <button
                onClick={() => setDeleteUser(null)}
                className="px-4 py-2 text-sm border rounded-lg"
              >
                Cancel
              </button>

              <button
                onClick={async () => {
                  await api.delete(`/api/admin/users/${deleteUser._id}`);

                  setUsers((prev) =>
                    prev.filter((u) => u._id !== deleteUser._id),
                  );

                  showToast("User deleted", "success");
                  setDeleteUser(null);
                }}
                className="px-4 py-2 text-sm bg-red-600 text-white rounded-lg"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* TOAST */}
      {toast && (
        <div className="fixed top-5 left-1/2 -translate-x-1/2">
          <div
            className={`px-5 py-3 rounded-xl shadow ${
              toast.type === "success"
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
