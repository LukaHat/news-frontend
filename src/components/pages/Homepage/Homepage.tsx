import { useQuery } from "@tanstack/react-query";
import { getFrontPageNews } from "../../../api/news";
import { ErrorText } from "../../atoms/ErrorText";
import { useAuth } from "../../hooks/useAuth";
import { NewsArticle } from "../../organisms/NewsArticle";
import styled from "styled-components";
import { Loader } from "../../atoms/Loader";

const StyledNewsList = styled.ul`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  padding: 5vh 0;
  justify-items: center;
  align-items: center;
  gap: 2rem;
  @media screen and (max-width: 1510px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 1.5rem;
    padding: 3vh 0;
  }
  @media screen and (max-width: 575px) {
    grid-template-columns: repeat(1, 1fr);
    gap: 1rem;
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
    queryFn: async () => {
      const res = await getFrontPageNews(token);
      return res;
    },
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
