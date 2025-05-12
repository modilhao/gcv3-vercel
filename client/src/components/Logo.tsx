
import React from "react";

interface LogoProps {
  className?: string;
}

const Logo: React.FC<LogoProps> = ({ className = "" }) => {
  return (
    <div className={`w-10 h-10 ${className}`}>
      <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="40" height="40" fill="black"/>
        <path d="M0 0L40 0L40 40L0 40L0 0Z" fill="black"/>
        <path d="M40 40L0 40L0 0L40 40Z" fill="white"/>
      </svg>
    </div>
  );
};

export default Logo;
