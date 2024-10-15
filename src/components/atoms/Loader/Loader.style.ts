import { keyframes } from "@emotion/react";
import styled from "@emotion/styled";

const Spin = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

export const Loader = styled.div`
  width: 100%;
  min-height: 92vh;
  display: flex;
  align-items: center;
  justify-content: center;

  img {
    width: 10%;
    height: auto;
    animation: ${Spin} 0.5s ease-in-out reverse infinite;
  }
`;
