import { useQuery, useSuspenseQuery } from "@tanstack/react-query";
import { getTurnsByStoryId } from "@services/api";

export const useTurnsById = (storyId?: string) => {
  const query = useQuery({
    queryFn: () => getTurnsByStoryId(storyId!),
    queryKey: ["turns", storyId],
    staleTime: 0,
    enabled: !!storyId,
  });

  const firstTurn = query.data?.turns[0];

  return {
    ...query,
    firstTurn,
  };
};

export const useSuspenseTurnsById = (storyId?: string) => {
  const query = useSuspenseQuery({
    queryFn: () => getTurnsByStoryId(storyId!),
    queryKey: ["turns", storyId],
    staleTime: 0,
  });

  const firstTurn = query.data.turns[0];

  return {
    ...query,
    firstTurn,
  };
};
