import { createAsyncThunk } from '@reduxjs/toolkit'
import { DataProvider } from '../../api/DataProvider'
import { message } from 'antd'

export const fetchArticles = createAsyncThunk(
  'articles/fetchArticles',
  async (_, thunkAPI: any) => {
    try {
      const result = await DataProvider.getList('articles')
      return result
    } catch (error: any) {
      message.error(
        `${error?.response?.data?.errors || error?.message || 'Error'}`
      )
      return thunkAPI.rejectWithValue(
        error?.response?.data?.errors || error?.message || 'Error'
      )
    }
  }
)

export const deleteArticle = createAsyncThunk(
  'articles/deleteArticle',
  async (payload: string, thunkAPI: any) => {
    try {
      debugger
      const result = await DataProvider.delete(`articles`, { id: payload })
      return result
    } catch (error: any) {
      message.error(
        `${error?.response?.data?.errors || error?.message || 'Error'}`
      )
      return thunkAPI.rejectWithValue(
        error?.response?.data?.errors || error?.message || 'Error'
      )
    }
  }
)
export const addArticle = createAsyncThunk(
  'articles/addArticle',
  async (payload: any, thunkAPI: any) => {
    try {
      debugger
      const result = await DataProvider.post(`articles`, { article: payload })
      return result
    } catch (error: any) {
      message.error(
        `${error?.response?.data?.errors || error?.message || 'Error'}`
      )
      return thunkAPI.rejectWithValue(
        error?.response?.data?.errors || error?.message || 'Error'
      )
    }
  }
)
export const fetchTagList = createAsyncThunk(
  'articles/fetchTagList',
  async (_, thunkAPI: any) => {
    try {
      debugger
      const result = await DataProvider.getList(`tags`)
      return result
    } catch (error: any) {
      message.error(
        `${error?.response?.data?.errors || error?.message || 'Error'}`
      )
      return thunkAPI.rejectWithValue(
        error?.response?.data?.errors || error?.message || 'Error'
      )
    }
  }
)
