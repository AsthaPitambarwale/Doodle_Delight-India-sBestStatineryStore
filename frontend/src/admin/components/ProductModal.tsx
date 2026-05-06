import { useEffect, useState } from "react";

export default function ProductModal({
  isOpen,
  onClose,
  onSave,
  initialData,
  categories = [],
}: any) {
  const [form, setForm] = useState({
    name: "",
    category: "",
    price: 0,
    stock: 0,
    brand: "",
    description: "",
    images: [] as string[],
  });

  const [imgInput, setImgInput] = useState("");

  useEffect(() => {
    if (initialData) {
      setForm({
        name: initialData.name || "",
        category: initialData.category || "",
        price: initialData.price || 0,
        stock: initialData.stock || 0,
        brand: initialData.brand || "",
        description: initialData.description || "",
        images: initialData.images || [],
      });
    } else {
      setForm({
        name: "",
        category: "",
        price: 0,
        stock: 0,
        brand: "",
        description: "",
        images: [],
      });
    }
  }, [initialData, isOpen]);

  if (!isOpen) return null;

  const handleChange = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // ADD IMAGE (URL OR BASE64)
  const addImage = (img?: string) => {
    if (!img && !imgInput) return;

    const newImg = img || imgInput;

    if (form.images.length >= 5) return alert("Max 5 images allowed");

    setForm({
      ...form,
      images: [...form.images, newImg],
    });

    setImgInput("");
  };

  const removeImage = (index: number) => {
    setForm({
      ...form,
      images: form.images.filter((_, i) => i !== index),
    });
  };

  // IMAGE UPLOAD (LOCAL → BASE64)
  const handleUpload = (file: File) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      addImage(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = () => {
    onSave({
      ...form,
      price: Number(form.price),
      stock: Number(form.stock),
    });
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white w-[550px] p-6 rounded-2xl shadow-xl">
        <h2 className="text-xl font-bold mb-4">
          {initialData ? "Edit Product" : "Add Product"}
        </h2>

        {/* BASIC FIELDS */}
        {/* BASIC FIELDS */}
        <div className="grid grid-cols-2 gap-3">
          {/* NAME */}
          <div>
            <label className="text-xs font-medium text-gray-600">
              Product Name
            </label>
            <input
              name="name"
              placeholder="Enter product name"
              value={form.name}
              onChange={handleChange}
              className="border p-2 rounded w-full"
            />
          </div>

          {/* CATEGORY */}
          <div>
            <label className="text-xs font-medium text-gray-600">
              Category
            </label>
            <select
              name="category"
              value={form.category}
              onChange={handleChange}
              className="border p-2 rounded w-full"
            >
              <option value="">Select Category</option>

              {categories?.map((c: any) => (
                <option key={c._id} value={c.name}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>

          {/* PRICE */}
          <div>
            <label className="text-xs font-medium text-gray-600">
              Price (₹)
            </label>
            <input
              name="price"
              type="number"
              placeholder="Enter price"
              value={form.price}
              onChange={handleChange}
              className="border p-2 rounded w-full"
            />
          </div>

          {/* STOCK */}
          <div>
            <label className="text-xs font-medium text-gray-600">
              Stock Quantity
            </label>
            <input
              name="stock"
              type="number"
              placeholder="Available stock"
              value={form.stock}
              onChange={handleChange}
              className="border p-2 rounded w-full"
            />
          </div>

          {/* BRAND */}
          <div className="col-span-2">
            <label className="text-xs font-medium text-gray-600">Brand</label>
            <input
              name="brand"
              placeholder="Enter brand name"
              value={form.brand}
              onChange={handleChange}
              className="border p-2 rounded w-full"
            />
          </div>
        </div>

        {/* DESCRIPTION */}
        <div className="col-span-2">
          <label className="text-xs font-medium text-gray-600">
            Description
          </label>

          <textarea
            name="description"
            placeholder="Enter product description..."
            value={form.description}
            onChange={handleChange}
            rows={3}
            className="border p-2 rounded w-full resize-none focus:outline-none focus:ring-2 focus:ring-orange-400"
          />
        </div>

        {/* IMAGE INPUT */}
        <div className="mt-4 border-t pt-4">
          <h3 className="font-semibold mb-2">
            Product Images ({form.images.length}/5)
          </h3>

          <div className="flex gap-2">
            <input
              value={imgInput}
              onChange={(e) => setImgInput(e.target.value)}
              placeholder="Paste image URL"
              className="border p-2 flex-1 rounded"
            />

            <button
              onClick={() => addImage()}
              className="bg-black text-white px-3 rounded"
            >
              Add
            </button>
          </div>

          {/* UPLOAD */}
          <input
            type="file"
            accept="image/*"
            className="mt-2"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) handleUpload(file);
            }}
          />

          {/* IMAGE PREVIEW */}
          <div className="grid grid-cols-5 gap-2 mt-3">
            {form.images.map((img, i) => (
              <div key={i} className="relative">
                <img src={img} className="h-16 w-16 object-cover rounded" />

                <button
                  onClick={() => removeImage(i)}
                  className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5"
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* ACTIONS */}
        <div className="flex justify-end gap-2 mt-5">
          <button onClick={onClose} className="px-4 py-2 border rounded">
            Cancel
          </button>

          <button
            onClick={handleSubmit}
            className="bg-orange-500 text-white px-4 py-2 rounded"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
