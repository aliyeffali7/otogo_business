
// src/services/api.ts

import axios, { AxiosError, type AxiosRequestConfig } from "axios";
import { getToken, getRefreshToken, setTokens, clearTokens } from "./token";
const RAW = import.meta.env.VITE_API_URL || "";
const BASE_URL = (import.meta.env.VITE_API_URL || "").replace(/\/+$/, "");
const SKIP_AUTH = [
  /^(api\/)?auth\/login/i,
  /^(api\/)?auth\/refresh/i,
  /^(api\/)?auth\/logout/i,
];
const REFRESH_URL = "auth/refresh";

// const api = axios.create({
//   baseURL: BASE_URL,
//   withCredentials: true,
//   headers: { Accept: "application/json" },
// });




const api = axios.create({
  baseURL: BASE_URL || "", // BOŞ qalanda relative URL-lə gedəcək → proxy
  withCredentials: false,  // Bearer token üçün cookie lazım deyil
  headers: { Accept: "application/json" },
});

// const api = axios.create({
//   baseURL: import.meta.env.VITE_API_URL,
// });

api.interceptors.request.use((config) => {
  const path = (config.url || "").replace(/^\//, "");
  const skip = SKIP_AUTH.some((rx) => rx.test(path));
  if (!skip) {
    const t = localStorage.getItem("accessToken");
    if (t) (config.headers as any).Authorization = `Bearer ${t}`;
    else delete (config.headers as any).Authorization;
  }
  return config;
});

api.interceptors.response.use(
  (r) => r,
  (err) => {
    if (err?.response?.status === 401) {
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      window.location.href = "/";
    }
    return Promise.reject(err);
  }
);
// src/services/api.ts (request interceptor-da)


api.interceptors.request.use((config) => {
  const path = (config.url || "").replace(/^\//, "");
  const skip = SKIP_AUTH.some((rx) => rx.test(path));
  if (!skip) {
    const t = getToken();
    if (t) {
      (config.headers as any).Authorization = `Bearer ${t}`;
    } else {
      delete (config.headers as any).Authorization;
    }
  }
  return config;
});






function pathOf(cfg: AxiosRequestConfig) {
  const url = (cfg.url || "").toString();
  try {
    const u = new URL(url, BASE_URL || window.location.origin);
    return u.pathname.replace(/^\//, "");
  } catch {
    return url.replace(/^\//, "");
  }
}

// -------- REQUEST --------
api.interceptors.request.use((config) => {
  const path = pathOf(config);
  const skip = SKIP_AUTH.some((rx) => rx.test(path));

  if (!skip) {
    const t = getToken?.() ?? null; // sənin getToken: string | null
    if (!config.headers) config.headers = {} as import("axios").AxiosRequestHeaders;
    if (t) (config.headers as any).Authorization = `Bearer ${t}`;
    else delete (config.headers as any).Authorization;
  } else if (config.headers) {
    delete (config.headers as any).Authorization;
  }
  return config;
});

// -------- RESPONSE (401 → refresh + queue) --------
let isRefreshing = false;
let waitQueue: ((access: string | null) => void)[] = [];
const pushWaiter = (cb: (t: string | null) => void) => waitQueue.push(cb);
const resolveWaiters = (t: string | null) => { waitQueue.forEach((cb) => cb(t)); waitQueue = []; };

api.interceptors.response.use(
  (r) => r,
  async (err: AxiosError) => {
    const cfg = err.config || {};
    const status = err.response?.status;
    const alreadyRetried = (cfg as any).__isRetryRequest;
    const isRefreshCall = pathOf(cfg).toLowerCase().startsWith("auth/refresh");

    if (status !== 401 || alreadyRetried || isRefreshCall) return Promise.reject(err);

    const rt = getRefreshToken?.() || "";
    if (!rt) {
      clearTokens?.();
      window.location.href = "/";
      return Promise.reject(err);
    }

    if (isRefreshing) {
      return new Promise((resolve, reject) => {
        pushWaiter((newAccess) => {
          if (!newAccess) return reject(err);
          const retry: AxiosRequestConfig = { ...cfg };
          (retry as any).__isRetryRequest = true;
          retry.headers = { ...(retry.headers || {}), Authorization: `Bearer ${newAccess}` };
          resolve(api(retry));
        });
      });
    }

    isRefreshing = true;
    try {
      const { data } = await api.post<{ accessToken: string; refreshToken?: string }>(
        `/${REFRESH_URL}`,
        { refreshToken: rt },
        { headers: { Authorization: "" } } // köhnə tokeni göndərmə
      );

      const access = data?.accessToken;
      const refresh = (data as any)?.refreshToken;
      if (access) setTokens?.(access, refresh);

      resolveWaiters(access || null);
      isRefreshing = false;

      const retry: AxiosRequestConfig = { ...cfg };
      (retry as any).__isRetryRequest = true;
      retry.headers = { ...(retry.headers || {}), Authorization: `Bearer ${access}` };
      return api(retry);
    } catch (e) {
      resolveWaiters(null);
      isRefreshing = false;
      clearTokens?.();
      window.location.href = "/";
      return Promise.reject(err);
    }
  }
);

export default api;
