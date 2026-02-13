import { Button } from "@components/ui/button";

interface ErrorCardProps {
  refetch: () => void;
}

export default function DiscoverFeedError({ refetch }: ErrorCardProps) {
  return (
    <div className="grid h-full w-full place-content-center">
      <div className="grid gap-y-2 text-center">
        <p className="line-clamp-4 tracking-wider italic">
          Something went wrong !
        </p>

        <Button onClick={refetch}> Retry </Button>
      </div>
    </div>
  );
}
