import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface SplashScreenProps {
  onFinish: () => void;
}
const DISPLAY_NAME = "SHODAMAD";
const DISPLAY_ICON = "/logo-01.png";
const SplashScreen: React.FC<SplashScreenProps> = ({ onFinish }) => {
  const [showText, setShowText] = useState("");
  const [iconVisible, setIconVisible] = useState(false);
  const [startTyping, setStartTyping] = useState(false);
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    const iconTimer = setTimeout(() => {
      setIconVisible(true);

      const typingStartTimer = setTimeout(() => {
        setStartTyping(true);
      }, 1000);

      return () => clearTimeout(typingStartTimer);
    }, 300);

    return () => {
      clearTimeout(iconTimer);
    };
  }, []);

  useEffect(() => {
    if (!startTyping) return;

    let charIndex = 0;
    const typingInterval = setInterval(() => {
      if (charIndex < DISPLAY_NAME.length) {
        setShowText(DISPLAY_NAME.substring(0, charIndex + 1));
        charIndex++;
      } else {
        clearInterval(typingInterval);
        const finishTimer = setTimeout(() => {
          setIsExiting(true);
          setTimeout(() => {
            onFinish();
          }, 800);
        }, 500);

        return () => clearTimeout(finishTimer);
      }
    }, 150);

    return () => {
      clearInterval(typingInterval);
    };
  }, [startTyping, DISPLAY_NAME, onFinish]);

  return (
    <AnimatePresence>
      {!isExiting ? (
        <motion.div
          className="fixed inset-0 flex items-center justify-center bg-googleColors-blue-main z-50"
          initial={{ opacity: 1, x: 0 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ x: "-100%" }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
        >
          <div
            className="flex flex-row-reverse items-center"
            style={{ gap: "16px" }}
          >
            {iconVisible && (
              <motion.div
                style={{ display: "inline-block" }}
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1.5 }}
                transition={{ duration: 1 }}
              >
                <img src={DISPLAY_ICON} alt="Logo" className="w-16 h-16" />
              </motion.div>
            )}

            {startTyping && (
              <motion.h1
                className="text-white text-3xl font-bold"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                <span className="animate-pulse">|</span>
                {showText}
              </motion.h1>
            )}
          </div>
        </motion.div>
      ) : (
        <motion.div
          className="fixed inset-0 flex items-center justify-center bg-googleColors-blue-main z-50"
          initial={{ x: 0 }}
          animate={{ x: "100%" }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
        >
          <div className="flex items-center space-x-4">
            <h1 className="text-white text-3xl font-bold">{DISPLAY_NAME}</h1>
            <motion.img
              src={DISPLAY_ICON}
              alt="Logo"
              className="w-16 h-16"
              animate={{ scale: 1.5 }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SplashScreen;
