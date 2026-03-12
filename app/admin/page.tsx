import Link from "next/link";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import AdminHeader from "@/app/admin/AdminHeader";

export default async function AdminPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    redirect("/admin/login");
  }

  return (
    <>
      <AdminHeader />
      <main className="px-4 py-8 md:py-10 md:px-20 mx-auto max-w-3xl">
        <h1 className="text-2xl md:text-3xl font-bold text-grey mb-2 recoleta">
          Bienvenido al dashboard de Kali
        </h1>
        <p className="text-grey/70 text-base mb-10">
          Elige qué quieres gestionar.
        </p>

        <div className="grid gap-4 sm:grid-cols-2">
          <Link
            href="/admin/blog"
            className="group flex flex-col rounded-[20px] border border-grey/10 bg-white p-6 transition-colors hover:border-brown/30 hover:bg-brown/[0.04]"
          >
            <span className="text-grey/60 text-sm font-medium uppercase tracking-[0.06em] mb-2">
              Contenido
            </span>
            <span className="text-xl font-semibold text-grey recoleta group-hover:text-brown transition-colors">
              Blog
            </span>
            <p className="mt-2 text-sm text-grey/70">
              Crear y editar entradas del blog.
            </p>
            <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-brown">
              Ir al blog
              <svg
                className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </span>
          </Link>

          <Link
            href="/admin/rooms"
            className="group flex flex-col rounded-[20px] border border-grey/10 bg-white p-6 transition-colors hover:border-brown/30 hover:bg-brown/[0.04]"
          >
            <span className="text-grey/60 text-sm font-medium uppercase tracking-[0.06em] mb-2">
              Home
            </span>
            <span className="text-xl font-semibold text-grey recoleta group-hover:text-brown transition-colors">
              Rooms carousel
            </span>
            <p className="mt-2 text-sm text-grey/70">
              Imágenes y textos del carrusel de la home.
            </p>
            <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-brown">
              Gestionar rooms
              <svg
                className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </span>
          </Link>
        </div>

        <div className="mt-10 pt-8 border-t border-grey/10">
          <Link
            href="/es"
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
            Volver al sitio
          </Link>
        </div>
      </main>
    </>
  );
}
