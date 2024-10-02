import React from "react";
import { useCookies } from "react-cookie";

interface AuthContextType {
  token: string | undefined;
  isAuthenticated: boolean;
  addToken: (token: string) => void;
  removeToken: () => void;
}

const AuthContext = React.createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = React.useContext(AuthContext);
  if (!context) {
    throw Error("useAuth needs to be used withnin an AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [cookies, setCookie, removeCookie] = useCookies(["token"]);
  const token = cookies.token;
  const isAuthenticated = token !== "";

  const addToken = (token: string) => {
    setCookie("token", token, { path: "/" });
  };

  const removeToken = () => {
    removeCookie("token", { path: "/" });
  };

  return (
    <AuthContext.Provider
      value={{ token, isAuthenticated, addToken, removeToken }}
    >
      {children}
    </AuthContext.Provider>
  );
};
