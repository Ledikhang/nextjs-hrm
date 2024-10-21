import axios from "@/axios";
import { AxiosResponse } from "axios";

export interface ForgotPasswordInput {
  email: string;
}

export const forgotPasswordApi = (
  forgotPasswordInput: ForgotPasswordInput
): Promise<AxiosResponse<void>> => {
  return axios.post("/authentication/forgot-password", forgotPasswordInput);
};
