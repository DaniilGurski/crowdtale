import type { Tables } from "@T/database";

export type Story = Tables<"stories">;
export type Genre = Tables<"genres">;
export type StoryGenre = Tables<"story_genres">;

export type StoryWithGenres = Story & {
  story_genres: { genres: { genre_id: number; name: string } }[];
};

export type StoryStatus = "waiting" | "active" | "completed";

export type StoryWithParticipants = Story & {
  story_participants: {
    user_id: string;
    profiles: { username: string };
  }[];
};

export type NewStory = {
  title: string;
  genres: string[];
  opening_text: string;
};

export type Turn = Tables<"turns">;

export type TurnWithProfiles = Turn & {
  profiles: { id: string; username: string };
};

export type TurnWithStoryInfo = Turn & {
  stories: Pick<
    StoryWithGenres,
    "title" | "opening_text" | "status" | "story_genres"
  >;
};
