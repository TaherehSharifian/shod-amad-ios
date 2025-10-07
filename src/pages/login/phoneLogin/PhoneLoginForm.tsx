import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import z from "zod";
import NumberInput from "../../../components/NumberInput";
import { Phone } from "@mui/icons-material";
import { Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import authService from "../../../services/AuthService";

const PhoneLoginForm = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const baseSchema = z.object({
    mobile: z.string({ error: "وارد کردن شماره موبایل الزامی است." }),
    otp: z.string().optional(),
  });

  type FormData = z.infer<typeof baseSchema>;

  const {
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(baseSchema),
    defaultValues: {},
  });

  const onSubmitForm = async (data: { mobile: string }) => {
    setError(null);
    setLoading(true);
    try {
      await authService.sendPhone(data.mobile);

      sessionStorage.setItem("auth_phone", data.mobile);

      navigate("/phone-login-otp", { state: { phone: data.mobile } });
    } catch (err: any) {
      console.error(err);
      setError(err?.response || "خطا در ارسال شماره");
    } finally {
      setLoading(false);
    }
  };

  const handleMobileChange = () => {
    setError(null);
  };

  return (
    <div className="flex justify-center items-center h-full w-full">
      <div className="p-3 flex flex-col justify-between gap-4 w-full h-full items-center">
        <div className="flex flex-col flex-1 gap-5 mt-20 items-center p-5 w-full">
          <span className="flex flex-col justify-center items-center">
            <img src="/logo-01.png" alt="shod-amad-logo" width={200} />
            <Typography variant="body1" className="text-xl font-medium">
              ورود با شماره موبایل
            </Typography>
          </span>
          <form
            className="w-full flex flex-col gap-5 mt-5"
            onSubmit={handleSubmit(onSubmitForm)}
          >
            <Controller
              name="mobile"
              control={control}
              render={({ field }) => (
                <NumberInput
                  value={field.value}
                  onChange={(value) => {
                    field.onChange(value);
                    handleMobileChange();
                  }}
                  label="شماره موبایل"
                  error={!!errors.mobile || !!error}
                  helperText={errors.mobile?.message || error || ""}
                  fullWidth
                  maxLength={11}
                  icon={<Phone color="primary" />}
                />
              )}
            />
            {/* <span>{deviceId}</span> */}

            <Button
              variant="contained"
              color="warning"
              type="submit"
              disableElevation
              size="large"
              disabled={loading || (watch("mobile") || "").length < 11}
              sx={{
                borderRadius: "16px",
              }}
            >
              {loading ? "در حال ارسال..." : "ارسال کد OTP"}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PhoneLoginForm;
