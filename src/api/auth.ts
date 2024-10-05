import axios from "axios";

interface LoginData {
  email: string;
  password: string;
}

interface RegisterData {
  email: string;
  password: string;
  role: string;
  fullName: string;
  alias: string;
}

interface AuthUser {
  _id: string;
  role: string;
  email: string;
  password: string;
  fullName: string;
  alias: string;
  registeredAt: string;
  __v: number;
}

export const login = async (
  data: LoginData
): Promise<{ user: AuthUser; token: string }> => {
  const res = await axios.post("http://localhost:3000/auth/login", data);
  return res.data;
};

export const registerUser = async (
  data: RegisterData
): Promise<{ token: string }> => {
  const res = await axios.post("http://localhost:3000/auth/register", data);
  return res.data;
};
