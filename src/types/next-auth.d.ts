import NextAuth, { DefaultUser } from 'next-auth'

declare module 'next-auth' {
  interface User extends DefaultUser {
    id: number
    email: string
    accessToken: string
    refreshToken: string
    accessTokenExpires: number
  }

  interface Session {
    user: User
    accessToken: string
    refreshToken: string
    accessTokenExpires: number
  }
  
  interface JWT {
    user: User
    accessToken: string
    refreshToken: string
    accessTokenExpires: number
  }
}
