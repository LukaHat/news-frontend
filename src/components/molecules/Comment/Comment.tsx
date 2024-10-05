import styled from "styled-components";

const StyledComment = styled.div``;

interface ArticleComment {
  comment: string;
  commenter: string;
  createdAt: string;
}

export default function Comment({
  comment,
  commenter,
  createdAt,
}: ArticleComment) {
  const formattedDate = new Date(createdAt).toLocaleString();

  return (
    <StyledComment>
      <p>
        {comment} <span>Written by: {commenter}</span>
        <span>{formattedDate}</span>
      </p>
    </StyledComment>
  );
}
