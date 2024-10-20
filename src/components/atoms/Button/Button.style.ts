import styled from "@emotion/styled";
import { themeColors } from "../../../theme/colors";
import { spacings } from "../../../theme/spacings";
import { radius } from "../../../theme/radius";
import { typography } from "../../../theme/typography";
import { CSSObject } from "@emotion/styled";

const buttonBaseStyles: CSSObject = {
  backgroundColor: themeColors.primary.elementaryBlue,
  color: themeColors.primary.elementaryWhite,
  padding: spacings.xs,
  borderRadius: radius.xs,
  cursor: "pointer",
};

const buttonTypography: CSSObject = {
  ...typography.text.lg,
};

export const StyledButton = styled.button({
  ...buttonBaseStyles,
  ...buttonTypography,
});
