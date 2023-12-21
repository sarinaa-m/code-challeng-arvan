import { createAsyncThunk } from '@reduxjs/toolkit';
import { DataProvider } from '../../api/DataProvider';

export const login = createAsyncThunk(
  'auth/login',
  async (payload: { email: string; password: number | string }) => {
    try {
      const result = await DataProvider.post('users/login', {
        user: { ...payload },
      });
      return result;
    } catch (error) {
      return undefined;
    }
  }
);
