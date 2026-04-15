import React from "react";
import { Navigate } from "react-router-dom";
import { TipoUsuario } from "../types/Usuario";
import { useAuth } from "../context/AuthContext";

type ProtectedRouteProps = {
  children: React.ReactElement;
  allowedRoles?: TipoUsuario[];
};

export function ProtectedRoute({ children, allowedRoles }: ProtectedRouteProps): React.ReactElement {
  const auth = useAuth();

  if (!auth.isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles && !auth.hasRole(allowedRoles)) {
    return <Navigate to="/" replace />;
  }

  return children;
}
