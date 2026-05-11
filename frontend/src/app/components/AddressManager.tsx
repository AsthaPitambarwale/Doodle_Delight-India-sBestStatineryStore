import { useEffect, useState } from "react";
import { MapPin, Plus, CheckCircle2, Trash2, Home } from "lucide-react";

const BASE_URL = import.meta.env.VITE_BASE_URL || "http://localhost:5000/api";

interface AddressManagerProps {
  user: any;
  selectedAddress?: any;
  onSelectAddress?: (address: any) => void;
}

export function AddressManager({
  user,
  selectedAddress,
  onSelectAddress,
}: AddressManagerProps) {
  const [addresses, setAddresses] = useState<any[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(true);

  const [form, setForm] = useState({
    name: "",
    phone: "",
    address: "",
    city: "",
    pincode: "",
  });

  // FETCH ONLY ONCE
  useEffect(() => {
    if (!user?._id) return;

    let mounted = true;

    const fetchAddresses = async () => {
      try {
        setLoading(true);

        const res = await fetch(`${BASE_URL}/address/${user._id}`);
        const data = await res.json();

        if (mounted) {
          setAddresses(Array.isArray(data) ? data : []);
        }
      } catch (err) {
        console.error(err);
      } finally {
        if (mounted) setLoading(false);
      }
    };

    fetchAddresses();

    return () => {
      mounted = false;
    };
  }, [user?._id]);

  // ADD ADDRESS
  const handleAddAddress = async () => {
    if (
      !form.name ||
      !form.phone ||
      !form.address ||
      !form.city ||
      !form.pincode
    ) {
      return;
    }

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

      // STABLE UPDATE
      setAddresses((prev) => [...prev, data]);

      setShowForm(false);

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

  // DELETE ADDRESS
  const handleDelete = async (id: string) => {
    try {
      await fetch(`${BASE_URL}/address/${id}`, {
        method: "DELETE",
      });

      setAddresses((prev) => prev.filter((a) => a._id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="space-y-5">
      {/* HEADER */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-gray-800">Saved Addresses</h2>
          <p className="text-sm text-gray-500">Select delivery location</p>
        </div>

        <button
          onClick={() => setShowForm(!showForm)}
          className="flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-xl font-semibold transition"
        >
          <Plus className="w-4 h-4" />
          Add Address
        </button>
      </div>

      {/* FORM */}
      {showForm && (
        <div className="bg-white border rounded-2xl p-5 shadow-sm space-y-3">
          <div className="grid md:grid-cols-2 gap-3">
            <input
              placeholder="Full Name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="border rounded-xl p-3 outline-none focus:ring-2 focus:ring-orange-400"
            />

            <input
              placeholder="Phone Number"
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
              className="border rounded-xl p-3 outline-none focus:ring-2 focus:ring-orange-400"
            />
          </div>

          <textarea
            placeholder="Full Address"
            value={form.address}
            onChange={(e) => setForm({ ...form, address: e.target.value })}
            className="w-full border rounded-xl p-3 outline-none focus:ring-2 focus:ring-orange-400"
          />

          <div className="grid md:grid-cols-2 gap-3">
            <input
              placeholder="City"
              value={form.city}
              onChange={(e) => setForm({ ...form, city: e.target.value })}
              className="border rounded-xl p-3 outline-none focus:ring-2 focus:ring-orange-400"
            />

            <input
              placeholder="Pincode"
              value={form.pincode}
              onChange={(e) => setForm({ ...form, pincode: e.target.value })}
              className="border rounded-xl p-3 outline-none focus:ring-2 focus:ring-orange-400"
            />
          </div>

          <div className="flex gap-3 pt-2">
            <button
              onClick={handleAddAddress}
              className="bg-green-500 hover:bg-green-600 text-white px-5 py-2 rounded-xl font-semibold"
            >
              Save Address
            </button>

            <button
              onClick={() => setShowForm(false)}
              className="border px-5 py-2 rounded-xl"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* LOADING */}
      {loading ? (
        <div className="text-center py-10 text-gray-500">
          Loading addresses...
        </div>
      ) : addresses.length === 0 ? (
        <div className="bg-gray-50 border rounded-2xl p-10 text-center">
          <Home className="w-12 h-12 mx-auto text-gray-300 mb-3" />
          <p className="text-gray-500">No saved addresses</p>
        </div>
      ) : (
        <div className="grid gap-4">
          {addresses.map((a) => {
            const isSelected = selectedAddress?._id === a._id;

            return (
              <div
                key={a._id}
                onClick={() => onSelectAddress?.(a)}
                className={`border rounded-2xl p-5 cursor-pointer transition-all relative
                  ${
                    isSelected
                      ? "border-green-500 bg-green-50 shadow-md"
                      : "hover:border-orange-300 bg-white"
                  }`}
              >
                {/* SELECT BADGE */}
                {isSelected && (
                  <div className="absolute top-4 right-4 text-green-600">
                    <CheckCircle2 className="w-5 h-5" />
                  </div>
                )}

                <div className="flex justify-between gap-4">
                  <div className="flex gap-3">
                    <MapPin className="w-5 h-5 text-orange-500 mt-1" />

                    <div>
                      <h3 className="font-bold text-gray-800">{a.name}</h3>

                      <p className="text-sm text-gray-500">{a.phone}</p>

                      <p className="text-sm mt-2 text-gray-700">{a.address}</p>

                      <p className="text-sm text-gray-700">
                        {a.city} - {a.pincode}
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDelete(a._id);
                    }}
                    className="text-red-500 hover:bg-red-50 p-2 rounded-lg h-fit"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
