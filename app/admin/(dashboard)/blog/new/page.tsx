import Link from "next/link";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { getAdminClient } from "@/lib/supabase/admin";
import type { BlogPostCategory } from "@/lib/blog";
import { getBlogPostById } from "@/lib/blog";
import NewBlogFormWithPreview from "./NewBlogFormWithPreview";
import type { NewPostInitialValues } from "./NewBlogFormWithPreview";

async function createPost(formData: FormData) {
  "use server";

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    throw new Error("Debes iniciar sesión para crear un post.");
  }

  const admin = getAdminClient();

  const title = (formData.get("title") as string)?.trim();
  const rawSlugInput = ((formData.get("slug") as string) || "").trim();
  const locale = (formData.get("locale") as string) || "es";
  const excerpt = (formData.get("excerpt") as string)?.trim() || null;
  const content = (formData.get("content") as string)?.trim() || "";
  const coverUrl = (formData.get("cover_url") as string)?.trim() || null;
  const listImageUrl =
    (formData.get("list_image_url") as string)?.trim() || null;
  const author = (formData.get("author") as string)?.trim() || null;
  const createdDateRaw =
    (formData.get("created_date") as string)?.trim() || null;
  const published = formData.get("published") === "on";
  const tagsRaw = formData.getAll("tags") as string[];
  const translationKey = (formData.get("translation_key") as string)?.trim() || null;
  const fromId = (formData.get("from_id") as string)?.trim() || null;

  if (!title) {
    throw new Error("El título es obligatorio.");
  }

  const slugSource = rawSlugInput || title;

  const slug =
    slugSource
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");

  const words = content
    .replace(/<[^>]+>/g, " ")
    .split(/\s+/)
    .filter(Boolean).length;
  const readingTime = words > 0 ? Math.max(1, Math.ceil(words / 200)) : null;

  const allowedTags: BlogPostCategory[] = [
    "culture",
    "gastro",
    "entrepreneur",
    "plans",
  ];
  const tags = tagsRaw.filter((t) =>
    allowedTags.includes(t as BlogPostCategory),
  );

  const baseData: Record<string, unknown> = {
    title,
    slug,
    locale,
    excerpt,
    content,
    cover_url: coverUrl,
    list_image_url: listImageUrl,
    author,
    reading_time: readingTime,
    published,
    tags,
  };
  if (translationKey) {
    baseData.translation_key = translationKey;
  }

  if (createdDateRaw) {
    const createdDate = new Date(`${createdDateRaw}T00:00:00`);
    if (!Number.isNaN(createdDate.getTime())) {
      baseData.created_at = createdDate.toISOString();
    }
  }

  const { error } = await admin.from("blog_posts").insert(baseData);

  if (error) {
    console.error("Error creating blog post:", error);
    throw new Error("No se pudo crear el post.");
  }

  if (fromId && translationKey) {
    await admin
      .from("blog_posts")
      .update({ translation_key: translationKey })
      .eq("id", fromId);
  }

  redirect("/admin/blog");
}

type Props = { searchParams: Promise<{ from?: string }> };

export default async function AdminBlogNewPage({ searchParams }: Props) {
  const fromId = (await searchParams).from;
  let initialValues: NewPostInitialValues | undefined;

  if (fromId) {
    const supabase = await createClient();
    const sourcePost = await getBlogPostById(supabase, fromId);
    if (sourcePost) {
      const otherLocale = sourcePost.locale === "es" ? "en" : "es";
      const translationKey =
        sourcePost.translation_key ?? crypto.randomUUID();
      initialValues = {
        locale: otherLocale,
        slug: "",
        title: "",
        excerpt: "",
        cover_url: sourcePost.cover_url ?? "",
        list_image_url: sourcePost.list_image_url ?? "",
        tags: sourcePost.tags ?? [],
        translation_key: translationKey,
        from_id: sourcePost.id,
      };
    }
  }

  return (
    <div>
      <Link
        href="/admin/blog"
        className="text-sm text-grey/70 hover:text-grey mb-4 inline-block"
      >
        ← Volver al listado
      </Link>
      <h1 className="text-2xl font-bold text-grey mb-6">
        {initialValues?.from_id ? "Nueva traducción" : "Nuevo post"}
      </h1>

      <NewBlogFormWithPreview action={createPost} initialValues={initialValues} />
    </div>
  );
}
