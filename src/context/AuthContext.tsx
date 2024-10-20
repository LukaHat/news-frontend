import React from "react";
import { useCookies } from "react-cookie";
import { AuthUser } from "../types/AuthTypes";

interface AuthContextType {
  token: string;
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

  const addToken = (token: string) => {
    setCookie("token", token, { path: "/", maxAge: 7200 });
  };

  const removeToken = () => {
    removeCookie("token", { path: "/" });
    removeCookie("user", { path: "/" });
  };

  const addUser = (user: AuthUser) => {
    setCookie("user", user, { path: "/", maxAge: 7200 });
  };

  return (
    <AuthContext.Provider
      value={{ token, isAuthenticated, user, addToken, removeToken, addUser }}
    >
      {children}
    </AuthContext.Provider>
  );
};
