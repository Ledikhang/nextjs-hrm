// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  if (
    (pathname === "/login" || pathname === "/register") &&
    request.cookies.get("Authentication")
  ) {
    return NextResponse.redirect(new URL("/", request.url));
  }
  return NextResponse.next();
}

export const config = {
  matcher: [
    "/login",
    "/register",
    "/confirm-email",
    "/forgot-password",
    "/reset-password",
  ],
};
