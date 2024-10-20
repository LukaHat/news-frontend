import styled from "@emotion/styled";
import { themeColors } from "../../../theme/colors";
import { typography } from "../../../theme/typography";
import { CSSObject } from "@emotion/react";

const baseErrorTextStyles: CSSObject = {
  color: themeColors.applicationStates.error,
};

const errorTextTypography: CSSObject = {
  ...typography.text.sm,
};
export const StyledErrorText = styled.p({
  ...baseErrorTextStyles,
  ...errorTextTypography,
});
