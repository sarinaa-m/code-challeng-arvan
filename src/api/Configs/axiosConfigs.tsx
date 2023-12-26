import axios from "axios";
import secureLocalStorage from "react-secure-storage";

export const api = axios.create({
  baseURL: "https://api.realworld.io/api/",
});

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
