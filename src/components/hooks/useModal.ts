import React from "react";
import { ModalContext } from "../../context/ModalContext";

export const useModal = () => {
  const context = React.useContext(ModalContext);
  if (!context) {
    throw Error("useModal needs to be used withnin an ModalProvider");
  }
  return context;
};
