import axios from "axios";

const baseAPIClient = axios.create({
  baseURL: "http://localhost:3000/",
});
//contants file/folder

interface RequestProps {
  token?: string;
  method?: "get" | "patch" | "post" | "delete";
  url: string;
  id?: string;
  data?: unknown;
}

export const request = async <T>(params: RequestProps): Promise<T> => {
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

    return res.data;
  } catch (error) {
    console.error(error);
    if (axios.isAxiosError(error)) {
      throw error.response?.data;
    }
    throw error;
  }
};
