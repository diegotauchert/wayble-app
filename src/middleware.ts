import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const requestHeaders = new Headers(request.headers)

  requestHeaders.set('Content-Security-Policy', 'upgrade-insecure-requests')

  return NextResponse.next({
    headers: requestHeaders,
    request: {
      headers: requestHeaders,
    },
  })

  // return NextResponse.next()
}

export const config = {
  matcher: [
    '/jobs/:path*'
  ],
}