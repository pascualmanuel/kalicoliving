"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

export default function AdminLoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    const supabase = createClient();
    const { error: signInError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    setLoading(false);
    if (signInError) {
      setError(
        signInError.message === "Invalid login credentials"
          ? "Email o contraseña incorrectos."
          : signInError.message,
      );
      return;
    }
    router.push("/admin/blog");
    router.refresh();
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-white">
      <div className="w-full max-w-[400px]">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-sm text-grey/70 hover:text-grey mb-6 transition-colors"
        >
          ← Volver a Home
        </Link>
        <h1 className="text-2xl md:text-3xl font-bold text-grey mb-2">
          Kali Admin
        </h1>
        {/* <p className="text-grey/70 text-sm mb-8">
          Inicia sesión para gestionar el blog.
        </p> */}
        <form
          onSubmit={handleSubmit}
          className="admin-login-form flex flex-col gap-4"
        >
          <label className="flex flex-col gap-1.5">
            <span className="text-sm font-medium text-grey">Email</span>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-3 rounded-[12px] border border-grey/20 bg-white text-grey placeholder:text-grey/50 focus:outline-none focus:ring-2 focus:ring-brown/30 focus:border-brown"
              placeholder="tu@email.com"
              autoComplete="email"
            />
          </label>
          <label className="flex flex-col gap-1.5">
            <span className="text-sm font-medium text-grey">Contraseña</span>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-3 rounded-[12px] border border-grey/20 bg-white text-grey placeholder:text-grey/50 focus:outline-none focus:ring-2 focus:ring-brown/30 focus:border-brown"
              placeholder="••••••••"
              autoComplete="current-password"
            />
          </label>
          {error && (
            <p className="text-sm text-red-600" role="alert">
              {error}
            </p>
          )}
          <button
            type="submit"
            disabled={loading}
            className="mt-2 w-full py-3 px-4 rounded-[12px] bg-brown text-white font-semibold hover:bg-brown/90 focus:outline-none focus:ring-2 focus:ring-brown/30 disabled:opacity-60 disabled:cursor-not-allowed transition-colors"
          >
            {loading ? "Entrando…" : "Entrar"}
          </button>
        </form>
      </div>
    </div>
  );
}
