import { redirect } from "next/navigation";
import { auth, signOut } from "@/auth";
import { AdminNav } from "@/features/admin/components/AdminNav";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Admin | Coldwell Neumáticos",
  robots: { index: false, follow: false },
};

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Doble chequeo además de proxy.ts.
  const session = await auth();
  if (session?.user?.role !== "admin") redirect("/ingresar");

  async function logout() {
    "use server";
    await signOut({ redirectTo: "/" });
  }

  return (
    <div className="min-h-screen bg-lightGray/50 lg:flex text-foreground">
      <AdminNav email={session.user.email ?? ""} logout={logout} />
      <div className="flex-1 min-w-0 px-5 py-8 lg:px-10 lg:py-10">
        {children}
      </div>
    </div>
  );
}
