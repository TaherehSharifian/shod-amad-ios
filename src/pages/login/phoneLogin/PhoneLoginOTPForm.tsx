import React, { useEffect, useState } from "react";
import OTPInput from "../../../components/OTPInput";
import { Button, Typography } from "@mui/material";
import { toPersianDigits } from "../../../utils/numberConversions";
import { Controller, useForm } from "react-hook-form";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate, useLocation } from "react-router-dom";
import { ArrowBack } from "@mui/icons-material";
import authService from "../../../services/AuthService";
// import { useAuth } from "../../../contexts/AuthContsxt";

type LocationState = { phone?: string };
type FormData = { otp: string };

const PhoneLoginOTPForm: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  // const { login } = useAuth();

  const phoneFromState = (location.state as LocationState | null)?.phone;
  const [phone] = useState<string | null>(
    phoneFromState || sessionStorage.getItem("auth_phone")
  ); // WHAT??????

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { control, handleSubmit, watch } = useForm<FormData>({
    resolver: zodResolver(
      z.object({ otp: z.string().min(6, "کد OTP باید ۶ رقم باشد") })
    ),
    defaultValues: { otp: "" },
  });

  useEffect(() => {
    if (!phone) {
      navigate("/phone-login", { replace: true });
    }
  }, [phone, navigate]);

  const onSubmitForm = async (data: FormData) => {
    if (!phone) return;
    console.log(data);

    setError(null);
    setLoading(true);
    try {
      const authData = await authService.verifyOtp(phone, data.otp);
      localStorage.setItem("token", authData.token);
      localStorage.setItem("user", authData.user);
      // login(authData.token, authData.user);

      sessionStorage.removeItem("auth_phone");

      authData.redirectToCompeleteProfile
        ? navigate("/profile", { replace: true })
        : navigate("/", { replace: true });
    } catch (err: any) {
      console.error(err);
      setError(err?.response?.data || "خطا در اعتبارسنجی کد");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-sky-400 h-full flex flex-col gap-10">
      <Typography
        className="text-white flex flex-col w-full justify-center items-center gap-4"
        sx={{ mt: 6 }}
      >
        <Typography variant="h5">اعتبارسنجی</Typography>
        <Typography variant="caption">
          {toPersianDigits("لطفا کد 6 رقمی ارسال شده را وارد کنید")}
        </Typography>
      </Typography>

      <div className="bg-white flex flex-col flex-1 gap-5 items-center p-5 rounded-t-3xl pt-20">
        <img
          src="/smartphone.png"
          alt="smart-phone-logo"
          width={150}
          className="shake"
          style={{ display: "block", margin: "0 auto" }}
        />
        <Typography variant="caption">
          {toPersianDigits(`کد اعتبارسنجی به شماره ${phone} ارسال شد.`)}
        </Typography>

        <form
          className="w-full flex flex-col justify-center items-center gap-5 mt-10"
          onSubmit={handleSubmit(onSubmitForm)}
        >
          <Controller
            name="otp"
            control={control}
            render={({ field }) => (
              <OTPInput
                value={field.value || ""}
                onChange={field.onChange}
                length={6}
              />
            )}
          />

          {error && <Typography color="error">{error}</Typography>}

          <Button
            variant="contained"
            color="warning"
            type="submit"
            disableElevation
            size="large"
            disabled={loading || (watch("otp") || "").length < 6}
            sx={{ borderRadius: "16px", width: "100%" }}
          >
            {loading ? "در حال بررسی..." : "ورود"}
          </Button>

          <Typography
            variant="caption"
            className="flex flex-row gap-1 items-center"
            onClick={() => navigate("/phone-login")}
          >
            <span>ویرایش شماره موبایل</span>
            <ArrowBack fontSize="inherit" />
          </Typography>
        </form>
      </div>
    </div>
  );
};

export default PhoneLoginOTPForm;
