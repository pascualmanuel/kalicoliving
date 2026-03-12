import { NextResponse } from "next/server";
import { getAdminClient } from "@/lib/supabase/admin";
import { getPublicRooms } from "@/lib/rooms";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const locale = (searchParams.get("locale") ?? "es") as "es" | "en";
  if (locale !== "es" && locale !== "en") {
    return NextResponse.json({ error: "locale must be es or en" }, { status: 400 });
  }

  const admin = getAdminClient();
  const rooms = await getPublicRooms(admin, locale);
  return NextResponse.json(rooms);
}
