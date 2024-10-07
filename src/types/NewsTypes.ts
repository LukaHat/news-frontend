export interface NewsPostFrontPage {
  _id: string;
  createdBy: string;
  headline: string;
  shortDescription: string;
  imageUrl: string;
  createdAt: string;
  isBreakingNews: boolean;
}

export interface NewsPostDetail extends NewsPostFrontPage {
  lastEditedBy: string;
  fullDescription: string;
  lastEditedAt: string;
  category: string;
  __v: number;
}

export interface CreateArticle {
  headline: string;
  shortDescription: string;
  imageUrl?: string;
  isBreakingNews: boolean;
  fullDescription: string;
  category: string;
}
