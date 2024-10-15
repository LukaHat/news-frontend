import axios, { AxiosResponse } from "axios";

const baseAPIClient = axios.create({
  baseURL: "http://localhost:3000/",
});

interface RequestProps {
  token?: string;
  method?: "get" | "patch" | "post" | "delete";
  url: string;
  id?: string;
  data?: unknown;
}

export const request = async <T>(
  params: RequestProps
): Promise<AxiosResponse<T>> => {
  const { token, url, method, id, data } = params;

  try {
    const res = await baseAPIClient.request({
      method: method || "get",
      url: id ? `${url}/${id}` : url,
      data,
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    return res;
  } catch (error) {
    console.error(error);

    throw error;
  }
};
