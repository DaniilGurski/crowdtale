import { useSetAtom } from "jotai";
import { useNavigate } from "react-router";
import { supabase } from "@lib/supabase/client";
import { Button } from "@components/ui/button";
import { userAtom } from "@lib/atoms";

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
