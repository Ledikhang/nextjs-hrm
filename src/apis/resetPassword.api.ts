import axios from "@/axios";
import { User } from "@/models/user.model";
import { AxiosResponse } from "axios";

export async function resetPasswordApi(
  token: string,
  newPassword: string
): Promise<AxiosResponse<User>> {
  return axios.post("/authentication/reset-password", {
    token,
    newPassword,
  });
}
