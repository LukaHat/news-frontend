import axios from "axios";

interface LoginData {
  email: string;
  password: string;
}

export const login = async (data: LoginData) => {
  const res = await axios.post(
    "http://localhost:3000/api-docs/auth/login",
    data
  );
  console.log(res);
};
