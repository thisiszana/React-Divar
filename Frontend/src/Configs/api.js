import axios from "axios";

import { getNewToken } from "Services/token";
import { setCookie } from "Utils/cookies";
import { getCookie } from "Utils/cookies";

const api = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(
  (request) => {
    const accessToken = getCookie("accessToken");

    if (accessToken) {
      request.headers["Authorization"] = `bearer ${accessToken}`;
    }

    return request;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    if (error.response.status === 401 && !originalRequest._rtry) {
      originalRequest._rtry = true;

      const res = await getNewToken();
      if (!res?.response) return;
      setCookie(res.response.data);

      return api(originalRequest._rtry);
    }
  }
);

export default api;
