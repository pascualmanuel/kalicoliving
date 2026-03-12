import type { SupabaseClient } from "@supabase/supabase-js";

export type AdminRoom = {
  id: string;
  sort_order: number | null;
  active: boolean;
  image_url: string | null;
  location_es: string;
  location_en: string;
  description_es: string;
  description_en: string;
};

export async function getAdminRooms(
  supabaseClient: SupabaseClient,
): Promise<AdminRoom[]> {
  const { data, error } = await supabaseClient
    .from("rooms_carousel")
    .select(
      "id, sort_order, active, image_url, location_es, location_en, description_es, description_en",
    )
    .order("sort_order", { ascending: true, nullsFirst: true })
    .order("id", { ascending: true });

  if (error) {
    console.error("getAdminRooms error:", error);
    return [];
  }

  return (data ?? []) as AdminRoom[];
}

export async function getAdminRoomById(
  supabaseClient: SupabaseClient,
  id: string,
): Promise<AdminRoom | null> {
  const { data, error } = await supabaseClient
    .from("rooms_carousel")
    .select(
      "id, sort_order, active, image_url, location_es, location_en, description_es, description_en",
    )
    .eq("id", id)
    .maybeSingle();

  if (error) {
    console.error("getAdminRoomById error:", error);
    return null;
  }

  return data as AdminRoom | null;
}

/** Para el carrusel público: solo activos, ordenados; location y description según locale */
export type PublicRoomSlide = {
  image_url: string | null;
  location: string;
  description: string;
};

export async function getPublicRooms(
  supabaseClient: SupabaseClient,
  locale: "es" | "en",
): Promise<PublicRoomSlide[]> {
  const { data, error } = await supabaseClient
    .from("rooms_carousel")
    .select("image_url, location_es, location_en, description_es, description_en")
    .eq("active", true)
    .order("sort_order", { ascending: true, nullsFirst: true })
    .order("id", { ascending: true });

  if (error) {
    console.error("getPublicRooms error:", error);
    return [];
  }

  const rows = (data ?? []) as Array<{
    image_url: string | null;
    location_es: string;
    location_en: string;
    description_es: string;
    description_en: string;
  }>;

  return rows.map((row) => ({
    image_url: row.image_url,
    location: locale === "es" ? row.location_es : row.location_en,
    description: locale === "es" ? row.description_es : row.description_en,
  }));
}

/**
 * Coloca el room con `roomId` en la posición `position` (1-based) y reasigna
 * el resto a 1, 2, 3, ... sin duplicados.
 */
export async function placeRoomAtPosition(
  supabaseClient: SupabaseClient,
  roomId: string,
  position: number,
): Promise<void> {
  const rooms = await getAdminRooms(supabaseClient);
  const idx = rooms.findIndex((r) => r.id === roomId);
  if (idx === -1) return;
  const [room] = rooms.splice(idx, 1);
  const targetIndex = Math.max(0, Math.min(position - 1, rooms.length));
  rooms.splice(targetIndex, 0, room);
  for (let i = 0; i < rooms.length; i++) {
    await supabaseClient
      .from("rooms_carousel")
      .update({ sort_order: i + 1 })
      .eq("id", rooms[i].id);
  }
}

/** Reasigna sort_order a 1, 2, 3… tras borrar un room. */
export async function normalizeRoomsSortOrder(
  supabaseClient: SupabaseClient,
): Promise<void> {
  const rooms = await getAdminRooms(supabaseClient);
  for (let i = 0; i < rooms.length; i++) {
    await supabaseClient
      .from("rooms_carousel")
      .update({ sort_order: i + 1 })
      .eq("id", rooms[i].id);
  }
}

