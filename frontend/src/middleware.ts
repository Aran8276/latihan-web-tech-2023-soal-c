import { NextRequest, NextResponse } from "next/server";
import { getUser } from "./app/fetcher";

export async function middleware(request: NextRequest) {
  const user = await getUser();

  if (!user || user.role != "manager") {
    return NextResponse.redirect(new URL("/login", request.url));
  }
}

export const config = {
  matcher: ["/admin/:path*", "/admin"],
};
