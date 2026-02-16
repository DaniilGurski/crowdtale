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
} from "@/components/ui/card";
import { Field, FieldError, FieldLabel } from "@components/ui/field";
import { Button } from "@components/ui/button";
import { Input } from "@components/ui/input";
import { ToggleGroup, ToggleGroupItem } from "@components/ui/toggle-group";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  InputGroupTextarea,
} from "../ui/input-group";
import { addNewStory, getAllGenres } from "@/services/api";
import { useSuspenseQuery } from "@tanstack/react-query";

const schema = z.object({
  title: z.string().nonempty({ error: "Story title can not be empty" }),
  genres: z.array(z.string()).min(1, { error: "Select at least one genre" }),
  openingText: z
    .string()
    .min(20, { error: "Opening text should be at least 50 characters long" }),
});

type CreateStoryFormFields = z.infer<typeof schema>;

export default function CreateStoryForm() {
  const { handleSubmit, control } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      title: "Lorem",
      genres: ["1"],
      openingText:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur molestie erat dolor, sed condimentum dolor porta vel. ",
    },
  });

  const { data: genres } = useSuspenseQuery({
    queryFn: getAllGenres,
    queryKey: ["genres"],
  });

  const onSubmit: SubmitHandler<CreateStoryFormFields> = async ({
    title,
    genres,
    openingText,
  }) => {
    // TODO: Add a toaster for both cases
    try {
      await addNewStory({ title, genres, opening_text: openingText });
    } catch (err) {
      console.log(err);
    }
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
                <FieldLabel htmlFor={field.name}> Story Title </FieldLabel>
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
                <FieldLabel> Genres </FieldLabel>
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
            name="openingText"
            control={control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor={field.name}>Opening Paragraph</FieldLabel>
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
        <Button type="submit" form="create-story-form">
          Create
        </Button>
      </CardFooter>
    </Card>
  );
}
