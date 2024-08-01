import CredentialsProvider from 'next-auth/providers/credentials';
import { NextAuthOptions } from 'next-auth';
import { AuthService } from '@/services/AuthService';
import { UserTypeEnum } from "@/enum/UserTypeEnum";

type UserType = {
  id: number
  email: string
  role: UserTypeEnum
}

export const nextAuthOptions: NextAuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: 'jwt',
  },
  providers: [
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        userName: { label: 'Email', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials: Record<"userName" | "password", string>): Promise<UserType | null> {
        if (!credentials?.userName || !credentials?.password) {
          return null;
        }

        try {
          const user = await AuthService.login(credentials.userName, credentials.password);
          return user || null
        } catch (error) {
          throw new Error('Invalid credentials. Login failed.');
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.user = { ...user }
      }

      return token
    },
    async session({ session, token }) {
      if (token?.user) {
        session.user = token.user as UserType
      }
      session.accessToken = token.accessToken as string

      return session
    }
  },
  pages: {
    error: '/',
    signIn: '/',
    signOut: '/'
  },
};
