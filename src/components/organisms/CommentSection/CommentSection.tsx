import { useEffect, useState } from "react";
import { Button } from "../../atoms/Button";
import { Input } from "../../atoms/Input";
import { addComment, getComments } from "../../../api/comment";
import { Comment } from "../../molecules/Comment";
import styled from "styled-components";
import { useAuth } from "../../hooks/useAuth";
import { ArticleComment } from "../../../types/CommentTypes";
import { flexContainerColumn } from "../../../styles/utils/mixins";

const StyledCommentSection = styled.section`
  width: 70%;
  ${flexContainerColumn}
  align-items: flex-start;
  justify-content: flex-start;
  padding-bottom: 1rem;
`;

const StyledCommentList = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 20vh;
  overflow-y: scroll;
  margin-bottom: 1rem;
  align-items: flex-start;
`;
const StyledInputContainer = styled.div`
  align-self: center;
  width: auto;
`;

export default function CommentSection({ id }: { id: string | undefined }) {
  const [comments, setComments] = useState<ArticleComment[]>([]);
  const [comment, setComment] = useState("");

  const { user } = useAuth();

  useEffect(() => {
    const fetchComments = (id: string | undefined) => {
      const response = getComments(id);
      if (response) {
        setComments(response);
      }
    };
    fetchComments(id);
  }, [setComments, id]);

  const handleAddComment = () => {
    if (user?.fullName && id && comment.trim()) {
      try {
        addComment(user.fullName, comment.trim(), id);
        setComment("");
        const updatedComments = getComments(id);
        if (updatedComments) {
          setComments(updatedComments);
        }
      } catch (error) {
        console.error("Error adding comment:", error);
      }
    }
  };

  return (
    <StyledCommentSection>
      {comments.length > 0 && (
        <StyledCommentList>
          {comments.map((commentInstance) => (
            <Comment
              key={commentInstance.createdAt}
              comment={commentInstance.comment}
              commenter={commentInstance.commenter}
              createdAt={commentInstance.createdAt}
            />
          ))}
        </StyledCommentList>
      )}

      <StyledInputContainer>
        <Input
          type="textarea"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />
        <Button onClick={handleAddComment}>Comment</Button>
      </StyledInputContainer>
    </StyledCommentSection>
  );
}
