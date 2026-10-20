import { Navigate, Outlet } from "react-router-dom";
import type { ReactNode } from "react";
import type { User } from "../service/authService";

type ProtectedRouteProps = {
  user: User | null;
  children?: ReactNode;
};

function ProtectedRoute({ user, children }: ProtectedRouteProps) {
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return children ? <>{children}</> : <Outlet />;
}

export default ProtectedRoute;