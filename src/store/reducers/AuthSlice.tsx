import { createSlice } from '@reduxjs/toolkit'
import { AUTH_STATE_NAME } from '../model/state'
import { IAuth } from '../../interfaces/ILogin'
import { registerUser } from '../actions/AuthAction'

const initialState: IAuth = {
  modifyUser: {
    loading: false,
    error: null,
    data: {
      user: {
        email: '',
        username: '',
        bio: null,
        image: '',
        token: '',
      },
    },
  },
}

export const AuthSlice = createSlice({
  name: AUTH_STATE_NAME,
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.modifyUser.loading = true
        state.modifyUser.error = null
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.modifyUser.loading = false
        state.modifyUser.error = null
        state.modifyUser.data = action.payload
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.modifyUser.loading = false
        state.modifyUser.error = action.error.message
      })
  },
})

export default AuthSlice.reducer
