"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import ConfirmModal from "@/components/admin/ConfirmModal";

type LocaleLink = { id: string; slug: string };

type Props = {
  title: string;
  titleEn: string;
  date: string;
  imageUrl: string | null;
  excerpt: string;
  isPublished: boolean;
  es: LocaleLink | null;
  en: LocaleLink | null;
  onDelete: (ids: string[]) => Promise<void>;
};

export default function AdminBlogCard({
  title,
  titleEn,
  date,
  imageUrl,
  excerpt,
  isPublished,
  es,
  en,
  onDelete,
}: Props) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);

  const deleteIds = [...(es ? [es.id] : []), ...(en ? [en.id] : [])];

  function handleDeleteConfirm() {
    setDeleteModalOpen(false);
    startTransition(async () => {
      await onDelete(deleteIds);
      router.refresh();
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
          {imageUrl ? (
            <Image
              src={imageUrl}
              alt={title || "Blog"}
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
                {date}
              </p>
              <p className="font-medium text-grey truncate">
                {title || "(Sin título)"}
              </p>
              <p className="text-sm text-grey/70 truncate">
                EN: {titleEn}
              </p>
            </div>
            <span
              className={`shrink-0 rounded-full px-2.5 py-0.5 text-xs font-medium ${
                isPublished
                  ? "bg-green-50 text-green-700 border border-green-100"
                  : "bg-grey/5 text-grey/60 border border-grey/20"
              }`}
            >
              {isPublished ? "Publicado" : "Borrador"}
            </span>
          </div>
          <p className="line-clamp-2 text-xs text-grey/70 max-w-xs">
            {excerpt}
          </p>
          <div className="flex flex-wrap items-center gap-2 pt-1">
            {es ? (
              <>
                <Link
                  href={`/admin/blog/${es.id}/edit`}
                  className="text-sm font-medium text-brown hover:underline"
                >
                  Editar
                </Link>
                <Link
                  href={`/es/blog/${es.slug}`}
                  className="text-sm font-medium text-grey/70 hover:text-grey border-l border-grey/20 pl-2"
                >
                  Ver
                </Link>
              </>
            ) : (
              en && (
                <Link
                  href={`/admin/blog/new?from=${en.id}`}
                  className="text-sm font-medium text-brown hover:underline"
                >
                  Traducir al español
                </Link>
              )
            )}
            {en ? (
              <>
                <span className="text-grey/30">·</span>
                <Link
                  href={`/admin/blog/${en.id}/edit`}
                  className="text-sm font-medium text-brown hover:underline"
                >
                  Editar EN
                </Link>
                <Link
                  href={`/en/blog/${en.slug}`}
                  className="text-sm font-medium text-grey/70 hover:text-grey border-l border-grey/20 pl-2"
                >
                  Ver
                </Link>
              </>
            ) : (
              es && (
                <>
                  <span className="text-grey/30">·</span>
                  <Link
                    href={`/admin/blog/new?from=${es.id}`}
                    className="text-sm font-medium text-brown hover:underline"
                  >
                    Traducir al inglés
                  </Link>
                </>
              )
            )}
            <button
              type="button"
              onClick={() => setDeleteModalOpen(true)}
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
        title="Eliminar entrada"
        description="¿Eliminar esta entrada del blog? Esta acción no se puede deshacer."
        confirmLabel="Eliminar"
        cancelLabel="Cancelar"
        variant="danger"
      />
    </>
  );
}
