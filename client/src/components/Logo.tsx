
import React from "react";

interface LogoProps {
  className?: string;
}

const Logo: React.FC<LogoProps> = ({ className = "" }) => {
  return (
    <img 
      src="/logo.png" 
      alt="Logo" 
      className={`w-10 h-10 ${className}`}
    />
  );
};

export default Logo;
