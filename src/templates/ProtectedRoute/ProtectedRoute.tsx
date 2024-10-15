import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../../lib/hooks/useAuth";

export default function ProtectedRoute({ children }: React.PropsWithChildren) {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/auth/sign-in" />;
  }
  return <>{children}</>;
}
