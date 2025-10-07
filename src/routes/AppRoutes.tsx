import { Routes, Route, Navigate } from "react-router-dom";
import LoginOptions from "../pages/startup/LoginOptions";
import Profile from "../pages/main/profile/Profile";
import Home from "../pages/main/Home";
import PhoneLoginForm from "../pages/login/phoneLogin/PhoneLoginForm";
import PhoneLoginOTPForm from "../pages/login/phoneLogin/PhoneLoginOTPForm";
import ContentLayout from "../layouts/Content/ContentLayout";
import ProtectedRoute from "../ProtectedRoute";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/login" element={<LoginOptions />} />
      <Route path="/phone-login" element={<PhoneLoginForm />} />
      <Route path="/phone-login-otp" element={<PhoneLoginOTPForm />} />

      <Route element={<ProtectedRoute />}>
        <Route path="/" element={<ContentLayout />}>
          <Route index element={<Home />} />
        </Route>
        <Route path="/profile" element={<Profile />} />
      </Route>

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default AppRoutes;
