import React from 'react';

/**
 * Componente de acessibilidade que permite que usuários de teclado pulem a navegação
 * e vão diretamente para o conteúdo principal da página.
 * Este componente é visível apenas quando recebe foco (Tab), ajudando pessoas
 * com deficiência visual que usam leitores de tela.
 */
const SkipNavLink = ({ targetId = 'content' }: { targetId?: string }) => {
  return (
    <a
      href={`#${targetId}`}
      className="sr-only focus:not-sr-only focus:absolute focus:z-50 focus:top-4 focus:left-4 
                 focus:p-4 focus:bg-white focus:text-primary focus:font-medium focus:outline 
                 focus:outline-primary focus:rounded-md focus:shadow-md"
    >
      Pular para o conteúdo principal
    </a>
  );
};

export default SkipNavLink;