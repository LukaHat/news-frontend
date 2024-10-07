import { post } from "./base";

interface LoginData {
  email: string;
  password: string;
}

interface RegisterData extends LoginData {
  role: string;
  fullName: string;
  alias: string;
}

interface AuthUser extends RegisterData {
  _id: string;
  registeredAt: string;
  __v: number;
}

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
