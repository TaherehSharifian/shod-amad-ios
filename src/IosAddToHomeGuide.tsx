// IosAddToHomeGuide.tsx
import { AddBoxOutlined, Check, IosShare } from "@mui/icons-material";
import { useEffect, useState } from "react";

declare global {
  interface Navigator {
    standalone?: boolean;
  }
}

interface IosAddToHomeGuideProps {
  delay?: number;
  storageKey?: string;
}

export default function IosAddToHomeGuide({
  delay = 1200,
  storageKey = "a2hs_hidden",
}: IosAddToHomeGuideProps) {
  const [visible, setVisible] = useState(false);
  const [dontShowAgain, setDontShowAgain] = useState(false);

  useEffect(() => {
    const hidden = localStorage.getItem(storageKey);
    if (hidden === "1") return;

    const showGuide = () => setVisible(true);

    const onInteraction = () => {
      // setTimeout(showGuide, delay);
      window.removeEventListener("scroll", onInteraction);
      window.removeEventListener("touchstart", onInteraction);
    };

    window.addEventListener("scroll", onInteraction, { passive: true });
    window.addEventListener("touchstart", onInteraction, { passive: true });

    const t = setTimeout(showGuide, delay + 800);

    return () => {
      clearTimeout(t);
      window.removeEventListener("scroll", onInteraction);
      window.removeEventListener("touchstart", onInteraction);
    };
  }, [delay, storageKey]);

  const handleConfirm = () => {
    if (dontShowAgain) {
      localStorage.setItem(storageKey, "1");
    }
    setVisible(false);
  };

  const toggleDontShowAgain = () => setDontShowAgain((prev) => !prev);

  return (
    <>
      {visible && (
        <div
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/80 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
        >
          <div className="mx-4 max-w-sm w-full bg-white rounded-2xl p-6 shadow-2xl text-center">
            <div className="flex justify-center mb-2">
              <div className="w-16 h-16 rounded-2xl bg-white flex items-center justify-center shadow-md">
                <img src="/logo-01.png" alt="app-logo" width={50} height={50} />
              </div>
            </div>

            <h2 className="text-lg font-bold mb-1 text-gray-900">
              نصب اپلیکیشن
            </h2>
            <p className="text-sm text-gray-600 mb-3">
              برای نصب اپلیکیشن روی صفحه اصلی، مراحل زیر را دنبال کنید:
            </p>

            <div className="bg-blue-50 rounded-xl p-4 text-right rtl space-y-3 mb-4">
              <div className="flex items-start gap-2 text-sm">
                <IosShare fontSize="small" color="primary" />
                <span>روی دکمه Share در پایین صفحه کلیک کنید</span>
              </div>
              <div className="flex items-start gap-2 text-sm">
                <AddBoxOutlined fontSize="small" color="primary" />
                <span>گزینه "Add to Home Screen" را انتخاب کنید</span>
              </div>
              <div className="flex items-start gap-2 text-sm">
                <span className="bg-blue-500 text-white flex justify-center items-center text-[11px] leading-none rounded-md w-10 h-5 font-medium">
                  Add
                </span>

                <span>روی "Add" در گوشه بالا سمت راست کلیک کنید</span>
              </div>
            </div>

            <div
              className="flex items-center justify-center gap-2 text-sm text-gray-600 cursor-pointer select-none mb-3"
              onClick={toggleDontShowAgain}
            >
              <div
                className={`w-5 h-5 flex items-center justify-center border-2 rounded-md transition ${
                  dontShowAgain
                    ? "bg-blue-600 border-blue-600 text-white"
                    : "border-gray-400"
                }`}
              >
                {dontShowAgain && <Check fontSize="small" />}
              </div>
              <span>دیگه نمایش نده</span>
            </div>

            <button
              onClick={handleConfirm}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2.5 rounded-xl transition-all"
            >
              متوجه شدم
            </button>
          </div>
        </div>
      )}
    </>
  );
}
