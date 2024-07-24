import NextAuth, { DefaultUser } from 'next-auth'

declare module 'next-auth' {
  interface User extends DefaultUser {
    userId: string
    username: string
    email: string
    photo: string
    first_name: string
    last_name: string
    name: string
    workspace: string
    signed_in: Date
    created: Date
    updated: Date
    accessToken: string
    refreshToken: string
    accessTokenExpires: number
  }

  interface Session {
    user: User,
    config: {
      role: string[]
      language: string
    },
    signed_in: Date
    accessToken: string,
    refreshToken: string,
    accessTokenExpires: number
  }
  
  interface JWT {
    user: User
    accessToken: string
    refreshToken: string
    accessTokenExpires: number
  }
}