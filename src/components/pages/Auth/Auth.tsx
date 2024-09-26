import styled from "styled-components";
import { SignIn } from "../../templates/Sign-in";
import { useState } from "react";
import { SignUp } from "../../templates/Sign-up";

const StyledWrapper = styled.div`
  height: 100vh;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

export default function Auth() {
  const [isLoginPage, setIsLoginPage] = useState(true);

  return (
    <StyledWrapper>
      {isLoginPage ? <SignIn redirectFn={setIsLoginPage} /> : <SignUp />}
    </StyledWrapper>
  );
}
