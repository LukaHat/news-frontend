import placeholder from "../assets/images/placeholder.jpg";
import { NewsDetail } from "../pages/NewsDetail";
import { request } from "./base";
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
    const response = await request<NewsPostFrontPage[]>({
      token,
      url: "news/front-page",
    });
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
    const response = await request<NewsPostDetail | undefined>({
      token,
      url: "news",
      id,
    });
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

    const response = await request<NewsPostDetail | undefined>({
      method: "post",
      url: "news",
      data: formData,
      token,
    });

    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const updateArticle = async (
  token: string | undefined,
  id: string | undefined,
  data: Partial<typeof NewsDetail>
): Promise<NewsPostDetail | undefined> => {
  try {
    if (!token) {
      throw new Error("Token must be passed and valid");
    }
    if (!id) {
      throw new Error("Article ID must be passed and valid");
    }
    const response = await request<NewsPostDetail | undefined>({
      method: "patch",
      url: "news",
      token,
      id,
      data,
    });
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const deleteArticle = async (
  token: string | undefined,
  id: string | undefined
): Promise<string | undefined> => {
  try {
    if (!token) {
      throw new Error("Token must be passed and valid");
    }
    if (!id) {
      throw new Error("Article ID must be passed and valid");
    }
    const response = await request<string | undefined>({
      method: "delete",
      url: "news/",
      token,
      id,
    });
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
