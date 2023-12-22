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
