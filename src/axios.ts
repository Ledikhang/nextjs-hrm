import Axios, { AxiosInstance } from "axios";

const axios: AxiosInstance = Axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_API_URL}`,
  withCredentials: true,
});

axios.interceptors.response.use(
  async (response) => {
    if (response.config.responseType === "json") {
      return response;
    }
    return response;
  },
  async (error) =>
    Promise.reject({
      error,
    })
);

export default axios;
