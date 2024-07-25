import CredentialsProvider from 'next-auth/providers/credentials';
import { NextAuthOptions, Session, User } from 'next-auth';
import { AuthService } from '@/services/AuthService';

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
      async authorize(credentials): Promise<User | null> {
        if (!credentials?.userName || !credentials?.password) {
          return null;
        }

        try {
          const user = await AuthService.login(credentials.userName, credentials.password);

          if (user) {
            return {
              id: user.id,
              email: user.email,
              accessToken: user.accessToken,
              refreshToken: user.refreshToken,
              accessTokenExpires: user.accessTokenExpires
            };
          } else {
            throw new Error('User not found or incorrect password');
          }
        } catch (error) {
          throw new Error('Invalid credentials. Login failed.');
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.accessToken = user.accessToken;
        token.refreshToken = user.refreshToken;
        token.accessTokenExpires = user.accessTokenExpires;
        token.user = user;
      }

      return token;
    },
    async session({ session, token }) {
      session.user = token.user as User;
      session.accessToken = token.accessToken as string;
      session.refreshToken = token.refreshToken as string;
      session.accessTokenExpires = token.accessTokenExpires as number;

      return session;
    },
  },
  pages: {
    error: '/',
  },
};
