import type { Tables } from "@T/database";
import { getTurnsByStoryId } from "@/services/api";

export type Story = Tables<"stories">;
export type StoryParticipant = Tables<"story_participants">;
export type Profile = Tables<"profiles">;
export type Genre = Tables<"genres">;
export type StoryGenre = Tables<"story_genres">;
export type Turn = Tables<"turns">;

export type StoryWithGenres = Story & {
  story_genres: { genres: { id: number; name: string } }[];
};

export type StoryStatus = "waiting" | "active" | "completed";

export type StoryWithParticipants = Story & {
  story_participants: StoryParticipant & {
    profiles: Pick<Profile, "username">;
  };
};

export type StoryWithTurns = NonNullable<
  Awaited<ReturnType<typeof getTurnsByStoryId>>
>;

export type StoryParticipantWithProfiles = Omit<
  StoryParticipant,
  "story_id"
> & {
  profiles: Pick<Profile, "username">;
};

export type NewStory = {
  title: string;
  genres: string[];
  openingText: string;
  deadlineDate: string;
};
