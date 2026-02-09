import { Outlet } from "react-router";
import { SidebarProvider, SidebarTrigger } from "@components/ui/sidebar";
import AppSidebar from "@components/AppSidebar";

export default function App() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="relative w-full">
        <Outlet />
      </main>
    </SidebarProvider>
  );
}
