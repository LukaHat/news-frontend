import { createContext, ReactNode, useContext, useState } from "react";

interface AuthContextType {
  token: string | undefined;
  isAuthenticated: boolean;
  setToken: (token: string) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw Error("useAuth needs to be used withnin an AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [token, setToken] = useState<string>(document.cookie);

  const login = (token: string) => (document.cookie = token);

  const isAuthenticated = token !== "";

  return (
    <AuthContext.Provider value={{ token, isAuthenticated, setToken }}>
      {children}
    </AuthContext.Provider>
  );
};
