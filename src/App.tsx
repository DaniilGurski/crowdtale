import { Outlet } from "react-router";
import { SidebarProvider } from "@components/ui/sidebar";
import AppSidebar from "@components/AppSidebar";

export default function App() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="w-full">
        <Outlet />
      </main>
    </SidebarProvider>
  );
}
