import axios from "axios";

interface NewsPost {
  _id: string;
  createdBy: string;
  lastEditedBy: string;
  headline: string;
  shortDescription: string;
  fullDescription: string;
  imageUrl: string;
  category: string;
  createdAt: string;
  lastEditedAt: string;
  isBreakingNews: boolean;
  __v: number;
}

export const getFrontPageNews = async (): Promise<NewsPost[] | undefined> => {
  try {
    const response = await axios.get<NewsPost[]>(
      "http://localhost:3000/news/front-page",
      {
        headers: {
          accept: "application/json",
        },
      }
    );

    const newsData = response.data;
    return newsData;
  } catch (error) {
    console.error("Error fetching news:", error);
  }
};
