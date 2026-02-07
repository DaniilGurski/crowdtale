import { useUser } from "@hooks/useUser";
import { Navigate } from "react-router";
import { type PropsWithChildren } from "react";

interface GuestRouteProps extends PropsWithChildren {}

export default function GuestRoute({ children }: GuestRouteProps) {
    const [user, loading] = useUser();

    if (user !== null) {
        return <Navigate to="/" replace />;
    }

    if (loading) {
        return null;
    }

    return children;
}
