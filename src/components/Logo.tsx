import { PencilLine } from "lucide-react";
import { Link } from "react-router";

// TODO: Replace with an actual logo
export default function Logo() {
  return (
    <Link to="/">
      <h1 className="flex items-center justify-center gap-x-2 text-xl sm:justify-start">
        <PencilLine color="var(--primary)" />
        <span className="hidden font-bold sm:inline"> Collab Write </span>
      </h1>
    </Link>
  );
}
