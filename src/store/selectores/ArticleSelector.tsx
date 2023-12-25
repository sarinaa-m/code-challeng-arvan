import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "../ConfigStore";

export const getArticleData = ({ articles }: RootState) => ({
  loading: articles.articleLists.loading,
  articleCount: articles.articleLists.articlesCount,
  data: articles.articleLists.data,
});
export const getTagData = ({ articles }: RootState) => ({
  loading: articles.tagList.loading,
  data: articles.tagList.data,
});

export const addArticleData = ({ articles }: RootState) => ({
  loading: articles.addArticle.loading,
});

export const getArticleById = ({ articles }: RootState) => ({
  loading: articles.addArticle.loading,
  item: articles.addArticle.data?.article,
});
