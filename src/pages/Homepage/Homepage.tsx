import { useQuery } from "@tanstack/react-query";
import { getFrontPageNews } from "../../api/news";
import { ErrorText } from "../../components/atoms/ErrorText";
import { useAuth } from "../../lib/hooks/useAuth";
import { NewsArticle } from "../../components/organisms/NewsArticle";
import styled from "styled-components";
import { Loader } from "../../components/atoms/Loader";
import { mediaQueries } from "../../theme/mediaQueries";
import { spacings } from "../../theme/spacings";

const StyledNewsList = styled.ul`
  display: grid;
  padding: ${spacings.sm} 0;
  justify-items: center;
  align-items: center;
  grid-template-columns: repeat(1, 1fr);
  gap: ${spacings.md};

  ${mediaQueries.sm} {
    grid-template-columns: repeat(2, 1fr);
    gap: ${spacings.lg};
    padding: ${spacings.sm} 0;
  }
  ${mediaQueries.lg} {
    grid-template-columns: repeat(3, 1fr);
  }
`;

export default function Homepage() {
  const { token } = useAuth();

  const {
    data: news,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["frontPageNews"],
    queryFn: async () => await getFrontPageNews(token),
  });

  if (isLoading) return <Loader />;
  if (error) return <ErrorText>{error.message}</ErrorText>;

  return (
    <StyledNewsList>
      {news?.map((article) => (
        <NewsArticle article={article} key={article._id} />
      ))}
    </StyledNewsList>
  );
}
