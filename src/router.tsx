import { createBrowserRouter } from "react-router";
import App from "@/App";
import GuestRoute from "@components/guards/GuestRoute";
import PrivateRoute from "@components/guards/PrivateRoute";
import AuthCallback from "@components/AuthCallback";
import WritingSpaceMain from "@components/writing-space/WritingSpaceMain";
import WritingSpaceSettings from "@components/writing-space/WritingSpaceSettings";
import LoginPage from "@/pages/LoginPage";
import DiscoverPage from "@pages/DiscoverPage";
import MyLibraryPage from "@pages/MyLibraryPage";
import CreateStoryPage from "./pages/CreateStoryPage";
import WritingSpacePage from "./pages/WritingSpacePage";
import ProfilePage from "@pages/ProfilePage";
import SignUpPage from "@pages/SignUpPage";

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
        children: [
          {
            index: true,
            element: <WritingSpaceMain />,
          },
          {
            path: "settings",
            element: <WritingSpaceSettings />,
          },
        ],
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
        <LoginPage />
      </GuestRoute>
    ),
  },
  {
    path: "/sign-up",
    element: (
      <GuestRoute>
        <SignUpPage />
      </GuestRoute>
    ),
  },
  {
    path: "/auth/callback",
    element: <AuthCallback />,
  },
]);
