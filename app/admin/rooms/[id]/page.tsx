import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { getAdminClient } from "@/lib/supabase/admin";
import { getAdminRoomById, getAdminRooms, placeRoomAtPosition } from "@/lib/rooms";
import RoomsForm, { type RoomFormInitialValues } from "../RoomsForm";

type Props = {
  params: { id: string };
};

async function updateRoom(id: string, formData: FormData) {
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

  const { error } = await admin
    .from("rooms_carousel")
    .update({
      sort_order: position,
      active,
      image_url,
      location_es,
      location_en,
      description_es,
      description_en,
    })
    .eq("id", id);

  if (error) {
    console.error("Error updating room:", error);
    throw new Error("No se pudo actualizar el room.");
  }

  await placeRoomAtPosition(admin, id, position);
  redirect("/admin/rooms");
}

export default async function AdminRoomsEditPage({ params }: Props) {
  const admin = getAdminClient();
  const [room, rooms] = await Promise.all([
    getAdminRoomById(admin, params.id),
    getAdminRooms(admin),
  ]);

  if (!room) {
    notFound();
  }

  const initialValues: RoomFormInitialValues = {
    sort_order: room.sort_order,
    active: room.active,
    image_url: room.image_url,
    location_es: room.location_es,
    location_en: room.location_en,
    description_es: room.description_es,
    description_en: room.description_en,
  };

  return (
    <div>
      <Link
        href="/admin/rooms"
        className="text-sm text-grey/70 hover:text-grey mb-4 inline-block"
      >
        ← Volver al listado
      </Link>
      <h1 className="text-2xl font-bold text-grey mb-6">Editar room</h1>

      <RoomsForm
        action={updateRoom.bind(null, params.id)}
        initialValues={initialValues}
        totalRooms={rooms.length}
      />
    </div>
  );
}

