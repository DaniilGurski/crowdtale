import type { Database } from "@T/database";
import { createClient as createSupabaseClient } from "@supabase/supabase-js";

export const supabase = createSupabaseClient<Database>(
  import.meta.env.VITE_SUPABASE_URL!,
  import.meta.env.VITE_SUPABASE_PUBLISHABLE_DEFAULT_KEY!,
);
