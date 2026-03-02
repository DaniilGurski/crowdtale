import { useUser } from "@/hooks/useUser";
import { Navigate } from "react-router";
import { type PropsWithChildren } from "react";

export default function PrivateRoute({ children }: PropsWithChildren) {
  const { user, isPending } = useUser();

  if (user === null) {
    return <Navigate to="/login" replace />;
  }

  // Prevents flickering
  if (isPending) {
    return null;
  }

  return children;
}
