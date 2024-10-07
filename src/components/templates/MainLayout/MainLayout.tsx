import { Outlet } from "react-router-dom";
import { Navbar } from "../../organisms/Navbar";
import { EditModal } from "../../organisms/EditModal";
import { useModal } from "../../hooks/useModal";
import styled from "styled-components";

const StyledMainLayout = styled.div`
  width: 100vw;
  height: 100%;
`;

export default function MainLayout() {
  const { isModalOpen } = useModal();

  return (
    <StyledMainLayout>
      <Navbar />
      <main>
        <Outlet />
        {isModalOpen && <EditModal />}
      </main>
    </StyledMainLayout>
  );
}
