"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

export default function AdminHeader() {
  const router = useRouter();

  async function handleSignOut() {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/");
    router.refresh();
  }

  return (
    <header className="border-b border-grey/10 bg-white/95 backdrop-blur-sm sticky top-0 z-10">
      <div className="max-w-5xl mx-auto px-4 md:px-8 h-14 flex items-center justify-between">
        <div className="flex items-center gap-6">
          <Link
            href="/es"
            className="text-grey font-semibold hover:text-brown transition-colors"
          >
            Home
          </Link>
        </div>
        <button
          type="button"
          onClick={handleSignOut}
          className="text-sm text-grey/70 hover:text-grey transition-colors"
        >
          Cerrar sesión
        </button>
      </div>
    </header>
  );
}
