// In production, Vercel will use your Render URL. In development, it defaults to localhost.
// Use production Render URL as the default fallback to ensure production deployments work correctly.
// Set VITE_API_URL=http://localhost:5000 in your .env file for local development.
export const API_BASE_URL = import.meta.env.VITE_API_URL || "https://resumer-backend-vv40.onrender.com";

/**
 * Constructs a fully qualified API URL safely combining the base URL and endpoint path.
 * @param {string} path - The API endpoint path (e.g., "auth/login" or "/resume/save")
 * @returns {string} The complete URL
 */
export function buildApiUrl(path) {
  // Ensures the path always starts with a single forward slash
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;

  // Simply combine the active base URL with your path
  return `${API_BASE_URL}${normalizedPath}`;
}