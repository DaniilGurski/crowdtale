import { Button } from "@components/ui/button";
import { ChevronLeft } from "lucide-react";
import { useLocation, useNavigate } from "react-router";

export default function NavigationHeader() {
  const navigate = useNavigate();
  const location = useLocation();
  const from = location?.state?.from.pathname || "/";

  return (
    <header className="bg-card mb-4 flex items-center justify-between rounded-b-4xl p-4 shadow-sm">
      <Button variant="ghost" onClick={() => navigate(from)}>
        <span className="sr-only"> Go back </span>
        <ChevronLeft />
      </Button>
    </header>
  );
}
