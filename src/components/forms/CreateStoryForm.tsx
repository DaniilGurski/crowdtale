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
import { GENRES } from "@/data";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  InputGroupTextarea,
} from "../ui/input-group";

const schema = z.object({
  title: z.string().nonempty({ error: "Story title can not be empty" }),
  genres: z.array(z.string()).min(1, { error: "Select at least one genre" }),
  openingText: z
    .string()
    .min(50, { error: "Opening text should be at least 50 characters long" }),
});

type CreateStoryFormFields = z.infer<typeof schema>;

export default function CreateStoryForm() {
  const { handleSubmit, control } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      title: "",
      genres: [],
      openingText: "",
    },
  });

  const onSubmit: SubmitHandler<CreateStoryFormFields> = (data) => {
    console.log(data);
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
                  {GENRES.map((genre) => (
                    <ToggleGroupItem
                      key={genre}
                      value={genre}
                      className="cursor-pointer rounded-full px-3"
                    >
                      {genre}
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
