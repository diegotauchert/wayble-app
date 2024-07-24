import { HttpConnect } from "@/http/HttpConnect";

export class AuthService {
  static async login(userName: string, password: string): Promise<any> {
    return (await HttpConnect.post('/access/token/', {
      email: userName,
      password
    })).data
  }

  static async refreshToken(token: string): Promise<any> {
    return (await HttpConnect.post('/access/token/refresh/', {
      refresh: token
    })).data
  }

  static async whoami(token: string): Promise<any> {
    return (await HttpConnect.get('/access/whoami', {
      headers: {
        Authorization: 'Bearer ' + token
      }
    })).data
  }
}