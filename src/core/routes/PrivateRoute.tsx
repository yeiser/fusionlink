import { Navigate } from "react-router";
import { useAuth } from "../../context/AuthContext";
import { JSX } from "react";
import Loader from "../../components/common/Loader";

export const PrivateRoute = ({ children }: { children: JSX.Element }) => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return <Loader fullScreen message="Espere un momento por favor..."/>;
  }

  if (!isAuthenticated) {
    
    return <Navigate to="/" replace />;
  }

  return children;
};