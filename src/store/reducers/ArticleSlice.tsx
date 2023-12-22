import { createSlice } from '@reduxjs/toolkit'
import { ARTICLE_STATE_NAME } from '../model/state'
import { IArticleState } from '../../interfaces/IArticles'
import {
  addArticle,
  fetchArticles,
  fetchTagList,
} from '../actions/ArticleAction'

const initialState: IArticleState = {
  articleLists: {
    loading: true,
    articlesCount: 0,
    data: [],
    error: null,
  },
  tagList: {
    loading: true,
    data: [],
    error: null,
  },
  addArticle: {
    loading: false,
    error: null,
  },
}

export const ArticleSlice = createSlice({
  name: ARTICLE_STATE_NAME,
  initialState,
  reducers: {
    setTagList: (state, action) => {
      state.tagList.data = [...state.tagList.data, action.payload]
    },
  },
  extraReducers: (builder) => {
    builder
      /********** FETCH ARTICLES **********/
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
      /********** FETCH TAGS **********/
      .addCase(fetchTagList.pending, (state) => {
        state.tagList.loading = true
        state.tagList.error = null
      })
      .addCase(fetchTagList.fulfilled, (state, action) => {
        state.tagList.loading = false
        state.tagList.data = action.payload.tags
        state.tagList.error = null
      })
      .addCase(fetchTagList.rejected, (state, action) => {
        state.tagList.loading = false
        state.tagList.error = action.error.message
      })
      /********** ADD ARTICLES **********/
      .addCase(addArticle.pending, (state) => {
        state.addArticle.loading = true
        state.addArticle.error = null
      })
      .addCase(addArticle.fulfilled, (state, action) => {
        state.addArticle.loading = false
        state.addArticle.error = null
      })
      .addCase(addArticle.rejected, (state, action) => {
        state.addArticle.loading = false
        state.addArticle.error = action.error.message
      })
  },
})
export const { setTagList } = ArticleSlice.actions

export default ArticleSlice.reducer
