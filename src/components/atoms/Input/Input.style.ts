import styled from "@emotion/styled";
import { themeColors } from "../../../theme/colors";
import { typographyEmotion } from "../../../theme/typography/typography";
import { mediaQueries } from "../../../theme/mediaQueries";
import { spacings } from "../../../theme/spacings";
import { radius } from "../../../theme/radius";

export const Input = styled.input`
  background-color: ${themeColors.primary.elementaryWhite};
  padding: ${spacings.paddings.xs} ${spacings.paddings.sm};
  width: 10rem;
  border-radius: ${radius.xs};
  border: 0.1rem solid ${themeColors.primary.elementaryBlue};
  ${typographyEmotion.text.md};

  ${mediaQueries.sm} {
    width: 17rem;
  }
  ${mediaQueries.md} {
    width: 20rem;
  }
  ${mediaQueries.xl} {
    width: 25rem;
    ${typographyEmotion.text.lg}
  }
`;
