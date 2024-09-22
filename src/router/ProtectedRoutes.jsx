import useAuth from "../hooks/useAuth";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = () => {
  const isLoggedIn = useAuth();

  return isLoggedIn ? <Outlet /> : <Navigate to="auth/login" />;
};

export default ProtectedRoute;
