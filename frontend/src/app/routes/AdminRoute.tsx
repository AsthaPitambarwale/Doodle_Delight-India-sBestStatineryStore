import { Navigate } from "react-router-dom";

const AdminRoute = ({ user, children }: any) => {
  if (!user) return <Navigate to="/" replace />;
  if (user.role !== "admin") return <Navigate to="/" replace />;

  return children;
};

export default AdminRoute;