import { Outlet } from "react-router";
import { SidebarProvider } from "@components/ui/sidebar";
import AppSidebar from "@components/AppSidebar";
import { Toaster } from "react-hot-toast";

export default function App() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="relative w-full">
        <Outlet />
      </main>
      <Toaster
        toastOptions={{
          style: {
            background: "var(--card)",
          },
        }}
      />
    </SidebarProvider>
  );
}
