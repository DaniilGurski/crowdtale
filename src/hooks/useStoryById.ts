import { useQuery } from "@tanstack/react-query";
import { getStoryById } from "@services/api";

export const useStoryById = (storyId?: string) => {
  return useQuery({
    queryFn: () => getStoryById(storyId!),
    queryKey: ["story", storyId],
    staleTime: 0,
    enabled: !!storyId,
  });
};
