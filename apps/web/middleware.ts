import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

// Routes that require authentication
const protectedRoutes = ["/dashboard", "/profile", "/settings"];

// Routes that should redirect to dashboard if user is authenticated
const authRoutes = ["/auth", "/login", "/signup"];

export function middleware(request: NextRequest) {
	const { pathname } = request.nextUrl;

	// Check if the current route is protected
	const isProtectedRoute = protectedRoutes.some((route) => pathname.startsWith(route));

	// Check if the current route is an auth route
	const isAuthRoute = authRoutes.some((route) => pathname.startsWith(route));

	// Get the session token from cookies
	const sessionToken = request.cookies.get("better-auth.session_token")?.value;

	// If trying to access protected route without session, redirect to auth
	if (isProtectedRoute && !sessionToken) {
		const authUrl = new URL("/auth", request.url);
		authUrl.searchParams.set("redirect", pathname);
		return NextResponse.redirect(authUrl);
	}

	// If trying to access auth route with session, redirect to dashboard
	if (isAuthRoute && sessionToken) {
		return NextResponse.redirect(new URL("/dashboard", request.url));
	}

	return NextResponse.next();
}

export const config = {
	matcher: [
		/*
		 * Match all request paths except for the ones starting with:
		 * - api (API routes)
		 * - _next/static (static files)
		 * - _next/image (image optimization files)
		 * - favicon.ico (favicon file)
		 */
		"/((?!api|_next/static|_next/image|favicon.ico).*)",
	],
};
