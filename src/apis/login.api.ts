import axios from "@/axios";
import { User } from "@/models/user.model";
import { AxiosResponse } from "axios";

export interface LoginInput {
  email: string;
  password: string;
}

export async function loginApi(
  loginInput: LoginInput
): Promise<AxiosResponse<User, any>> {
  const reponse = await axios.post("/authentication/log-in", loginInput);
  return reponse;
}
