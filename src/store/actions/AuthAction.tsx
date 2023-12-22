import { createAsyncThunk } from '@reduxjs/toolkit'
import { DataProvider } from '../../api/DataProvider'
import { message } from 'antd'

export const registerUser = createAsyncThunk(
  'auth/registerUser',
  async (
    payload: {
      email: string
      password: number | string
    },
    thunkAPI: any
  ) => {
    try {
      const result = await DataProvider.post('users', {
        user: { ...payload },
      })
      localStorage.setItem('token', result.user.token)
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

export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async (
    payload: {
      email: string
      password: number | string
    },
    thunkAPI: any
  ) => {
    try {
      const result = await DataProvider.post('users/login', {
        user: { ...payload },
      })
      localStorage.setItem('token', result.user.token)
      thunkAPI.dispatch(fetchCurrentUser())
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

export const fetchCurrentUser = createAsyncThunk(
  'auth/loginUser',
  async (_, thunkAPI: any) => {
    try {
      const result = await DataProvider.getList('user')
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
