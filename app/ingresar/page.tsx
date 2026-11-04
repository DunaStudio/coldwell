import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import { auth, signIn } from "@/auth";
import logo from "@/public/images/Logo.png";

export const metadata = { title: "Ingresar | Coldwell Neumáticos" };

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ callbackUrl?: string }>;
}) {
  const { callbackUrl } = await searchParams;
  const redirectTo =
    callbackUrl && callbackUrl.startsWith("/") ? callbackUrl : "/admin";

  const session = await auth();
  if (session?.user?.role === "admin") redirect(redirectTo);

  return (
    <div className="min-h-screen bg-primary flex items-center justify-center px-5">
      <div className="bg-white w-full max-w-md p-8 md:p-10 flex flex-col gap-8">
        <Link href="/" className="self-center">
          <Image
            src={logo}
            alt="Coldwell Neumáticos"
            width={200}
            height={50}
            className="w-44 h-auto"
          />
        </Link>
        <div className="flex flex-col gap-2 text-center">
          <h1 className="text-primary text-[28px] font-normal">
            Panel de administración
          </h1>
          <p className="text-secondary font-light">
            Ingresá con tu cuenta de Google autorizada.
          </p>
          {session && (
            <p className="text-red-600 text-sm mt-2">
              La cuenta {session.user.email} no tiene acceso al panel.
            </p>
          )}
        </div>
        <form
          action={async () => {
            "use server";
            await signIn("google", { redirectTo });
          }}
        >
          <button
            type="submit"
            className="w-full border border-primary bg-primary text-white px-8 py-3 text-[18px] hover:bg-white hover:text-primary transition-all ease-in-out duration-150 cursor-pointer"
          >
            Ingresar con Google
          </button>
        </form>
      </div>
    </div>
  );
}
