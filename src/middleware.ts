import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

const privateRoutes: string[] = [];
const authRoutes: string[] = ["/signin"];

export default async function middleware(request: NextRequest) {
  console.log("Middleware")
  const cookieStore = cookies();
  const token = cookieStore.get("auth_token");
  console.log("token",token)
  const path = request.nextUrl.pathname;
  const isProtected = privateRoutes.some((r) => r.startsWith(path));
  console.log("path", path);
  if ((!token||!token.value) && isProtected) {
    const absoluteUrl = new URL("/signin", request.nextUrl.origin);
    return NextResponse.redirect(absoluteUrl);
  }
console.log("isProtected", isProtected);
const isAuth = authRoutes.includes(path);
console.log("isAuth", isAuth, token && isAuth);
  if (token && isAuth) {
    console.log("RED")
    const absoluteUrl = new URL("/main", request.nextUrl.origin);
    return NextResponse.redirect(absoluteUrl);
  }
  console.log("next");
  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};