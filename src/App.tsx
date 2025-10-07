import { useState } from "react";
import { BrowserRouter } from "react-router-dom";
import SplashScreen from "./pages/startup/SplashScreen";
import AppRoutes from "./routes/AppRoutes";
import IosAddToHomeGuide from "./IosAddToHomeGuide";
import { ToastContainer } from "react-toastify";

const App: React.FC = () => {
  const [showSplash, setShowSplash] = useState(true);

  const handleSplashFinish = () => {
    setShowSplash(false);
  };

  if (showSplash) {
    return <SplashScreen onFinish={handleSplashFinish} />;
  }

  return (
    <div className="h-screen flex justify-center items-center w-full">
      <BrowserRouter>
        <div className="w-full h-full min-w-[300px] max-w-[800px]">
          <ToastContainer rtl={true} position="bottom-left" limit={3} />
          <AppRoutes />
          <IosAddToHomeGuide delay={1200} />
        </div>
      </BrowserRouter>
    </div>
  );
};

export default App;
