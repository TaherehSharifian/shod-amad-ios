import React from "react";
import MenuIcon from "@mui/icons-material/Menu";

interface HeaderProps {
  onMenuClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ onMenuClick }) => {
  return (
    <header className="h-16 flex items-center justify-between px-4">
      <div className="flex items-center gap-2">
        <img src="/logo-01.png" alt="Logo" width={40} />
        <h1 className="text-xl font-bold text-gray-700">اپلیکیشن پرسنل</h1>
      </div>

      <button
        className="p-2 rounded-md hover:bg-gray-100 transition"
        onClick={onMenuClick}
      >
        <MenuIcon className="w-6 h-6 text-gray-700" />
      </button>
    </header>
  );
};

export default Header;
