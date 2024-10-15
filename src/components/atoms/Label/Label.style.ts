import styled from "@emotion/styled";
import { themeColors } from "../../../theme/colors";
import { typographyEmotion } from "../../../theme/typography/typography";

export const Label = styled.label`
  color: ${themeColors.primary.elementaryBlack};
  ${typographyEmotion.text.lg};
`;
