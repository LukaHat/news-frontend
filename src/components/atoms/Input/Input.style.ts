import styled from "@emotion/styled";
import { themeColors } from "../../../theme/colors";
import { appFonts } from "../../../theme/fonts";

export const Input = styled.input`
  background-color: ${themeColors.primary.elementaryWhite};
  padding: clamp(0.4rem, 1vw + 0.2rem, 0.6rem)
    clamp(0.8rem, 2vw + 0.4rem, 1.2rem);
  width: clamp(5rem, 40vw, 25rem);
  border-radius: 0.2rem;
  border: 0.1rem solid ${themeColors.primary.elementaryBlue};
  font-size: ${appFonts.fontSizes.input};

  &[type="checkbox"] {
    width: 4vw;
    height: 3vh;
  }

  &[type="file"]::file-selector-button {
    border: none;
    background: none;
  }
`;
