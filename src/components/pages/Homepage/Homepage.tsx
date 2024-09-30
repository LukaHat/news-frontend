import { useQuery } from "@tanstack/react-query";
import { Navbar } from "../../organisms/Navbar";
import { getFrontPageNews } from "../../../api/news";
import { ErrorText } from "../../atoms/ErrorText";
import { useAuth } from "../../../context/AuthContext";
import { NewsArticle } from "../../organisms/NewsArticle";
import styled from "styled-components";

const StyledNewsList = styled.ul`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
`;

const StyledHomepage = styled.div`
  width: 100dvw;
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
      <Navbar />
      <StyledNewsList>
        {news?.map((article) => (
          <NewsArticle article={article} key={article._id} />
        ))}
      </StyledNewsList>
    </StyledHomepage>
  );
}
