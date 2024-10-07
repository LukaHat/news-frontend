import styled from "@emotion/styled";
import { themeColors } from "../../../theme/colors";
import { appFonts } from "../../../theme/fonts";

export const Input = styled.input`
  background-color: ${themeColors.primary.elementaryWhite};
  padding: 0.5rem 1rem;
  width: 15rem;
  border-radius: 0.2rem;
  border: 0.1rem solid ${themeColors.primary.elementaryBlue};
  font-size: ${appFonts.fontSizes.input};
`;
