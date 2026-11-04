import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import { DrizzleAdapter } from "@auth/drizzle-adapter";
import { eq } from "drizzle-orm";
import { db } from "@/db";
import { accounts, sessions, users, verificationTokens } from "@/db/schema";

export function isAdminEmail(email?: string | null) {
  if (!email) return false;
  const list = (process.env.ADMIN_EMAILS ?? "")
    .split(",")
    .map((e) => e.trim().toLowerCase())
    .filter(Boolean);
  return list.includes(email.toLowerCase());
}

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: DrizzleAdapter(db, {
    usersTable: users,
    accountsTable: accounts,
    sessionsTable: sessions,
    verificationTokensTable: verificationTokens,
  }),
  providers: [Google],
  session: { strategy: "jwt" },
  pages: { signIn: "/ingresar" },
  callbacks: {
    jwt({ token }) {
      // ADMIN_EMAILS es la fuente de verdad: si se quita un email, pierde acceso.
      token.role = isAdminEmail(token.email) ? "admin" : "user";
      return token;
    },
    session({ session, token }) {
      if (session.user) {
        session.user.role = token.role === "admin" ? "admin" : "user";
        if (token.sub) session.user.id = token.sub;
      }
      return session;
    },
  },
  events: {
    async signIn({ user }) {
      if (user.id && isAdminEmail(user.email)) {
        await db
          .update(users)
          .set({ role: "admin" })
          .where(eq(users.id, user.id));
      }
    },
  },
});

export async function requireAdmin() {
  const session = await auth();
  if (session?.user?.role !== "admin") {
    throw new Error("No autorizado");
  }
  return session;
}
