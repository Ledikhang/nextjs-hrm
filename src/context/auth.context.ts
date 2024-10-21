import { User } from "@/models/user.model";
import React from "react";

export interface AuthContextType {
  user: User | undefined;
  isLoading: boolean;
  refreshAuth: () => void;
}

export const AuthContext = React.createContext<AuthContextType | null>(null);
