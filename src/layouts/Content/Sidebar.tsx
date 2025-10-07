import React from "react";
import { Link } from "react-router-dom";
import CloseIcon from "@mui/icons-material/Close";
import { Typography } from "@mui/material";
import { Edit, Logout } from "@mui/icons-material";
import { toPersianDigits } from "../../utils/numberConversions";

interface SidebarProps {
  open: boolean;
  onClose: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ open, onClose }) => {
  const logout = () => {
    const sessionId = localStorage.getItem("session_uuid");
    localStorage.clear();
    if (sessionId) {
      localStorage.setItem("session_uuid", sessionId);
    }
  };

  const navItems = [
    {
      label: "ویرایش و تکمیل اطلاعات",
      path: "/profile",
      icon: <Edit fontSize="small" />,
    },
    {
      label: <span className="text-rose-500">خروج از حساب کاربری</span>,
      path: "/login",
      icon: <Logout fontSize="small" color="error" />,
      onClick: logout,
    },
    // { label: "تاریخچه ارسال لوکیشن", path: "/" },
    // { label: "تاریخچه بالک ها", path: "/" },
    // { label: "لاگ gps", path: "/" },
    // { label: "تاریخچه raw", path: "/" },
    // { label: "تاریخچه بالک ها raw", path: "/" },
    // { label: "لاگ کامل logcat", path: "/" },
  ];

  return (
    <div
      className={`fixed inset-0 z-50 bg-white text-gray-900 transform transition-all duration-300 ${
        open
          ? "opacity-100 translate-y-0"
          : "opacity-0 translate-y-full pointer-events-none"
      }`}
    >
      <button
        className="absolute top-5 left-5 p-2 hover:bg-gray-200 rounded-full border transition"
        onClick={onClose}
      >
        <CloseIcon className="w-4 h-4" />
      </button>

      <nav className="flex flex-col items-start px-6 mt-20 gap-6 ">
        <div className="flex flex-row gap-3 border rounded-2xl w-full h-20">
          <div className="flex flex-col justify-center items-center p-2">
            <img
              src="/temp.jpg"
              alt="Logo"
              width={60}
              className="rounded-full"
            />
          </div>
          <div className="flex flex-col items-start justify-center">
            <Typography variant="body1" className="font-bold">
              نام مسافر
            </Typography>
            <Typography variant="caption" className="text-sm">
              {toPersianDigits("09361267519")}
            </Typography>
          </div>
        </div>
        {navItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            onClick={item.onClick || onClose}
            className="flex flex-row gap-2 items-center"
            // className={`transition-all ${
            //   location.pathname === item.path
            //     ? "text-yellow-500 scale-105"
            //     : "hover:text-yellow-400"
            // }`}
          >
            {item.icon} {item.label}
          </Link>
        ))}
      </nav>
    </div>
  );
};

export default Sidebar;
