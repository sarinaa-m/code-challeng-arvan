import { createSlice } from '@reduxjs/toolkit'
import { ARTICLE_STATE_NAME } from '../model/state'
import { IArticleState } from '../../interfaces/IArticles'
import { fetchArticles } from '../actions/ArticleAction'

const initialState: IArticleState = {
  articleLists: {
    loading: true,
    articlesCount: 0,
    data: [],
    error: null,
  },
}

export const ArticleSlice = createSlice({
  name: ARTICLE_STATE_NAME,
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchArticles.pending, (state) => {
        state.articleLists.loading = true
        state.articleLists.error = null
      })
      .addCase(fetchArticles.fulfilled, (state, action) => {
        state.articleLists.loading = false
        state.articleLists.data = action.payload.articles
        state.articleLists.articlesCount = action.payload.articlesCount
        state.articleLists.error = null
      })
      .addCase(fetchArticles.rejected, (state, action) => {
        state.articleLists.loading = false
        state.articleLists.error = action.error.message
      })
  },
})
export default ArticleSlice.reducer
