import { request } from "./base";
import { LoginData, RegisterData, AuthUser } from "../types/AuthTypes";

export const login = async (
  data: LoginData
): Promise<{ user: AuthUser; token: string } | undefined> => {
  try {
    const res = await request<{ user: AuthUser; token: string } | undefined>({
      method: "post",
      url: "auth/login",
      data,
    });
    return res.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const registerUser = async (
  data: RegisterData
): Promise<{ user: AuthUser; token: string } | undefined> => {
  try {
    const res = await request<{ user: AuthUser; token: string } | undefined>({
      method: "post",
      url: "auth/register",
      data,
    });
    return res.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
