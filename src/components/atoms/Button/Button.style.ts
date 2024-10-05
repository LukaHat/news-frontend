import styled from "@emotion/styled";
import { themeColors } from "../../../theme/colors";

export const Button = styled.button`
  background-color: ${themeColors.primary.elementaryBlue};
  color: ${themeColors.primary.elementaryWhite};
  padding: 0.4rem;
  border-radius: 0.2rem;
  font-size: 1.2rem;
  cursor: pointer;
`;
