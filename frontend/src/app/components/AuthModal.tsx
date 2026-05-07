import { X, Mail, Lock, User, Phone, Building, MapPin } from "lucide-react";
import { useState, useEffect } from "react";
import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../../firebase";
import { FcGoogle } from "react-icons/fc";

const BASE_URL = import.meta.env.VITE_BASE_URL;

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLogin: (
    email: string,
    password: string,
    userType: "retail" | "wholesale",
  ) => void;
  onSignup: (data: SignupData) => void;
}

export interface SignupData {
  name: string;
  email: string;
  password: string;
  phone: string;
  userType: "retail" | "wholesale";
  companyName?: string;
  gstNumber?: string;
  address?: string;
}

export function AuthModal({
  isOpen,
  onClose,
  onLogin,
  onSignup,
}: AuthModalProps) {
  const [mode, setMode] = useState<"login" | "signup">("login");
  const [userType, setUserType] = useState<"retail" | "wholesale">("retail");

  const [loginData, setLoginData] = useState({ email: "", password: "" });
  const [signupData, setSignupData] = useState<SignupData>({
    name: "",
    email: "",
    password: "",
    phone: "",
    userType: "retail",
    companyName: "",
    gstNumber: "",
    address: "",
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

  useEffect(() => {
    setSignupData((prev) => ({
      ...prev,
      userType,
    }));
  }, [userType]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin(loginData.email, loginData.password, userType);
  };

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();

    if (!signupData.name || !signupData.email || !signupData.password) {
      showToast("Please fill all required fields", "error");
      return;
    }

    console.log("Sending signup:", signupData);

    onSignup(signupData);
  };

  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, provider);

      const googleUser = result.user;

      const res = await fetch(`${BASE_URL}/auth/google-login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: googleUser.displayName,
          email: googleUser.email,
          image: googleUser.photoURL,
        }),
      });

      const data = await res.json();

      if (data.success) {
        localStorage.setItem("token", data.token);

        localStorage.setItem("user", JSON.stringify(data.user));

        window.location.reload();
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handlePasswordReset = async () => {
    if (!loginData.email.trim()) {
      showToast("Please enter your email first", "error");
      return;
    }

    try {
      const res = await fetch(`${BASE_URL}/auth/forgot-password`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: loginData.email.trim(),
        }),
      });

      const data = await res.json();

      if (data.success) {
        showToast("Password reset email sent", "success");
      } else {
        showToast(data.message || "Failed to send email", "error");
      }
    } catch (error) {
      console.log(error);
      showToast("Server error", "error");
    }
  };

  if (!isOpen) return null;

  return (
    <>
      <div
        className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 animate-in fade-in duration-200"
        onClick={onClose}
      />

      <div className="fixed inset-0 z-50 overflow-y-auto animate-in zoom-in duration-300">
        <div className="flex min-h-full items-center justify-center p-4">
          <div className="bg-white rounded-3xl shadow-2xl max-w-md w-full overflow-hidden">
            {/* Header */}
            <div className="bg-gradient-to-r from-orange-500 to-red-500 text-white p-6 relative">
              <button
                onClick={onClose}
                className="absolute top-4 right-4 p-2 hover:bg-white/20 rounded-full transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
              <h2 className="text-2xl font-bold mb-2">
                {mode === "login" ? "Welcome Back!" : "Create Account"}
              </h2>
              <p className="text-orange-100 text-sm">
                {mode === "login"
                  ? "Login to continue shopping"
                  : "Join us for exclusive deals"}
              </p>
            </div>

            {/* User Type Toggle */}
            <div className="p-6 pb-4">
              <div className="flex bg-gray-100 rounded-full p-1 gap-1 mb-6">
                <button
                  onClick={() => setUserType("retail")}
                  className={`flex-1 px-4 py-2.5 rounded-full font-semibold transition-all ${
                    userType === "retail"
                      ? "bg-orange-500 text-white shadow-md"
                      : "text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  Retail Customer
                </button>
                <button
                  onClick={() => setUserType("wholesale")}
                  className={`flex-1 px-4 py-2.5 rounded-full font-semibold transition-all ${
                    userType === "wholesale"
                      ? "bg-orange-500 text-white shadow-md"
                      : "text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  Wholesale
                </button>
              </div>

              {/* Login Form */}
              {mode === "login" && (
                <form onSubmit={handleLogin} className="space-y-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Email Address
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="email"
                        required
                        value={loginData.email}
                        onChange={(e) =>
                          setLoginData({ ...loginData, email: e.target.value })
                        }
                        className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-orange-500 transition-colors"
                        placeholder="your.email@example.com"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Password
                    </label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="password"
                        required
                        value={loginData.password}
                        onChange={(e) =>
                          setLoginData({
                            ...loginData,
                            password: e.target.value,
                          })
                        }
                        className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-orange-500 transition-colors"
                        placeholder="Enter your password"
                      />
                    </div>
                  </div>

                  <div className="flex justify-between items-center text-sm">
                    <label className="flex items-center gap-2">
                      <input type="checkbox" className="rounded" />
                      <span className="text-gray-600">Remember me</span>
                    </label>
                    <button
                      type="button"
                      onClick={handlePasswordReset}
                      className="text-orange-600 font-semibold hover:text-orange-700 transition-colors"
                    >
                      Forgot Password?
                    </button>
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-gradient-to-r from-orange-500 to-red-500 text-white py-3 px-4 rounded-xl hover:from-orange-600 hover:to-red-600 font-bold shadow-lg hover:shadow-xl transition-all transform active:scale-95"
                  >
                    Login to Account
                  </button>
                  <button
                    type="button"
                    onClick={handleGoogleLogin}
                    className="w-full flex items-center justify-center gap-3 border-2 border-gray-200 py-3 rounded-xl font-semibold hover:bg-gray-50 transition-all"
                  >
                    <FcGoogle className="text-2xl" />
                    Continue with Google
                  </button>
                </form>
              )}

              {/* Signup Form */}
              {mode === "signup" && (
                <form onSubmit={handleSignup} className="space-y-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Full Name
                    </label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="text"
                        required
                        value={signupData.name}
                        onChange={(e) =>
                          setSignupData({ ...signupData, name: e.target.value })
                        }
                        className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-orange-500 transition-colors"
                        placeholder="John Doe"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Email Address
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="email"
                        required
                        value={signupData.email}
                        onChange={(e) =>
                          setSignupData({
                            ...signupData,
                            email: e.target.value,
                          })
                        }
                        className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-orange-500 transition-colors"
                        placeholder="your.email@example.com"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Phone Number
                    </label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="tel"
                        required
                        value={signupData.phone}
                        onChange={(e) =>
                          setSignupData({
                            ...signupData,
                            phone: e.target.value,
                          })
                        }
                        className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-orange-500 transition-colors"
                        placeholder="+91 9876543210"
                      />
                    </div>
                  </div>

                  {userType === "wholesale" && (
                    <>
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          Company Name
                        </label>
                        <div className="relative">
                          <Building className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                          <input
                            type="text"
                            value={signupData.companyName}
                            onChange={(e) =>
                              setSignupData({
                                ...signupData,
                                companyName: e.target.value,
                              })
                            }
                            className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-orange-500 transition-colors"
                            placeholder="Your Company Pvt Ltd"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          GST Number (Optional)
                        </label>
                        <input
                          type="text"
                          value={signupData.gstNumber}
                          onChange={(e) =>
                            setSignupData({
                              ...signupData,
                              gstNumber: e.target.value,
                            })
                          }
                          className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-orange-500 transition-colors"
                          placeholder="22AAAAA0000A1Z5"
                        />
                      </div>
                    </>
                  )}

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Password
                    </label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="password"
                        required
                        value={signupData.password}
                        onChange={(e) =>
                          setSignupData({
                            ...signupData,
                            password: e.target.value,
                          })
                        }
                        className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-orange-500 transition-colors"
                        placeholder="Create a strong password"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-gradient-to-r from-orange-500 to-red-500 text-white py-3 px-4 rounded-xl hover:from-orange-600 hover:to-red-600 font-bold shadow-lg hover:shadow-xl transition-all transform active:scale-95"
                  >
                    Create Account
                  </button>
                </form>
              )}

              {/* Toggle between login/signup */}
              <div className="mt-6 text-center">
                <p className="text-gray-600">
                  {mode === "login"
                    ? "Don't have an account? "
                    : "Already have an account? "}
                  <button
                    onClick={() =>
                      setMode(mode === "login" ? "signup" : "login")
                    }
                    className="text-orange-600 font-bold hover:text-orange-700"
                  >
                    {mode === "login" ? "Sign Up" : "Login"}
                  </button>
                </p>
              </div>
            </div>
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
    </>
  );
}
