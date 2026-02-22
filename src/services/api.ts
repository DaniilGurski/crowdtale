import type {
  Genre,
  NewStory,
  StoryWithGenres,
  StoryWithParticipants,
} from "@T/index";
import { STORIES } from "@lib/constants";
import { supabase } from "@lib/supabase/client";

export const getAllStories = async ({
  pageParam,
}: {
  pageParam: number;
}): Promise<StoryWithGenres[]> => {
  const from = pageParam * STORIES.PAGE_SIZE;
  const to = from + STORIES.PAGE_SIZE - 1;

  const { data, error } = await supabase
    .from("stories")
    .select(
      `id, title, opening_text, status, created_at, creator_id, story_genres (
        genres (
          id,
          name
        )
      )`,
    )
    .range(from, to);

  if (error) throw error;
  return data;
};

export const getUserLibrary = async (): Promise<StoryWithParticipants[]> => {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) throw new Error("Unauthorized");

  const { data, error } = await supabase
    .from("stories")
    .select(
      `id, title, opening_text, status, created_at, creator_id, story_genres (
        genres (
          id,
          name
        )
      ), story_participants!inner ( user_id, profiles (username) )`,
    )
    .eq("story_participants.user_id", user.id);

  if (error) throw error;

  return data;
};

export const getAllGenres = async (): Promise<Genre[]> => {
  const { data, error } = await supabase.from("genres").select("*");

  if (error) throw error;

  return data;
};

export const addNewStory = async (newStory: NewStory) => {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) throw new Error("Unauthorized");

  const { error } = await supabase.rpc("create_story_with_genres", {
    p_title: newStory.title,
    p_opening_text: newStory.opening_text,
    p_creator_id: user.id,
    p_genre_ids: newStory.genres.map((id) => parseInt(id)),
  });

  if (error) throw error;
};
