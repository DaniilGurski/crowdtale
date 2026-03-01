import { useUser } from "@hooks/useUser";
import { Navigate } from "react-router";
import { type PropsWithChildren } from "react";

export default function GuestRoute({ children }: PropsWithChildren) {
  const { user, isLoading } = useUser();

  if (user !== null) {
    return <Navigate to="/" replace />;
  }

  if (isLoading) {
    return null;
  }

  return children;
}
