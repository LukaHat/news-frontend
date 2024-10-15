import React from "react";
import { Outlet } from "react-router-dom";
import { Navbar } from "../../components/organisms/Navbar";
import { EditModal } from "../../components/organisms/EditModal";
import styled from "styled-components";
import { EditDataInterface } from "../../types/NewsTypes";

const StyledMainLayout = styled.div`
  width: 100%;
  min-height: 100vh;
`;

export default function MainLayout() {
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [editData, setEditData] = React.useState<EditDataInterface | null>(
    null
  );

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => {
    setIsModalOpen(false);
    setEditData(null);
  };
  return (
    <StyledMainLayout>
      <Navbar openModal={openModal} />
      <main>
        <Outlet context={{ openModal, setEditData }} />
        {isModalOpen && (
          <EditModal
            editData={editData}
            closeModal={closeModal}
            setEditData={setEditData}
          />
        )}
      </main>
    </StyledMainLayout>
  );
}
