import { NewsDetail } from "../pages/NewsDetail";
import { NewsPostDetail, NewsPostFrontPage } from "../types/NewsTypes";
import { request } from "./base";

export const getFrontPageNews = async (
  token: string
): Promise<NewsPostFrontPage[] | undefined> => {
  try {
    return await request<NewsPostFrontPage[]>({
      token,
      url: "news/front-page",
    });
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getNewsArticleById = async (
  token: string,
  id: string
): Promise<NewsPostDetail | undefined> => {
  try {
    return await request<NewsPostDetail | undefined>({
      token,
      url: "news",
      id,
    });
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const createPost = async (
  token: string,
  formData: FormData
): Promise<NewsPostDetail | undefined> => {
  try {
    return await request<NewsPostDetail | undefined>({
      method: "post",
      url: "news",
      data: formData,
      token,
    });
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
    return await request<NewsPostDetail | undefined>({
      method: "patch",
      url: "news",
      token,
      id,
      data,
    });
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
    return await request<string | undefined>({
      method: "delete",
      url: "news/",
      token,
      id,
    });
  } catch (error) {
    console.error(error);
    throw error;
  }
};
