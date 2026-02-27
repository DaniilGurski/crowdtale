import type { StoryStatus } from "@T/index";
import { useIsParticipant } from "@hooks/useIsParticipant";
import { Button } from "@components/ui/button";
import WritingForm from "./WritingForm";

interface WritingSpaceActionProps {
  storyId?: string;
  userId?: string;
  status: StoryStatus;
}

export function WritingSpaceAction({
  storyId,
  userId,
  status,
}: WritingSpaceActionProps) {
  const { data: isParticipant } = useIsParticipant(storyId, userId);

  if (status === "waiting" && isParticipant) {
    return (
      <p className="bg-primary/30 py-4 text-center text-white">
        Waiting for more to join...
      </p>
    );
  }
  if (status === "active" && isParticipant) {
    return <WritingForm />;
  }
  if (status === "waiting" && !isParticipant) {
    return <Button> Join </Button>;
  }
}
