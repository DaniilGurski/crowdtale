import { SquareLibrary } from "lucide-react";
import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@components/ui/empty";

interface LibraryListEmptyProps {
  message: string;
}

export default function LibraryListEmpty({ message }: LibraryListEmptyProps) {
  return (
    <Empty className="bg-card col-span-full rounded-lg shadow-sm">
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <SquareLibrary />
        </EmptyMedia>
        <EmptyTitle>No stories yet</EmptyTitle>
        <EmptyDescription>{message}</EmptyDescription>
      </EmptyHeader>
    </Empty>
  );
}
