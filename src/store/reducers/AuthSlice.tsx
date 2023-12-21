import { createSlice } from '@reduxjs/toolkit'
import { AUTH_STATE_NAME } from '../model/state'
import login from '../actions/AuthAction'
import { IAuth } from '../../interfaces/ILogin'

const initialState: IAuth = {
  login: {
    loading: false,
    error: null,
  },
}

export const AuthSlice = createSlice({
  name: AUTH_STATE_NAME,
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.login.loading = true
        state.login.error = null
      })
      .addCase(login.fulfilled, (state) => {
        state.login.loading = false
        state.login.error = null
      })
      .addCase(login.rejected, (state, action) => {
        state.login.loading = false
        state.login.error = action.error.message
      })
  },
})

export default AuthSlice.reducer
