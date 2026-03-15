import WritingTurnsList from "@components/writing-space/WritingTurnList";
import WritingSpaceAction from "@components/writing-space/WritingSpaceAction";
import { useIsParticipant } from "@hooks/useIsParticipant";
import { useSuspenseTurnsById } from "@hooks/useTurnsById";
import { useUser } from "@hooks/useUser";
import { getNextWriter } from "@lib/utils";
import { useParams } from "react-router";
import { useEffect } from "react";
import { supabase } from "@/lib/supabase/client";
import { useQueryClient } from "@tanstack/react-query";
import type { RealtimeChannel } from "@supabase/supabase-js";

export default function WritingSpaceMain() {
  const { user } = useUser();
  const { id: storyId } = useParams();
  const { data: isParticipant } = useIsParticipant(storyId, user?.id);
  const { data: story, error } = useSuspenseTurnsById(storyId);
  const queryClient = useQueryClient();

  useEffect(() => {
    let channel: RealtimeChannel;

    const initRealtime = async () => {
      await supabase.realtime.setAuth();

      channel = supabase
        .channel(`topic:${story.id}`, {
          config: { private: true },
        })
        .on("broadcast", { event: "INSERT" }, (payload) => {
          console.log("New turn received:", payload);
          queryClient.invalidateQueries({ queryKey: ["turns", story.id] });
        })
        .on("broadcast", { event: "UPDATE" }, (payload) => {
          console.log("Story updated:", payload);
          queryClient.invalidateQueries({ queryKey: ["turns", story.id] });
          queryClient.invalidateQueries({ queryKey: ["story", story.id] });
        })
        .subscribe((status) => {
          if (status === "SUBSCRIBED")
            console.log("Listening for story beats...");
        });
    };

    initRealtime();

    return () => {
      if (channel) supabase.removeChannel(channel);
    };
  }, [story.id, queryClient]);

  if (error) {
    return <p> {error.message} </p>;
  }

  const { turns, status } = story;
  const nextWriter = getNextWriter(story);

  return (
    <div className="relative flex h-full flex-col">
      <div className="mx-auto grid w-[90%] max-w-2xl flex-1 content-start gap-y-4">
        <WritingTurnsList turns={turns} />

        {isParticipant && story.status === "active" && (
          <p className="animate-pulse text-sm text-orange-950/70 italic">
            Waiting for {nextWriter.profiles.username} turn...
          </p>
        )}
      </div>

      <WritingSpaceAction userId={user?.id} status={status} />
    </div>
  );
}
