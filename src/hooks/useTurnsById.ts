import { useQuery } from "@tanstack/react-query";
import { getTurnsByStoryId } from "@services/api";

export const useTurnsById = (storyId?: string) => {
  const query = useQuery({
    queryFn: () => getTurnsByStoryId(storyId!),
    queryKey: ["turns", storyId],
    staleTime: 0,
    enabled: !!storyId,
  });

  const firstTurn = query.data?.[0];
  const storyInfo = firstTurn?.stories;

  return {
    ...query,
    firstTurn,
    storyInfo,
  };
};
