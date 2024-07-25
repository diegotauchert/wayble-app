import { ACCESS_TOKEN_EXPIRES_IN_MINUTES } from "@/constants/globalVars";
import { AuthService } from "@/services/AuthService";

export async function refreshAccessToken(token: any) {
  try {
    const { access: newAccessToken } = await AuthService.refreshToken(token.refreshToken)

    return {
      ...token,
      accessToken: newAccessToken,
      accessTokenExpires: (Date.now() + ACCESS_TOKEN_EXPIRES_IN_MINUTES * 60 * 1000)
    };
  } catch (error) { 
    console.log(error) 
    return token;
  }
}

export const slugify = (title: string): string => {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '') 
    .replace(/\s+/g, '-') 
    .replace(/-+/g, '-')
    .replace(/^-+|-+$/g, '')
}
