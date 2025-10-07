import { getOrCreateUUID } from "../utils/deviceIdUtils";
import { httpService } from "./httpService";
import {
  setAuthData,
  getRefreshToken,
  getUser,
  // clearAuthData,
} from "./storage";

export const apiUrl = "http://87.248.145.139:8081/";

const deviceId = getOrCreateUUID();
const authService = {
  sendPhone: async (phone: string) => {
    return httpService.get(`${apiUrl}api/passenger/PassengerLogin/SendSmsOtp`, {
      params: {
        phoneNumber: phone,
        DeviceIdentifier: deviceId,
        DeviceType: 1,
      },
    });
  },

  verifyOtp: async (phone: string, otp: string) => {
    const res = await httpService.post(
      `${apiUrl}api/passenger/PassengerLogin/OTPLogin`,
      {
        mobile: phone,
        otp,
        DeviceIdentifier: deviceId,
        DeviceType: 1,
      }
    );
    const data = res.data.dataToken;
    setAuthData({
      token: data.token,
      refreshToken: data.refreshToken,
      expiresIn: data.refreshTokenExpirationDateTime,
      user: data.personName,
    });
    return res.data;
  },

  refreshToken: async () => {
    const refreshToken = getRefreshToken();
    if (!refreshToken) throw new Error("No refresh token");

    const res = await httpService.post("/auth/refresh-token", { refreshToken });
    const data = res.data;
    setAuthData({
      token: data.token,
      refreshToken: data.refreshToken,
      expiresIn: data.expiresIn,
      user: getUser(),
    });
    return data.token;
  },

  isLoggedIn: () => {
    const token = localStorage.getItem("access_token");
    const expiresAt = parseInt(localStorage.getItem("expires_at") || "0");
    return !!token && Date.now() < expiresAt;
  },
};

export default authService;
