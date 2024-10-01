import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

export async function middleware(req) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  const url = req.nextUrl.clone();

  const isOnDashboardPanel = url.pathname.startsWith("/dashboard");
  const isOnUsersPage = url.pathname.startsWith("/users");
  const isOnLoginPage = url.pathname.startsWith("/login");

  // Redirect unauthenticated users to login page if trying to access protected pages
  if (!token && (isOnDashboardPanel || isOnUsersPage)) {
    url.pathname = "/login";
    return NextResponse.redirect(url);
  }

  // Only admins can access dashboard
  if (isOnDashboardPanel && token && !token.isAdmin) {
    return new Response("Unauthorized", { status: 403 });
  }

  // Redirect authenticated users away from the login page
  if (isOnLoginPage && token) {
    url.pathname = "/";
    return NextResponse.redirect(url);
  }

  // Allow access to the route if no conditions are met
  return NextResponse.next();
}

// Match routes to apply middleware, excluding API routes and static files
export const config = {
  matcher: ["/((?!api|static|.*\\..*|_next).*)"], // Apply to all routes except these
};
