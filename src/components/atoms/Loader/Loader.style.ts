import { CSSObject, keyframes } from "@emotion/react";
import styled from "@emotion/styled";
import { flexContainerEmotion } from "../../../styles/utils/mixins";

const Spin = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

const baseLoaderStyles: CSSObject = {
  width: "100%",
  minHeight: "92vh",
  ...flexContainerEmotion,
};

const loaderImageStyles: CSSObject = {
  width: "10%",
  height: "auto",
  animation: `${Spin} 0.5s ease-in-out reverse infinite`,
};

export const StyledLoader = styled.div({
  ...baseLoaderStyles,
  img: loaderImageStyles,
});
