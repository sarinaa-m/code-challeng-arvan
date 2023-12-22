import { createSelector } from '@reduxjs/toolkit'
import { RootState } from '../ConfigStore'

export const getArticleData = ({ articles }: RootState) => ({
  loading: articles.articleLists.loading,
  articleCount: articles.articleLists.articlesCount,
  data: articles.articleLists.data,
})
