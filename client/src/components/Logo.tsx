import React from "react";

interface LogoProps {
  className?: string;
  inverted?: boolean;
}

const Logo: React.FC<LogoProps> = ({ className = "", inverted = false }) => {
  const bgColor = inverted ? "bg-white" : "bg-black";
  const borderColor = inverted ? "border-neutral-900" : "border-white";
  const fillColor = inverted ? "bg-neutral-900" : "bg-white";

  return (
    <div className={`w-10 h-10 ${bgColor} flex items-center justify-center ${className}`}>
      <div className={`w-8 h-8 border ${borderColor} relative`}>
        <div className={`absolute bottom-0 right-0 w-1/2 h-1/2 ${fillColor} rounded-tl-full`}></div>
      </div>
    </div>
  );
};

export default Logo;
