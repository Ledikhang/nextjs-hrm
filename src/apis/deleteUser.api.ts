import axios from "@/axios";
import { AxiosResponse } from "axios";

export async function deactivateUser(id: number): Promise<AxiosResponse<void>> {
  return axios.delete(`/users/${id}`);
}
