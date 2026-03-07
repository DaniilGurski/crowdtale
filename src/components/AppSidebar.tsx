import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@components/ui/sidebar";
import { CircleUser, Compass, SquareLibrary } from "lucide-react";
import { NavLink } from "react-router";
import { cn } from "@lib/utils";
import type { PropsWithChildren } from "react";
import Logo from "./Logo";

interface SidebarLinkProps extends PropsWithChildren {
  to: string;
}

export default function AppSidebar() {
  return (
    <Sidebar className="">
      <SidebarHeader>
        <Logo />
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton asChild>
                <SidebarLink to="/">
                  <Compass />
                  <span> Discover </span>
                </SidebarLink>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton asChild>
                <SidebarLink to="/my-library">
                  <SquareLibrary />
                  <span> My library </span>
                </SidebarLink>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton asChild>
                <SidebarLink to="/profile">
                  <CircleUser />
                  <span> Profile </span>
                </SidebarLink>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}

function SidebarLink({ to, children }: SidebarLinkProps) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        cn(
          "flex items-center gap-x-2 rounded-lg p-2 font-medium",
          isActive && "bg-ring/10",
        )
      }
    >
      {children}
    </NavLink>
  );
}
