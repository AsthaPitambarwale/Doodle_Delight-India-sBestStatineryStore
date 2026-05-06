import { useState } from "react";
import AdminLayout from "./components/AdminLayout";

import Dashboard from "./pages/Dashboard";
import Products from "./pages/Products";
import Orders from "./pages/Orders";
import Users from "./pages/Users";
import Categories from "./pages/Categories";

export default function AdminApp() {
  const [active, setActive] = useState("dashboard");

  const renderPage = () => {
    switch (active) {
      case "products":
        return <Products />;

      case "orders":
        return <Orders />;

      case "users":
        return <Users />;

      case "categories":
        return <Categories />;

      default:
        return <Dashboard />;
    }
  };

  return (
    <AdminLayout active={active} setActive={setActive}>
      {renderPage()}
    </AdminLayout>
  );
}