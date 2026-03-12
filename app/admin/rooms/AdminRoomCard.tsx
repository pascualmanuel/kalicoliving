"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import type { AdminRoom } from "@/lib/rooms";
import ConfirmModal from "@/components/admin/ConfirmModal";

type Props = {
  room: AdminRoom;
  onToggleActive: (id: string, active: boolean) => Promise<void>;
  onDelete: (id: string) => Promise<void>;
};

export default function AdminRoomCard({
  room,
  onToggleActive,
  onDelete,
}: Props) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);

  function handleToggle() {
    startTransition(async () => {
      await onToggleActive(room.id, !room.active);
      router.refresh();
    });
  }

  function handleDeleteClick() {
    setDeleteModalOpen(true);
  }

  function handleDeleteConfirm() {
    setDeleteModalOpen(false);
    startTransition(async () => {
      await onDelete(room.id);
      // redirect() en la server action lleva a /admin/rooms
    });
  }

  return (
    <>
      <li
        className={`relative flex gap-4 rounded-[12px] border bg-white p-4 transition-colors hover:border-grey/20 ${
          isPending ? "border-grey/20" : "border-grey/10"
        }`}
      >
        {isPending && (
          <div className="absolute inset-0 flex items-center justify-center rounded-[12px] bg-white/80 z-10">
            <span className="flex items-center gap-2 text-sm text-grey/70">
              <span
                className="h-3.5 w-3.5 shrink-0 rounded-full border-2 border-grey/20 border-t-brown animate-spin"
                aria-hidden
              />
              Guardando…
            </span>
          </div>
        )}

        <div className="relative h-24 w-24 shrink-0 rounded-[10px] overflow-hidden bg-grey/10">
          {room.image_url ? (
            <Image
              src={room.image_url}
              alt={room.location_es || "Room image"}
              fill
              className="object-cover"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center text-xs text-grey/50">
              Sin imagen
            </div>
          )}
        </div>
        <div className="flex flex-1 flex-col justify-between gap-2 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <div className="space-y-1 min-w-0">
              <p className="text-xs uppercase tracking-[0.08em] text-grey/60">
                Orden {room.sort_order ?? "—"}
              </p>
              <p className="font-medium text-grey truncate">
                {room.location_es || "(Sin ubicación ES)"}
              </p>
              <p className="text-sm text-grey/70 truncate">
                EN: {room.location_en || "(Sin ubicación EN)"}
              </p>
            </div>
            <span
              className={`shrink-0 rounded-full px-2.5 py-0.5 text-xs font-medium ${
                room.active
                  ? "bg-green-50 text-green-700 border border-green-100"
                  : "bg-grey/5 text-grey/60 border border-grey/20"
              }`}
            >
              {room.active ? "Activo" : "Oculto"}
            </span>
          </div>
          <p className="line-clamp-2 text-xs text-grey/70 max-w-xs">
            {room.description_es || "(Sin descripción ES)"}
          </p>
          <div className="flex flex-wrap items-center gap-2 pt-1">
            <Link
              href={`/admin/rooms/${room.id}`}
              className="text-sm font-medium text-brown hover:underline"
            >
              Editar
            </Link>
            <button
              type="button"
              onClick={handleToggle}
              disabled={isPending}
              className="text-sm font-medium text-grey/70 hover:text-grey border-l border-grey/20 pl-2 disabled:opacity-50"
            >
              {room.active ? "Desactivar" : "Activar"}
            </button>
            <button
              type="button"
              onClick={handleDeleteClick}
              disabled={isPending}
              className="text-sm font-medium text-red-600 hover:text-red-700 border-l border-grey/20 pl-2 disabled:opacity-50"
            >
              Eliminar
            </button>
          </div>
        </div>
      </li>

      <ConfirmModal
        open={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        onConfirm={handleDeleteConfirm}
        title="Eliminar room"
        description="¿Eliminar este room del carrusel? Esta acción no se puede deshacer."
        confirmLabel="Eliminar"
        cancelLabel="Cancelar"
        variant="danger"
      />
    </>
  );
}
