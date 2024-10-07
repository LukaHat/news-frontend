import axios, { AxiosResponse } from "axios";

export const BASE_URL = "http://localhost:3000/";

export const get = async <T>(
  url: string,
  token: string
): Promise<AxiosResponse<T>> => {
  try {
    const res = await axios.get(`${BASE_URL}${url}`, {
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

export const getById = async <T>(
  url: string,
  token: string,
  id: string
): Promise<AxiosResponse<T>> => {
  try {
    const res = await axios.get(`${BASE_URL}${url}/${id}`, {
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

export const post = async (url: string, data: unknown, token?: string) => {
  try {
    const res = await axios.post(`${BASE_URL}${url}`, data, {
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

export const patch = async (
  url: string,
  token: string,
  id: string,
  data: unknown
) => {
  try {
    const res = await axios.patch(`${BASE_URL}${url}/${id}`, data, {
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
