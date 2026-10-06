import { Navigate } from "react-router-dom";
import type { ReactNode } from "react";
import { isAuthenticated, isAdmin } from "../service/authService";

type AdminRouteProps = {
  children: ReactNode;
};

function AdminRoute({ children }: AdminRouteProps) {
  if (!isAuthenticated()) {
    return <Navigate to="/login" replace />;
  }

  if (!isAdmin()) {
    return <div>Åtkomst nekad. Du måste vara administratör för att se denna sida.</div>;
  }

  return <>{children}</>;
}

export default AdminRoute;
