import { ACCESS_TOKEN_EXPIRES_IN_MINUTES } from '@/constants/globalVars';
import { users } from "@/data/users";

export class AuthService {
  static async login(userName: string, password: string): Promise<any> {
    const user = users.find(
      (user) => user.email === userName && user.password === password
    );

    if (!user) return null;

    return {
      ...user,
      accessToken: 'your-access-token',
      refreshToken: 'your-refresh-token',
      accessTokenExpires: Date.now() + 60 * 60 * ACCESS_TOKEN_EXPIRES_IN_MINUTES
    };
  }


  static async refreshToken(token: string): Promise<any> {
    return {}
  }
}