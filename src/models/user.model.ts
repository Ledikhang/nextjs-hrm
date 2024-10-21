import { UserRoles } from "@/enums/user-roles";

export interface User {
  id: number;
  email: string;
  name: string;
  avatar?: string;
  role: {
    id: number;
    role: UserRoles;
  };
}
