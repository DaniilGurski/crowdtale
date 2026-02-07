import { userAtom } from "@lib/atoms";
import { supabase } from "@lib/supabase/client";
import { useAtom } from "jotai";
import { useEffect, useState } from "react";

export const useUser = () => {
    const [user, setUser] = useAtom(userAtom);
    const [loading, setLoading] = useState(true);

    const getUser = async () => {
        const { data } = await supabase.auth.getUser();

        setUser(data.user);
        setLoading(false);
    };

    useEffect(() => {
        getUser();
    }, []);

    return [user, loading];
};
