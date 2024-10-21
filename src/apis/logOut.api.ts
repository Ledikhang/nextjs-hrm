import axios from "@/axios";
import { AxiosResponse } from "axios";

export async function logOutApi(): Promise<AxiosResponse<undefined>> {
  return axios.post("/authentication/log-out");
}
