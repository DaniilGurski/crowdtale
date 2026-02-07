import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
} from "@/components/ui/sidebar";
import { LibraryBig } from "lucide-react";
import { NavLink } from "react-router";
import { cn } from "@/lib/utils";
import type { PropsWithChildren } from "react";
import LogoutButton from "@components/LogoutButton";

interface SidebarLinkProps extends PropsWithChildren {
  to: string;
}

export default function AppSidebar() {
  return (
    <Sidebar>
      <SidebarHeader>
        <h1 className="flex items-center gap-x-2">
          <LibraryBig /> Collab Write
        </h1>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <nav>
            <ul className="grid gap-y-2">
              <li>
                <SidebarLink to="/"> Discover </SidebarLink>
              </li>
              <li>
                <SidebarLink to="/my-library"> My library </SidebarLink>
              </li>
            </ul>
          </nav>
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
        cn("block rounded-sm p-2 shadow-sm", isActive && "bg-neutral-100")
      }
    >
      {children}
    </NavLink>
  );
}
