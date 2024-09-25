import axios from "axios";

interface LoginData {
  email: string;
  password: string;
}

export const login = async (data: LoginData): Promise<{ token: string }> => {
  const res = await axios.post("http://localhost:3000/auth/login", data);
  console.log(res.data);
  return res.data;
};
