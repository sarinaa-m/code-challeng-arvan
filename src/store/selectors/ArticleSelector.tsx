import { createSelector } from "reselect";
import { RootState } from "../ConfigStore";

const selectArticleSlice = (state: RootState) => state.articles;

const selectArticlesData = (article: RootState["articles"]) => ({
  articleLoading: article.articleLists.loading,
  articleData: article.articleLists.data,
  tagLoading: article.tagList.loading,
  tagData: article.tagList.data,
  addArticleLoading: article.addArticle.loading,
  addArticleData: article.addArticle.data,
  deleteLoading: article.deleteArticle.loading,
});

export const getArticleData = createSelector(
  selectArticleSlice,
  selectArticlesData
);
