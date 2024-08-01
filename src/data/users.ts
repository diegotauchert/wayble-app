import { UserTypeEnum } from "@/enum/UserTypeEnum";
import { UserInterface } from "@/interfaces/UserInterface";

export const users: UserInterface[] = [
  { 
    id: 1, 
    email: 'user@gmail.com', 
    password: '123456',
    role: UserTypeEnum.user
  },
  { 
    id: 2, 
    email: 'admin@gmail.com', 
    password: '123456',
    role: UserTypeEnum.admin
  }
]