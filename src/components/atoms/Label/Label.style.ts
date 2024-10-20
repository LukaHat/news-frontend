import styled, { CSSObject } from "@emotion/styled";
import { themeColors } from "../../../theme/colors";
import { typography } from "../../../theme/typography";

// export const Label = styled.label`
//   color: ${themeColors.primary.elementaryBlack};
//   ${typography.text.lg};
// `;

const baseLabelStyles: CSSObject = {
  color: themeColors.primary.elementaryBlack,
};

const labelTypography: CSSObject = {
  ...typography.text.lg,
};

export const StyledLabel = styled.label({
  ...baseLabelStyles,
  ...labelTypography,
});
