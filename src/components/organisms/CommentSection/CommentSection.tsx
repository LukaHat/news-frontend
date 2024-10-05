import { useEffect, useState } from "react";
import { Button } from "../../atoms/Button";
import { Input } from "../../atoms/Input";
import { useAuth } from "../../../context/AuthContext";
import { addComment, getComments } from "../../../api/comment";
import { Comment } from "../../molecules/Comment";

interface ArticleComment {
  comment: string;
  commenter: string;
  createdAt: string;
}

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
    <section>
      {comments.map((commentInstance) => (
        <Comment
          key={commentInstance.createdAt}
          comment={commentInstance.comment}
          commenter={commentInstance.commenter}
          createdAt={commentInstance.createdAt}
        />
      ))}

      <Input
        type="textarea"
        value={comment}
        onChange={(e) => setComment(e.target.value)}
      />
      <Button onClick={handleAddComment}>Add comment</Button>
    </section>
  );
}
