
import React from "react";
import logoImage from "../assets/logo.png";

interface LogoProps {
  className?: string;
  inverted?: boolean;
}

const Logo: React.FC<LogoProps> = ({ className = "", inverted = false }) => {
  return (
    <picture>
      <source srcSet={logoImage.replace('.png', '.webp')} type="image/webp" />
      <img 
        src={logoImage}
        alt="Logo" 
        className={`w-10 h-10 ${inverted ? 'brightness-0 invert' : ''} ${className}`}
        width="40"
        height="40"
        loading="eager"
        decoding="async"
        fetchPriority="high"
      />
    </picture>
  );
};

export default Logo;
