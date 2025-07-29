import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabaseClient";

export async function GET() {
    // Try to fetch the list of tables (should always succeed)
    const { data, error } = await supabase.from("test-table-to-be-deleted").select("*").limit(1);

    if (error) {
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true, data });
}