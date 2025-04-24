import { UserContext } from "./contexts/UserContext";
import { useContext } from "react";
import { Navigate } from "react-router";

export const ProtectedRoute = ({ children, allowedTo }) => {
  const { user, loading } = useContext(UserContext);
  if (!user && !loading) return <Navigate to="/auth/login"/>;
//   if (!loading && !allowedTo.includes(user?.role))
  return children;
};