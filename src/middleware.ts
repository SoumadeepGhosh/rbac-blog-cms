

import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const accessToken = request.cookies.get("accessToken")?.value;

  const pathname = request.nextUrl.pathname;

  const isAuthPage =
    pathname.startsWith("/login") || pathname.startsWith("/register");

  if (!accessToken && !isAuthPage) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  if (accessToken && isAuthPage) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/users/:path*",
    "/roles/:path*",
    "/settings/:path*",
    "/login",
    "/register",
  ],
};


// --------------------  Disable Middleware for API routes  ----------------


// import { NextResponse } from "next/server";

// export function middleware() {
//   return NextResponse.next();
// }
