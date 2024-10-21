import { useMutation } from "react-query";
import { message } from "antd";
import {
  ForgotPasswordInput,
  forgotPasswordApi,
} from "@/apis/forgotPassword.api";

export function useForgotPassword() {
  const mutation = useMutation(forgotPasswordApi, {
    onSuccess: (data) => {
      message.success(data.data.message);
    },
    onError: (error: any) => {
      message.error(error.response?.data?.message || "An error occurred");
    },
  });

  const forgotPassword = (values: ForgotPasswordInput) => {
    mutation.mutate(values);
  };

  return {
    forgotPassword,
    isLoading: mutation.isLoading,
    isSuccess: mutation.isSuccess,
    isError: mutation.isError,
    error: mutation.error,
  };
}
