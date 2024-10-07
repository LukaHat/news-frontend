import { post } from "./base";
import { LoginData, RegisterData, AuthUser } from "../types/AuthTypes";

export const login = async (
  data: LoginData
): Promise<{ user: AuthUser; token: string } | undefined> => {
  try {
    const res = await post("auth/login", data);
    return res.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const registerUser = async (
  data: RegisterData
): Promise<{ token: string } | undefined> => {
  try {
    const res = await post("auth/register", data);
    return res.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
