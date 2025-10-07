import { useState, useEffect } from "react";
import { LocationOffOutlined, LocationOnOutlined } from "@mui/icons-material";
import { motion, AnimatePresence } from "framer-motion";

const AnimatedLocationButton: React.FC = () => {
  const [showText, setShowText] = useState<boolean>(true);
  const [isSending, setIsSending] = useState<boolean>(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setShowText((prev) => !prev);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const handleClick = () => {
    setIsSending(!isSending);
  };

  return (
    <motion.div
      className="absolute bottom-4 left-4 text-white rounded-xl flex items-center overflow-hidden cursor-pointer"
      animate={{
        width: showText ? (isSending ? 200 : 150) : 60,
        backgroundColor: isSending ? "#16a34a" : "#e11d48",
      }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
      style={{ height: 60, borderRadius: 16 }}
      onClick={handleClick}
    >
      <div className="flex items-center justify-between w-full px-4">
        <AnimatePresence mode="wait">
          {showText && (
            <motion.span
              key={isSending ? "sending" : "normal"}
              initial={{ opacity: 0, width: 0 }}
              animate={{ opacity: 1, width: "auto" }}
              exit={{ opacity: 0, width: 0 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
              className="whitespace-nowrap overflow-hidden flex-shrink-0"
            >
              {isSending ? "در حال ارسال موقعیت" : "ارسال موقعیت"}
            </motion.span>
          )}
        </AnimatePresence>

        <motion.div
          className="flex justify-center items-center flex-shrink-0"
          animate={{
            marginRight: showText ? 0 : "auto",
            marginLeft: showText ? 0 : "auto",
          }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
        >
          <motion.div
            // animate={showText ? {} : { y: [0, -5, 0] }}
            transition={{
              duration: 0.6,
              repeat: showText ? 0 : Infinity,
              repeatType: "loop",
            }}
          >
            {isSending ? (
              <LocationOnOutlined fontSize="medium" />
            ) : (
              <LocationOffOutlined fontSize="medium" />
            )}
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default AnimatedLocationButton;
