export const formatDate = (date: string | undefined) => {
  if (date) return new Date(date).toLocaleDateString();
};

export const toRem = (sizePx: number) => `${(sizePx / 14).toFixed(2)}rem`;
