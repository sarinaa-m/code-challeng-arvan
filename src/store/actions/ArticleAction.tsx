import { createAsyncThunk } from "@reduxjs/toolkit";
import { DataProvider } from "../../api/DataProvider";
import { message } from "antd";
import { resetAddArticle } from "../reducers/ArticleSlice";

export const fetchArticles = createAsyncThunk(
  "articles/fetchArticles",
  async (_, thunkAPI: any) => {
    try {
      const result = await DataProvider.getList("articles");
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

export const deleteArticle = createAsyncThunk(
  "articles/deleteArticle",
  async (payload: string, thunkAPI: any) => {
    try {
      const result = await DataProvider.delete(`articles`, { id: payload });
      thunkAPI.dispatch(fetchArticles());
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

export const addArticle = createAsyncThunk(
  "articles/addArticle",
  async (payload: any, thunkAPI: any) => {
    try {
      const values = { ...payload };
      const result = await DataProvider.post(`articles`, values);
      message.success(`Article added Successfully`);
      thunkAPI.dispatch(resetAddArticle());
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

export const fetchArticleById = createAsyncThunk(
  "articles/fetchArticleById",
  async (payload: string, thunkAPI: any) => {
    try {
      const result = await DataProvider.getOne(`articles`, { id: payload });
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

export const fetchTagList = createAsyncThunk(
  "articles/fetchTagList",
  async (_, thunkAPI: any) => {
    try {
      const result = await DataProvider.getList(`tags`);
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

export const updateArticle = createAsyncThunk(
  "articles/updateArticle",
  async (payload: any, thunkAPI: any) => {
    try {
      const { slug } = payload.article;
      const values = { ...payload };
      const result = await DataProvider.update(`articles/${slug}`, values);
      thunkAPI.dispatch(resetAddArticle());
      message.success(`Article updated Successfully`);

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
