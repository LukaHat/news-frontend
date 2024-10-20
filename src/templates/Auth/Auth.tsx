import styled from "styled-components";
import { flexContainerColumn } from "../../styles/utils/mixins";
import { Navigate, Outlet } from "react-router-dom";
import { typography } from "../../theme/typography";
import { useAuth } from "../../lib/hooks/useAuth";
const StyledWrapper = styled.div`
  height: 100vh;
  width: 100%;
  ${flexContainerColumn}
  font-family: ${typography.baseFonts.primary.mainFont};
`;

export default function Auth() {
  const { isAuthenticated } = useAuth();

  if (isAuthenticated) {
    return <Navigate to="/" />;
  }

  return (
    <StyledWrapper>
      <Outlet />
    </StyledWrapper>
  );
}
