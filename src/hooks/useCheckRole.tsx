import { AuthContext } from "@/context/auth.context";
import { UserRoles } from "@/enums/user-roles";
import { useContext } from "react";

export function useCheckRole() {
  const authContext = useContext(AuthContext)!;
  const { user } = authContext;

  const checkRole = (roles: UserRoles[]): boolean => {
    if (!user || !user.role) return false;
    const userRole = user.role.role as UserRoles;
    return roles.includes(userRole);
  };

  return { checkRole };
}
