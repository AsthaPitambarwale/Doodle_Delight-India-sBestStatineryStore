import { useState } from "react";

export default function AdminLayout({ children, active, setActive }: any) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const navItems = [
    { key: "dashboard", label: "Dashboard" },
    { key: "products", label: "Products" },
    { key: "categories", label: "Categories" },
    { key: "orders", label: "Orders" },
    { key: "users", label: "Users" },
  ];

  return (
    <div className="flex flex-col md:flex-row h-screen bg-gray-50">
      {/* MOBILE TOPBAR */}
      <div className="md:hidden flex items-center justify-between px-4 h-14 bg-white border-b">
        <button
          className="p-2 rounded-md hover:bg-gray-100"
          onClick={() => setSidebarOpen(true)}
        >
          ☰
        </button>

        <h2 className="text-sm font-semibold capitalize">{active}</h2>

        <div className="w-8 h-8 rounded-full bg-gray-900 text-white flex items-center justify-center text-sm">
          A
        </div>
      </div>

      {/* OVERLAY */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/40 md:hidden z-40"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* SIDEBAR */}
      <aside
        className={`
          fixed md:static z-50
          h-full md:h-auto
          w-64 bg-white border-r shadow-sm flex flex-col
          transition-transform duration-300
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
        `}
      >
        {/* BRAND */}
        <div className="px-5 py-6 border-b flex justify-between items-center">
          <div>
            <h1 className="text-xl font-bold tracking-tight text-gray-800">
              Admin Panel
            </h1>
            <p className="text-xs text-gray-400 mt-1">Management Dashboard</p>
          </div>

          {/* close button (mobile only) */}
          <button
            className="md:hidden text-gray-600 text-xl"
            onClick={() => setSidebarOpen(false)}
          >
            ✕
          </button>
        </div>

        {/* NAV */}
        <nav className="flex-1 px-3 py-4 space-y-1">
          {navItems.map((item) => (
            <button
              key={item.key}
              onClick={() => {
                setActive(item.key);
                setSidebarOpen(false); // close on mobile after click
              }}
              className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm transition
                ${
                  active === item.key
                    ? "bg-gray-900 text-white shadow"
                    : "text-gray-600 hover:bg-gray-100"
                }`}
            >
              <span
                className={`w-2 h-2 rounded-full ${
                  active === item.key ? "bg-white" : "bg-gray-300"
                }`}
              />
              {item.label}
            </button>
          ))}
        </nav>

        {/* FOOTER */}
        <div className="p-4 border-t text-xs text-gray-400">
          v1.0 Admin System
        </div>
      </aside>

      {/* MAIN */}
      <main className="flex-1 flex flex-col overflow-hidden">
        {/* DESKTOP TOPBAR */}
        <header className="hidden md:flex h-16 bg-white border-b items-center justify-between px-6">
          <div className="flex items-center gap-3">
            <h2 className="text-lg font-semibold capitalize text-gray-800">
              {active}
            </h2>

            <span className="text-xs px-2 py-1 bg-gray-100 rounded-full text-gray-500">
              Live
            </span>
          </div>

          <div className="flex items-center gap-3">
            <div className="text-sm text-gray-500">Admin</div>

            <div className="w-9 h-9 rounded-full bg-gray-900 text-white flex items-center justify-center text-sm font-semibold">
              A
            </div>
          </div>
        </header>

        {/* CONTENT */}
        <div className="p-3 md:p-6 overflow-y-auto flex-1">{children}</div>
      </main>
    </div>
  );
}
