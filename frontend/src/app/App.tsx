import { useState, useEffect } from "react";
import { Header } from "./components/Header";
import { HeroBanner } from "./components/HeroBanner";
import { CategoryShowcase } from "./components/CategoryShowcase";
import { FeaturedBrands } from "./components/FeaturedBrands";
import { FeaturesSection } from "./components/FeaturesSection";
import { ProductGrid } from "./components/ProductGrid";
import { ShoppingCart } from "./components/ShoppingCart";
import { ProductDetail } from "./components/ProductDetail";
import { Footer } from "./components/Footer";
import { AuthModal, SignupData } from "./components/AuthModal";
import { MyAccount } from "./components/MyAccount";
import { FilterSort, FilterOptions } from "./components/FilterSort";
import { BulkOrderEngine } from "./components/BulkOrderEngine";
import { WishlistModal } from "./components/WishlistModal";
import { AllProductsPage } from "./components/AllProductsPage";
import CheckoutPage from "./components/CheckoutPage";
import { RetailMysteryBox } from "./components/RetailMysteryBox";
import { WholesaleMysteryBox } from "./components/WholesaleMysteryBox";
import InvoicePreview from "./components/InvoicePreview";
import { AboutUs } from "./pages/AboutUs";
import { ContactUs } from "./pages/ContactUs";
import { FAQs } from "./pages/FAQs";
import { BulkOrders } from "./pages/BulkOrders";
import { TrackOrder } from "./pages/TrackOrder";
import { Careers } from "./pages/Careers";
import { HelpCenter } from "./pages/HelpCenter";
import { ShippingInformation } from "./pages/ShippingPolicy";
import { ReturnsPolicy } from "./pages/ReturnsPolicy";
import { PaymentMethods } from "./pages/PaymentMethods";
import { PrivacyPolicy } from "./pages/PrivacyPolicy";
import { TermsOfService } from "./pages/Terms";
import { Sitemap } from "./pages/SiteMap";
import { Routes, Route } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import AdminRoute from "./routes/AdminRoute";
import AdminApp from "../admin/AdminApp";
import ResetPassword from "../app/pages/ResetPassword";

const BASE_URL = import.meta.env.VITE_BASE_URL || "http://localhost:5000/api";

export default function App() {
  //AUTH
  const [user, setUser] = useState<any>(null);
  const [userType, setUserType] = useState<"retail" | "wholesale">("retail");

  //DATA
  const [products, setProducts] = useState<any[]>([]);
  const [showAllProducts, setShowAllProducts] = useState(false);
  const [categories, setCategories] = useState<any[]>([]);
  const [displayedProducts, setDisplayedProducts] = useState<any[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<any[]>([]);

  //FILTERING
  const [currentCategory, setCurrentCategory] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("featured");

  //CART
  const [cartItems, setCartItems] = useState<any[]>([]);
  const [wishlistItems, setWishlistItems] = useState<any[]>([]);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [openCartAfterAdd, setOpenCartAfterAdd] = useState(false);
  const [skipCartSync, setSkipCartSync] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [showCheckout, setShowCheckout] = useState(false);
  const [bulkCheckoutItems, setBulkCheckoutItems] = useState<any[]>([]);
  const [showBulkEngine, setShowBulkEngine] = useState(false);

  //UI STATE
  const [loading, setLoading] = useState(true);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isAccountOpen, setIsAccountOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [isProductDetailOpen, setIsProductDetailOpen] = useState(false);
  const [bulkOrderMode, setBulkOrderMode] = useState<
    "fast" | "repeat" | "split" | null
  >(null);
  const [currentPage, setCurrentPage] = useState<string | null>(null);
  const [trackOrderId, setTrackOrderId] = useState<string | null>(null);
  const [invoiceOrderId, setInvoiceOrderId] = useState<string | null>(null);
  const [notifications, setNotifications] = useState<any[]>([]);
  const [wishlistLoaded, setWishlistLoaded] = useState(false);
  const [orders, setOrders] = useState<any[]>([]);
  const [mysteryBoxOpen, setMysteryBoxOpen] = useState(false);
  const navigate = useNavigate();

  const [toast, setToast] = useState<{
    message: string;
    type: "success" | "error";
  } | null>(null);

  const renderPage = () => {
    switch (currentPage) {
      case "about":
        return <AboutUs />;
      case "contact":
        return <ContactUs />;
      case "faqs":
        return <FAQs />;
      case "track":
        if (!trackOrderId) {
          setCurrentPage(null);
          return null;
        }
        return <TrackOrder orderId={trackOrderId} />;
      case "bulk":
        return <BulkOrders />;
      case "careers":
        return <Careers />;
      case "help":
        return <HelpCenter />;
      case "shipping":
        return <ShippingInformation />;
      case "returns":
        return <ReturnsPolicy />;
      case "payment":
        return <PaymentMethods />;
      case "privacy":
        return <PrivacyPolicy />;
      case "terms":
        return <TermsOfService />;
      case "sitemap":
        return <Sitemap onNavigate={setCurrentPage} />;
      case "invoice":
        if (!invoiceOrderId) return null;
        return <InvoicePreview orderId={invoiceOrderId} />;

      default:
        return <div className="p-10">Page not found</div>;
    }
  };

  // LOAD DATA
  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      try {
        const [pRes, cRes] = await Promise.all([
          fetch(`${BASE_URL}/products`),
          fetch(`${BASE_URL}/categories`),
        ]);

        const pData = await pRes.json();
        const cData = await cRes.json();

        setProducts(pData);
        setDisplayedProducts(pData);
        setFilteredProducts(pData);
        setCategories(cData);
      } catch (err) {
        console.error(err);
      }
      setLoading(false);
    };

    loadData();
  }, []);

  useEffect(() => {
    const savedUser = localStorage.getItem("user");

    if (savedUser) {
      const parsed = JSON.parse(savedUser);
      setUser(parsed);
      setUserType(parsed.userType);
    }
  }, []);

  // SEARCH + CATEGORY
  useEffect(() => {
    const fetchData = async () => {
      try {
        if (searchQuery.trim()) {
          const res = await fetch(
            `${BASE_URL}/products/search?q=${searchQuery}`,
          );
          const data = await res.json();
          setDisplayedProducts(data);
          setFilteredProducts(data);
          setCurrentCategory(null);
        } else if (currentCategory) {
          const res = await fetch(
            `${BASE_URL}/products?category=${currentCategory}`,
          );
          const data = await res.json();
          setDisplayedProducts(data);
          setFilteredProducts(data);
        } else {
          setDisplayedProducts(products);
          setFilteredProducts(products);
        }
      } catch (err) {
        console.error(err);
      }
    };

    fetchData();
  }, [searchQuery, currentCategory, products]);

  const handleFilterChange = (filters: FilterOptions) => {
    let filtered = [...products];

    filtered = filtered.filter(
      (p) =>
        p.price >= filters.priceRange[0] && p.price <= filters.priceRange[1],
    );

    if (filters.brands.length > 0) {
      filtered = filtered.filter((p) => filters.brands.includes(p.brand));
    }

    if (filters.inStock) {
      filtered = filtered.filter((p) => p.stock > 0);
    }

    setFilteredProducts(filtered);
    setDisplayedProducts(filtered);
  };
  // SORT
  useEffect(() => {
    let sorted = [...filteredProducts];

    switch (sortBy) {
      case "price-low":
        sorted.sort(
          (a, b) =>
            (userType === "wholesale" ? a.wholesalePrice : a.price) -
            (userType === "wholesale" ? b.wholesalePrice : b.price),
        );
        break;
      case "price-high":
        sorted.sort(
          (a, b) =>
            (userType === "wholesale" ? b.wholesalePrice : b.price) -
            (userType === "wholesale" ? a.wholesalePrice : a.price),
        );
        break;
      case "name-asc":
        sorted.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "name-desc":
        sorted.sort((a, b) => b.name.localeCompare(a.name));
        break;
    }

    setDisplayedProducts(sorted);
  }, [sortBy, filteredProducts, userType]);

  const fetchOrders = async (userId: string) => {
    try {
      const res = await fetch(`${BASE_URL}/orders/${userId}`);

      const data = await res.json();
      setOrders(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Order fetch error", err);
    }
  };

  useEffect(() => {
    if (user?._id) {
      fetchOrders(user._id);
    }
  }, [user]);

  const refreshOrders = () => {
    if (user?._id) fetchOrders(user._id);
  };

  useEffect(() => {
    if (!orders.length) return;

    const total = orders.reduce((sum, o) => sum + (o.totalAmount || 0), 0);

    setUser((prev: any) => ({
      ...prev,
      totalSpent: total,
    }));
  }, [orders]);

  useEffect(() => {
    if (openCartAfterAdd) {
      setIsCartOpen(true);
      setOpenCartAfterAdd(false);
    }
  }, [openCartAfterAdd]);

  useEffect(() => {
    const fetchWishlist = async () => {
      if (!user?._id) return;

      try {
        const res = await fetch(`${BASE_URL}/wishlist/${user._id}`);
        const data = await res.json();

        setWishlistItems(data.items || []);
        setWishlistLoaded(true);
      } catch (err) {
        console.error(err);
      }
    };

    fetchWishlist();
  }, [user]);

  useEffect(() => {
    if (!user?._id || !wishlistLoaded) return;

    const saveWishlist = async () => {
      try {
        await fetch(`${BASE_URL}/wishlist/save`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userId: user._id,
            items: wishlistItems,
          }),
        });
      } catch (err) {
        console.error("Wishlist save failed", err);
      }
    };

    saveWishlist();
  }, [wishlistItems, wishlistLoaded, user]);

  //LOAD CART ON LOGIN
  useEffect(() => {
    const fetchCart = async () => {
      if (!user?._id) return;

      const res = await fetch(`${BASE_URL}/cart/${user._id}`);
      const data = await res.json();

      setCartItems(data.items || []);
    };

    fetchCart();
  }, [user]);

  useEffect(() => {
    const goCheckout = () => setIsCheckoutOpen(true);
    window.addEventListener("goToCheckout", goCheckout);

    return () => window.removeEventListener("goToCheckout", goCheckout);
  }, []);

  useEffect(() => {
    if (skipCartSync) {
      const timer = setTimeout(() => setSkipCartSync(false), 2000);
      return () => clearTimeout(timer);
    }
  }, [skipCartSync]);

  useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => setToast(null), 2500);
      return () => clearTimeout(timer);
    }
  }, [toast]);

  useEffect(() => {
    if (!user?._id) return;

    fetch(`${BASE_URL}/notifications/${user._id}`)
      .then((res) => res.json())
      .then(setNotifications);
  }, [user]);

  // AUTH (REAL)
  const handleLogin = async (
    email: string,
    password: string,
    type: "retail" | "wholesale",
  ) => {
    try {
      const res = await fetch(`${BASE_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, userType: type }),
      });

      const result = await res.json();

      // HANDLE FAILURES
      if (!res.ok) {
        if (res.status === 403) {
          setToast({
            message: result.message,
            type: "error",
          });

          setUserType(result.userType);
          return;
        }

        setToast({
          message: result.message || "Login failed",
          type: "error",
        });
        return;
      }

      // ROLE MISMATCH CHECK
      if (result.userType !== type) {
        setToast({
          message:
            result.userType === "wholesale"
              ? "This account is registered as WHOLESALE. Switching..."
              : "This account is registered as RETAIL. Switching...",
          type: "error",
        });

        setUserType(result.userType);
        return;
      }

      // SUCCESS LOGIN
      setUser(result);
      setUserType(result.userType);
      setIsAuthModalOpen(false);

      setToast({ message: "Login successful!", type: "success" });

      if (result.role === "admin") {
        navigate("/admin", { replace: true });
        return;
      }
    } catch (err) {
      console.error(err);
      setToast({ message: "Server error", type: "error" });
    }
  };

  const handleSignup = async (data: SignupData) => {
    try {
      if (!data) {
        console.error("Signup data is undefined");
        return;
      }

      const res = await fetch(`${BASE_URL}/auth/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await res.json();

      if (!res.ok) {
        setToast({ message: result.message || "Signup failed", type: "error" });
        return;
      }

      setUser(result);
      setUserType(result.userType);
      setIsAuthModalOpen(false);

      setToast({ message: "Account created successfully!", type: "success" });
    } catch (err) {
      console.error(err);
      alert("Server error");
    }
  };

  const handleLogout = () => {
    setUser(null);
    setCartItems([]);
    setWishlistItems([]);

    setCurrentPage(null);
    setTrackOrderId(null);
    setInvoiceOrderId(null);

    setIsAccountOpen(false);
    setIsCartOpen(false);
    setIsWishlistOpen(false);

    setToast({ message: "Logged out successfully", type: "success" });

    window.location.reload();
  };

  // CART
  const getId = (item: any) => item._id || item.productId;

  const handleAddToCart = (product: any) => {
    const normalized = {
      ...product,
      productId: product._id,

      image:
        product.image ||
        (Array.isArray(product.images) ? product.images[0] : ""),

      quantity: product.quantity || 1,
    };

    setCartItems((prev) => {
      const existing = prev.find((item) => getId(item) === getId(normalized));

      let updated;

      if (existing) {
        updated = prev.map((item) =>
          getId(item) === getId(normalized)
            ? {
              ...item,
              quantity: item.quantity + normalized.quantity,
            }
            : item,
        );
      } else {
        updated = [...prev, normalized];
      }

      syncCartToDB(updated);

      return updated;
    });
  };

  const syncCartToDB = async (items: any[]) => {
    if (!user?._id) return;
    if (skipCartSync) return;

    await fetch(`${BASE_URL}/cart/save`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        userId: user._id,
        items,
      }),
    });
  };

  const handleUpdateQuantity = (id: string, qty: number) => {
    if (qty < 1) return;

    setCartItems((prev) => {
      const updated = prev.map((i) =>
        getId(i) === id ? { ...i, quantity: qty } : i,
      );

      syncCartToDB(updated);

      return updated;
    });
  };

  const handleRemoveItem = (id: string) => {
    setCartItems((prev) => {
      const updated = prev.filter((i) => getId(i) !== id);

      syncCartToDB(updated);

      return updated;
    });
  };

  const handleRemoveFromWishlist = (product: any) => {
    setWishlistItems((prev) => prev.filter((i) => i._id !== product._id));
  };

  // WISHLIST
  const handleAddToWishlist = (product: any) => {
    setWishlistItems((prev) => {
      const exists = prev.find((i) => i._id === product._id);
      return exists
        ? prev.filter((i) => i._id !== product._id)
        : [...prev, product];
    });
  };

  const handleToggleWishlist = (product: any) => {
    setWishlistItems((prev) => {
      const exists = prev.find((i) => i._id === product._id);

      if (exists) {
        return prev.filter((i) => i._id !== product._id);
      }

      return [...prev, product];
    });
  };

  const handleClearCart = () => {
    setSkipCartSync(true);
    setCartItems([]);
  };

  const handleClearWishlist = () => {
    setWishlistItems([]);
  };

  const openBulkMode = (mode: "fast" | "repeat" | "split") => {
    if (!user) {
      setIsAuthModalOpen(true);
      return;
    }

    setBulkOrderMode(mode);
  };

  const handleBulkOrder = async (data: BulkOrderRequest) => {
    try {
      const payload = {
        ...data,
        orderType: data.orderType || "fast",
      };

      const res = await fetch(`${BASE_URL}/bulk-orders`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const result = await res.json();

      if (!res.ok) {
        setToast({
          message: result.message || "Failed to submit bulk order",
          type: "error",
        });
        return;
      }

      setBulkOrderMode(null);

      const msg =
        payload.orderType === "repeat"
          ? "Reorder request submitted!"
          : payload.orderType === "split"
            ? "Multi-address order submitted!"
            : "Bulk order submitted!";

      setToast({ message: msg, type: "success" });

    } catch (err) {
      console.error(err);
      setToast({ message: "Server error", type: "error" });
    }
  };

  // UPDATE PROFILE
  const handleUpdateProfile = async (data: any) => {
    try {
      const res = await fetch(`${BASE_URL}/users/update/${user._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await res.json();

      if (!res.ok) throw new Error(result.message);

      setUser(result.user);
      setToast({ message: "Profile updated!", type: "success" });
    } catch (err) {
      console.error(err);
      setToast({ message: "Profile update failed", type: "error" });
    }
  };

  // TRACK ORDER
  const handleTrackOrder = (id: string) => {
    setTrackOrderId(id);
    setCurrentPage("track");
  };

  // Open INVOICE
  const handleOpenInvoice = (id: string) => {
    setInvoiceOrderId(id);
    setCurrentPage("invoice");
  };

  // DOWNLOAD INVOICE
  const handleDownloadInvoice = async (orderId: string) => {
    try {
      const res = await fetch(`${BASE_URL}/orders/invoice/${orderId}`);

      if (!res.ok) {
        throw new Error("Failed to download invoice");
      }

      const contentType = res.headers.get("content-type");
      if (!contentType || !contentType.includes("application/pdf")) {
        throw new Error("Invalid PDF response");
      }

      const blob = await res.blob();

      if (blob.size === 0) {
        throw new Error("Empty PDF received");
      }

      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `invoice-${orderId}.pdf`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);
    } catch (err) {
      console.error("Invoice download failed", err);
    }
  };

  const isInWishlist = (id: string) => wishlistItems.some((i) => i._id === id);

  const cartCount = cartItems.reduce((sum, i) => sum + i.quantity, 0);

  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
            <div className="min-h-screen">
              {currentPage ? (
                <div className="min-h-screen bg-white">
                  <button
                    onClick={() => setCurrentPage(null)}
                    className="p-4 text-blue-500"
                  >
                    ← Back
                  </button>

                  {renderPage()}
                </div>
              ) : (
                <>
                  <Header
                    cartCount={cartCount}
                    wishlistCount={wishlistItems.length}
                    onCartClick={() => setIsCartOpen(true)}
                    onWishlistClick={() => setIsWishlistOpen(true)}
                    onAllProductsClick={() => setShowAllProducts(true)}
                    onAccountClick={() =>
                      user ? setIsAccountOpen(true) : setIsAuthModalOpen(true)
                    }
                    onSearchChange={setSearchQuery}
                    onCategoryClick={setCurrentCategory}
                    userType={userType}
                    onUserTypeChange={setUserType}
                    user={user}
                    onBulkOrderClick={() => setShowBulkEngine(true)}
                    notifications={notifications}
                  />

                  {showAllProducts ? (
                    <AllProductsPage
                      products={products}
                      userType={userType}
                      onAddToCart={handleAddToCart}
                      onViewDetails={(p) => {
                        if (!p) return;
                        setSelectedProduct(p);
                        setIsProductDetailOpen(true);
                      }}
                      onToggleWishlist={handleToggleWishlist}
                      isInWishlist={isInWishlist}
                      onBack={() => setShowAllProducts(false)}
                      currentSort={sortBy}
                      onSortChange={setSortBy}
                    />
                  ) : (
                    <main className="max-w-7xl mx-auto px-4 py-8">
                      {!currentCategory && !searchQuery && (
                        <>
                          <HeroBanner
                            user={user}
                            onRequireLogin={() => setIsAuthModalOpen(true)}
                            onCategorySelect={(cat) => setCurrentCategory(cat)}
                            onNavigate={setCurrentPage}
                            onOpenMysteryBox={() => setMysteryBoxOpen(true)}
                            onOpenBulkOrderFast={() => setShowBulkEngine(true)}
                            onOpenBulkOrderRepeat={() => setShowBulkEngine(true)}
                            onOpenBulkOrderSplit={() => setShowBulkEngine(true)}
                          />
                          <FeaturesSection />
                          <CategoryShowcase
                            categories={categories}
                            onCategoryClick={setCurrentCategory}
                            onViewAll={() => {
                              setShowAllProducts(true);
                              setCurrentCategory(null);
                              setSearchQuery("");
                            }}
                          />
                          <FeaturedBrands />
                        </>
                      )}

                      {loading ? (
                        <p>Loading...</p>
                      ) : (
                        <>
                          {(currentCategory || searchQuery) && (
                            <FilterSort
                              onFilterChange={handleFilterChange}
                              onSortChange={setSortBy}
                              currentSort={sortBy}
                            />
                          )}

                          <ProductGrid
                            products={displayedProducts}
                            userType={userType}
                            onAddToCart={(p) => {
                              handleAddToCart(p);
                              setToast({
                                message: `${p.name} added to cart`,
                                type: "success",
                              });
                            }}
                            onViewDetails={(p) => {
                              if (!p) return;
                              setSelectedProduct(p);
                              setIsProductDetailOpen(true);
                            }}
                            onToggleWishlist={handleAddToWishlist}
                            isInWishlist={isInWishlist}
                          />
                        </>
                      )}
                    </main>
                  )}

                  <Footer
                    onNavigate={(page) => {
                      setCurrentPage(page);
                      window.scrollTo({ top: 0, behavior: "smooth" });
                    }}
                  />

                  {/* MODALS */}
                  {mysteryBoxOpen && (
                    user?.userType === "wholesale" ? (
                      <WholesaleMysteryBox
                        products={products}
                        onClose={() => setMysteryBoxOpen(false)}
                        onAddToCart={handleAddToCart}
                      />
                    ) : (
                      <RetailMysteryBox
                        products={products}
                        onClose={() => setMysteryBoxOpen(false)}
                        onAddToCart={handleAddToCart}
                      />
                    )
                  )}

                  <WishlistModal
                    isOpen={isWishlistOpen}
                    onClose={() => setIsWishlistOpen(false)}
                    items={wishlistItems}
                    userType={userType}
                    onAddToCart={handleAddToCart}
                    onRemoveFromWishlist={handleRemoveFromWishlist}
                    onViewDetails={(p) => {
                      if (!p) return;
                      setSelectedProduct(p);
                      setIsProductDetailOpen(true);
                    }}
                    onClearWishlist={handleClearWishlist}
                  />

                  <ShoppingCart
                    isOpen={isCartOpen}
                    onClose={() => setIsCartOpen(false)}
                    items={cartItems}
                    userType={userType}
                    onUpdateQuantity={handleUpdateQuantity}
                    onRemoveItem={handleRemoveItem}
                    user={user}
                    onRequireLogin={() => setIsAuthModalOpen(true)}
                    // onClearCart={handleClearCart}
                    onCheckoutNavigate={() => {
                      setIsCartOpen(false);
                      setIsCheckoutOpen(true);
                    }}
                  />
                  {isCheckoutOpen && (
                    <CheckoutPage
                      items={cartItems}
                      user={user}
                      userType={userType}
                      onBack={() => setIsCheckoutOpen(false)}
                      onOrderPlaced={() => {
                        setCartItems([]);
                        setIsCheckoutOpen(false);

                        setToast({
                          message: "Order placed!",
                          type: "success",
                        });

                        if (user?._id) fetchOrders(user._id);
                      }}
                      onClose={() => setIsCheckoutOpen(false)}
                      onClearCart={handleClearCart}
                    />
                  )}
                  {/* BULK DIRECT CHECKOUT */}
                  {showCheckout && (
                    <CheckoutPage
                      items={bulkCheckoutItems}
                      user={user}
                      userType={userType}
                      onBack={() => setShowCheckout(false)}
                      onOrderPlaced={() => {
                        setBulkCheckoutItems([]);
                        setShowCheckout(false);

                        setToast({
                          message: "Bulk order placed!",
                          type: "success",
                        });

                        if (user?._id) fetchOrders(user._id);
                      }}
                      onClose={() => setShowCheckout(false)}
                      onClearCart={() => { }}
                    />
                  )}
                  <ProductDetail
                    product={selectedProduct || null}
                    isOpen={isProductDetailOpen}
                    onClose={() => setIsProductDetailOpen(false)}
                    userType={userType}
                    onAddToCart={(p) => {
                      handleAddToCart(p);
                      setOpenCartAfterAdd(true);
                    }}
                    onToggleWishlist={handleToggleWishlist}
                    isInWishlist={
                      selectedProduct
                        ? isInWishlist(selectedProduct._id)
                        : false
                    }
                  />

                  <AuthModal
                    isOpen={isAuthModalOpen}
                    onClose={() => setIsAuthModalOpen(false)}
                    onLogin={handleLogin}
                    onSignup={handleSignup}
                  />

                  <MyAccount
                    isOpen={isAccountOpen}
                    onClose={() => setIsAccountOpen(false)}
                    user={user}
                    orders={orders}
                    wishlistItems={wishlistItems}
                    onLogout={handleLogout}
                    onUpdateProfile={handleUpdateProfile}
                    onTrackOrder={handleTrackOrder}
                    onDownloadInvoice={handleDownloadInvoice}
                    onPreviewInvoice={handleOpenInvoice}
                    onRefreshOrders={() => user?._id && fetchOrders(user._id)}
                    defaultTab={accountTab}
                  />

                  {/* BULK ENGINE */}
                  {showBulkEngine && (
                    <BulkOrderEngine
                      mode="fast"
                      userId={user?._id}
                      onClose={() => setShowBulkEngine(false)}
                      onSubmit={(data: any) => {
                        setBulkCheckoutItems(
                          (data.items || []).map((item: any) => ({
                            ...item,

                            image:
                              item.image ||
                              (Array.isArray(item.images) && item.images.length > 0
                                ? item.images[0]
                                : "/placeholder.png"),
                          })),
                        );
                        setShowBulkEngine(false);
                        setShowCheckout(true);
                      }}
                    />
                  )}
                </>
              )}
            </div>
          }
        />
        {/* ADMIN PANEL */}
        <Route
          path="/admin"
          element={
            <AdminRoute user={user}>
              <AdminApp />
            </AdminRoute>
          }
        />
        <Route path="/reset-password/:token" element={<ResetPassword />} />
      </Routes>

      {toast && (
        <div className="fixed top-6 left-1/2 -translate-x-1/2 z-[100] bg-white shadow-2xl rounded-xl px-5 py-3 border flex items-center gap-4 animate-in fade-in slide-in-from-top">
          <div
            className={`font-semibold ${toast.type === "success" ? "text-green-600" : "text-red-600"
              }`}
          >
            {toast.type === "success" ? "✅" : "❌"} {toast.message}
          </div>

          <button
            onClick={() => setToast(null)}
            className="text-gray-500 hover:text-black"
          >
            ✖
          </button>
        </div>
      )}
    </>
  );
}
