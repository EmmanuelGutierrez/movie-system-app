import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

const publicRoutes: string[] = ["/main", "/detail"];
const authRoutes: string[] = ["/signin", "/signup"];

export default async function middleware(request: NextRequest) {
  console.log("Middleware");
  const cookieStore =await  cookies();
  const token = cookieStore.get("auth_token");
  const path = request.nextUrl.pathname;
  console.log("PATH", path);
  const isPublicPath = publicRoutes.some((r) => {
    console.log(path.startsWith(r));
    return path.startsWith(r);
  });

  const isAuthPath = authRoutes.includes(path);
  console.log("public", !token || !token.value, isPublicPath);
  if ((!token || !token.value) && !isPublicPath && !isAuthPath) {
    const absoluteUrl = new URL("/signin", request.nextUrl.origin);
    return NextResponse.redirect(absoluteUrl);
  }
  console.log("isAuthPath", !token || !token.value, isAuthPath);
  if (token && isAuthPath) {
    const absoluteUrl = new URL("/main", request.nextUrl.origin);
    return NextResponse.redirect(absoluteUrl);
  }
  console.log("next");
  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
