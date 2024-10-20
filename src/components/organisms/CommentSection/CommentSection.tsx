import React from "react";
import { Input } from "../../atoms/Input";
import { addComment, getComments } from "../../../api/comment";
import { Comment } from "../../molecules/Comment";
import styled from "styled-components";
import { useAuth } from "../../../lib/hooks/useAuth";
import { ArticleComment } from "../../../types/CommentTypes";
import { flexContainerColumn } from "../../../styles/utils/mixins";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "../../molecules/Form";
import { Button } from "../../atoms/Button";
import { ErrorText } from "../../atoms/ErrorText";
import { mediaQueries } from "../../../theme/mediaQueries";
import { spacings } from "../../../theme/spacings";

const StyledCommentSection = styled.section`
  width: 80%;
  ${flexContainerColumn}
  align-items: flex-start;
  justify-content: flex-start;
  padding-bottom: ${spacings.sm};

  ${mediaQueries.xs} {
    width: 70%;
  }
`;

const StyledCommentList = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 20vh;
  overflow-y: scroll;
  margin-bottom: ${spacings.sm};
  align-items: flex-start;
`;
const StyledInputContainer = styled.div`
  align-self: center;
  width: auto;

  form {
    ${flexContainerColumn}
  }
`;

const commentSchema = z.object({
  comment: z.string().min(1, {
    message: "Comment cannot be empty",
  }),
});

type CommentData = z.infer<typeof commentSchema>;

export default function CommentSection({ id }: { id: string | undefined }) {
  const [comments, setComments] = React.useState<ArticleComment[]>([]);

  const { user } = useAuth();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CommentData>({ resolver: zodResolver(commentSchema) });

  const onSubmit = (data: CommentData) => {
    if (user?.fullName && id) {
      const newComment: ArticleComment = {
        comment: data.comment,
        commenter: user.fullName,
        createdAt: new Date().toISOString(),
      };

      try {
        addComment(user.fullName, newComment.comment, id);
        setComments((prevComments) => [...prevComments, newComment]);
        reset();
      } catch (error) {
        console.error(error);
        throw error;
      }
    }
  };

  React.useEffect(() => {
    const fetchComments = () => {
      if (id) {
        const fetchedComments = getComments(id);
        if (fetchedComments) setComments(fetchedComments);
      }
    };

    fetchComments();
  }, [id]);

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
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Input {...register("comment")} />
          <Button type="submit">Add comment</Button>
        </Form>
        {errors.comment && <ErrorText>{errors.comment.message}</ErrorText>}
      </StyledInputContainer>
    </StyledCommentSection>
  );
}
