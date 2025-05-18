
import React from "react";
import logoImage from "../assets/logo-new.png";

interface LogoProps {
  className?: string;
  inverted?: boolean;
}

const Logo: React.FC<LogoProps> = ({ className = "", inverted = false }) => {
  return (
    <img 
      src={logoImage}
      alt="Logo" 
      className={`w-10 h-10 ${inverted ? 'brightness-0 invert' : ''} ${className}`}
      width="40"
      height="40"
      loading="eager"
    />
  );
};

export default Logo;
