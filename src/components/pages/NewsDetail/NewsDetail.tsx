import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { getNewsArticleById } from "../../../api/news";
import { useAuth } from "../../../context/AuthContext";
import { ErrorText } from "../../atoms/ErrorText";

export default function NewsDetail() {
  const { token } = useAuth();
  const { id } = useParams();

  const {
    data: article,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["newsDetails"],
    queryFn: async () => {
      const res = await getNewsArticleById(token, id);
      return res;
    },
  });

  if (isLoading) return <p>Loading...</p>;
  if (error) return <ErrorText>Error</ErrorText>;

  return <div>{article?.headline}</div>;
}
