import { useEffect } from "react";
import { useNavigate } from "react-router";
import { supabase } from "@lib/supabase/client";

export default function AuthCallback() {
    const navigate = useNavigate();

    useEffect(() => {
        // Handle the OAuth callback - this exchanges the code for a session and clears the tokens from the URL
        supabase.auth.onAuthStateChange((event) => {
            if (event === "SIGNED_IN") {
                navigate("/", { replace: true });
            } else if (event === "SIGNED_OUT") {
                navigate("/login", { replace: true });
            }
        });
    }, [navigate]);

    return (
        <main className="grid h-screen place-items-center">
            <p> Signing you in... </p>
        </main>
    );
}
