import CreateStoryForm from "@/components/forms/CreateStoryForm";
import NavigationHeader from "@/components/NavigationHeader";
import CreateStoryFormSkeleton from "@components/skeletons/CreateStoryFormSkeleton";
import { Suspense } from "react";

export default function CreateStoryPage() {
  return (
    <div className="flex w-full flex-col">
      <NavigationHeader />
      <div className="mx-auto grid w-[90%] items-center gap-y-4">
        <Suspense fallback={<CreateStoryFormSkeleton />}>
          <CreateStoryForm />
        </Suspense>
      </div>
    </div>
  );
}
