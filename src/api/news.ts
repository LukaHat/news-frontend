import axios from "axios";
import placeholder from "../assets/images/placeholder.jpg";
import { NewsDetail } from "../components/pages/NewsDetail";

interface NewsPostFrontPage {
  _id: string;
  createdBy: string;
  headline: string;
  shortDescription: string;
  imageUrl: string;
  createdAt: string;
  isBreakingNews: boolean;
}

interface NewsPostDetail extends NewsPostFrontPage {
  lastEditedBy: string;
  fullDescription: string;
  lastEditedAt: string;
  category: string;
  __v: number;
}

interface CreateArticle {
  headline: string;
  shortDescription: string;
  imageUrl?: string;
  isBreakingNews: boolean;
  fullDescription: string;
  category: string;
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
  id: string
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

export const createPost = async (
  token: string | undefined,
  data: CreateArticle
): Promise<NewsPostDetail | undefined> => {
  try {
    if (!token) {
      throw new Error("Authorization token is missing");
    }

    const formData = new FormData();

    formData.append("headline", data.headline);
    formData.append("shortDescription", data.shortDescription);
    formData.append("fullDescription", data.fullDescription);
    formData.append("category", data.category);
    formData.append("isBreakingNews", data.isBreakingNews.toString());

    if (data.imageUrl) {
      formData.append("image", data.imageUrl[0]);
    } else {
      formData.append("image", placeholder);
    }

    const response = await axios.post("http://localhost:3000/news", formData, {
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${token}`,
        "Content-Type": "mutipart/form-data",
      },
    });

    console.log("RESPONSE:", response);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const updateArticle = async (
  token: string | undefined,
  articleId: string | undefined,
  articleData: Partial<typeof NewsDetail>
): Promise<NewsPostDetail | undefined> => {
  try {
    console.log("REQ DATA:", token, "Now the id", articleId, articleData);
    const response = await axios.patch(
      `http://localhost:3000/news/${articleId}`,
      articleData,
      {
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log("RESPONSE:", response);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};
