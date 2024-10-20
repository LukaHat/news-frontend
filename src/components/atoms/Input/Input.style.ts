import styled, { CSSObject } from "@emotion/styled";
import { themeColors } from "../../../theme/colors";
import { mediaQueries } from "../../../theme/mediaQueries";
import { spacings } from "../../../theme/spacings";
import { radius } from "../../../theme/radius";
import { typography } from "../../../theme/typography";

const baseInputStyles: CSSObject = {
  backgroundColor: themeColors.primary.elementaryWhite,
  padding: `${spacings.xs} ${spacings.sm}`,
  width: "10rem",
  borderRadius: radius.xs,
  border: `0.1rem solid ${themeColors.primary.elementaryBlue}`,
};

const inputTypography: CSSObject = {
  ...typography.text.md,
};

const inputResponsiveStyles: CSSObject = {
  [mediaQueries["sm"]]: {
    width: "17rem",
  },

  [mediaQueries["md"]]: {
    width: "20rem",
  },

  [mediaQueries["xl"]]: {
    width: "25rem",
    ...typography.text.lg,
  },
};

export const StyledInput = styled.input({
  ...baseInputStyles,
  ...inputTypography,
  ...inputResponsiveStyles,
});
