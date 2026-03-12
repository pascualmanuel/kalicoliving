"use client";

import { useRef, useState } from "react";
import { useFormStatus } from "react-dom";

export type RoomFormInitialValues = {
  sort_order?: number | null;
  active?: boolean;
  image_url?: string | null;
  location_es?: string;
  location_en?: string;
  description_es?: string;
  description_en?: string;
};

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="inline-flex items-center justify-center gap-2 rounded-[12px] bg-brown px-6 py-2.5 text-sm font-semibold text-white hover:bg-brown/90 transition-colors disabled:opacity-80 disabled:pointer-events-none"
    >
      {pending ? (
        <>
          <span
            className="h-3.5 w-3.5 shrink-0 rounded-full border-2 border-white/30 border-t-white animate-spin"
            aria-hidden
          />
          Guardando…
        </>
      ) : (
        "Guardar room"
      )}
    </button>
  );
}

interface RoomsFormProps {
  action: (formData: FormData) => Promise<void>;
  initialValues?: RoomFormInitialValues;
  /** Total de rooms actuales (para opciones 1ª, 2ª, …). En "nuevo" se usa totalRooms+1 como última opción. */
  totalRooms: number;
  /** Si es formulario de nuevo room (muestra una posición más: "al final"). */
  isNewRoom?: boolean;
}

export default function RoomsForm({
  action,
  initialValues,
  totalRooms,
  isNewRoom = false,
}: RoomsFormProps) {
  const maxPosition = totalRooms + (isNewRoom ? 1 : 0);
  const defaultPosition =
    initialValues?.sort_order != null && initialValues.sort_order >= 1
      ? Math.min(initialValues.sort_order, maxPosition)
      : maxPosition;
  const [position, setPosition] = useState(defaultPosition);
  const [active, setActive] = useState(initialValues?.active ?? true);
  const [imageUrl, setImageUrl] = useState(initialValues?.image_url ?? "");
  const [locationEs, setLocationEs] = useState(
    initialValues?.location_es ?? "",
  );
  const [locationEn, setLocationEn] = useState(
    initialValues?.location_en ?? "",
  );
  const [descriptionEs, setDescriptionEs] = useState(
    initialValues?.description_es ?? "",
  );
  const [descriptionEn, setDescriptionEn] = useState(
    initialValues?.description_en ?? "",
  );
  const [isUploadingImage, setIsUploadingImage] = useState(false);
  const imageInputRef = useRef<HTMLInputElement | null>(null);

  async function handleUploadImage(file: File | null | undefined) {
    if (!file) return;
    try {
      setIsUploadingImage(true);
      const formData = new FormData();
      formData.append("file", file);
      formData.append("folder", "kali-rooms");

      const res = await fetch("/api/admin/upload-image", {
        method: "POST",
        body: formData,
      });

      const json = await res.json();
      if (!res.ok) {
        console.error(json);
        return;
      }

      setImageUrl(json.url);
    } finally {
      setIsUploadingImage(false);
      if (imageInputRef.current) {
        imageInputRef.current.value = "";
      }
    }
  }

  return (
    <form action={action} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] gap-6">
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <label className="flex flex-col gap-1.5">
              <span className="text-sm font-medium text-grey">
                Posición en el carrusel
              </span>
              <select
                name="sort_order"
                value={position}
                onChange={(e) => setPosition(Number(e.target.value))}
                className="w-full px-4 py-2.5 rounded-[12px] border border-grey/20 bg-white text-grey focus:outline-none focus:ring-2 focus:ring-brown/30 focus:border-brown"
              >
                {Array.from({ length: maxPosition }, (_, i) => i + 1).map(
                  (n) => (
                    <option key={n} value={n}>
                      {n}ª posición
                    </option>
                  ),
                )}
              </select>
              <span className="text-xs text-grey/60">
                Cada room tiene una posición única. El carrusel sigue este
                orden.
              </span>
            </label>

            <label className="flex items-center gap-2 mt-6 md:mt-7">
              <input
                type="checkbox"
                name="active"
                checked={active}
                onChange={(e) => setActive(e.target.checked)}
                className="h-4 w-4 rounded border-grey/40 text-brown focus:ring-brown/40"
              />
              <span className="text-sm text-grey">
                Mostrar este room en la web
              </span>
            </label>
          </div>

          <label className="flex flex-col gap-1.5">
            <span className="text-sm font-medium text-grey">Imagen</span>
            <input name="image_url" type="hidden" value={imageUrl} />
            <div className="flex items-center gap-3">
              <input
                ref={imageInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => handleUploadImage(e.target.files?.[0] ?? null)}
              />
              <button
                type="button"
                onClick={() => imageInputRef.current?.click()}
                disabled={isUploadingImage}
                className="inline-flex items-center justify-center rounded-[12px] border border-grey/20 px-4 py-2.5 text-sm font-medium text-grey hover:border-brown/40 hover:text-brown transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {isUploadingImage ? "Subiendo imagen..." : "Adjuntar imagen"}
              </button>
              {imageUrl && !isUploadingImage && (
                <span className="text-xs text-grey/60 truncate max-w-[240px]" title={imageUrl}>
                  Imagen cargada
                </span>
              )}
            </div>
            <span className="text-xs text-grey/60">
              Sube una imagen desde tu ordenador. Se guardará en Cloudinary y se usará en el carrusel.
            </span>
          </label>

          <div className="space-y-3">
            <p className="text-xs font-medium uppercase tracking-[0.08em] text-grey/60">
              Español
            </p>
            <label className="flex flex-col gap-1.5">
              <span className="text-sm font-medium text-grey">
                Ubicación (ES)
              </span>
              <input
                name="location_es"
                type="text"
                required
                value={locationEs}
                onChange={(e) => setLocationEs(e.target.value)}
                className="w-full px-4 py-2.5 rounded-[12px] border border-grey/20 bg-white text-grey placeholder:text-grey/50 focus:outline-none focus:ring-2 focus:ring-brown/30 focus:border-brown"
                placeholder="Ej. Prosperidad, Madrid"
              />
            </label>

            <label className="flex flex-col gap-1.5">
              <span className="text-sm font-medium text-grey">
                Descripción (ES)
              </span>
              <textarea
                name="description_es"
                required
                value={descriptionEs}
                onChange={(e) => setDescriptionEs(e.target.value)}
                rows={3}
                className="w-full px-4 py-2.5 rounded-[12px] border border-grey/20 bg-white text-grey placeholder:text-grey/50 focus:outline-none focus:ring-2 focus:ring-brown/30 focus:border-brown resize-none"
                placeholder="Texto que aparece debajo de la ubicación en español."
              />
            </label>
          </div>
        </div>

        <div className="space-y-3">
          <p className="text-xs font-medium uppercase tracking-[0.08em] text-grey/60">
            Inglés
          </p>
          <label className="flex flex-col gap-1.5">
            <span className="text-sm font-medium text-grey">
              Ubicación (EN)
            </span>
            <input
              name="location_en"
              type="text"
              required
              value={locationEn}
              onChange={(e) => setLocationEn(e.target.value)}
              className="w-full px-4 py-2.5 rounded-[12px] border border-grey/20 bg-white text-grey placeholder:text-grey/50 focus:outline-none focus:ring-2 focus:ring-brown/30 focus:border-brown"
              placeholder="e.g. Prosperidad, Madrid"
            />
          </label>

          <label className="flex flex-col gap-1.5">
            <span className="text-sm font-medium text-grey">
              Descripción (EN)
            </span>
            <textarea
              name="description_en"
              required
              value={descriptionEn}
              onChange={(e) => setDescriptionEn(e.target.value)}
              rows={5}
              className="w-full px-4 py-2.5 rounded-[12px] border border-grey/20 bg-white text-grey placeholder:text-grey/50 focus:outline-none focus:ring-2 focus:ring-brown/30 focus:border-brown resize-none"
              placeholder="Text that appears under the location in English."
            />
          </label>

          <div className="mt-4 rounded-[12px] border border-grey/10 bg-grey/5 px-4 py-3 text-xs text-grey/70">
            El botón de la izquierda seguirá siendo{" "}
            <span className="font-semibold">Apply now</span> y abrirá el popup
            de aplicación. Aquí solo editas imagen, ubicación y texto de apoyo.
          </div>
        </div>
      </div>

      <div className="flex justify-end">
        <SubmitButton />
      </div>
    </form>
  );
}
