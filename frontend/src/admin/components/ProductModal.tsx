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
    wholesalePrice: 0,
    stock: 0,
    brand: "",
    description: "",
    featured: false,
    sustainabilityScore: 0,
    images: [] as string[],
    tierPricing: [] as { minQty: number; price: number }[],
  });

  const [imgInput, setImgInput] = useState("");

  useEffect(() => {
    if (initialData) {
      setForm({
        name: initialData.name || "",
        category: initialData.category || "",
        price: initialData.price || 0,
        wholesalePrice: initialData.wholesalePrice || 0,
        stock: initialData.stock || 0,
        brand: initialData.brand || "",
        description: initialData.description || "",
        featured: initialData.featured || false,
        sustainabilityScore: initialData.sustainabilityScore || 0,
        images: initialData.images || [],
        tierPricing: initialData.tierPricing || [],
      });
    } else {
      setForm({
        name: "",
        category: "",
        price: 0,
        wholesalePrice: 0,
        stock: 0,
        brand: "",
        description: "",
        featured: false,
        sustainabilityScore: 0,
        images: [],
        tierPricing: [],
      });
    }
  }, [initialData, isOpen]);

  if (!isOpen) return null;

  const handleChange = (e: any) => {
    const { name, value, type, checked } = e.target;

    setForm({
      ...form,
      [name]: type === "checkbox" ? checked : value,
    });
  };

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

  const handleUpload = (file: File) => {
    const reader = new FileReader();
    reader.onloadend = () => addImage(reader.result as string);
    reader.readAsDataURL(file);
  };

  const addTier = () => {
    setForm({
      ...form,
      tierPricing: [...form.tierPricing, { minQty: 1, price: 0 }],
    });
  };

  const updateTier = (index: number, key: string, value: number) => {
    const updated = [...form.tierPricing];
    updated[index] = { ...updated[index], [key]: value };
    setForm({ ...form, tierPricing: updated });
  };

  const removeTier = (index: number) => {
    setForm({
      ...form,
      tierPricing: form.tierPricing.filter((_, i) => i !== index),
    });
  };

  const handleSubmit = () => {
    onSave({
      ...form,
      price: Number(form.price),
      wholesalePrice: Number(form.wholesalePrice),
      stock: Number(form.stock),
      sustainabilityScore: Number(form.sustainabilityScore),
    });
  };

  const Label = ({ children }: any) => (
    <label className="text-xs font-semibold text-slate-600 mb-1 block">
      {children}
    </label>
  );

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white w-[600px] max-h-[92vh] overflow-y-auto rounded-3xl shadow-2xl flex flex-col">

        {/* HEADER */}
        <div className="p-5 border-b sticky top-0 bg-white z-10">
          <h2 className="text-2xl font-bold text-slate-800">
            {initialData ? "Edit Product" : "Add New Product"}
          </h2>
          <p className="text-sm text-slate-500">
            Fill all required details to list your product
          </p>
        </div>

        <div className="p-6 space-y-6">

          {/* BASIC INFO */}
          <div className="bg-slate-50 p-4 rounded-2xl space-y-4">
            <h3 className="font-semibold text-slate-700">Basic Information</h3>

            <div>
              <Label>Product Name</Label>
              <input
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Enter product name"
                className="w-full border rounded-xl p-3 focus:ring-2 focus:ring-orange-400"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label>Category</Label>
                <select
                  name="category"
                  value={form.category}
                  onChange={handleChange}
                  className="border rounded-xl p-3 w-full"
                >
                  <option value="">Select category</option>
                  {categories?.map((c: any) => (
                    <option key={c._id} value={c.slug}>
                      {c.slug}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <Label>Brand Name</Label>
                <input
                  name="brand"
                  value={form.brand}
                  onChange={handleChange}
                  placeholder="Enter brand"
                  className="border rounded-xl p-3 w-full"
                />
              </div>
            </div>
          </div>

          {/* PRICING */}
          <div className="bg-slate-50 p-4 rounded-2xl space-y-4">
            <h3 className="font-semibold text-slate-700">Pricing & Stock</h3>

            <div className="grid grid-cols-3 gap-3">
              <div>
                <Label>Retail Price (₹)</Label>
                <input
                  name="price"
                  type="number"
                  value={form.price}
                  onChange={handleChange}
                  className="border rounded-xl p-3 w-full"
                />
              </div>

              <div>
                <Label>Wholesale Price (₹)</Label>
                <input
                  name="wholesalePrice"
                  type="number"
                  value={form.wholesalePrice}
                  onChange={handleChange}
                  className="border rounded-xl p-3 w-full"
                />
              </div>

              <div>
                <Label>Stock Quantity</Label>
                <input
                  name="stock"
                  type="number"
                  value={form.stock}
                  onChange={handleChange}
                  className="border rounded-xl p-3 w-full"
                />
              </div>
            </div>
          </div>

          {/* DESCRIPTION */}
          <div className="bg-slate-50 p-4 rounded-2xl">
            <Label>Product Description</Label>
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              rows={3}
              className="w-full border rounded-xl p-3"
              placeholder="Write detailed product description..."
            />
          </div>

          {/* FLAGS */}
          <div className="flex items-center gap-6 bg-slate-50 p-4 rounded-2xl">
            <label className="flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                name="featured"
                checked={form.featured}
                onChange={handleChange}
              />
              Featured Product
            </label>

            <div>
              <Label>Eco Score (0-100)</Label>
              <input
                type="number"
                name="sustainabilityScore"
                value={form.sustainabilityScore}
                onChange={handleChange}
                className="border rounded-xl p-2 w-40"
              />
            </div>
          </div>

          {/* TIER PRICING */}
          <div className="bg-slate-50 p-4 rounded-2xl">
            <div className="flex justify-between mb-3">
              <h3 className="font-semibold">Tier Pricing</h3>
              <button
                onClick={addTier}
                className="bg-black text-white px-3 py-1 rounded-lg text-sm"
              >
                + Add Tier
              </button>
            </div>

            {form.tierPricing.map((t, i) => (
              <div key={i} className="flex gap-2 mb-2">
                <Label>Minimum Quantity:</Label>
                <input
                  type="number"
                  value={t.minQty}
                  onChange={(e) => updateTier(i, "minQty", Number(e.target.value))}
                  className="border rounded-xl p-2 w-1/2"
                  placeholder="Min Quantity"
                />

                <Label>Price:</Label>
                <input
                  type="number"
                  value={t.price}
                  onChange={(e) => updateTier(i, "price", Number(e.target.value))}
                  className="border rounded-xl p-2 w-1/2"
                  placeholder="Price"
                />

                <button onClick={() => removeTier(i)} className="text-red-500">
                  ✕
                </button>
              </div>
            ))}
          </div>

          {/* IMAGES */}
          <div className="bg-slate-50 p-4 rounded-2xl">
            <h3 className="font-semibold mb-3">Product Images (Max 5)</h3>

            <Label>Image URL</Label>
            <div className="flex gap-2">
              <input
                value={imgInput}
                onChange={(e) => setImgInput(e.target.value)}
                placeholder="Paste image URL"
                className="border rounded-xl p-2 flex-1"
              />

              <button
                onClick={() => addImage()}
                className="bg-black text-white px-4 rounded-xl"
              >
                Add
              </button>
            </div>

            <Label>Upload Image</Label>
            <input
              type="file"
              accept="image/*"
              className="mt-2"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) handleUpload(file);
              }}
            />

            <div className="grid grid-cols-5 gap-2 mt-3">
              {form.images.map((img, i) => (
                <div key={i} className="relative">
                  <img src={img} className="h-16 w-16 object-cover rounded-lg" />
                  <button
                    onClick={() => removeImage(i)}
                    className="absolute -top-2 -right-2 bg-red-500 text-white w-5 h-5 rounded-full text-xs"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* FOOTER */}
        <div className="p-5 border-t flex justify-end gap-3 bg-white sticky bottom-0">
          <button onClick={onClose} className="px-5 py-2 border rounded-xl">
            Cancel
          </button>

          <button
            onClick={handleSubmit}
            className="px-6 py-2 bg-orange-500 text-white rounded-xl font-semibold"
          >
            Save Product
          </button>
        </div>

      </div>
    </div>
  );
}