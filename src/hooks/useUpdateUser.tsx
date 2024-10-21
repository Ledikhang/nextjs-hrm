import { useMutation, useQueryClient } from "react-query";
import { message } from "antd";
import { updateUser, UpdateUserDto } from "@/apis/updateUser.api";
import { useContext } from "react";
import { AuthContext } from "@/context/auth.context";

export const useUpdateUser = () => {
  const { refreshAuth } = useContext(AuthContext)!;

  const queryClient = useQueryClient();

  return useMutation(
    ({ id, data }: { id: number; data: UpdateUserDto }) => updateUser(id, data),
    {
      onSuccess: () => {
        message.success("User updated successfully");
        refreshAuth();
        queryClient.invalidateQueries(["users"]);
      },
      onError: () => {
        message.error("Failed to update user");
      },
    }
  );
};
