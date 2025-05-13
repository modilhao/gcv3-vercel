
import React from "react";
import logoImage from "../assets/logo-new.png";

interface LogoProps {
  className?: string;
}

const Logo: React.FC<LogoProps> = ({ className = "" }) => {
  return (
    <img 
      src={logoImage}
      alt="Logo" 
      className={`w-10 h-10 ${className}`}
      width="40"
      height="40"
      loading="eager"
    />
  );
};

export default Logo;
