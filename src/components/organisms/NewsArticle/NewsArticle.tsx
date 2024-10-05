import { Link } from "react-router-dom";
import styled from "styled-components";
import { themeColors } from "../../../theme/colors";
import { appFonts } from "../../../theme/fonts";
import placeholder from "../../../assets/images/placeholder.jpg";

interface NewsArticleProps {
  article: {
    _id: string;
    createdBy: string;
    headline: string;
    shortDescription: string;
    imageUrl: string;
    category?: string;
    createdAt: string;
    isBreakingNews: boolean;
    __v?: number;
  };
}

const StyledNewsArticle = styled.li`
  width: 90%;
  height: 40vh;
  padding: 1rem;
  border-radius: 0.5rem;
  background-color: ${themeColors.primary.elementaryBlack};
  color: ${themeColors.primary.elementaryWhite};
  display: flex;
  align-items: center;
  justify-content: center;

  a {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;

    text-decoration: none;
    color: inherit;
  }
  h2 {
    font-size: 1.4rem;
    margin-top: 1rem;
    font-weight: bold;
    font-family: ${appFonts.secondary.newsHeading};
    text-align: center;
  }
  img {
    height: 15rem;
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

  const date = new Date(createdAt);

  const formattedDate = date.toLocaleDateString();

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
              {createdBy} {formattedDate}
            </span>
          </p>
        </div>
      </Link>
    </StyledNewsArticle>
  );
}
