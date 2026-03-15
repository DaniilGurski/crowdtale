import type { RealtimeChannel } from "@supabase/supabase-js";
import { supabase } from "@lib/supabase/client";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";

export const useRealtimeWritingSpace = (storyId: string) => {
  const queryClient = useQueryClient();

  useEffect(() => {
    let channel: RealtimeChannel;

    const initRealtime = async () => {
      await supabase.realtime.setAuth();

      channel = supabase
        .channel(`topic:${storyId}`, {
          config: { private: true },
        })
        .on("broadcast", { event: "INSERT" }, () => {
          queryClient.invalidateQueries({ queryKey: ["turns", storyId] });
        })
        .on("broadcast", { event: "UPDATE" }, () => {
          queryClient.invalidateQueries({ queryKey: ["turns", storyId] });
          queryClient.invalidateQueries({ queryKey: ["story", storyId] });
        })
        .subscribe();
    };

    initRealtime();

    return () => {
      if (channel) supabase.removeChannel(channel);
    };
  }, [storyId, queryClient]);
};
