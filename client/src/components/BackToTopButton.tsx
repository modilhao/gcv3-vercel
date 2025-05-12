import React, { useState, useEffect } from 'react';

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
      {/* Background com animação inspirada em rede neural */}
      <div className="absolute inset-0 opacity-20 pointer-events-none group-hover:opacity-30 transition-opacity duration-300">
        <svg width="100%" height="100%" viewBox="0 0 100 100" className="rotate-45 group-hover:rotate-[225deg] transition-transform duration-1000">
          {/* Nós da rede neural com animação de pulsação */}
          <circle cx="25" cy="25" r="3" fill="white" className="animate-pulse" style={{ animationDelay: '0s' }} />
          <circle cx="50" cy="25" r="3" fill="white" className="animate-pulse" style={{ animationDelay: '0.2s' }} />
          <circle cx="75" cy="25" r="3" fill="white" className="animate-pulse" style={{ animationDelay: '0.4s' }} />
          <circle cx="25" cy="50" r="3" fill="white" className="animate-pulse" style={{ animationDelay: '0.6s' }} />
          <circle cx="50" cy="50" r="3" fill="white" className="animate-pulse" style={{ animationDelay: '0.8s' }} />
          <circle cx="75" cy="50" r="3" fill="white" className="animate-pulse" style={{ animationDelay: '1.0s' }} />
          <circle cx="25" cy="75" r="3" fill="white" className="animate-pulse" style={{ animationDelay: '1.2s' }} />
          <circle cx="50" cy="75" r="3" fill="white" className="animate-pulse" style={{ animationDelay: '1.4s' }} />
          <circle cx="75" cy="75" r="3" fill="white" className="animate-pulse" style={{ animationDelay: '1.6s' }} />
          
          {/* Linhas conectando os pontos (rede neural) */}
          <line x1="25" y1="25" x2="50" y2="50" stroke="white" strokeWidth="1" strokeDasharray="1" className="group-hover:stroke-primary" />
          <line x1="75" y1="25" x2="50" y2="50" stroke="white" strokeWidth="1" strokeDasharray="1" className="group-hover:stroke-primary" />
          <line x1="25" y1="75" x2="50" y2="50" stroke="white" strokeWidth="1" strokeDasharray="1" className="group-hover:stroke-primary" />
          <line x1="75" y1="75" x2="50" y2="50" stroke="white" strokeWidth="1" strokeDasharray="1" className="group-hover:stroke-primary" />
          <line x1="50" y1="25" x2="50" y2="50" stroke="white" strokeWidth="1" strokeDasharray="1" className="group-hover:stroke-primary" />
          <line x1="25" y1="50" x2="50" y2="50" stroke="white" strokeWidth="1" strokeDasharray="1" className="group-hover:stroke-primary" />
          <line x1="75" y1="50" x2="50" y2="50" stroke="white" strokeWidth="1" strokeDasharray="1" className="group-hover:stroke-primary" />
          <line x1="50" y1="75" x2="50" y2="50" stroke="white" strokeWidth="1" strokeDasharray="1" className="group-hover:stroke-primary" />
        </svg>
      </div>
      
      {/* Ícone seta para cima com animação */}
      <div className="relative z-10">
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          fill="none" 
          viewBox="0 0 24 24" 
          stroke="currentColor" 
          className="w-6 h-6 transition-transform duration-300 group-hover:-translate-y-1 animate-bounce-subtle"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 10l7-7m0 0l7 7m-7-7v18" />
        </svg>
      </div>
      
      {/* Efeito ripple ao passar o mouse */}
      <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 rounded-full transition-opacity duration-300 group-hover:scale-110" />
    </button>
  );
};

export default BackToTopButton;