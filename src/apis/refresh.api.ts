import axios from "@/axios";
import { User } from "@/models/user.model";
import { AxiosResponse } from "axios";

export async function refreshApi(): Promise<AxiosResponse<User>> {
  return axios.get("/authentication/refresh");
}
