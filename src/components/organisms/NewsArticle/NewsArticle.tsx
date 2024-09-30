import { Link } from "react-router-dom";
import styled from "styled-components";
import { themeColors } from "../../../theme/colors";
import placeholder from "../../../assets/placeholder.jpg";

interface NewsArticleProps {
  article: {
    _id: string;
    createdBy: string;
    headline: string;
    shortDescription: string;
    imageUrl: string;
    category: string;
    createdAt: string;
    isBreakingNews: boolean;
    __v: number;
  };
}

const StyledNewsArticle = styled.li`
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid ${themeColors.primary.elementaryBlue};
  a {
    text-decoration: none;
    color: inherit;
  }
  h2 {
    font-size: 1.4rem;
  }
  img {
    height: 200px;
    width: auto;
  }
`;

export default function NewsArticle({ article }: NewsArticleProps) {
  const {
    _id: id,
    imageUrl,
    headline,
    isBreakingNews,
    shortDescription,
    createdBy,
    createdAt,
  } = article;

  if (headline === "[Removed]") return;

  return (
    <StyledNewsArticle>
      <Link to={`/news/detail/${id}`}>
        <img
          src={
            imageUrl !==
            "https://cobe-backend.s3.eu-central-1.amazonaws.com/no-image-available.png"
              ? imageUrl
              : placeholder
          }
          alt={headline}
        />
        <h2>{isBreakingNews ? `BREAKING NEWS: ${headline}` : headline}</h2>
        <div>
          <p>{shortDescription}</p>
          <p>
            <span>
              {createdBy} | {createdAt}
            </span>
          </p>
        </div>
      </Link>
    </StyledNewsArticle>
  );
}
