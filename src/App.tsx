import { Outlet } from "react-router";
import { SidebarProvider, SidebarTrigger } from "@components/ui/sidebar";
import AppSidebar from "@components/AppSidebar";

export default function App() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="relative flex w-full">
        <SidebarTrigger className="bg-sidebar h-full shadow-lg shadow-amber-950 md:hidden" />
        <Outlet />
      </main>
    </SidebarProvider>
  );
}
