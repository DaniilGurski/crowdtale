import { useQuery } from "@tanstack/react-query";
import { isStoryParticipant } from "@/services/api";

export const useIsParticipant = (storyId?: string, userId?: string) => {
  return useQuery({
    queryKey: ["is_participant", storyId, userId],
    queryFn: async () => {
      return await isStoryParticipant(storyId!, userId!);
    },
    enabled: !!storyId && !!userId,
  });
};
