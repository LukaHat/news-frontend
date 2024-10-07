import placeholder from "../assets/images/placeholder.jpg";
import { NewsDetail } from "../components/pages/NewsDetail";
import { patch, post, get, getById, remove } from "./base";
import {
  NewsPostFrontPage,
  NewsPostDetail,
  CreateArticle,
} from "../types/NewsTypes";

export const getFrontPageNews = async (
  token: string | undefined
): Promise<NewsPostFrontPage[] | undefined> => {
  try {
    if (!token) {
      throw new Error("Token must be passed and valid");
    }
    const response = await get<NewsPostFrontPage[]>("news/front-page", token);
    const newsData = response.data;
    return newsData;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getNewsArticleById = async (
  token: string | undefined,
  id: string
): Promise<NewsPostDetail | undefined> => {
  try {
    if (!token) {
      throw new Error("Token must be passed and valid");
    }
    const response = await getById<NewsPostDetail>("news/", token, id);
    const articleData = response.data;
    return articleData;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const createPost = async (
  token: string | undefined,
  data: CreateArticle
): Promise<NewsPostDetail | undefined> => {
  try {
    if (!token) {
      throw new Error("Token must be passed and valid");
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

    const response = await post("news", formData, token);

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
    if (!token) {
      throw new Error("Token must be passed and valid");
    }
    if (!articleId) {
      throw new Error("Article ID must be passed and valid");
    }
    const response = await patch("news/", token, articleId, articleData);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const deleteArticle = async (
  token: string | undefined,
  articleId: string | undefined
): Promise<string | undefined> => {
  try {
    if (!token) {
      throw new Error("Token must be passed and valid");
    }
    if (!articleId) {
      throw new Error("Article ID must be passed and valid");
    }
    const response = await remove("news/", token, articleId);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
