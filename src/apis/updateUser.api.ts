import axios from "@/axios";
import { User } from "@/models/user.model";
import { AxiosResponse } from "axios";

export interface UpdateUserDto {
  name?: string;
  email?: string;
}

export async function updateUser(
  id: number,
  updateData: UpdateUserDto
): Promise<AxiosResponse<User>> {
  return axios.patch(`/users/${id}`, updateData);
}
