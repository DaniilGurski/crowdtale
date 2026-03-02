import { supabase } from "@lib/supabase/client";
import { useQuery } from "@tanstack/react-query";

export const useUser = () => {
  const query = useQuery({
    queryFn: async () => {
      return await supabase.auth.getUser();
    },
    queryKey: ["user"],
  });

  return { user: query.data?.data.user, ...query };
};
