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
import { deleteStoryById } from "@/services/api";
import { useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router";

export function DeleteStoryDialog() {
  const { id: storyId } = useParams();
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const handleClick = async () => {
    if (!storyId) return;

    await toast.promise(
      deleteStoryById(storyId),
      {
        loading: "Deleting...",
        success: "Story deleted successfully !",
        error: (err: Error) => err.message,
      },
      {
        style: {
          minWidth: "15rem",
        },
      },
    );

    await queryClient.invalidateQueries({ queryKey: ["library"] });
    navigate("/my-library");
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="destructive">Delete Story</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This story will be deleted from your
            and other libraries.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction variant="destructive" onClick={handleClick}>
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
