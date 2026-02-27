import { useUser } from "@hooks/useUser";
import { Navigate } from "react-router";
import { type PropsWithChildren } from "react";

interface GuestRouteProps extends PropsWithChildren {}

export default function GuestRoute({ children }: GuestRouteProps) {
  const { user, isLoading } = useUser();

  if (user !== null) {
    return <Navigate to="/" replace />;
  }

  if (isLoading) {
    return null;
  }

  return children;
}
