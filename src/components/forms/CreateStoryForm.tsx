import { useState, type MouseEvent } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import {
  Controller,
  FormProvider,
  useForm,
  useFormContext,
  type SubmitHandler,
} from "react-hook-form";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";
import { useQueryClient, useSuspenseQuery } from "@tanstack/react-query";
import { z } from "zod";

import { DatePicker } from "@components/DatePicker";
import { Badge } from "@components/ui/badge";
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
import { Input } from "@components/ui/input";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  InputGroupTextarea,
} from "@components/ui/input-group";
import { Progress } from "@components/ui/progress";
import { ToggleGroup, ToggleGroupItem } from "@components/ui/toggle-group";
import { addNewStory, getAllGenres } from "@services/api";

const schema = z.object({
  title: z.string().nonempty({ error: "Story title can not be empty" }),
  genres: z.array(z.string()).min(1, { error: "Select at least one genre" }),
  openingText: z
    .string()
    .min(20, { error: "Opening text should be at least 20 characters long" }),
  deadlineDate: z.string().optional(),
});

export type CreateStoryFormFields = z.infer<typeof schema>;

const STEPS = [
  { id: 1, title: "Title", field: "title" },
  { id: 2, title: "Genres", field: "genres" },
  { id: 3, title: "Deadline", field: "deadlineDate" },
  { id: 4, title: "Opening", field: "openingText" },
  { id: 5, title: "Summary", field: null },
] as const;

const TOTAL_STEPS = STEPS.length;

// Keep all the components in same file to avoid linting errors
function TitleStep() {
  const { control } = useFormContext<CreateStoryFormFields>();

  return (
    <Controller
      name="title"
      control={control}
      render={({ field, fieldState }) => (
        <Field data-invalid={fieldState.invalid}>
          <FieldLabel htmlFor={field.name}>Story Title</FieldLabel>
          <Input
            {...field}
            id={field.name}
            aria-invalid={fieldState.invalid}
            autoComplete="off"
            placeholder="Enter a captivating title..."
          />
          {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          <FieldDescription>
            Choose a title that captures the essence of your story.
          </FieldDescription>
        </Field>
      )}
    />
  );
}

function GenresStep() {
  const { control } = useFormContext<CreateStoryFormFields>();
  const { data: genres } = useSuspenseQuery({
    queryFn: getAllGenres,
    queryKey: ["genres"],
  });

  return (
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
          </ToggleGroup>
          {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          <FieldDescription>
            Select one or more genres that best describe your story.
          </FieldDescription>
        </Field>
      )}
    />
  );
}

function DeadlineStep() {
  const { control } = useFormContext<CreateStoryFormFields>();

  return (
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
          {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          <FieldDescription>
            The story will be marked as complete and will only be available for
            reading after the deadline has passed.
          </FieldDescription>
        </Field>
      )}
    />
  );
}

function OpeningStep() {
  const { control } = useFormContext<CreateStoryFormFields>();

  return (
    <Controller
      name="openingText"
      control={control}
      render={({ field, fieldState }) => (
        <Field
          className="w-full wrap-anywhere"
          data-invalid={fieldState.invalid}
        >
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
          {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          <FieldDescription>
            Write the opening paragraph to set the stage (minimum 20
            characters).
          </FieldDescription>
        </Field>
      )}
    />
  );
}

function SummaryStep() {
  const { watch } = useFormContext<CreateStoryFormFields>();
  const values = watch();

  const { data: genres } = useSuspenseQuery({
    queryFn: getAllGenres,
    queryKey: ["genres"],
  });

  const selectedGenreNames = genres
    .filter((g) => values.genres.includes(g.id.toString()))
    .map((g) => g.name);

  return (
    <div className="space-y-4">
      <p className="text-muted-foreground text-sm">
        Review your story details before creating:
      </p>

      <div className="space-y-3">
        <div className="rounded-md border p-3">
          <p className="text-muted-foreground text-xs font-medium">Title</p>
          <p className="mt-1 font-medium">{values.title}</p>
        </div>

        <div className="rounded-md border p-3">
          <p className="text-muted-foreground text-xs font-medium">Genres</p>
          <div className="mt-1 flex flex-wrap gap-1">
            {selectedGenreNames.map((name) => (
              <Badge key={name} variant="secondary">
                {name}
              </Badge>
            ))}
          </div>
        </div>

        <div className="rounded-md border p-3">
          <p className="text-muted-foreground text-xs font-medium">Deadline</p>
          <p className="mt-1 font-medium">
            {values.deadlineDate
              ? format(values.deadlineDate, "PPP")
              : "No deadline set"}
          </p>
        </div>

        <div className="rounded-md border p-3">
          <p className="text-muted-foreground text-xs font-medium">
            Opening Paragraph
          </p>
          <p className="text-muted-foreground mt-1 text-sm whitespace-pre-wrap">
            {values.openingText}
          </p>
        </div>
      </div>
    </div>
  );
}

function StepContent({ step }: { step: number }) {
  switch (step) {
    case 1:
      return <TitleStep />;
    case 2:
      return <GenresStep />;
    case 3:
      return <DeadlineStep />;
    case 4:
      return <OpeningStep />;
    case 5:
      return <SummaryStep />;
    default:
      return null;
  }
}

export default function CreateStoryForm() {
  const [currentStep, setCurrentStep] = useState(1);

  const methods = useForm<CreateStoryFormFields>({
    resolver: zodResolver(schema),
    defaultValues: {
      title: "",
      genres: [],
      openingText: "",
      deadlineDate: "",
    },
    mode: "onTouched",
  });

  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const progressValue = (currentStep / TOTAL_STEPS) * 100;
  const isFirstStep = currentStep === 1;
  const isLastStep = currentStep === TOTAL_STEPS;
  const currentStepInfo = STEPS[currentStep - 1];

  const handleNext = async (e: MouseEvent<HTMLButtonElement>) => {
    // Prevents mouse event from affecting the create button in the last step
    e.preventDefault();

    // Validate current field before proceeding
    const fieldToValidate = currentStepInfo.field;
    if (fieldToValidate) {
      const isValid = await methods.trigger(fieldToValidate);
      if (!isValid) return;
    }
    setCurrentStep((prev) => Math.min(prev + 1, TOTAL_STEPS));
  };

  const handleBack = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  };

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
        success: "New story created!",
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
    <FormProvider {...methods}>
      <Card className="mx-auto w-full max-w-4xl">
        <div className="px-6 pt-6">
          <div className="mb-2 flex items-center justify-between text-sm">
            <span className="text-muted-foreground">
              Step {currentStep} of {TOTAL_STEPS}
            </span>
            <span className="font-medium">{currentStepInfo.title}</span>
          </div>
          <Progress value={progressValue} className="h-2" />
        </div>

        <CardHeader>
          <CardTitle className="text-2xl font-bold">
            Create a New Story
          </CardTitle>
          <CardDescription>
            Set the stage for your collaborative tale. Another writer will join
            you.
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form
            id="create-story-form"
            onSubmit={methods.handleSubmit(onSubmit)}
          >
            <StepContent step={currentStep} />
          </form>
        </CardContent>

        <CardFooter className="flex justify-between gap-2">
          <Button
            type="button"
            variant="outline"
            onClick={handleBack}
            disabled={isFirstStep}
            className={isFirstStep ? "invisible" : ""}
          >
            Back
          </Button>

          {isLastStep ? (
            <Button type="submit" form="create-story-form">
              Create
            </Button>
          ) : (
            <Button type="button" onClick={handleNext}>
              Next
            </Button>
          )}
        </CardFooter>
      </Card>
    </FormProvider>
  );
}
