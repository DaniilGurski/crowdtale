import type { Genre, NewStory } from "@T/index";
import { STORIES } from "@lib/constants";
import { supabase } from "@lib/supabase/client";

export const getProfileById = async (userId: string) => {
  const { data, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", userId)
    .single();

  if (error) throw error;

  return data;
};

export const getAllStories = async ({ pageParam }: { pageParam: number }) => {
  const from = pageParam * STORIES.PAGE_SIZE;
  const to = from + STORIES.PAGE_SIZE - 1;

  const { data, error } = await supabase
    .from("stories")
    .select(
      `*, story_genres (
        genres (
          id,
          name
        )
      ), story_participants (joined_at, story_id, user_id, profiles (username) )`,
    )
    .eq("is_full", false)
    .range(from, to);

  if (error) throw error;
  return data;
};

export const getStoryById = async (storyId: string) => {
  const { data, error } = await supabase
    .from("stories")
    .select(
      `*, story_genres (
        genres (
          id,
          name
        )
      ), story_participants (joined_at, story_id, user_id, profiles (username))`,
    )
    .eq("id", storyId)
    .single();

  if (error) throw error;
  return data;
};

export const getUserLibrary = async () => {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) throw new Error("Unauthorized");

  const { data, error } = await supabase
    .from("stories")
    .select(
      `*, story_genres (genres (id, name)), story_participants!inner (user_id, profiles(username))`,
    )
    .eq("story_participants.user_id", user.id);

  if (error) throw error;

  return data;
};

export const getTurnsByStoryId = async (storyId: string) => {
  const { data, error } = await supabase
    .from("stories")
    .select(
      `*, story_genres(genres(*)), story_participants(user_id, joined_at, profiles(username)), turns(*, profiles(username))`,
    )
    .eq("id", storyId)
    .order("turn_order", { referencedTable: "turns", ascending: true })
    .order("joined_at", {
      referencedTable: "story_participants",
      ascending: true,
    })
    .single();

  if (error) throw error;
  return data;
};

export const isStoryParticipant = async (
  storyId: string,
  userId: string,
): Promise<boolean> => {
  const { data, error } = await supabase
    .from("story_participants")
    .select()
    .eq("story_id", storyId)
    .eq("user_id", userId)
    .maybeSingle();

  if (error) {
    throw error;
  }

  return !!data;
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
    p_opening_text: newStory.openingText,
    p_creator_id: user.id,
    p_genre_ids: newStory.genres.map((id) => parseInt(id)),
    p_deadline: newStory.deadlineDate ? newStory.deadlineDate : undefined,
  });

  if (error) throw error;
};

export const joinStory = async (storyId: string) => {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) throw new Error("Unauthorized");

  const { error } = await supabase.rpc("join_story", {
    p_story_id: storyId,
    p_user_id: user.id,
  });

  if (error) throw error;
};

export const addNewStoryTurn = async (storyId: string, content: string) => {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) throw new Error("Unauthorized");

  const { error } = await supabase.rpc("create_turn", {
    p_story_id: storyId,
    p_user_id: user.id,
    p_content: content,
  });

  if (error) throw error;
};

export const deleteParticipantById = async (
  storyId: string,
  userId: string,
) => {
  const { error } = await supabase
    .from("story_participants")
    .delete()
    .eq("user_id", userId)
    .eq("story_id", storyId);

  if (error) throw error;
};

export const deleteStoryById = async (storyId: string) => {
  const { error } = await supabase
    .from("stories")
    .delete()
    .eq("id", storyId)
    .single();

  if (error) throw error;
};

export const updateUsername = async (newUsername: string) => {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) throw new Error("Unauthorized");

  const { error } = await supabase
    .from("profiles")
    .update({ username: newUsername })
    .eq("id", user.id);

  if (error) throw error;
};
