interface ArticleComment {
  comment: string;
  commenter: string;
  createdAt: string;
}

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

    if (!userName || !comment || !articleId) return "Error";

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
  }
};

export const getComments = (
  articleId: string | undefined
): ArticleComment[] | undefined => {
  try {
    if (!articleId) return undefined;

    const response = localStorage.getItem(`comments_${articleId}`);
    if (response === null) return undefined;

    const parsedComments = JSON.parse(response);

    console.log("Parsed Comments:", parsedComments);

    return Array.isArray(parsedComments) ? parsedComments : undefined;
  } catch (error) {
    console.error(error);
    return undefined;
  }
};
