import { Outlet } from "react-router-dom";
import styled from "styled-components";
import { Navbar } from "../../components/organisms/Navbar";

const StyledMainLayout = styled.div`
  width: 100%;
  min-height: 100vh;
`;

export default function MainLayout() {
  return (
    <StyledMainLayout>
      <Navbar />
      <main>
        <Outlet />
      </main>
    </StyledMainLayout>
  );
}
