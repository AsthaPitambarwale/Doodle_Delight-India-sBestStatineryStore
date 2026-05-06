import { useEffect, useState } from "react";

const BASE_URL = import.meta.env.VITE_BASE_URL || "http://localhost:5000/api";

export function AddressManager({ user }: any) {
  const [addresses, setAddresses] = useState<any[]>([]);
  const [showForm, setShowForm] = useState(false);

  const [form, setForm] = useState({
    name: "",
    phone: "",
    address: "",
    city: "",
    pincode: "",
  });

  // 🔄 FETCH ADDRESSES
  useEffect(() => {
    if (!user?._id) return;

    fetch(`${BASE_URL}/address/${user._id}`)
      .then((res) => res.json())
      .then((data) => setAddresses(data))
      .catch((err) => console.error(err));
  }, [user]);

  // ➕ ADD ADDRESS
  const handleAddAddress = async () => {
    try {
      const res = await fetch(`${BASE_URL}/address`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...form,
          userId: user._id,
        }),
      });

      const data = await res.json();

      setAddresses((prev) => [...prev, data]);
      setShowForm(false);

      // reset form
      setForm({
        name: "",
        phone: "",
        address: "",
        city: "",
        pincode: "",
      });
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      {/* HEADER */}
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-bold text-lg">Saved Addresses</h3>
        <button
          onClick={() => setShowForm(true)}
          className="bg-orange-500 text-white px-4 py-2 rounded-lg font-semibold"
        >
          + Add New
        </button>
      </div>

      {/* FORM */}
      {showForm && (
        <div className="bg-gray-50 p-4 rounded-xl mb-4 space-y-3">
          <input
            placeholder="Full Name"
            value={form.name}
            onChange={(e) =>
              setForm({ ...form, name: e.target.value })
            }
            className="w-full border p-2 rounded"
          />
          <input
            placeholder="Phone"
            value={form.phone}
            onChange={(e) =>
              setForm({ ...form, phone: e.target.value })
            }
            className="w-full border p-2 rounded"
          />
          <input
            placeholder="Address"
            value={form.address}
            onChange={(e) =>
              setForm({ ...form, address: e.target.value })
            }
            className="w-full border p-2 rounded"
          />
          <input
            placeholder="City"
            value={form.city}
            onChange={(e) =>
              setForm({ ...form, city: e.target.value })
            }
            className="w-full border p-2 rounded"
          />
          <input
            placeholder="Pincode"
            value={form.pincode}
            onChange={(e) =>
              setForm({ ...form, pincode: e.target.value })
            }
            className="w-full border p-2 rounded"
          />

          <div className="flex gap-2">
            <button
              onClick={handleAddAddress}
              className="bg-green-500 text-white px-4 py-2 rounded"
            >
              Save
            </button>
            <button
              onClick={() => setShowForm(false)}
              className="border px-4 py-2 rounded"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* LIST */}
      {addresses.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500">No addresses found</p>
        </div>
      ) : (
        <div className="space-y-3">
          {addresses.map((a) => (
            <div
              key={a._id}
              className="border p-4 rounded-xl bg-white"
            >
              <p className="font-semibold">{a.name}</p>
              <p className="text-sm text-gray-600">{a.phone}</p>
              <p className="text-sm">{a.address}</p>
              <p className="text-sm">
                {a.city} - {a.pincode}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}