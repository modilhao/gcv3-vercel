
import React from "react";
import logoImageSVG from "../assets/optimized/logo.svg";

interface LogoProps {
  className?: string;
}

const Logo: React.FC<LogoProps> = ({ className = "" }) => {
  return (
    <img 
      src={logoImageSVG}
      alt="Logo" 
      className={`w-10 h-10 ${className}`}
      width="40"
      height="40"
      loading="eager"
    />
  );
};

export default Logo;
