import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm, type SubmitHandler } from "react-hook-form";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
  CardContent,
} from "@components/ui/card";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldLabel,
} from "@components/ui/field";
import { Button } from "@components/ui/button";
import { Input } from "@components/ui/input";
import { DatePicker } from "@components/DatePicker";
import { ToggleGroup, ToggleGroupItem } from "@components/ui/toggle-group";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  InputGroupTextarea,
} from "@components/ui/input-group";
import { addNewStory, getAllGenres } from "@services/api";
import { useQueryClient, useSuspenseQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import toast from "react-hot-toast";

const schema = z.object({
  title: z.string().nonempty({ error: "Story title can not be empty" }),
  genres: z.array(z.string()).min(1, { error: "Select at least one genre" }),
  openingText: z
    .string()
    .min(20, { error: "Opening text should be at least 50 characters long" }),
  deadlineDate: z.string().optional(),
});

type CreateStoryFormFields = z.infer<typeof schema>;

export default function CreateStoryForm() {
  const { handleSubmit, control } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      title: "",
      genres: [],
      openingText: "",
      deadlineDate: "",
    },
  });

  const { data: genres } = useSuspenseQuery({
    queryFn: getAllGenres,
    queryKey: ["genres"],
  });

  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const onSubmit: SubmitHandler<CreateStoryFormFields> = async ({
    title,
    genres,
    openingText,
    deadlineDate,
  }) => {
    const postStory = addNewStory({
      title,
      genres,
      openingText,
      deadlineDate,
    });

    await toast.promise(
      postStory,
      {
        loading: "Creating...",
        success: "New story created !",
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
    <Card>
      <CardHeader>
        <CardTitle className="text-2xl font-bold">Create a New Story</CardTitle>
        <CardDescription>
          Set the stage for your collaborative tale. Another writer will join
          you.
        </CardDescription>
      </CardHeader>

      <CardContent>
        <form
          className="grid gap-y-6"
          id="create-story-form"
          onSubmit={handleSubmit(onSubmit)}
        >
          <Controller
            name="title"
            control={control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel
                  className="after:text-primary after:content-['*']"
                  htmlFor={field.name}
                >
                  Story Title
                </FieldLabel>
                <Input
                  {...field}
                  id={field.name}
                  aria-invalid={fieldState.invalid}
                  autoComplete="off"
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
          <Controller
            name="genres"
            control={control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel
                  className="after:text-primary after:content-['*']"
                  htmlFor={field.name}
                >
                  Genres
                </FieldLabel>
                <ToggleGroup
                  className="flex flex-wrap"
                  type="multiple"
                  variant="outline"
                  value={field.value}
                  onValueChange={field.onChange}
                  spacing={2}
                >
                  {genres.map((genre) => (
                    <ToggleGroupItem
                      key={genre.id}
                      value={genre.id.toString()}
                      className="cursor-pointer rounded-full px-3"
                    >
                      {genre.name}
                    </ToggleGroupItem>
                  ))}

                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </ToggleGroup>
              </Field>
            )}
          />
          <Controller
            name="deadlineDate"
            control={control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor={field.name}>Deadline</FieldLabel>

                <DatePicker
                  id={field.name}
                  value={field.value}
                  onChange={field.onChange}
                  placeholder="Select deadline date"
                  aria-invalid={fieldState.invalid}
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
                <FieldDescription>
                  The story will be marked as complete and will only be
                  available for reading after the deadline has passed.
                </FieldDescription>
              </Field>
            )}
          />
          <Controller
            name="openingText"
            control={control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel
                  className="after:text-primary after:content-['*']"
                  htmlFor={field.name}
                >
                  Opening Paragraph
                </FieldLabel>
                <InputGroup>
                  <InputGroupTextarea
                    {...field}
                    id={field.name}
                    rows={6}
                    className="min-h-24 resize-none"
                    aria-invalid={fieldState.invalid}
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
              </Field>
            )}
          />
        </form>
      </CardContent>

      <CardFooter>
        <Button
          className="w-full md:w-min"
          type="submit"
          form="create-story-form"
        >
          Create
        </Button>
      </CardFooter>
    </Card>
  );
}
