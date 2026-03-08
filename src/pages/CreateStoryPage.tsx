import CreateStoryForm from "@components/forms/create-story-form/CreateStoryForm";
import CreateStoryFormSkeleton from "@components/skeletons/CreateStoryFormSkeleton";
import { Suspense } from "react";

export default function CreateStoryPage() {
  return (
    <div className="mx-auto grid w-[90%] items-center gap-y-4">
      <Suspense fallback={<CreateStoryFormSkeleton />}>
        <CreateStoryForm />
      </Suspense>
    </div>
  );
}
