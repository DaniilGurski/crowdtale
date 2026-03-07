import { createBrowserRouter } from "react-router";
import App from "@/App";
import GuestRoute from "@components/guards/GuestRoute";
import PrivateRoute from "@components/guards/PrivateRoute";
import AuthCallback from "@components/AuthCallback";
import Login from "@pages/Login";
import DiscoverPage from "@pages/DiscoverPage";
import MyLibraryPage from "@pages/MyLibraryPage";
import CreateStoryPage from "./pages/CreateStoryPage";
import WritingSpacePage from "./pages/WritingSpacePage";
import ProfilePage from "./pages/ProfilePage";

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
        path: "/stories/:id",
        element: <WritingSpacePage />,
      },
      {
        path: "/my-library",
        element: <MyLibraryPage />,
      },
      {
        path: "/create-story",
        element: <CreateStoryPage />,
      },
      {
        path: "/profile",
        element: <ProfilePage />,
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
