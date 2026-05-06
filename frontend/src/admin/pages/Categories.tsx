import { useEffect, useState } from "react";
import api from "../api/api";

export default function Categories() {
  const [categories, setCategories] = useState<any[]>([]);
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<any | null>(null);

  const [form, setForm] = useState({
    name: "",
    slug: "",
    image: "",
  });
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

  // FETCH
  const fetchCategories = async () => {
    const res = await api.get("/categories");
    setCategories(res.data);
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const resetForm = () => {
    setForm({
      name: "",
      slug: "",
      image: "",
    });
    setEditing(null);
  };

  const handleChange = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // IMAGE UPLOAD (BASE64)
  const handleImageUpload = (file: File) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      setForm((prev) => ({ ...prev, image: reader.result as string }));
    };
    reader.readAsDataURL(file);
  };

  // CREATE
  const handleCreate = async () => {
    try {
      await api.post("/categories", form);
      showToast("Category created", "success");
      fetchCategories();
      setOpen(false);
      resetForm();
    } catch (err: any) {
      showToast(err?.response?.data?.message || "Create failed", "error");
    }
  };

  // UPDATE
  const handleUpdate = async () => {
    try {
      await api.patch(`/categories/${editing._id}`, form);
      showToast("Category updated", "success");
      fetchCategories();
      setOpen(false);
      resetForm();
    } catch (err: any) {
      showToast(err?.response?.data?.message || "Update failed", "error");
    }
  };

  const openEdit = (cat: any) => {
    setEditing(cat);
    setForm({
      name: cat.name,
      slug: cat.slug,
      image: cat.image,
    });
    setOpen(true);
  };

  return (
    <div className="p-6 bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen">
      {/* HEADER */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold">Categories</h1>
          <p className="text-gray-500 text-sm">
            Manage product categories & inventory
          </p>
        </div>

        <button
          onClick={() => setOpen(true)}
          className="bg-black text-white px-5 py-2 rounded-xl hover:scale-105 transition"
        >
          + Add Category
        </button>
      </div>

      {/* GRID */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-5">
        {categories.map((c) => (
          <div
            key={c._id}
            className="bg-white rounded-2xl shadow hover:shadow-xl transition overflow-hidden group"
          >
            {/* IMAGE */}
            <div className="relative">
              <img
                src={c.image}
                className="h-36 w-full object-cover group-hover:scale-105 transition"
              />

              {/* PRODUCT BADGE */}
              <span className="absolute top-2 right-2 bg-black text-white text-xs px-2 py-1 rounded-full">
                {c.productCount || 0} products
              </span>
            </div>

            {/* CONTENT */}
            <div className="p-4">
              <h2 className="font-semibold text-lg">{c.name}</h2>
              <p className="text-gray-500 text-xs">{c.slug}</p>

              <button
                onClick={() => openEdit(c)}
                className="mt-3 text-blue-600 text-sm hover:underline"
              >
                Edit Category
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* MODAL */}
      {open && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white w-[440px] rounded-2xl p-6 shadow-2xl">
            <h2 className="text-xl font-bold mb-4">
              {editing ? "Edit Category" : "Add Category"}
            </h2>

            {/* NAME */}
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Category name"
              className="border p-2 w-full rounded-lg mb-3"
            />

            {/* SLUG */}
            <input
              name="slug"
              value={form.slug}
              onChange={handleChange}
              placeholder="Slug"
              className="border p-2 w-full rounded-lg mb-3"
            />
            
            {/* IMAGE URL */}
            <input
              name="image"
              value={form.image}
              onChange={handleChange}
              placeholder="Image URL"
              className="border p-2 w-full rounded-lg mb-3"
            />

            {/* UPLOAD */}
            <input
              type="file"
              accept="image/*"
              className="mb-3"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) handleImageUpload(file);
              }}
            />

            {/* PREVIEW */}
            {form.image && (
              <img
                src={form.image}
                className="h-32 w-full object-cover rounded-lg mb-3"
              />
            )}

            {/* ACTIONS */}
            <div className="flex justify-end gap-2">
              <button
                onClick={() => {
                  setOpen(false);
                  resetForm();
                }}
                className="px-4 py-2 border rounded-lg"
              >
                Cancel
              </button>

              <button
                onClick={editing ? handleUpdate : handleCreate}
                className="bg-black text-white px-5 py-2 rounded-lg"
              >
                {editing ? "Update" : "Create"}
              </button>
            </div>
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
