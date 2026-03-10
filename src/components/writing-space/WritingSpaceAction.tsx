import type { StoryStatus } from "@T/index";
import { useIsParticipant } from "@hooks/useIsParticipant";
import { Button } from "@components/ui/button";
import WritingForm from "./WritingForm";
import { joinStory } from "@/services/api";
import { useQueryClient } from "@tanstack/react-query";
import { useParams } from "react-router";

interface WritingSpaceActionProps {
  userId?: string;
  status: StoryStatus;
}

export default function WritingSpaceAction({
  userId,
  status,
}: WritingSpaceActionProps) {
  const { id: storyId } = useParams();
  const { data: isParticipant } = useIsParticipant(storyId, userId);
  const client = useQueryClient();

  const handleJoin = async () => {
    if (!storyId) return;

    await joinStory(storyId);
    await client.invalidateQueries({ queryKey: ["turns", storyId] });
    await client.invalidateQueries({
      queryKey: ["is_participant", storyId, userId],
    });
  };

  if (status === "waiting" && isParticipant) {
    return (
      <p className="bg-primary/30 w-full py-4 text-center text-white">
        Waiting for more to join...
      </p>
    );
  }
  if (status === "active" && isParticipant) {
    return <WritingForm />;
  }
  if (status === "waiting" && !isParticipant) {
    return (
      <Button className="w-full py-6" onClick={handleJoin}>
        Join
      </Button>
    );
  }
}
