import { users } from "@/data/users";
import { UserInterface } from "@/interfaces/UserInterface";

export class AuthService {
  static async login(userName: string, password: string): Promise<UserInterface | null> {
    const user = users.find((user: UserInterface) => user.email === userName && user.password === password)
    if(!user) return null

    delete user.password
    return user
  }

  static async refreshToken(token: string): Promise<any> {
    return {}
  }
}