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

export const login = async (data: LoginData): Promise<{ token: string }> => {
  const res = await axios.post("http://localhost:3000/auth/login", data);
  console.log(res.data);
  return res.data;
};

export const registerUser = async (
  data: RegisterData
): Promise<{ token: string }> => {
  const res = await axios.post("http://localhost:3000/auth/register", data);
  console.log(res.data.token);
  return res.data;
};
