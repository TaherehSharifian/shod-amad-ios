// services/storage.ts
const TOKEN_KEY = "access_token";
const REFRESH_KEY = "refresh_token";
const EXPIRES_KEY = "expires_at";
const USER_KEY = "user_data";

export const setAuthData = (data: {
  token: string;
  refreshToken: string;
  expiresIn: number;
  user: any;
}) => {
  const expiresAt = Date.now() + data.expiresIn * 1000;
  localStorage.setItem(TOKEN_KEY, data.token);
  localStorage.setItem(REFRESH_KEY, data.refreshToken);
  localStorage.setItem(EXPIRES_KEY, expiresAt.toString());
  localStorage.setItem(USER_KEY, JSON.stringify(data.user));
};

export const getToken = () => localStorage.getItem(TOKEN_KEY);
export const getRefreshToken = () => localStorage.getItem(REFRESH_KEY);
export const getExpiresAt = () =>
  parseInt(localStorage.getItem(EXPIRES_KEY) || "0");
export const getUser = () =>
  JSON.parse(localStorage.getItem(USER_KEY) || "null");

export const clearAuthData = () => {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(REFRESH_KEY);
  localStorage.removeItem(EXPIRES_KEY);
  localStorage.removeItem(USER_KEY);
};
