// src/services/auth.ts
import api from "./api";

export interface LoginPayload {
  phone: string;
  password: string;
}

export interface LoginResponse {
  accessToken?: string;
  token?: string; // bəzi backendlər belə qaytarır
  refreshToken?: string;
  user?: any;
}

// export async function login(data: LoginPayload): Promise<LoginResponse> {
//   const res = await api.post<LoginResponse>("auth/login", data);

//   const access =
//     res.data?.accessToken ??
//     res.data?.token; // backend "token" qaytarırsa da işləsin

//   if (access) {
//     localStorage.setItem("accessToken", access);
//     // İstəsən burda default header da ver:
//     (api.defaults.headers as any).Authorization = `Bearer ${access}`;
//   }

//   if (res.data?.refreshToken) {
//     localStorage.setItem("refreshToken", res.data.refreshToken);
//   }

//   return res.data;
// }

export async function getMe() {
  const res = await api.get("/apiauth/me");
  return res.data;
}

// export async function logout() {
//   try {
//     // serverdə session bağlanırsa:
//     await api.post("auth/logout", {});
//   } catch {
//     // server logout vermirsə, bu hissə boş keçilə bilər
//   } finally {
//     localStorage.removeItem("accessToken");
//     localStorage.removeItem("refreshToken");
//     delete (api.defaults.headers as any)?.Authorization;
//     window.location.href = "/";
//   }
// }

// src/services/auth.ts



export async function login(data: { phone: string; password: string }) {
  const res = await api.post("/api/auth/login", data); // ✅ /api/auth/...
  const t = (res.data?.accessToken ?? res.data?.token) as string | undefined;
  if (t) {
    localStorage.setItem("accessToken", t);
    localStorage.removeItem("token");
  }
  if (res.data?.refreshToken) {
    localStorage.setItem("refreshToken", res.data.refreshToken);
  }
  return res.data;
}

export async function logout() {
  try { await api.post("/api/auth/logout", {}); } catch {}
  localStorage.removeItem("accessToken");
  localStorage.removeItem("refreshToken");
  window.location.href = "/";
}


