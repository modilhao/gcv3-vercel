
import React from "react";

interface LogoProps {
  className?: string;
  inverted?: boolean;
}

const Logo: React.FC<LogoProps> = ({ className = "" }) => {
  return (
    <div className={`w-10 h-10 flex items-center justify-center ${className}`}>
      <svg viewBox="0 0 100 100" className="w-full h-full">
        <rect x="0" y="0" width="100" height="100" fill="none" stroke="currentColor" strokeWidth="8"/>
        <path d="M 0 100 Q 100 100 100 0" fill="currentColor"/>
      </svg>
    </div>
  );
};

export default Logo;
