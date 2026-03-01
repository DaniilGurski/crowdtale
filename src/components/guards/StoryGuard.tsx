import { type PropsWithChildren } from "react";
import { useParams } from "react-router";
import { useUser } from "@/hooks/useUser";
import { useIsParticipant } from "@/hooks/useIsParticipant";
import { useTurnsById } from "@/hooks/useTurnsById";
import { Spinner } from "@components/ui/spinner";

// This prevents unsubscribed users from viewing active stories as an additional layer of security.
export default function StoryGuard({ children }: PropsWithChildren) {
  const { id: storyId } = useParams();
  const { user, isLoading: userLoading } = useUser();
  const { storyInfo, isPending: turnsPending } = useTurnsById(storyId);
  const { data: isParticipant, isPending: participantPending } =
    useIsParticipant(storyId, user?.id);

  if (userLoading || turnsPending || participantPending) {
    return (
      <div className="flex justify-center">
        <Spinner />
      </div>
    );
  }

  if (storyInfo?.status === "active" && !isParticipant) {
    return <p>You don't have permission to view this story!</p>;
  }

  return children;
}
