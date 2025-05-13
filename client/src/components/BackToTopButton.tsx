import React, { useState, useEffect } from 'react';
import neuralButtonBg from '../assets/optimized/neural-button-bg.svg';
import arrowUpIcon from '../assets/optimized/arrow-up-icon.svg';

const BackToTopButton: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  // Controla a visibilidade do botão com base na posição de rolagem
  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);

    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  // Função para rolar suavemente para o topo
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  // O botão só será renderizado quando isVisible for true
  if (!isVisible) {
    return null;
  }

  return (
    <button
      onClick={scrollToTop}
      className="fixed bottom-8 right-8 z-50 bg-primary text-white w-14 h-14 rounded-full shadow-lg hover:bg-primary/90 transition-all duration-300 flex items-center justify-center group overflow-hidden"
      aria-label="Voltar ao topo"
    >
      {/* Background com animação inspirada em rede neural - usando SVG otimizado */}
      <div className="absolute inset-0 opacity-20 pointer-events-none group-hover:opacity-30 transition-opacity duration-300">
        <img 
          src={neuralButtonBg} 
          alt="" 
          className="w-full h-full rotate-45 group-hover:rotate-[225deg] transition-transform duration-1000"
          width="100"
          height="100"
          loading="lazy"
          aria-hidden="true"
        />
      </div>
      
      {/* Ícone seta para cima com animação - usando SVG otimizado */}
      <div className="relative z-10">
        <img 
          src={arrowUpIcon} 
          alt="" 
          className="w-6 h-6 transition-transform duration-300 group-hover:-translate-y-1 animate-bounce-subtle"
          width="24"
          height="24"
          loading="eager"
          aria-hidden="true"
        />
      </div>
      
      {/* Efeito ripple ao passar o mouse */}
      <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 rounded-full transition-opacity duration-300 group-hover:scale-110" />
    </button>
  );
};

export default BackToTopButton;