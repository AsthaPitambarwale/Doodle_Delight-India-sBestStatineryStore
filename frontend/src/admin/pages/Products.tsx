import { useEffect, useState } from "react";
import api from "../api/api";
import ProductModal from "../components/ProductModal";

export default function Products() {
  const [products, setProducts] = useState<any[]>([]);
  const [open, setOpen] = useState(false);
  const [editData, setEditData] = useState<any>(null);
  const [toast, setToast] = useState<any>(null);
  const [categories, setCategories] = useState<any[]>([]);
  const [deleteItem, setDeleteItem] = useState<any | null>(null);

  const fetchCategories = async () => {
    const res = await api.get("/categories");
    setCategories(res.data);
  };

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, []);

  const showToast = (
    message: string,
    type: "success" | "error" = "success",
  ) => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 2500);
  };

  const fetchProducts = async () => {
    try {
      const res = await api.get("/products");
      setProducts(res.data);
    } catch {
      showToast("Failed to load products", "error");
    }
  };

  const handleSave = async (data: any) => {
    try {
      const payload = {
        ...data,
        description: data.description || "",
        price: Number(data.price),
        stock: Number(data.stock),
        images: data.images || [],
      };

      if (editData) {
        await api.put(`/products/${editData._id}`, payload);
        showToast("Product updated", "success");
      } else {
        await api.post("/products", payload);
        showToast("Product created", "success");
      }

      setEditData(null);
      setOpen(false);
      fetchProducts();
    } catch (err: any) {
      showToast(err?.response?.data?.message || "Save failed", "error");
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await api.delete(`/products/${id}`);
      showToast("Product deleted", "success");
      fetchProducts();
    } catch {
      showToast("Delete failed", "error");
    }
  };

  const handleEdit = (p: any) => {
    setEditData({ ...p, images: p.images || [] });
    setOpen(true);
  };

  const handleBulkUpload = async (e: any) => {
    try {
      const file = e.target.files[0];
      const formData = new FormData();
      formData.append("file", file);

      const res = await api.post("/products/bulk-upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      showToast(`Inserted ${res.data.inserted} products`, "success");
      fetchProducts();
    } catch {
      showToast("Bulk upload failed", "error");
    }
  };

  return (
    <div className="p-3 md:p-6 bg-gray-50 min-h-screen">
      {/* HEADER */}
      <div className="flex flex-col md:flex-row md:justify-between gap-3 mb-6">
        <h1 className="text-2xl md:text-3xl font-bold">Products</h1>

        <div className="flex flex-col md:flex-row gap-2">
          <button
            onClick={() => {
              setEditData(null);
              setOpen(true);
            }}
            className="bg-black text-white px-4 py-2 rounded-lg"
          >
            + Add Product
          </button>

          <input
            type="file"
            accept=".csv"
            onChange={handleBulkUpload}
            className="border p-2 rounded-lg bg-white text-sm"
          />
        </div>
      </div>

      {/* ================= DESKTOP TABLE ================= */}
      <div className="hidden md:block bg-white shadow rounded-xl overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3 text-left">Product</th>
              <th>Description</th>
              <th>Category</th>
              <th>Price</th>
              <th>Stock</th>
              <th>Images</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {products.map((p) => (
              <tr key={p._id} className="border-t">
                <td className="p-3 font-medium">{p.name}</td>

                <td className="max-w-[200px] truncate text-gray-600">
                  {p.description || "-"}
                </td>

                <td>{p.category}</td>

                <td>₹{p.price}</td>

                <td className="text-center">
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-semibold inline-block ${
                      p.stock < 15
                        ? "bg-red-100 text-red-600"
                        : "bg-green-100 text-green-700"
                    }`}
                  >
                    {p.stock}
                  </span>
                </td>

                <td>
                  <div className="flex gap-1">
                    {(p.images || [])
                      .slice(0, 3)
                      .map((img: string, i: number) => (
                        <img
                          key={i}
                          src={img}
                          className="w-10 h-10 object-cover rounded"
                        />
                      ))}
                  </div>
                </td>

                <td className="flex gap-2 p-2">
                  <button
                    onClick={() => handleEdit(p)}
                    className="px-3 py-1 bg-blue-500 text-white rounded"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => setDeleteItem(p)}
                    className="px-3 py-1 bg-red-500 text-white rounded"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ================= MOBILE CARDS ================= */}
      <div className="md:hidden space-y-3">
        {products.map((p) => (
          <div key={p._id} className="bg-white rounded-xl shadow-sm border p-4">
            {/* TOP */}
            <div className="flex justify-between">
              <h2 className="font-semibold">{p.name}</h2>
              <span
                className={`text-xs h-10 px-3 py-1 rounded-full font-semibold ${
                  p.stock < 15
                    ? "bg-red-100 text-red-600"
                    : "bg-green-100 text-green-700"
                }`}
              >
                Stock: {p.stock}
              </span>
            </div>

            <p className="text-xs text-gray-500 mt-1">{p.category}</p>

            <p className="text-sm text-gray-600 mt-2 line-clamp-2">
              {p.description || "-"}
            </p>

            {/* IMAGES */}
            <div className="flex gap-2 mt-3">
              {(p.images || []).slice(0, 3).map((img: string, i: number) => (
                <img
                  key={i}
                  src={img}
                  className="w-12 h-12 object-cover rounded"
                />
              ))}
            </div>

            {/* PRICE */}
            <div className="mt-3 font-bold text-lg">₹{p.price}</div>

            {/* ACTIONS */}
            <div className="grid grid-cols-2 gap-2 mt-4">
              <button
                onClick={() => handleEdit(p)}
                className="bg-blue-500 text-white py-2 rounded-lg text-sm"
              >
                Edit
              </button>

              <button
                onClick={() => setDeleteItem(p)}
                className="bg-red-500 text-white py-2 rounded-lg text-sm"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* MODAL */}
      <ProductModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onSave={handleSave}
        initialData={editData}
        categories={categories}
      />

      {deleteItem && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white w-full max-w-sm rounded-2xl p-5 shadow-xl">
            <h2 className="text-lg font-bold text-gray-900">Confirm Delete</h2>

            <p className="text-sm text-gray-600 mt-2">
              Are you sure you want to delete:
            </p>

            <p className="mt-2 font-semibold text-gray-900">
              {deleteItem.name}
            </p>

            <p className="text-xs text-red-500 mt-2">
              This action cannot be undone.
            </p>

            <div className="flex gap-3 mt-6">
              {/* CANCEL */}
              <button
                onClick={() => setDeleteItem(null)}
                className="flex-1 py-2 rounded-lg border text-gray-700"
              >
                Cancel
              </button>

              {/* DELETE */}
              <button
                onClick={async () => {
                  await handleDelete(deleteItem._id);
                  setDeleteItem(null);
                }}
                className="flex-1 py-2 rounded-lg bg-red-600 text-white"
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
            className={`px-5 py-3 rounded-lg shadow ${
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
