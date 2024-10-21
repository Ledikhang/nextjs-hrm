import axios from "@/axios";
import { User } from "@/models/user.model";
import { AxiosResponse } from "axios";

export interface RegisterInput {
  email: string;
  name: string;
  password: string;
}

export async function registerApi(
  registerInput: RegisterInput
): Promise<AxiosResponse<User, any>> {
  const reponse = await axios.post("/authentication/register", registerInput);
  return reponse;
}
