import Link from "next/link";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { getAdminClient } from "@/lib/supabase/admin";
import { getBlogPostById } from "@/lib/blog";
import type { BlogPostCategory } from "@/lib/blog";
import NewBlogFormWithPreview from "@/app/admin/(dashboard)/blog/new/NewBlogFormWithPreview";
import type { NewPostInitialValues } from "@/app/admin/(dashboard)/blog/new/NewBlogFormWithPreview";

async function updatePost(id: string, formData: FormData) {
  "use server";

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    throw new Error("Debes iniciar sesión para editar un post.");
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

  const updateData: Record<string, unknown> = {
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

  if (createdDateRaw) {
    const createdDate = new Date(`${createdDateRaw}T00:00:00`);
    if (!Number.isNaN(createdDate.getTime())) {
      updateData.created_at = createdDate.toISOString();
    }
  }

  const { error } = await admin
    .from("blog_posts")
    .update(updateData)
    .eq("id", id);

  if (error) {
    console.error("Error updating blog post:", error);
    throw new Error("No se pudo actualizar el post.");
  }

  redirect("/admin/blog");
}

export default async function AdminBlogEditPage({
  params,
}: {
  params: { id: string };
}) {
  const supabase = await createClient();
  const post = await getBlogPostById(supabase, params.id);

  if (!post) {
    redirect("/admin/blog");
  }

  const initialValues: NewPostInitialValues = {
    locale: post.locale,
    slug: post.slug,
    title: post.title,
    excerpt: post.excerpt ?? "",
    content: post.content,
    cover_url: post.cover_url ?? "",
    list_image_url: post.list_image_url ?? "",
    tags: post.tags ?? [],
    created_date:
      post.created_at && !Number.isNaN(new Date(post.created_at).getTime())
        ? new Date(post.created_at).toISOString().slice(0, 10)
        : "",
  };

  return (
    <div>
      <Link
        href="/admin/blog"
        className="text-sm text-grey/70 hover:text-grey mb-4 inline-block"
      >
        ← Volver al listado
      </Link>
      <h1 className="text-2xl font-bold text-grey mb-6">Editar post</h1>

      <NewBlogFormWithPreview
        action={updatePost.bind(null, params.id)}
        initialValues={initialValues}
      />
    </div>
  );
}
