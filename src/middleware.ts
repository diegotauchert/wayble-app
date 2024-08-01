import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';
import { UserTypeEnum } from '@/enum/UserTypeEnum';
import { User } from 'next-auth';

export async function middleware(request: NextRequest) {
  const token = await getToken({ req: request });

  if (!token) {
    if (request.nextUrl.pathname.startsWith('/admin')) {
      return NextResponse.redirect(new URL('/', request.url));
    }
    return NextResponse.next();
  }

  const userRole = (token.user as User).role as UserTypeEnum;

  if (userRole === UserTypeEnum.admin) {
    return NextResponse.next();
  }

  if (userRole === UserTypeEnum.user && request.nextUrl.pathname.startsWith('/admin')) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/:path*'
  ],
};