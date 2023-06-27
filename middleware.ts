import { NextResponse, NextMiddleware } from "next/server";
import type { NextRequest, NextFetchEvent } from "next/server";
import { doFetchUser, isAdminUser } from "libs/auth/user";

export const config = {
  matcher: "/((?!static|.*\\..*|_next).*)",
};

function isAdminRoute(request: NextRequest) {
  return request.nextUrl.pathname.startsWith("/admin");
}

function isLogoutRoute(request: NextRequest) {
  return request.nextUrl.pathname.startsWith("/logout");
}

function isProtectedRoute(request: NextRequest) {
  return (
    request.nextUrl.pathname.startsWith("/protected") ||
    request.nextUrl.pathname.startsWith("/me")
  );
}

function redirectLoginResponse(request: NextRequest) {
  const { pathname, search, basePath } = request.nextUrl;

  const signInUrl = new URL("/login", request.url);
  const callbackUrl = `${basePath}${pathname}${search}`;
  if (callbackUrl) {
    signInUrl.searchParams.append("callbackUrl", callbackUrl);
  }
  return NextResponse.redirect(signInUrl);
}

export async function middleware(request: NextRequest) {
  const { pathname, search, origin, basePath } = request.nextUrl;
  console.log("in mid ware", pathname);

  const accessToken = request.cookies.get("auth-token")?.value;
  const nextResponse = NextResponse.next();
  const redirectHomeResponse = NextResponse.redirect(new URL("/", request.url));

  if (isLogoutRoute(request)) {
    const logoutResponse = NextResponse.redirect(
      new URL("/login", request.url)
    );
    logoutResponse.cookies.delete("auth-token");
    return logoutResponse;
  }

  if (isAdminRoute(request)) {
    if (!accessToken) {
      console.error(
        `No access token found (navigating ${request.nextUrl.pathname})`
      );
      return redirectLoginResponse(request);
    }

    const userResp = await doFetchUser(request.cookies.toString());
    const user = userResp.ok ? await userResp.json() : null;

    if (!isAdminUser(user)) {
      console.error(
        `User is not an admin: ${user?.email} (navigating ${request.nextUrl.pathname})`
      );
      return redirectHomeResponse;
    }

    return nextResponse;
  }

  if (isProtectedRoute(request) && !accessToken) {
    console.error(
      `No access token found (navigating ${request.nextUrl.pathname})`
    );
    return redirectLoginResponse(request);
  }

  return nextResponse;
}
