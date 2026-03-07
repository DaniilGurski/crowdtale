import { PencilLine } from "lucide-react";
import { Link } from "react-router";

// TODO: Replace with an actual logo
export default function Logo() {
  return (
    <Link to="/">
      <h1 className="flex items-center justify-start gap-x-2 text-xl">
        <PencilLine color="var(--primary)" />
        <span className="font-bold"> CrowdTale </span>
      </h1>
    </Link>
  );
}
