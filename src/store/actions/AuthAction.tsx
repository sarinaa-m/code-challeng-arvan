import { createAsyncThunk } from "@reduxjs/toolkit";
import { DataProvider } from "../../api/DataProvider";
import { message } from "antd";
import secureLocalStorage from "react-secure-storage";

export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async (
    payload: {
      email: string;
      password: number | string;
    },
    thunkAPI: any
  ) => {
    try {
      const result = await DataProvider.post("users", {
        user: { ...payload },
      });
      message.success(`User added Successfully`);
      secureLocalStorage.setItem("token", result.user.token);
      return result;
    } catch (error: any) {
      Object.entries(error.response.data.errors).forEach(
        ([key, value]: any) => {
          message.error(
            `${key}: ${value[0]}` || `${error?.message || "Error"}`
          );
        }
      );
      return thunkAPI.rejectWithValue(
        error?.response?.data?.errors || error?.message || "Error"
      );
    }
  }
);

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (
    payload: {
      email: string;
      password: number | string;
    },
    thunkAPI: any
  ) => {
    try {
      const result = await DataProvider.post("users/login", {
        user: { ...payload },
      });
      secureLocalStorage.setItem("token", result.user.token);
      return result;
    } catch (error: any) {
      Object.entries(error.response.data.errors).forEach(
        ([key, value]: any) => {
          message.error(
            `${key}: ${value[0]}` || `${error?.message || "Error"}`
          );
        }
      );
      return thunkAPI.rejectWithValue(
        error?.response?.data?.errors || error?.message || "Error"
      );
    }
  }
);

export const fetchCurrentUser = createAsyncThunk(
  "auth/fetchCurrentUser",
  async (_, thunkAPI: any) => {
    try {
      const result = await DataProvider.getList("user");
      return result;
    } catch (error: any) {
      Object.entries(error.response.data.errors).forEach(
        ([key, value]: any) => {
          message.error(
            `${key}: ${value[0]}` || `${error?.message || "Error"}`
          );
        }
      );
      return thunkAPI.rejectWithValue(
        error?.response?.data?.errors || error?.message || "Error"
      );
    }
  }
);
