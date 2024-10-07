import { ArticleComment } from "../types/CommentTypes";

export const addComment = (
  userName: string,
  comment: string,
  articleId: string
) => {
  try {
    const commentObject: ArticleComment = {
      comment,
      commenter: userName,
      createdAt: new Date().toISOString(),
    };

    if (!userName || !comment || !articleId) {
      throw new Error(
        "User name, comment and article ID must be passed and valid"
      );
    }

    const existingComments: ArticleComment[] = JSON.parse(
      localStorage.getItem(`comments_${articleId}`) || "[]"
    );
    existingComments.push({
      ...commentObject,
    });

    localStorage.setItem(
      `comments_${articleId}`,
      JSON.stringify(existingComments)
    );
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getComments = (
  articleId: string | undefined
): ArticleComment[] | undefined => {
  try {
    if (!articleId) throw new Error("Article ID must be passed and valid");

    const response = localStorage.getItem(`comments_${articleId}`);
    if (response === null) return undefined;

    const parsedComments = JSON.parse(response);

    return Array.isArray(parsedComments) ? parsedComments : undefined;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
