import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@components/ui/sidebar";
import { LibraryBig } from "lucide-react";
import { NavLink } from "react-router";
import { cn } from "@lib/utils";
import type { PropsWithChildren } from "react";
import LogoutButton from "@components/LogoutButton";

interface SidebarLinkProps extends PropsWithChildren {
  to: string;
}

export default function AppSidebar() {
  return (
    <Sidebar variant="floating">
      <SidebarHeader>
        <h1 className="flex items-center gap-x-2 text-2xl">
          <LibraryBig className="size-8" /> Collab Write
        </h1>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton asChild>
                <SidebarLink to="/"> Discover </SidebarLink>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton asChild>
                <SidebarLink to="/my-library"> My library </SidebarLink>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <LogoutButton />
      </SidebarFooter>
    </Sidebar>
  );
}

function SidebarLink({ to, children }: SidebarLinkProps) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        cn("block rounded-sm p-2 font-medium", isActive && "bg-ring/10")
      }
    >
      {children}
    </NavLink>
  );
}
