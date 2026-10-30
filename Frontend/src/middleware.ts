import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";


export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // admin routes
  if (!pathname.startsWith("/admin")) {
    return NextResponse.next();
  }

  const authCookie = request.cookies.get("auth-storage");
  let isAdmin = false;

  if (authCookie?.value) {
    try {
      const parsed = JSON.parse(decodeURIComponent(authCookie.value)) as {
        state?: {
          token?: string;
          isAuthenticated?: boolean;
          user?: { role?: string };
        };
      };

      const token = parsed?.state?.token;
      const isAuthenticated = parsed?.state?.isAuthenticated;
      const role = parsed?.state?.user?.role;

      if (token && isAuthenticated && role === "admin") {
        isAdmin = true;
      }
    } catch {
    }
  }

  if (pathname === "/admin/login") {
    if (isAdmin) {
      return NextResponse.redirect(new URL("/admin", request.url));
    }
    return NextResponse.next();
  }

  if (!isAdmin) {
    const loginUrl = new URL("/admin/login", request.url);
    const response = NextResponse.redirect(loginUrl);
    if (authCookie?.value && !isAdmin) {
      response.cookies.delete("auth-storage");
    }
    return response;
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
