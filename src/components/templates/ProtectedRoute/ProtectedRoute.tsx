import { PropsWithChildren } from "react";
import { useAuth } from "../../../context/AuthContext";
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children }: PropsWithChildren) {
  const { isAuthenticated } = useAuth();
  console.log(isAuthenticated);

  if (!isAuthenticated) {
    return <Navigate to="/auth" />;
  }
  return <>{children}</>;
}
