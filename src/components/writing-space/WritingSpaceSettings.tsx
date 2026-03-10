import { useParams } from "react-router";
import { Controller, useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { z } from "zod";

import { Button } from "@components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@components/ui/card";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldLabel,
} from "@components/ui/field";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  InputGroupTextarea,
} from "@components/ui/input-group";
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
import { useStoryById, useSuspenseStoryById } from "@hooks/useStoryById";
import { updateStorySettings } from "@services/api";
import { formatDate } from "@lib/utils";

const openingTextSchema = z.object({
  openingText: z
    .string()
    .min(20, { message: "Opening text should be at least 20 characters long" }),
});

type OpeningTextFormFields = z.infer<typeof openingTextSchema>;

function OpeningTextForm({ defaultValue }: { defaultValue: string }) {
  const { id: storyId } = useParams();
  const queryClient = useQueryClient();

  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<OpeningTextFormFields>({
    resolver: zodResolver(openingTextSchema),
    defaultValues: {
      openingText: defaultValue,
    },
  });

  const onSubmit: SubmitHandler<OpeningTextFormFields> = async ({
    openingText,
  }) => {
    if (!storyId) return;

    await toast.promise(
      updateStorySettings(storyId, openingText),
      {
        loading: "Updating...",
        success: "Story settings updated !",
        error: (err: Error) => err.message,
      },
      {
        style: {
          minWidth: "15rem",
        },
      },
    );

    await queryClient.invalidateQueries({ queryKey: ["story", storyId] });
    await queryClient.invalidateQueries({ queryKey: ["turns", storyId] });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Opening Text</CardTitle>
        <CardDescription>
          Update the opening paragraph of your story.
        </CardDescription>
      </CardHeader>
      <form className="grid gap-y-4" onSubmit={handleSubmit(onSubmit)}>
        <CardContent>
          <Controller
            name="openingText"
            control={control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel className="sr-only" htmlFor={field.name}>
                  Opening Paragraph
                </FieldLabel>
                <InputGroup>
                  <InputGroupTextarea
                    {...field}
                    id={field.name}
                    rows={6}
                    className="min-h-24 resize-none wrap-anywhere"
                    aria-invalid={fieldState.invalid}
                    placeholder="Begin your story..."
                  />
                  <InputGroupAddon align="block-end">
                    <InputGroupText>
                      {field.value.trim().length} characters
                    </InputGroupText>
                  </InputGroupAddon>
                </InputGroup>
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
                <FieldDescription>
                  The opening paragraph sets the stage for your story (minimum
                  20 characters).
                </FieldDescription>
              </Field>
            )}
          />
        </CardContent>
        <CardFooter>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Saving..." : "Save Changes"}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}

function ParticipantsSection() {
  const { id: storyId } = useParams();
  const { user } = useUser();
  const { data: story, isPending, error } = useStoryById(storyId);
  const isCreator = user?.id === story?.creator_id;

  if (isPending) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Participants</CardTitle>
          <CardDescription>Loading...</CardDescription>
        </CardHeader>
      </Card>
    );
  }

  if (error) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Participants</CardTitle>
          <CardDescription className="text-destructive">
            {error.message}
          </CardDescription>
        </CardHeader>
      </Card>
    );
  }

  if (!story) {
    return null;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Participants</CardTitle>
        <CardDescription>
          {story.story_participants.length} participant
          {story.story_participants.length !== 1 ? "s" : ""} in this story.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ul className="grid gap-y-4">
          {story.story_participants.map((p) => (
            <li key={p.user_id}>
              <Item variant="outline">
                <ItemContent>
                  <ItemTitle>
                    {p.profiles.username}
                    {p.user_id === story.creator_id && (
                      <span className="text-muted-foreground text-xs font-normal">
                        (Creator)
                      </span>
                    )}
                  </ItemTitle>
                  <ItemDescription>
                    Joined: <span>{formatDate(p.joined_at!)}</span>
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
      </CardContent>
    </Card>
  );
}

function DangerZone({ isCreator }: { isCreator: boolean }) {
  return (
    <Card className="border-destructive/50">
      <CardHeader>
        <CardTitle className="text-destructive">Danger Zone</CardTitle>
        <CardDescription>
          {isCreator
            ? "Permanently delete this story. This action cannot be undone."
            : "Leave this story. This action cannot be undone."}
        </CardDescription>
      </CardHeader>
      <CardContent>
        {isCreator ? <DeleteStoryDialog /> : <LeaveStoryDialog />}
      </CardContent>
    </Card>
  );
}

export default function WritingSpaceSettings() {
  const { id: storyId } = useParams();
  const { user } = useUser();
  const { data: story, isPending } = useSuspenseStoryById(storyId);
  const { data: isParticipant } = useIsParticipant(storyId, user?.id);

  const isCreator = user?.id === story?.creator_id;

  if (isPending || !story) {
    return (
      <div className="mx-auto max-w-4xl space-y-6">
        <h1 className="text-2xl font-bold">Story Settings</h1>
        <p className="text-muted-foreground">Loading...</p>
      </div>
    );
  }

  return (
    <div className="mx-auto my-6 w-[90%] max-w-4xl space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Story Settings</h1>
        <p className="text-muted-foreground">
          Manage your story settings and participants.
        </p>
      </div>

      {/* TODO: In the future, check if there is only one turn, not the status */}
      {isCreator && story.status === "waiting" && (
        <OpeningTextForm defaultValue={story.opening_text} />
      )}

      <ParticipantsSection />

      {isParticipant && <DangerZone isCreator={isCreator} />}
    </div>
  );
}
