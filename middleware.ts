import { NextRequest, NextResponse } from "next/server";
import { isAuthenticated } from "./app/cookies";

export async function middleware(req: NextRequest) {
  const isLoggedIn = await isAuthenticated();
  if (!isLoggedIn) {
    return NextResponse.redirect(new URL("/login", req.url));
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/links", "/profile", "/preview"],
};
