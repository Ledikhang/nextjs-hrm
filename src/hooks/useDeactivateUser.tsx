import { useMutation, useQueryClient } from "react-query";
import { message } from "antd";
import { deactivateUser } from "@/apis/deleteUser.api";
import { AxiosError, AxiosResponse } from "axios";

export const useDeactivateUser = () => {
  const queryClient = useQueryClient();

  return useMutation<AxiosResponse<void>, AxiosError, number>(deactivateUser, {
    onSuccess: () => {
      message.success("User deactivated successfully");
      queryClient.invalidateQueries(["users"]);
    },
    onError: () => {
      message.error("An error occurred");
    },
  });
};
