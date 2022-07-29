import { NextResponse } from "next/server";

export function middleware(request) {
  const matches = request.nextUrl.pathname.match(
    /^\/(?!maintenance|_next|favicon).*$/
  );

  if (matches) {
    return NextResponse.redirect(new URL("/maintenance", request.url));
  }

  return NextResponse.next();
}
