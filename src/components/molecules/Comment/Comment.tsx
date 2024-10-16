import styled from "styled-components";
import { formatDate } from "../../../lib/helper/helper";
import { flexContainerColumn } from "../../../styles/utils/mixins";
import { themeColors } from "../../../theme/colors";
import { typography } from "../../../theme/typography";
import { ArticleComment } from "../../../types/CommentTypes";
import { spacings } from "../../../theme/spacings";

const StyledComment = styled.p`
  ${flexContainerColumn};
  align-items: flex-start;
  width: 100%;
  height: auto;
  color: ${themeColors.primary.elementaryWhite};
  margin: ${spacings.margins.xs} 0;
  padding: 0;
  ${typography.text.md}

  span:first-child {
    ${typography.text.md}
    font-weight: bold;
    font-family: ${typography.baseFonts.secondary.secondaryFont};
  }

  span:nth-child(2) {
    ${typography.text.sm}
    margin-bottom: ${spacings.margins.xs};
    color: ${themeColors.secondary.expandedWhite};
  }
`;

export default function Comment({
  comment,
  commenter,
  createdAt,
}: ArticleComment) {
  return (
    <StyledComment>
      <span>{commenter}</span>
      <span>{formatDate(createdAt)}</span>
      {comment}
    </StyledComment>
  );
}
