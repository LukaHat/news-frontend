import React from "react";
import { AuthContext } from "../../context/AuthContext";

export const useAuth = () => {
  const context = React.useContext(AuthContext);
  if (!context) {
    throw Error("useAuth needs to be used withnin an AuthProvider");
  }
  return context;
};
