import { supabase } from "@/lib/supabase/client";
import { useEffect } from "react";

export const useStoryBroadcast = (storyId: string) => {
  const channel = supabase.channel(`story-updates-${storyId}`);

  useEffect(() => {
    channel
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "turns",
          filter: `story_id=eq.${storyId}`,
        },
        (payload) => {
          console.log(payload);
        },
      )
      .on(
        "postgres_changes",
        {
          event: "UPDATE",
          schema: "public",
          table: "stories",
          filter: `id=eq.${storyId}`,
        },
        (payload) => {
          console.log(payload);
        },
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [supabase]);
};
