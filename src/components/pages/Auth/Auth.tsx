import styled from "styled-components";
import { SignIn } from "../../templates/Sign-in";

const SyledAuthPage = styled.div`
  height: 100vh;
  width: 100%;
`;

export default function Auth() {
  return (
    <SyledAuthPage>
      <SignIn />
    </SyledAuthPage>
  );
}
