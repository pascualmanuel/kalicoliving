"use client";

import { useState, useRef } from "react";
import RichTextEditor from "@/components/admin/RichTextEditor";
import BlogPostPreview from "@/components/admin/BlogPostPreview";

const CATEGORIES = [
  { value: "culture", label: "Culture" },
  { value: "gastro", label: "Gastro" },
  { value: "entrepreneur", label: "Entrepreneur" },
  { value: "plans", label: "Plans" },
] as const;

export type NewPostInitialValues = {
  locale?: string;
  slug?: string;
  title?: string;
  excerpt?: string;
  content?: string;
  cover_url?: string;
  list_image_url?: string;
  tags?: string[];
  translation_key?: string;
  from_id?: string;
  created_date?: string;
};

interface NewBlogFormWithPreviewProps {
  action: (formData: FormData) => Promise<void>;
  initialValues?: NewPostInitialValues;
}

function slugify(value: string): string {
  return value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export default function NewBlogFormWithPreview({
  action,
  initialValues,
}: NewBlogFormWithPreviewProps) {
  const [title, setTitle] = useState(initialValues?.title ?? "");
  const [slug, setSlug] = useState(initialValues?.slug ?? "");
  const [locale, setLocale] = useState(initialValues?.locale ?? "es");
  const [excerpt, setExcerpt] = useState(initialValues?.excerpt ?? "");
  const [content, setContent] = useState(initialValues?.content ?? "");
  const [coverUrl, setCoverUrl] = useState(initialValues?.cover_url ?? "");
  const [listImageUrl, setListImageUrl] = useState(
    initialValues?.list_image_url ?? "",
  );
  const [author, setAuthor] = useState("");
  const [createdDate, setCreatedDate] = useState(
    initialValues?.created_date ?? "",
  );
  const [tags, setTags] = useState<string[]>(initialValues?.tags ?? []);
  const [published, setPublished] = useState(true);
  const isTranslation = Boolean(initialValues?.from_id);
  const [slugTouched, setSlugTouched] = useState(false);
  const [isUploadingCover, setIsUploadingCover] = useState(false);
  const [isUploadingList, setIsUploadingList] = useState(false);

  const coverInputRef = useRef<HTMLInputElement | null>(null);
  const listInputRef = useRef<HTMLInputElement | null>(null);

  function toggleTag(value: string) {
    setTags((prev) =>
      prev.includes(value) ? prev.filter((t) => t !== value) : [...prev, value],
    );
  }

  async function handleUpload(
    which: "cover" | "list",
    file: File | null | undefined,
  ) {
    if (!file) return;
    try {
      if (which === "cover") setIsUploadingCover(true);
      else setIsUploadingList(true);

      const formData = new FormData();
      formData.append("file", file);
      formData.append("folder", "kali-blog");

      const res = await fetch("/api/admin/upload-image", {
        method: "POST",
        body: formData,
      });

      const json = await res.json();
      if (!res.ok) {
        console.error(json);
        return;
      }

      if (which === "cover") {
        setCoverUrl(json.url);
      } else {
        setListImageUrl(json.url);
      }
    } finally {
      if (which === "cover") setIsUploadingCover(false);
      else setIsUploadingList(false);
    }
  }

  return (
    <div className="space-y-12">
      {isTranslation && (
        <div className="rounded-[12px] border border-brown/30 bg-brown/5 px-4 py-3 text-sm text-grey">
          Estás creando la <strong>traducción</strong> de una entrada. El slug
          se rellena automáticamente a partir del título, pero puedes ajustarlo
          si quieres que la URL en este idioma sea distinta. Traduce título,
          extracto y contenido.
        </div>
      )}
      <form action={action} className="space-y-6 ">
        {initialValues?.translation_key && (
          <input
            type="hidden"
            name="translation_key"
            value={initialValues.translation_key}
          />
        )}
        {initialValues?.from_id && (
          <input type="hidden" name="from_id" value={initialValues.from_id} />
        )}
        <div className="grid gap-4">
          <label className="flex flex-col gap-1.5">
            <span className="text-sm font-medium text-grey">
              Título <span className="text-red-600">*</span>
            </span>
            <input
              name="title"
              type="text"
              required
              value={title}
              onChange={(e) => {
                const nextTitle = e.target.value;
                setTitle(nextTitle);
                if (!slugTouched) {
                  setSlug(slugify(nextTitle));
                }
              }}
              className="w-full px-4 py-2.5 rounded-[12px] border border-grey/20 bg-white text-grey placeholder:text-grey/50 focus:outline-none focus:ring-2 focus:ring-brown/30 focus:border-brown"
              placeholder="Ej. Coliving en Madrid: cómo es vivir en Kali"
            />
          </label>

          <label className="flex flex-col gap-1.5">
            <span className="text-sm font-medium text-grey">Slug</span>
            <>
              <input
                name="slug"
                type="text"
                value={slug}
                onChange={(e) => {
                  setSlugTouched(true);
                  setSlug(e.target.value);
                }}
                className="w-full px-4 py-2.5 rounded-[12px] border border-grey/20 bg-white text-grey placeholder:text-grey/50 focus:outline-none focus:ring-2 focus:ring-brown/30 focus:border-brown"
                placeholder="coliving-en-madrid"
              />
              <span className="text-xs text-grey/60">
                Se rellena automáticamente a partir del título. Puedes
                modificarlo si lo necesitas.
              </span>
            </>
          </label>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <label className="flex flex-col gap-1.5">
              <span className="text-sm font-medium text-grey">Idioma</span>
              <select
                name="locale"
                value={locale}
                onChange={(e) => setLocale(e.target.value)}
                className="w-full px-3 py-2.5 rounded-[12px] border border-grey/20 bg-white text-grey focus:outline-none focus:ring-2 focus:ring-brown/30 focus:border-brown"
              >
                <option value="es">Español</option>
                <option value="en">Inglés</option>
              </select>
            </label>

            <label className="flex flex-col gap-1.5">
              <span className="text-sm font-medium text-grey">Fecha</span>
              <input
                name="created_date"
                type="date"
                value={createdDate}
                onChange={(e) => setCreatedDate(e.target.value)}
                className="w-full px-4 py-2.5 rounded-[12px] border border-grey/20 bg-white text-grey placeholder:text-grey/50 focus:outline-none focus:ring-2 focus:ring-brown/30 focus:border-brown"
              />
            </label>
          </div>

          <label className="flex flex-col gap-1.5">
            <span className="text-sm font-medium text-grey">Extracto</span>
            <textarea
              name="excerpt"
              rows={3}
              value={excerpt}
              onChange={(e) => setExcerpt(e.target.value)}
              className="w-full px-4 py-2.5 rounded-[12px] border border-grey/20 bg-white text-grey placeholder:text-grey/50 focus:outline-none focus:ring-2 focus:ring-brown/30 focus:border-brown"
              placeholder="Pequeño resumen que se verá en el listado."
            />
          </label>

          <div className="flex flex-col gap-1.5">
            <span className="text-sm font-medium text-grey">
              Contenido <span className="text-red-600">*</span>
            </span>
            <RichTextEditor
              name="content"
              initialValue={initialValues?.content}
              onContentChange={setContent}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <label className="flex flex-col gap-1.5">
            <span className="text-sm font-medium text-grey">
              Imagen portada
            </span>
            <div className="flex gap-3 items-center">
              <input
                name="cover_url"
                type="text"
                value={coverUrl}
                onChange={(e) => setCoverUrl(e.target.value)}
                className="flex-1 px-4 py-2.5 rounded-[12px] border border-grey/20 bg-white text-grey placeholder:text-grey/50 focus:outline-none focus:ring-2 focus:ring-brown/30 focus:border-brown"
                placeholder="https://... (opcional si subes archivo)"
              />
              <input
                ref={coverInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => handleUpload("cover", e.target.files?.[0])}
              />
              <button
                type="button"
                onClick={() => coverInputRef.current?.click()}
                disabled={isUploadingCover}
                className="px-3 py-2 rounded-[12px] border border-brown/40 text-sm font-medium text-grey bg-white hover:bg-brown/10 disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {isUploadingCover ? "Subiendo..." : "Subir"}
              </button>
            </div>
          </label>

          <label className="flex flex-col gap-1.5">
            <span className="text-sm font-medium text-grey">
              Imagen listado
            </span>
            <div className="flex gap-3 items-center">
              <input
                name="list_image_url"
                type="text"
                value={listImageUrl}
                onChange={(e) => setListImageUrl(e.target.value)}
                className="flex-1 px-4 py-2.5 rounded-[12px] border border-grey/20 bg-white text-grey placeholder:text-grey/50 focus:outline-none focus:ring-2 focus:ring-brown/30 focus:border-brown"
                placeholder="(opcional, si es distinta de la portada)"
              />
              <input
                ref={listInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => handleUpload("list", e.target.files?.[0])}
              />
              <button
                type="button"
                onClick={() => listInputRef.current?.click()}
                disabled={isUploadingList}
                className="px-3 py-2 rounded-[12px] border border-brown/40 text-sm font-medium text-grey bg-white hover:bg-brown/10 disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {isUploadingList ? "Subiendo..." : "Subir"}
              </button>
            </div>
          </label>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <label className="flex flex-col gap-1.5">
            <span className="text-sm font-medium text-grey">Autor</span>
            <input
              name="author"
              type="text"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              className="w-full px-4 py-2.5 rounded-[12px] border border-grey/20 bg-white text-grey placeholder:text-grey/50 focus:outline-none focus:ring-2 focus:ring-brown/30 focus:border-brown"
              placeholder="Nombre del autor"
            />
          </label>

          <fieldset className="flex flex-col gap-2">
            <legend className="text-sm font-medium text-grey mb-1">
              Categorías
            </legend>
            <div className="flex flex-wrap gap-3">
              {CATEGORIES.map((cat) => (
                <label key={cat.value} className="inline-flex">
                  <input
                    type="checkbox"
                    name="tags"
                    value={cat.value}
                    checked={tags.includes(cat.value)}
                    onChange={() => toggleTag(cat.value)}
                    className="peer sr-only"
                  />
                  <span className="inline-block px-3 py-1.5 rounded-full text-sm font-medium border border-brown/40 text-grey bg-white peer-checked:bg-brown/80 peer-checked:text-white transition-colors cursor-pointer">
                    {cat.label}
                  </span>
                </label>
              ))}
            </div>
          </fieldset>
        </div>

        <div className="mt-2 flex flex-wrap items-center gap-6">
          <button
            type="submit"
            className="inline-flex items-center justify-center px-5 py-2.5 rounded-[12px] bg-brown text-white font-semibold hover:bg-brown/90 focus:outline-none focus:ring-2 focus:ring-brown/30 transition-colors"
          >
            Guardar post
          </button>
          <label className="inline-flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              name="published"
              checked={published}
              onChange={(e) => setPublished(e.target.checked)}
              className="h-4 w-4 rounded border-grey/30 text-brown accent-brown focus:ring-brown/0 cursor-pointer"
            />
            <span className="text-sm font-medium text-grey">Publicar al guardar</span>
          </label>
        </div>
      </form>

      <section className="border-t border-grey/15 pt-10">
        <h2 className="text-xl font-bold text-grey mb-4">
          Vista previa (como en producción)
        </h2>
        <BlogPostPreview
          title={title}
          content={content}
          coverUrl={coverUrl || null}
          listImageUrl={listImageUrl || null}
          tags={tags}
          locale={locale}
        />
      </section>
    </div>
  );
}
