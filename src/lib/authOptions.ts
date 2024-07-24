import CredentialsProvider from 'next-auth/providers/credentials'
import { NextAuthOptions, Session } from 'next-auth'
import { AuthService } from '@/services/AuthService'
import { refreshAccessToken } from '@/helpers/functions';
import { ACCESS_TOKEN_EXPIRES_IN_MINUTES } from '@/constants/globalVars';

/**
 * Configuration options for NextAuth.
 */
export const nextAuthOptions: NextAuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: 'jwt',
  },
  providers: [
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        userName: { label: 'email', type: 'text' },
        password: { label: 'password', type: 'password' }
      },

      /**
       * Authorize function for the credentials provider.
       * @param credentials - The user's credentials.
       * @returns The user object if the credentials are valid, otherwise null.
       * @throws Error if the credentials are invalid.
       */
      async authorize(credentials) {
        if (!credentials?.userName || !credentials?.password) {
          return null
        }
        try {
          const response = await AuthService.login(credentials.userName, credentials.password)
          const user = await AuthService.whoami(response.access)
          
          return {
            ...user,
            signed_in: new Date(),
            accessToken: response.access,
            refreshToken: response.refresh,
            accessTokenExpires: (Date.now() + ACCESS_TOKEN_EXPIRES_IN_MINUTES * 60 * 1000)
          };
        } catch (error) {
          throw new Error('Invalid credentials');
        }
      }
    }),
  ],
  callbacks: {
    /**
     * Callback function for manipulating the JWT token.
     * @param token - The JWT token.
     * @param user - The user object.
     * @param trigger - The trigger for the callback.
     * @param session - The session object.
     * @returns The updated token.
     */
    async jwt({ token, user, trigger, session }) {
      if (user) {
        token.accessToken = user.accessToken,
        token.refreshToken = user.refreshToken,
        token.accessTokenExpires = user.accessTokenExpires,
        token.signed_in = user.signed_in,
        token.user = user
      }

      if (trigger === 'update') {
        return {
          ...token,
          user: {
            user: session.user
          }    
        }
      }

      const accessTokenExpires: number = Number((token.accessTokenExpires as number).toString().substring(0, 10));
      const nowDate: number = Number(Date.now().toString().substring(0, 10));
      const isTokenValid: boolean = accessTokenExpires > nowDate;

      if (isTokenValid) {
        return token
      }

      token = await refreshAccessToken(token)
      return token
    },
    /**
     * Callback function for manipulating the session object.
     * @param session - The session object.
     * @param token - The JWT token.
     * @returns The updated session object.
     */
    async session({ session, token }) {
      session = token.user as Session
      session.accessToken = token.accessToken as string
      session.refreshToken = token.refreshToken as string
      session.accessTokenExpires = token.accessTokenExpires as number

      return session
    }
  },
  pages: {
    signIn: '/',
    signOut: '/',
    error: '/',
  }
}