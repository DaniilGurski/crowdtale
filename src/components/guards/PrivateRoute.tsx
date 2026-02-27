import { useUser } from "@/hooks/useUser";
import { Navigate } from "react-router";
import { type PropsWithChildren } from "react";

interface PrivateRouteProps extends PropsWithChildren {}

export default function PrivateRoute({ children }: PrivateRouteProps) {
  const { user, isLoading } = useUser();

  if (user === null) {
    return <Navigate to="/login" replace />;
  }

  if (isLoading) {
    return null;
  }

  return children;
}
