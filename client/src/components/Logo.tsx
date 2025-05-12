
import React from "react";
import logoImage from "/public/logo.png";

interface LogoProps {
  className?: string;
}

const Logo: React.FC<LogoProps> = ({ className = "" }) => {
  return (
    <img 
      src={logoImage}
      alt="Logo" 
      className={`w-10 h-10 ${className}`}
    />
  );
};

export default Logo;
