import { NextResponse } from "next/server";
import { auth } from "@/auth";

export default auth((req) => {
  const role = req.auth?.user?.role;

  if (!req.auth) {
    const url = new URL("/ingresar", req.nextUrl.origin);
    url.searchParams.set("callbackUrl", req.nextUrl.pathname);
    return NextResponse.redirect(url);
  }

  if (role !== "admin") {
    return NextResponse.redirect(new URL("/", req.nextUrl.origin));
  }

  return NextResponse.next();
});

export const config = {
  matcher: ["/admin/:path*"],
};
