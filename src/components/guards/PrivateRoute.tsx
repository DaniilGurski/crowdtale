import { useUser } from "@/hooks/useUser";
import { Navigate } from "react-router";
import { type PropsWithChildren } from "react";

export default function PrivateRoute({ children }: PropsWithChildren) {
  const { user, isLoading } = useUser();

  if (user === null) {
    return <Navigate to="/login" replace />;
  }

  if (isLoading) {
    return null;
  }

  return children;
}
