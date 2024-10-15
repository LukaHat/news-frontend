import styled from "@emotion/styled";
import { themeColors } from "../../../theme/colors";
import { typographyEmotion } from "../../../theme/typography/typography";
import { spacings } from "../../../theme/spacings";
import { radius } from "../../../theme/radius";

export const Button = styled.button`
  background-color: ${themeColors.primary.elementaryBlue};
  color: ${themeColors.primary.elementaryWhite};
  padding: ${spacings.paddings.xs};
  border-radius: ${radius.xs};
  ${typographyEmotion.text.lg};
  cursor: pointer;
`;
