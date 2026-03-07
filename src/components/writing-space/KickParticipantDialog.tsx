import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { deleteParticipantById } from "@/services/api";
import { useQueryClient } from "@tanstack/react-query";
import { useParams } from "react-router";

interface KickParticipantDialogProps {
  userId: string;
}

export function KickParticipantDialog({ userId }: KickParticipantDialogProps) {
  const { id: storyId } = useParams();
  const queryClient = useQueryClient();

  const handleClick = async () => {
    if (!storyId) return;

    await deleteParticipantById(storyId, userId);
    await queryClient.invalidateQueries({ queryKey: ["story", storyId] });
    await queryClient.invalidateQueries({ queryKey: ["turns", storyId] });
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="destructive">Kick</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This participant will be removed, but
            their turns will be saved.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction variant="destructive" onClick={handleClick}>
            Kick
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
