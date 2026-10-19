import { Navigate, Outlet } from "react-router-dom";
import type { ReactNode } from "react";
import type { User } from "../service/authService";

type AdminRouteProps = {
  user: User | null;
  children?: ReactNode;
};

function AdminRoute({ user, children }: AdminRouteProps) {
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  const isAdmin = user.roles.some(
    (role) => role === "ADMIN" || role === "ROLE_ADMIN",
  );

  if (!isAdmin) {
    return <div>Åtkomst nekad. Du måste vara administratör för att se denna sida.</div>;
  }

  return children ? <>{children}</> : <Outlet />;
}

export default AdminRoute;
