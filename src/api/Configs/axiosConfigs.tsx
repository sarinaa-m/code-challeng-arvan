import { message } from 'antd';
import axios from 'axios';

export const api = axios.create({
  baseURL: 'https://api.realworld.io/api/',
  withCredentials: true,
});

// defining a custom error handler for all APIs
const errorHandler = (error: any) => {
  const statusCode = error.response?.status;
  if (error.code === 'ERR_CANCELED') {
    message.error('API Cancelled');
    return Promise.resolve();
  }
  if (error.code === 'ERR_NETWORK') {
    message.error('ERR_NETWORK');
    return Promise.resolve();
  }

  // logging only errors that are not 401
  if (statusCode && statusCode !== 401) {
    console.error(error);
  }

  return Promise.reject(error);
};

api.interceptors.response.use(undefined, async (error: any) => {
  const status = error?.code;
  // switch (status) {
  // TODO:check on 401
  // case "ERR_NETWORK":
  //   try {
  //     return api(error.config);
  //   } catch (refreshError) {
  //     console.error("Token refresh error:", refreshError);
  //     // Redirect to the login page or perform other actions as needed
  //     throw refreshError;
  //   }
  // case 403:
  //   try {

  //     // If successful, retry the original request
  //     return api(error.config);
  //   } catch (refreshError) {
  //     // Handle errors during token refresh
  //     console.error("Token refresh error:", refreshError);
  //     // Redirect to the login page or perform other actions as needed
  //     throw refreshError;
  //   }
  // default:
  //   break;
  // }
  return errorHandler(error);
});

// Add a request interceptor
api.interceptors.request.use(
  async (config: any) => {
    const tokenKey: any = localStorage.getItem('token');
    if (tokenKey) {
      config.headers.Authorization = `Bearer ${tokenKey}`;
    }
    return config;
  },
  (error: any) => {
    Promise.reject(error);
  },
);
