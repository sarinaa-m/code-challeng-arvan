import { createSlice } from "@reduxjs/toolkit";
import { AUTH_STATE_NAME } from "../model/state";
import { IAuth } from "../../interfaces/IAuth";
import {
  fetchCurrentUser,
  loginUser,
  registerUser,
} from "../actions/AuthAction";

const initialState: IAuth = {
  modifyUser: {
    loading: false,
    error: null,
    data: {
      user: {
        email: "",
        username: "",
        bio: null,
        image: "",
        token: "",
      },
    },
  },
  userData: {
    loading: false,
    error: null,
    userDetail: {
      user: {
        email: "",
        token: "",
        username: "",
        bio: "",
        image: "",
      },
    },
  },
  login: {
    loading: false,
    error: null,
  },
};

export const AuthSlice = createSlice({
  name: AUTH_STATE_NAME,
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      /******************* REGISTER USER **********************/
      .addCase(registerUser.pending, (state) => {
        state.modifyUser.loading = true;
        state.modifyUser.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.modifyUser.loading = false;
        state.modifyUser.error = null;
        state.modifyUser.data = action.payload;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.modifyUser.loading = false;
        state.modifyUser.error = action.error.message;
      })
      /******************* LOGIN **********************/
      .addCase(loginUser.pending, (state) => {
        state.login.loading = true;
        state.login.error = null;
      })
      .addCase(loginUser.fulfilled, (state) => {
        state.login.loading = false;
        state.login.error = null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.login.loading = false;
        state.login.error = action.error.message;
      })
      /******************* FETCH CURRENT USER **********************/
      .addCase(fetchCurrentUser.pending, (state) => {
        state.userData.loading = true;
        state.userData.error = null;
      })
      .addCase(fetchCurrentUser.fulfilled, (state, action) => {
        state.userData.loading = false;
        state.userData.error = null;
        state.userData.userDetail = action.payload;
      })
      .addCase(fetchCurrentUser.rejected, (state, action) => {
        state.userData.loading = false;
        state.userData.error = action.error.message;
      });
  },
});

export default AuthSlice.reducer;
