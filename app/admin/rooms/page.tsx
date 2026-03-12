import Link from "next/link";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { getAdminClient } from "@/lib/supabase/admin";
import { getAdminRooms, normalizeRoomsSortOrder } from "@/lib/rooms";
import AdminRoomsPreview from "./AdminRoomsPreview";
import AdminRoomCard from "./AdminRoomCard";

async function setRoomActive(id: string, active: boolean) {
  "use server";
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/admin/login");
  const admin = getAdminClient();
  await admin.from("rooms_carousel").update({ active }).eq("id", id);
}

async function deleteRoom(id: string) {
  "use server";
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/admin/login");
  const admin = getAdminClient();
  await admin.from("rooms_carousel").delete().eq("id", id);
  await normalizeRoomsSortOrder(admin);
  redirect("/admin/rooms");
}

export default async function AdminRoomsPage() {
  const admin = getAdminClient();
  const rooms = await getAdminRooms(admin);

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl md:text-3xl font-bold text-grey">
          Rooms carousel
        </h1>
        <Link
          href="/admin/rooms/new"
          className="px-4 py-2 rounded-[12px] bg-brown text-white font-semibold hover:bg-brown/90 transition-colors"
        >
          Nuevo room
        </Link>
      </div>

      <div className="mb-6">
        <Link
          href="/admin"
          className="text-sm text-grey/70 hover:text-grey inline-flex items-center gap-1 transition-colors"
        >
          <svg
            className="inline-block h-4 w-4"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M10 19l-7-7m0 0l7-7m-7 7h18"
            />
          </svg>
          Volver al dashboard
        </Link>
      </div>

      {rooms.length === 0 ? (
        <p className="text-grey/70">
          Aún no hay slides en el carrusel. Crea el primero.
        </p>
      ) : (
        <ul className="grid gap-4 md:grid-cols-2">
          {rooms.map((room) => (
            <AdminRoomCard
              key={room.id}
              room={room}
              onToggleActive={setRoomActive}
              onDelete={deleteRoom}
            />
          ))}
        </ul>
      )}
      {rooms.length > 0 && (
        <div className="mb-10">
          <h2 className="text-sm font-medium text-grey my-10">
            Vista previa del carrusel (home)
          </h2>
          <AdminRoomsPreview rooms={rooms} />
        </div>
      )}
    </div>
  );
}
