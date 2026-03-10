import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router";
import { Toaster } from "react-hot-toast";
import { router } from "@/router.tsx";
import "@/style.css";

export const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
      <Toaster
        toastOptions={{
          style: {
            background: "var(--card)",
          },
        }}
      />
    </QueryClientProvider>
  </StrictMode>,
);
