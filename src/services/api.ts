import { supabase } from "@lib/supabase/client";
import { STORIES } from "@lib/constants";
import type { Story } from "@T/index";

export const getAllStories = async ({
  pageParam,
}: {
  pageParam: number;
}): Promise<Story[]> => {
  // await new Promise((resolve) => setTimeout(resolve, 1000));

  const from = pageParam * STORIES.PAGE_SIZE;
  const to = from + STORIES.PAGE_SIZE - 1;

  const { data, error } = await supabase
    .from("stories")
    .select("*")
    .range(from, to);

  if (error) throw error;
  return data;
};

export const addNewStory = async (
  title: string,
  genres: string[],
  openingText: string,
) => {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) throw new Error("Unauthorized");

  await supabase.from("stories").insert({
    title,
    genres,
    contents: [{ userId: user.id, text: openingText }],
    creator: { userId: user.id, username: "undefined" },
  });
};
