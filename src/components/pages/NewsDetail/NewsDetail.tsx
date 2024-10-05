import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { getNewsArticleById } from "../../../api/news";
import { useAuth } from "../../../context/AuthContext";
import { ErrorText } from "../../atoms/ErrorText";
import styled from "styled-components";
import { appFonts } from "../../../theme/fonts";
import placeholder from "../../../assets/images/placeholder.jpg";
import { themeColors } from "../../../theme/colors";
import { addComment, getComments } from "../../../api/comment";
import { Button } from "../../atoms/Button";
import { Input } from "../../atoms/Input";
import { useEffect, useState } from "react";
import { Comment } from "../../molecules/Comment";
import { useModal } from "../../../context/ModalContext";

const StyledNewsDetail = styled.div`
  width: 100vw;
  height: 100%;
  padding: 0.5vh 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  background-color: ${themeColors.primary.elementaryBlack};
  div {
    width: 70%;
    padding: 0.5% 15%;
    color: ${themeColors.primary.elementaryWhite};
    height: auto;
    img {
      width: 100%;
      height: 40rem;
      object-fit: cover;
      object-position: top;
      border-radius: 0.5rem;
    }
  }
  h2 {
    font-size: 2.2rem;
    font-weight: bold;
    font-family: ${appFonts.secondary.newsHeading};
  }
  h3 {
    font-size: 1.8rem;
    padding: 1rem;
    margin: 0.5rem 0;
    background-color: ${themeColors.secondary.expandedGreen};
    color: ${themeColors.primary.elementaryWhite};
    font-family: ${appFonts.secondary.newsHeading};
  }
`;
interface ArticleComment {
  comment: string;
  commenter: string;
  createdAt: string;
}

export default function NewsDetail() {
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState<ArticleComment[]>([]);
  const { token, user } = useAuth();
  const { id } = useParams();
  const { openModal, setEditData } = useModal();

  const {
    data: article,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["newsDetails", id],
    queryFn: async () => {
      if (id && token) {
        const res = await getNewsArticleById(token, id);
        return res;
      }
    },
  });

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

  let formattedDateCreated;
  let formattedDateEdited;
  if (article?.createdAt && article?.lastEditedAt) {
    formattedDateCreated = new Date(article.createdAt).toLocaleDateString();
    formattedDateEdited = new Date(article.lastEditedAt).toLocaleDateString();
  }

  if (isLoading) return <p>Loading...</p>;
  if (error) return <ErrorText>Error</ErrorText>;

  return (
    <StyledNewsDetail>
      <div>
        <img
          src={
            article?.imageUrl !==
            "https://cobe-backend.s3.eu-central-1.amazonaws.com/no-image-available.png"
              ? article?.imageUrl
              : placeholder
          }
          alt={article?.headline}
        />
      </div>
      <div>
        <p>
          Written by: {article?.createdBy} | {formattedDateCreated}
        </p>
        <p>
          Last edited by: {article?.lastEditedBy} | {formattedDateEdited}
        </p>
        <p>Viewed {article?.__v} times</p>
      </div>
      {user?.fullName === article?.createdBy && (
        <Button
          onClick={() => {
            openModal();
            setEditData({
              id: article?._id,
              headline: article?.headline || "",
              shortDescription: article?.shortDescription || "",
              fullDescription: article?.fullDescription || "",
              category: article?.category || "",
              isBreakingNews: article?.isBreakingNews || false,
              imageUrl: article?.imageUrl || "",
            });
          }}
        >
          Edit
        </Button>
      )}
      <div>
        <h3>{article?.category.toUpperCase()}</h3>
        <h2>{article?.headline}</h2>
        <p>{article?.fullDescription}</p>
      </div>
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
    </StyledNewsDetail>
  );
}
