import { createBrowserRouter } from "react-router";
import App from "@/App";
import GuestRoute from "@components/GuestRoute";
import PrivateRoute from "@components/PrivateRoute";
import Login from "@pages/Login";
import AuthCallback from "@pages/AuthCallback";

export const router = createBrowserRouter([
    {
        path: "/",
        element: (
            <PrivateRoute>
                <App />
            </PrivateRoute>
        ),
    },
    {
        path: "/login",
        element: (
            <GuestRoute>
                <Login />
            </GuestRoute>
        ),
    },
    {
        path: "/auth/callback",
        element: <AuthCallback />,
    },
]);
