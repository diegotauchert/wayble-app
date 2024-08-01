import NextAuth from 'next-auth'
import { UserTypeEnum } from "@/enum/UserTypeEnum";

declare module 'next-auth' {
  interface User {
    id: id
    email: string
    role: UserTypeEnum
  }

  interface Session {
    accessToken: string
    user: {
      id: number
      email: string
      role: UserTypeEnum
    }
  }
}
