import { supabase } from "@/lib/supabase/client";
import { Button } from "./ui/button";
import { useSetAtom } from "jotai";
import { userAtom } from "@/lib/atoms";
import { useNavigate } from "react-router";

export default function LogoutButton() {
  const setUser = useSetAtom(userAtom);
  const navigate = useNavigate();

  const handleClick = async () => {
    const { error } = await supabase.auth.signOut();

    if (error) {
      console.log("Error logging out");
    }

    setUser(null);
    navigate("/login");
  };

  return (
    <Button variant="outline" onClick={handleClick}>
      Logout
    </Button>
  );
}
