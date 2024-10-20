import { css } from "styled-components";
import { css as emotionCss } from "@emotion/react";

export const flexContainer = css`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const flexContainerEmotion = emotionCss`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const flexContainerColumn = css`
  ${flexContainer};
  flex-direction: column;
`;

export const flexContainerColumnEmotion = emotionCss`
  ${flexContainerEmotion};
  flex-direction: column;
`;

export const flexContainerRow = css`
  ${flexContainer};
  flex-direction: row;
`;
