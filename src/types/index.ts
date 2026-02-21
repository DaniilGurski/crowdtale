import type { Tables } from "@T/database";

export type Story = Tables<"stories">;

export type StoryWithGenres = Story & {
  story_genres: { genres: { id: number; name: string } }[];
};

export type StoryWithParticipants = StoryWithGenres & {
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

export type Genre = Tables<"genres">;
