// src/routes/RequireAuth.tsx
import { Navigate, useLocation } from "react-router-dom";
import type { PropsWithChildren } from "react";

function getAccessToken(): string | null {
  const raw = localStorage.getItem("accessToken");
  if (!raw) return null;
  const s = raw.trim().replace(/^"(.*)"$/, "$1");
  return s || null;
}

function isJwtValid(t: string): boolean {
  try {
    const [, payload] = t.split(".");
    if (!payload) return false;
    const json = JSON.parse(atob(payload.replace(/-/g, "+").replace(/_/g, "/")));
    if (typeof json.exp !== "number") return true; // exp yoxdursa, keçər say
    return json.exp * 1000 > Date.now();
  } catch {
    return false;
  }
}

export default function RequireAuth({ children }: PropsWithChildren) {
  const location = useLocation();
  const token = getAccessToken();

  if (!token || !isJwtValid(token)) {
    return <Navigate to="/" state={{ from: location }} replace />;
  }
  return <>{children}</>;
}
