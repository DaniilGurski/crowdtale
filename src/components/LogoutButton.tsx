import { supabase } from "@/lib/supabase/client";
import { Button } from "./ui/button";
import { useSetAtom } from "jotai";
import { userAtom } from "@/lib/atoms";

export default function LogoutButton() {
  const setUser = useSetAtom(userAtom);

  const handleClick = async () => {
    const { error } = await supabase.auth.signOut();

    if (error) {
      console.log("error logging out");
    }

    setUser(null);
  };

  return <Button onClick={handleClick}> Logout </Button>;
}
