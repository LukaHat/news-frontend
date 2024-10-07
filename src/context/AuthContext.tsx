import React from "react";
import { useCookies } from "react-cookie";

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

interface AuthContextType {
  token: string | undefined;
  isAuthenticated: boolean;
  user: AuthUser | undefined;
  addToken: (token: string) => void;
  removeToken: () => void;
  addUser: (user: AuthUser) => void;
}

export const AuthContext = React.createContext<AuthContextType | undefined>(
  undefined
);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [cookies, setCookie, removeCookie] = useCookies(["token", "user"]);
  const token = cookies.token;
  const user = cookies.user;
  const isAuthenticated = Boolean(token);

  const addToken = (token: string | undefined) => {
    setCookie("token", token, { path: "/" });
  };

  const removeToken = () => {
    removeCookie("token", { path: "/" });
    removeCookie("user", { path: "/" });
  };

  const addUser = (user: AuthUser) => {
    setCookie("user", user, { path: "/" });
  };

  return (
    <AuthContext.Provider
      value={{ token, isAuthenticated, user, addToken, removeToken, addUser }}
    >
      {children}
    </AuthContext.Provider>
  );
};
