import { toRem } from "../../lib/helper/helper";

export const typography = {
  baseFonts: {
    primary: {
      mainFont: "Roboto",
    },
    secondary: {
      secondaryFont: "Taz-Black",
    },
  },
  headings: {
    sm: {
      fontSize: toRem(20),
      lineHeight: 1.2,
      fontWeight: "normal",
    },
    md: {
      fontSize: toRem(22),
      lineHeight: 1.2,
      fontWeight: "normal",
    },
    lg: {
      fontSize: toRem(30),
      lineHeight: 1.2,
      fontWeight: "normal",
    },
  },
  text: {
    sm: {
      fontSize: toRem(14),
      lineHeight: 1.2,
      fontWeight: "normal",
    },
    md: {
      fontSize: toRem(16),
      lineHeight: 1.2,
      fontWeight: "normal",
    },
    lg: {
      fontSize: toRem(18),
      lineHeight: 1.2,
      fontWeight: "normal",
    },
  },
  errorText: {
    sm: {
      fontSize: toRem(10),
      lineHeight: 1.2,
      fontWeight: "normal",
    },
    md: {
      fontSize: toRem(12),
      lineHeight: 1.2,
      fontWeight: "normal",
    },
    lg: {
      fontSize: toRem(14),
      lineHeight: 1.2,
      fontWeight: "normal",
    },
  },
};
