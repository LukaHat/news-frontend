import styled from "styled-components";
import { themeColors } from "../../../theme/colors";
import { appFonts } from "../../../theme/fonts";
import { ArticleComment } from "../../../types/CommentTypes";
import { flexContainerColumn } from "../../../styles/utils/mixins";

const StyledComment = styled.p`
  ${flexContainerColumn};
  align-items: flex-start;
  width: 100%;
  height: auto;
  color: ${themeColors.primary.elementaryWhite};
  margin: 0.3rem 0;
  padding: 0;
  font-size: ${appFonts.fontSizes.comment.commentText};

  span:first-child {
    font-size: ${appFonts.fontSizes.comment.commentAuthor};
    font-weight: bold;
    font-family: ${appFonts.secondary.secondaryFont};
  }

  span:nth-child(2) {
    font-size: ${appFonts.fontSizes.comment.commentDate};
    margin-bottom: 0.4rem;
    color: ${themeColors.secondary.expandedWhite};
  }
`;

export default function Comment({
  comment,
  commenter,
  createdAt,
}: ArticleComment) {
  const formattedDate = new Date(createdAt).toLocaleString().slice(0, -3);

  return (
    <StyledComment>
      <span>{commenter}</span>
      <span>{formattedDate}</span>
      {comment}
    </StyledComment>
  );
}
