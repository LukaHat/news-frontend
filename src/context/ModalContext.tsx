import React, { useState } from "react";

interface EditDataInterface {
  id: string | undefined;
  headline: string;
  shortDescription: string;
  fullDescription: string;
  category: string;
  isBreakingNews: boolean;
  imageUrl: string;
}

interface ModalContextType {
  openModal: () => void;
  closeModal: () => void;
  setEditData: (data: EditDataInterface) => void;
  isModalOpen: boolean;
  editData: EditDataInterface | Record<string, never>;
}

const ModalContext = React.createContext<ModalContextType | undefined>(
  undefined
);

export const useModal = () => {
  const context = React.useContext(ModalContext);
  if (!context) {
    throw Error("useModal needs to be used withnin an ModalProvider");
  }
  return context;
};

export const ModalProvider = ({ children }: { children: React.ReactNode }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editData, setEditData] = useState<
    EditDataInterface | Record<string, never>
  >({});

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <ModalContext.Provider
      value={{ isModalOpen, editData, openModal, closeModal, setEditData }}
    >
      {children}
    </ModalContext.Provider>
  );
};
