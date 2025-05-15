import React, { useState, useEffect } from 'react';
import { ArrowUp } from 'lucide-react';
import { Button } from '@/components/ui/button';

const BackToTopButton = () => {
  const [visible, setVisible] = useState(false);

  // Controla a visibilidade do botão baseado na posição de rolagem
  useEffect(() => {
    const handleScroll = () => {
      // Mostrar botão quando a rolagem for maior que 300px
      const currentScrollPos = window.pageYOffset;
      const isVisible = currentScrollPos > 300;
      
      if (isVisible !== visible) {
        setVisible(isVisible);
      }
    };

    // Adicionar event listener
    window.addEventListener('scroll', handleScroll);
    
    // Remover event listener no cleanup
    return () => window.removeEventListener('scroll', handleScroll);
  }, [visible]);

  // Função para rolar até o topo da página com animação suave
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <Button
      variant="outline"
      size="icon"
      className={`fixed bottom-8 right-8 z-50 rounded-full bg-primary text-primary-foreground opacity-90 shadow-md hover:opacity-100 transition-all duration-300 ${
        visible ? 'translate-y-0' : 'translate-y-20 opacity-0'
      }`}
      onClick={scrollToTop}
      aria-label="Voltar ao topo"
    >
      <ArrowUp className="h-5 w-5" />
    </Button>
  );
};

export default BackToTopButton;