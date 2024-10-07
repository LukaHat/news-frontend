import React from "react";
import styled from "styled-components";
import { SignIn } from "../../templates/Sign-in";
import { SignUp } from "../../templates/Sign-up";
import { appFonts } from "../../../theme/fonts";
import { flexContainerColumn } from "../../../styles/utils/mixins";

const StyledWrapper = styled.div`
  height: 100vh;
  width: 100%;
  ${flexContainerColumn}
  font-family: ${appFonts.primary.mainFont};
`;

export default function Auth() {
  const [isLoginPage, setIsLoginPage] = React.useState(true);

  return (
    <StyledWrapper>
      {isLoginPage ? <SignIn redirectFn={setIsLoginPage} /> : <SignUp />}
    </StyledWrapper>
  );
}
