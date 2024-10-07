import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { getNewsArticleById } from "../../../api/news";
import { ErrorText } from "../../atoms/ErrorText";
import styled from "styled-components";
import { appFonts } from "../../../theme/fonts";
import placeholder from "../../../assets/images/placeholder.jpg";
import { themeColors } from "../../../theme/colors";
import { Button } from "../../atoms/Button";
import { useModal } from "../../hooks/useModal";
import { CommentSection } from "../../organisms/CommentSection";
import { useAuth } from "../../hooks/useAuth";

const StyledNewsDetail = styled.div`
  width: 100vw;
  height: 100%;
  padding: 0.5vh 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  background-color: ${themeColors.primary.elementaryBlack};

  .image-container {
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

  .text-content {
    width: 70%;
    padding: 0.5% 15%;
    color: ${themeColors.primary.elementaryWhite};
  }

  h2 {
    font-size: 2.2rem;
    font-weight: bold;
    font-family: ${appFonts.secondary.secondaryFont};
  }

  h3 {
    font-size: 1.8rem;
    padding: 1rem;
    margin: 0.5rem 0;
    background-color: ${themeColors.secondary.expandedGreen};
    color: ${themeColors.primary.elementaryWhite};
    font-family: ${appFonts.secondary.secondaryFont};
  }
`;

export default function NewsDetail() {
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
      <div className="image-container">
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
      <div className="text-content">
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
      <div className="text-content">
        <h3>{article?.category.toUpperCase()}</h3>
        <h2>{article?.headline}</h2>
        <p>{article?.fullDescription}</p>
      </div>
      <CommentSection id={id} />
    </StyledNewsDetail>
  );
}
