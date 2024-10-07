import React from "react";

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
  setEditData: (data: EditDataInterface | null) => void;
  isModalOpen: boolean;
  editData: EditDataInterface | null;
}

export const ModalContext = React.createContext<ModalContextType | undefined>(
  undefined
);
export const ModalProvider = ({ children }: { children: React.ReactNode }) => {
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [editData, setEditData] = React.useState<EditDataInterface | null>(
    null
  );

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
