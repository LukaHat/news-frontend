import axios from "axios";

interface NewsPostFrontPage {
  _id: string;
  createdBy: string;
  headline: string;
  shortDescription: string;
  imageUrl: string;
  category: string;
  createdAt: string;
  isBreakingNews: boolean;
  __v: number;
}

interface NewsPostDetail extends NewsPostFrontPage {
  lastEditedBy: string;
  fullDescription: string;
  lastEditedAt: string;
}

export const getFrontPageNews = async (
  token: string | undefined
): Promise<NewsPostFrontPage[] | undefined> => {
  try {
    const response = await axios.get<NewsPostFrontPage[]>(
      "http://localhost:3000/news/front-page",
      {
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const newsData = response.data;
    return newsData;
  } catch (error) {
    console.error("Error fetching news:", error);
  }
};

export const getNewsArticleById = async (
  token: string | undefined,
  id: string | undefined
): Promise<NewsPostDetail | undefined> => {
  try {
    const response = await axios.get<NewsPostDetail>(
      `http://localhost:3000/news/${id}`,
      {
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const articleData = response.data;
    return articleData;
  } catch (error) {
    console.error("Error fetching news article:", error);
  }
};
