
import React from "react";

interface LogoProps {
  className?: string;
  inverted?: boolean;
}

const Logo: React.FC<LogoProps> = ({ className = "", inverted = false }) => {
  const bgColor = inverted ? "bg-white" : "bg-black";
  const borderColor = inverted ? "border-neutral-900" : "border-white";

  return (
    <div className={`w-10 h-10 ${className}`}>
      <div className={`w-full h-full relative ${bgColor}`}>
        <div className={`absolute bottom-0 right-0 w-3/4 h-3/4 bg-white rounded-tl-full`}></div>
      </div>
    </div>
  );
};

export default Logo;
