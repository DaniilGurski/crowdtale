import { useUser } from "@/hooks/useUser";
import { Navigate } from "react-router";
import { type PropsWithChildren } from "react";

interface PrivateRouteProps extends PropsWithChildren {}

export default function PrivateRoute({ children }: PrivateRouteProps) {
  const [user, loading] = useUser();

  if (user === null) {
    return <Navigate to="/login" replace />;
  }

  if (loading) {
    return null;
  }

  return children;
}
