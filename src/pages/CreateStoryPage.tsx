import CreateStoryForm from "@components/forms/CreateStoryForm";
import CreateStoryFormSkeleton from "@components/skeletons/CreateStoryFormSkeleton";
import { Suspense } from "react";

export default function CreateStoryPage() {
  return (
    <div className="mx-auto grid w-[90%] max-w-4xl place-items-center gap-y-4 p-8">
      {/* TODO: Add error boundary*/}
      <Suspense fallback={<CreateStoryFormSkeleton />}>
        <CreateStoryForm />
      </Suspense>
    </div>
  );
}
