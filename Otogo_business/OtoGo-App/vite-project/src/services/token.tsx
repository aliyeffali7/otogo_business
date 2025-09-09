// src/services/token.ts  (səndə artıq var)
export function getToken(): string | null {
  const raw =
    localStorage.getItem("accessToken") ??
    localStorage.getItem("token") ??
    null;
  if (!raw) return null;
  const s = raw.trim().replace(/^"(.*)"$/, "$1");
  if (!s || s === "null" || s === "undefined" || s === "false") return null;
  return s;
}

export function getRefreshToken() {
  return localStorage.getItem("refreshToken") || "";
}
export function setTokens(access: string, refresh?: string) {
  localStorage.setItem("accessToken", access);
  if (refresh) localStorage.setItem("refreshToken", refresh);
}
export function clearTokens() {
  localStorage.removeItem("accessToken");
  localStorage.removeItem("refreshToken");
}
