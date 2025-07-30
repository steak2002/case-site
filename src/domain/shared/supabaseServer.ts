import { createClient } from "@supabase/supabase-js";

// Server-side Supabase client for backend operations
export const supabaseServer = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,  // Same URL as frontend for now
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,  // Same key as frontend for now
    {
        auth: { persistSession: false }  // Don't persist sessions in server environment
    }
);