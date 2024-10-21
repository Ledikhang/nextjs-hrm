import { authenticationApi } from "@/apis/authentication.api";
import { AuthContext } from "@/context/auth.context";
import { useRefresh } from "@/hooks/useRefresh";
import { useRouter } from "next/router";
import * as React from "react";
import { useEffect, useState } from "react";
import { useQuery, useQueryClient } from "react-query";

interface AuthProviderProps {
  children: React.ReactNode;
}

export default function AuthProvider({ children }: AuthProviderProps) {
  const { pathname } = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  console.log("🚀 ~ isLoading:", isLoading);
  const queryClient = useQueryClient();
  const queryResult = useQuery("authentication", authenticationApi, {
    retry: 0,
    refetchOnWindowFocus: true,
    refetchOnMount: true,
  });
  useRefresh(queryResult);

  const {
    isSuccess: isAuthenticated,
    isFetched,
    data: authenticationResult,
  } = queryResult;

  useEffect(() => {
    if (isAuthenticated && isFetched) setIsLoading(false);
  }, [isAuthenticated]);

  useEffect(() => {
    if (
      pathname === "/login" ||
      pathname === "/confirm-email" ||
      pathname === "/forgot-password" ||
      pathname === "/reset-password" ||
      pathname === "/register" ||
      pathname === "/register-confirmation"
    ) {
      setIsLoading(false);
    }
  }, [pathname]);

  const refreshAuth = () => {
    queryClient.invalidateQueries("authentication");
  };

  return (
    <AuthContext.Provider
      value={{
        user: authenticationResult?.data,
        isLoading,
        refreshAuth,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
