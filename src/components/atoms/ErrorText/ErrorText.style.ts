import styled from "@emotion/styled";
import { themeColors } from "../../../theme/colors";
import { appFonts } from "../../../theme/fonts";

export const ErrorText = styled.p`
  color: ${themeColors.applicationStates.error};
  font-size: ${appFonts.fontSizes.errorText};
`;
