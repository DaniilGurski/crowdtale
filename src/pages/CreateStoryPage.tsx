import CreateStoryForm from "@/components/forms/CreateStoryForm";

export default function CreateStoryPage() {
  return (
    <div className="mx-auto grid h-screen w-[90%] max-w-4xl content-center gap-y-4 p-8">
      <CreateStoryForm />
    </div>
  );
}

// TODO: 1. Add breadcrumps, navigation header component
// TODO: 2. Implement onSubmit for create story form
// TODO: 3. Change Story object to fit into the form
