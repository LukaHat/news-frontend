import { useQuery } from "@tanstack/react-query";
import { Navbar } from "../../organisms/Navbar";
import { getFrontPageNews } from "../../../api/news";
import { ErrorText } from "../../atoms/ErrorText";

export default function Homepage() {
  const {
    data: news,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["frontPageNews"],
    queryFn: async () => {
      const res = await getFrontPageNews();
      console.log(res);
    },
  });

  console.log(news);

  if (isLoading) return <p>Loading...</p>;
  if (error) return <ErrorText>Error</ErrorText>;

  return (
    <div>
      <Navbar />
      <h1>Homepage</h1>
      <ul></ul>
    </div>
  );
}
