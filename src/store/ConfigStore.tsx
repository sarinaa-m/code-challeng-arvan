import { configureStore } from '@reduxjs/toolkit'
import AuthReducer from './reducers/AuthSlice'
import ArticleReducer from './reducers/ArticleSlice'
export const store = configureStore({
  reducer: {
    auth: AuthReducer,
    articles: ArticleReducer,
  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
