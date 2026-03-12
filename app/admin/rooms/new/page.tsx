import Link from "next/link";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { getAdminClient } from "@/lib/supabase/admin";
import { getAdminRooms, placeRoomAtPosition } from "@/lib/rooms";
import RoomsForm from "../RoomsForm";

async function createRoom(formData: FormData) {
  "use server";

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/admin/login");
  }

  const admin = getAdminClient();

  const positionRaw = (formData.get("sort_order") as string | null) ?? "1";
  const position = Math.max(1, Number(positionRaw) || 1);

  const active = formData.get("active") === "on";

  const image_url =
    ((formData.get("image_url") as string | null)?.trim() as string) || null;
  const location_es =
    ((formData.get("location_es") as string | null)?.trim() as string) || "";
  const location_en =
    ((formData.get("location_en") as string | null)?.trim() as string) || "";
  const description_es =
    ((formData.get("description_es") as string | null)?.trim() as string) ||
    "";
  const description_en =
    ((formData.get("description_en") as string | null)?.trim() as string) ||
    "";

  if (!location_es || !location_en || !description_es || !description_en) {
    throw new Error("Todos los campos de texto son obligatorios.");
  }

  const { data: newRoom, error } = await admin
    .from("rooms_carousel")
    .insert({
      sort_order: 999,
      active,
      image_url,
      location_es,
      location_en,
      description_es,
      description_en,
    })
    .select("id")
    .single();

  if (error) {
    console.error("Error creating room:", error);
    throw new Error("No se pudo crear el room.");
  }

  await placeRoomAtPosition(admin, newRoom.id, position);
  redirect("/admin/rooms");
}

export default async function AdminRoomsNewPage() {
  const admin = getAdminClient();
  const rooms = await getAdminRooms(admin);
  const totalRooms = rooms.length;

  return (
    <div>
      <Link
        href="/admin/rooms"
        className="text-sm text-grey/70 hover:text-grey mb-4 inline-block"
      >
        ← Volver al listado
      </Link>
      <h1 className="text-2xl font-bold text-grey mb-6">Nuevo room</h1>

      <RoomsForm
        action={createRoom}
        totalRooms={totalRooms}
        isNewRoom
      />
    </div>
  );
}

