import styled from "styled-components";
import { flexContainerColumn } from "../../styles/utils/mixins";
import { Outlet } from "react-router-dom";
import { typography } from "../../theme/typography";
const StyledWrapper = styled.div`
  height: 100vh;
  width: 100%;
  ${flexContainerColumn}
  font-family: ${typography.baseFonts.primary.mainFont};
`;

export default function Auth() {
  return (
    <StyledWrapper>
      <Outlet />
    </StyledWrapper>
  );
}
