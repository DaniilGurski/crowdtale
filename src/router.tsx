import { createBrowserRouter } from "react-router";
import App from "@/App";
import GuestRoute from "@components/guards/GuestRoute";
import PrivateRoute from "@components/guards/PrivateRoute";
import StoryGuard from "@components/guards/StoryGuard";
import AuthCallback from "@components/AuthCallback";
import Login from "@pages/Login";
import DiscoverPage from "@pages/DiscoverPage";
import MyLibraryPage from "@pages/MyLibraryPage";
import CreateStoryPage from "./pages/CreateStoryPage";
import WritingSpacePage from "./pages/WritingSpacePage";

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
