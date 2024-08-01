import { UserTypeEnum } from "@/enum/UserTypeEnum";

export interface UserInterface {
  id: number, 
  email: string, 
  password: string,
  role: UserTypeEnum
}