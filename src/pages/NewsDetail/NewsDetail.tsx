import { useQuery } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";
import { deleteArticle, getNewsArticleById } from "../../api/news";
import { ErrorText } from "../../components/atoms/ErrorText";
import styled from "styled-components";
import placeholder from "../../assets/images/placeholder.jpg";
import { themeColors } from "../../theme/colors";
import { Button } from "../../components/atoms/Button";
import { CommentSection } from "../../components/organisms/CommentSection";
import { useAuth } from "../../lib/hooks/useAuth";
import { flexContainer, flexContainerColumn } from "../../styles/utils/mixins";
import { Loader } from "../../components/atoms/Loader";
import { formatDate } from "../../lib/helper/helper";
import { useOutletContext } from "react-router-dom";
import { EditDataInterface } from "../../types/NewsTypes";
import { typography } from "../../theme/typography";
import { mediaQueries } from "../../theme/mediaQueries";
import { spacings } from "../../theme/spacings";

const StyledNewsDetail = styled.div`
  ${flexContainerColumn}
  align-items: center;
  justify-content: flex-start;
  background-color: ${themeColors.primary.elementaryBlack};
  min-height: 91vh;

  .image-container {
    width: 100%;
    color: ${themeColors.primary.elementaryWhite};
    height: auto;

    img {
      width: 100%;
      height: 15rem;
      object-fit: cover;
      object-position: top;
    }
  }

  .text-content {
    width: 80%;
    color: ${themeColors.primary.elementaryWhite};
    p {
      ${typography.text.md};
    }

    h2 {
      ${typography.headings.md};
      font-weight: bold;
      font-family: ${typography.secondary.secondaryFont};
    }

    h3 {
      ${typography.headings.sm};
      padding: ${spacings.paddings.sm};
      margin: ${spacings.margins.xs} 0;
      background-color: ${themeColors.secondary.expandedGreen};
      color: ${themeColors.primary.elementaryWhite};
      font-family: ${typography.secondary.secondaryFont};
    }
  }

  .buttons {
    ${flexContainer}
    gap: ${spacings.gaps.sm};
  }

  ${mediaQueries.xs} {
    padding: ${spacings.paddings.xs} 0;
    .text-content {
      width: 70%;
    }
    .image-container {
      width: 80%;
      height: auto;
      img {
        width: 100%;
        max-height: 40rem;
      }
    }
  }

  ${mediaQueries.sm} {
    .image-container {
      width: 70%;
      img {
        width: 100%;
        height: 40rem;
      }
    }
  }
`;

interface OutletContextType {
  setEditData: (data: EditDataInterface | null) => void;
  openModal: () => void;
}

export default function NewsDetail() {
  const { token, user } = useAuth();
  const { id } = useParams();
  const navigate = useNavigate();
  const { setEditData, openModal } = useOutletContext<OutletContextType>();

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

  if (isLoading) return <Loader />;
  if (error) return <ErrorText>{error.message}</ErrorText>;

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
          Written by: {article?.createdBy} | {formatDate(article?.createdAt)}
        </p>
        <p>
          Last edited by: {article?.lastEditedBy} |{" "}
          {formatDate(article?.lastEditedAt)}
        </p>
        <p>Viewed {article?.__v} times</p>
      </div>
      {user?.fullName === article?.createdBy && (
        <div className="buttons">
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
          <Button
            onClick={() => {
              deleteArticle(token, id);
              navigate(-1);
            }}
          >
            Delete
          </Button>
        </div>
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
