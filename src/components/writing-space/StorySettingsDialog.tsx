import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@components/ui/dialog";
import { Button } from "@components/ui/button";
import { Settings } from "lucide-react";
import { useParams } from "react-router";
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemTitle,
} from "@components/ui/item";
import { KickParticipantDialog } from "@components/writing-space/KickParticipantDialog";
import { DeleteStoryDialog } from "@components/writing-space/DeleteStoryDialog";
import { LeaveStoryDialog } from "@components/writing-space/LeaveStoryDialog";
import { useUser } from "@hooks/useUser";
import { useIsParticipant } from "@hooks/useIsParticipant";
import { useStoryById } from "@hooks/useStoryById";
import { formatDate } from "@/lib/utils";
import { format } from "date-fns";

export default function StorySettingsDialog() {
  const { id: storyId } = useParams();
  const { data: story } = useStoryById(storyId);
  const { user } = useUser();
  const { data: isParticipant } = useIsParticipant(storyId, user?.id);
  const isCreator = user?.id === story?.creator_id;

  if (story === undefined) {
    return null;
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost">
          <span className="sr-only">Settings</span>
          <Settings />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Story Settings</DialogTitle>
        </DialogHeader>
        <div className="grid gap-y-4">
          <h2 className="font-medium"> Participants: </h2>
          <StoryParticipantList />
        </div>

        <div className="grid gap-y-4">
          <h2 className="font-medium"> Deadline: </h2>
          {story.deadline ? format(story.deadline, "PPP") : "No deadline set"}
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="secondary"> Close </Button>
          </DialogClose>
          {isCreator && <DeleteStoryDialog />}
          {isParticipant && !isCreator && <LeaveStoryDialog />}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

function StoryParticipantList() {
  const { id: storyId } = useParams();
  const { user } = useUser();
  const { data: story, isPending, error } = useStoryById(storyId);
  const isCreator = user?.id === story?.creator_id;

  if (isPending) {
    return <p> Loading... </p>;
  }

  if (error) {
    return <p> {error.message} </p>;
  }

  if (!story) {
    return null;
  }

  return (
    <ul className="grid gap-y-4">
      {story.story_participants.map((p) => (
        <li key={p.user_id}>
          <Item variant="outline">
            <ItemContent>
              <ItemTitle> {p.profiles.username} </ItemTitle>
              <ItemDescription>
                Joined:
                <span> {formatDate(p.joined_at!)} </span>
              </ItemDescription>
            </ItemContent>
            <ItemActions>
              {isCreator && p.user_id !== user?.id && (
                <KickParticipantDialog userId={p.user_id} />
              )}
            </ItemActions>
          </Item>
        </li>
      ))}
    </ul>
  );
}
