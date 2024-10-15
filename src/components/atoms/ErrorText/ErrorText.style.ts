import styled from "@emotion/styled";
import { themeColors } from "../../../theme/colors";
import { typographyEmotion } from "../../../theme/typography/typography";

export const ErrorText = styled.p`
  color: ${themeColors.applicationStates.error};
  ${typographyEmotion.text.sm};
`;
