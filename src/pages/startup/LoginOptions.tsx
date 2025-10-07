import { PhoneIphone } from "@mui/icons-material";
import { Button } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";

interface LoginOptionsProps {}

const LoginOptions: React.FC<LoginOptionsProps> = () => {
  const navigate = useNavigate();
  return (
    <div className="flex justify-center items-center h-full w-full">
      <div className="p-3 flex flex-col justify-between gap-4 w-full h-full items-center">
        <div className="flex flex-col flex-1 gap-5  justify-center items-center p-5 w-full">
          <span className="">
            <img src="/logo-01.png" alt="shod-amad-logo" width={200} />
            <p className="text-center text-xl font-medium">
              ورود به حساب کاربری
            </p>
          </span>
          <Button
            variant="contained"
            color="info"
            disableElevation
            endIcon={<PhoneIphone />}
            onClick={() => navigate("/phone-login")}
            sx={{
              width: "100%",
            }}
          >
            ورود با شماره موبایل
          </Button>
        </div>
        <small>ورژن 1.1</small>
      </div>
    </div>
  );
};

export default LoginOptions;
