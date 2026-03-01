import { userAtom } from "@lib/atoms";
import { supabase } from "@lib/supabase/client";
import { useAtom } from "jotai";
import { useEffect, useState } from "react";

export const useUser = () => {
  const [user, setUser] = useAtom(userAtom);
  const [isLoading, setIsLoading] = useState(true);

  const getUser = async () => {
    const { data } = await supabase.auth.getUser();

    setUser(data.user);
    setIsLoading(false);
  };

  useEffect(() => {
    getUser();
  }, [getUser]);

  return { user, isLoading };
};
