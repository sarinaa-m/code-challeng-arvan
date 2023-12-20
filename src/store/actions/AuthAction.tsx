import { createAsyncThunk } from "@reduxjs/toolkit";
import { DataProvider } from "../../api/DataProvider";



export const login = createAsyncThunk(
    'auth/login', async (payload: any, thunkAPI: any) => {
        try {
            debugger
            const result = DataProvider.post('users/login', {
                user: { ...payload }
            })
            return result
        } catch (error) {
            console.log("error", error)
        }
    }
)