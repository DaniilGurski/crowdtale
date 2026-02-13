import { Spinner } from "@components/ui/spinner";

export default function DiscoverFeedLoading() {
  return (
    <div className="grid h-full w-full place-content-center">
      <Spinner className="size-6" />;
    </div>
  );
}
