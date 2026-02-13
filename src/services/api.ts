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
