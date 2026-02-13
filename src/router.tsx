import { createBrowserRouter } from "react-router";
import App from "@/App";
import GuestRoute from "@components/guards/GuestRoute";
import PrivateRoute from "@components/guards/PrivateRoute";
import Login from "@pages/Login";
import AuthCallback from "@pages/AuthCallback";
import DiscoverPage from "@pages/DiscoverPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <PrivateRoute>
        <App />
      </PrivateRoute>
    ),

    children: [
      {
        index: true,
        element: <DiscoverPage />,
      },
      {
        path: "/my-library",
        element: <p> My library Page </p>,
      },
    ],
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
