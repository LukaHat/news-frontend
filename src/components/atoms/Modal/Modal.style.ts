import styled, { CSSObject } from "@emotion/styled";
import { themeColors } from "../../../theme/colors";
import {
  flexContainerColumnEmotion,
  flexContainerEmotion,
} from "../../../styles/utils/mixins";
import { spacings } from "../../../theme/spacings";
import { typography } from "../../../theme/typography";
import { mediaQueries } from "../../../theme/mediaQueries";

const modalBackgroundStyles: CSSObject = {
  position: "fixed",
  top: 0,
  left: 0,
  backgroundColor: themeColors.secondary.expandedBlack,
  width: "100%",
  height: "100vh",
  ...flexContainerEmotion,
};

const modalStyles: CSSObject = {
  width: "90vw",
  height: "70vh",
  backgroundColor: themeColors.primary.elementaryBlue,
  color: themeColors.primary.elementaryWhite,
  ...flexContainerColumnEmotion,
  gap: spacings.lg,
  paddingTop: spacings.sm,
  h2: {
    fontFamily: typography.baseFonts.primary.mainFont,
    ...typography.headings.md,
  },
  button: {
    ...typography.text.md,
    color: themeColors.primary.elementaryWhite,
    backgroundColor: themeColors.secondary.expandedGreen,
  },
  div: {
    ...flexContainerEmotion,
    minWidth: "70%",
    justifyContent: "space-between",
  },
  form: {
    color: themeColors.primary.elementaryWhite,
    width: "90%",
    ...flexContainerEmotion,
    justifyContent: "space-evenly",
    div: {
      width: "100%",
      label: {
        color: themeColors.primary.elementaryWhite,
      },
    },
  },

  [mediaQueries.xs]: {
    width: "70vw",
    height: "60vh",
    button: {
      alignSelf: "flex-end",
    },
  },
  [mediaQueries.md]: {
    width: "50vw",
    height: "50vh",
    ...typography.text.lg,
  },
};

export const StyledModalBackground = styled.div({ ...modalBackgroundStyles });
export const StyledModal = styled.div({ ...modalStyles });
