import { useQuery } from "@tanstack/react-query";
import { getFrontPageNews } from "../../../api/news";
import { ErrorText } from "../../atoms/ErrorText";
import { useAuth } from "../../hooks/useAuth";
import { NewsArticle } from "../../organisms/NewsArticle";
import styled from "styled-components";

const StyledNewsList = styled.ul`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  padding: 5vh 0;
  justify-items: center;
  align-items: center;
  gap: 2rem;
  @media screen and (max-width: 1024px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 1.5rem;
  }
  @media screen and (max-width: 425px) {
    grid-template-columns: repeat(1, 1fr);
    gap: 1rem;
  }
`;

const StyledHomepage = styled.div`
  width: 100%;
`;

export default function Homepage() {
  const { token } = useAuth();

  const {
    data: news,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["frontPageNews"],
    queryFn: async () => {
      const res = await getFrontPageNews(token);
      return res;
    },
  });

  if (isLoading) return <p>Loading...</p>;
  if (error) return <ErrorText>Error</ErrorText>;

  return (
    <StyledHomepage>
      <StyledNewsList>
        {news?.map((article) => (
          <NewsArticle article={article} key={article._id} />
        ))}
      </StyledNewsList>
    </StyledHomepage>
  );
}
