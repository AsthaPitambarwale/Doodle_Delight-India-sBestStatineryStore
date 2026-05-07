import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const BASE_URL = import.meta.env.VITE_BASE_URL || "http://localhost:5000";

export default function ResetPassword() {
  const { token } = useParams();

  const navigate = useNavigate();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
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

  const handleReset = async () => {
    if (!password || !confirmPassword) {
      showToast("Fill all fields" , "error");
      return;
    }

    if (password !== confirmPassword) {
      showToast("Passwords do not match", "error");
      return;
    }

    try {
      setLoading(true);

      const res = await fetch(`${BASE_URL}/auth/reset-password/${token}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ password }),
      });

      console.log(token);
      const data = await res.json();

      if (data.success) {
        showToast("Password updated successfully", "success");

        navigate("/");
      } else {
        showToast(data.message);
      }
    } catch (err) {
      console.log(err);
      showToast("Server error" , "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="bg-white w-full max-w-md rounded-3xl shadow-2xl p-6">
        <h1 className="text-3xl font-bold text-center mb-2">Reset Password</h1>

        <p className="text-gray-500 text-center mb-6">
          Enter your new password
        </p>

        <div className="space-y-4">
          <input
            type="password"
            placeholder="New Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-orange-500"
          />

          <input
            type="password"
            placeholder="Confirm New Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-orange-500"
          />

          <button
            onClick={handleReset}
            disabled={loading}
            className="w-full bg-gradient-to-r from-orange-500 to-red-500 text-white py-3 rounded-xl font-semibold hover:opacity-90"
          >
            {loading ? "Updating..." : "Update Password"}
          </button>
        </div>
      </div>
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
