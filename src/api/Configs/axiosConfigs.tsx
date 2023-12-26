import { message } from "antd";
import axios from "axios";
import secureLocalStorage from "react-secure-storage";

export const api = axios.create({
  baseURL: "https://api.realworld.io/api/",
});

// defining a custom error handler for all APIs
const errorHandler = (error: any) => {
  const statusCode = error.response?.status;
  if (error.code === "ERR_CANCELED") {
    message.error("API Cancelled");
    return Promise.resolve();
  }
  if (error.code === "ERR_NETWORK") {
    message.error("ERR_NETWORK");
    return Promise.resolve();
  }

  // logging only errors that are not 401
  if (statusCode && statusCode !== 401) {
    console.error(error);
  }

  return Promise.reject(error);
};

api.interceptors.response.use(undefined, async (error: any) => {
  return errorHandler(error);
});

// Add a request interceptor
api.interceptors.request.use(
  async (config: any) => {
    const tokenKey: any = secureLocalStorage.getItem("token");
    if (tokenKey) {
      config.headers.Authorization = `Token ${tokenKey}`;
    }
    return config;
  },
  (error: any) => {
    Promise.reject(error);
  }
);
