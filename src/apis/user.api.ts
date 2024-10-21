import axios from "@/axios";
import { User } from "@/models/user.model";
import { AxiosResponse } from "axios";

export interface GetUsersQueryParams {
  search?: string;
  page?: number;
  limit?: number;
}

export interface GetUsersResponse {
  users: User[];
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

export async function fetchUsers(
  params: GetUsersQueryParams
): Promise<AxiosResponse<GetUsersResponse>> {
  const { search, page = 1, limit = 10 } = params;
  const response = await axios.get("/users", {
    params: { search, page, limit },
  });
  return response;
}
