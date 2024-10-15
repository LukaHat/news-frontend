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

export const typographyEmotion = {
  headings: createTypographyEmotion({ sm: 18, md: 20, lg: 30 }),
  text: createTypographyEmotion({ sm: 14, md: 16, lg: 18 }),
  errorText: createTypographyEmotion({ sm: 10, md: 12, lg: 14 }),
};

export const typography = {
  primary: {
    mainFont: "Roboto",
  },
  secondary: {
    secondaryFont: "Taz-Black",
  },
  headings: createTypography({ sm: 20, md: 22, lg: 30 }),
  text: createTypography({ sm: 14, md: 16, lg: 18 }),
  errorText: createTypography({ sm: 10, md: 12, lg: 14 }),
};
