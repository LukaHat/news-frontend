import { Link } from "react-router-dom";
import styled from "styled-components";
import { themeColors } from "../../../theme/colors";
import placeholder from "../../../assets/images/placeholder.jpg";
import {
  flexContainer,
  flexContainerColumn,
} from "../../../styles/utils/mixins";
import { formatDate } from "../../../lib/helper/helper";
import { shadows } from "../../../theme/shadows";
import { typography } from "../../../theme/typography";
import { mediaQueries } from "../../../theme/mediaQueries";
import { radius } from "../../../theme/radius";
import { spacings } from "../../../theme/spacings";

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
  width: 100%;
  height: 40vh;
  border-radius: ${radius.sm};
  transition: 400ms;
  ${flexContainer}

  &:hover {
    box-shadow: ${shadows.baseHoverShadow};
  }

  a {
    ${flexContainerColumn}
    text-decoration: none;
    color: inherit;
  }

  img {
    max-width: 100%;
  }

  h2 {
    ${typography.headings.sm}
    font-family: ${typography.baseFonts.secondary.secondaryFont};
    font-weight: bold;
    text-align: center;
    margin-top: ${spacings.margins.sm};
    font-weight: bold;
    text-align: center;
  }

  ${mediaQueries.sm} {
    width: 85%;
    height: 35vh;
    background-color: ${themeColors.primary.elementaryBlack};
    color: ${themeColors.primary.elementaryWhite};

    img {
      height: 8rem;
      width: auto;
    }

    h2 {
      margin-top: ${spacings.margins.sm};
      font-weight: bold;
      ${typography.headings.md}
    }
  }
  ${mediaQueries.lg} {
    width: 90%;
    height: 50vh;

    h2 {
      ${typography.headings.md}
    }

    img {
      height: 12rem;
      width: auto;
    }
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
              {createdBy} {formatDate(createdAt)}
            </span>
          </p>
        </div>
      </Link>
    </StyledNewsArticle>
  );
}
