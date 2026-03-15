import type { RealtimeChannel } from "@supabase/supabase-js";
import { supabase } from "@lib/supabase/client";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";

export const useRealtimeDiscoverFeed = () => {
  const queryClient = useQueryClient();

  useEffect(() => {
    let channel: RealtimeChannel;

    const initRealtime = async () => {
      await supabase.realtime.setAuth();

      channel = supabase
        .channel(`topic:discover`, {
          config: { private: true },
        })
        .on("broadcast", { event: "INSERT" }, (_payload) => {
          queryClient.invalidateQueries({ queryKey: ["stories"] });
        })
        .subscribe();
    };

    initRealtime();

    return () => {
      if (channel) supabase.removeChannel(channel);
    };
  }, [queryClient]);
};
