import type React from "react";
import AnimatedLocationButton from "../../components/AnimatedLocationButton";

const Home: React.FC = () => {
  return (
    <div className="flex flex-col h-full relative">
      <AnimatedLocationButton />
    </div>
  );
};

export default Home;
