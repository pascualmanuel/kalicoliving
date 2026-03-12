import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import AdminHeader from "@/app/admin/AdminHeader";

export default async function AdminBlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
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
      <main className="px-4 py-8  md:py-10 md:px-20 mx-auto">{children}</main>
    </>
  );
}
