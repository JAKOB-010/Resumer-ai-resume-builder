const fallbackBase = "http://localhost:3000";

export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "";

export function buildApiUrl(path) {
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;

  if (API_BASE_URL) {
    return `${API_BASE_URL}${normalizedPath}`;
  }

  if (import.meta.env.DEV) {
    return normalizedPath;
  }

  return `${fallbackBase}${normalizedPath}`;
}
