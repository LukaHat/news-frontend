import { css as emotionCSS } from "@emotion/react";
import { css } from "styled-components";
import { toRem } from "../../lib/helper/helper";

const baseText = css`
  line-height: 1.2;
  font-weight: normal;
`;

const baseTextEmotion = emotionCSS`
  line-height: 1.2;
  font-weight: normal;
`;

interface TypographyProps {
  sm: number;
  md: number;
  lg: number;
}

const createTypography = (sizes: TypographyProps) => ({
  sm: css`
    font-size: ${toRem(sizes.sm)};
    ${baseText};
  `,
  md: css`
    font-size: ${toRem(sizes.md)};
    ${baseText};
  `,
  lg: css`
    font-size: ${toRem(sizes.lg)};
    ${baseText};
  `,
});

const createTypographyEmotion = (sizes: TypographyProps) => ({
  sm: emotionCSS`
    font-size: ${toRem(sizes.sm)};
    ${baseTextEmotion};
  `,
  md: emotionCSS`
    font-size: ${toRem(sizes.md)};
    ${baseTextEmotion};
  `,
  lg: emotionCSS`
    font-size: ${toRem(sizes.lg)};
    ${baseTextEmotion};
  `,
});

const baseSizes = {
  headings: { sm: 20, md: 22, lg: 30 },
  text: { sm: 14, md: 16, lg: 18 },
  errorText: { sm: 10, md: 12, lg: 14 },
};

const baseFonts = {
  primary: {
    mainFont: "Roboto",
  },
  secondary: {
    secondaryFont: "Taz-Black",
  },
};

export const typographyEmotion = {
  baseFonts,
  headings: createTypographyEmotion(baseSizes.headings),
  text: createTypographyEmotion(baseSizes.text),
  errorText: createTypographyEmotion(baseSizes.errorText),
};

export const typography = {
  baseFonts,
  headings: createTypography(baseSizes.headings),
  text: createTypography(baseSizes.text),
  errorText: createTypography(baseSizes.errorText),
};
