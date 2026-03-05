import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "../ui/button";
import { Settings } from "lucide-react";
import { useParams } from "react-router";
import { useStoryById } from "@/hooks/useStoryById";
import type { StoryParticipantWithProfiles } from "@/types";
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemTitle,
} from "../ui/item";
import { KickParticipantDialog } from "./KickParticipantDialog";
import { DeleteStoryDialog } from "./DeleteStoryDialog";

interface StoryParticipantListProps {
  storyParticipants: StoryParticipantWithProfiles[];
}

export default function StorySettingsDialog() {
  const { id: storyId } = useParams();
  const { data: story } = useStoryById(storyId);

  // 1. Get all participants for a story
  // 2. If you are story creator, you can delete others and delete story
  // 3. If you are just a participant, you can leave a story

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
          <h2 className="font-medium"> Participants </h2>
          <StoryParticipantList />
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="secondary"> Close </Button>
          </DialogClose>
          <DeleteStoryDialog />
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

function StoryParticipantList() {
  const { id: storyId } = useParams();
  const { data: story, isPending, error } = useStoryById(storyId);

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
              <ItemDescription>Join date: {p.joined_at}</ItemDescription>
            </ItemContent>
            <ItemActions>
              <KickParticipantDialog />
            </ItemActions>
          </Item>
        </li>
      ))}
    </ul>
  );
}
