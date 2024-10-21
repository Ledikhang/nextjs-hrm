import { logOutApi } from "@/apis/logOut.api";
import { useRouter } from "next/router";
import { useMutation, useQueryClient } from "react-query";

export const useLogout = () => {
  const queryClient = useQueryClient();

  const router = useRouter();

  return useMutation(logOutApi, {
    onSuccess: () => {
      queryClient.clear();
      router.push("/login");
    },
    onError: (error) => {
      console.log("Logout Failed", error);
    },
  });
};
