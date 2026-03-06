import { useUser } from "@hooks/useUser";
import { Navigate } from "react-router";
import { type PropsWithChildren } from "react";

export default function GuestRoute({ children }: PropsWithChildren) {
  const { user, isPending } = useUser();

  if (user !== null) {
    return <Navigate to="/" replace />;
  }

  // Prevents flickering
  if (isPending) {
    return null;
  }

  return children;
}
