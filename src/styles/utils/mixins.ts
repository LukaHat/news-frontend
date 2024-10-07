import { css } from "styled-components";

export const flexContainer = css`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const flexContainerColumn = css`
  ${flexContainer};
  flex-direction: column;
`;

export const flexContainerRow = css`
  ${flexContainer};
  flex-direction: row;
`;
