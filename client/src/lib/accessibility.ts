/**
 * Biblioteca de funções para melhorar a acessibilidade do site
 */

/**
 * Prepara atributos de acessibilidade para imagens
 * @param alt Texto alternativo para a imagem
 * @param isDecorative Se a imagem é decorativa (sem valor semântico)
 */
export function getImageA11yProps(alt: string, isDecorative: boolean = false): Record<string, string | boolean> {
  if (isDecorative) {
    return {
      alt: '',
      role: 'presentation',
      'aria-hidden': 'true',
    };
  }
  
  return {
    alt,
    loading: 'lazy',
  };
}

/**
 * Prepara atributos de acessibilidade para links externos
 * @param url URL do link
 * @param label Texto de acessibilidade adicional, se necessário
 * @param newTab Se o link deve abrir em nova aba
 */
export function getExternalLinkA11yProps(url: string, label?: string, newTab: boolean = true): Record<string, string | boolean | undefined> {
  const props: Record<string, string | boolean | undefined> = {
    href: url,
    rel: 'noopener noreferrer',
  };
  
  if (newTab) {
    props.target = '_blank';
    props['aria-label'] = label || `${url} (abre em nova janela)`;
  } else if (label) {
    props['aria-label'] = label;
  }
  
  return props;
}

/**
 * Gera texto para leitores de tela para indicar ação
 * Retorna um objeto com texto visível e texto para leitores de tela
 * 
 * Exemplo de uso em componente React:
 * ```jsx
 * const a11yText = createA11yText('Editar', 'Editar o item #123');
 * return (
 *   <button>
 *     {a11yText.visible}
 *     <span className="sr-only">{a11yText.srOnly}</span>
 *   </button>
 * );
 * ```
 * 
 * @param visibleText Texto visível no elemento
 * @param screenReaderText Texto adicional para leitores de tela
 */
export function createA11yText(visibleText: string, screenReaderText: string): { visible: string; srOnly: string } {
  return {
    visible: visibleText,
    srOnly: screenReaderText
  };
}

/**
 * Detecta se o usuário está usando navegação por teclado
 * Esta função deve ser chamada no componente de nível superior
 * 
 * Exemplo de uso:
 * ```jsx
 * useEffect(() => {
 *   const cleanup = setupKeyboardNavDetection();
 *   return cleanup;
 * }, []);
 * ```
 */
export function setupKeyboardNavDetection(): () => void {
  if (typeof window === 'undefined') return () => {};
  
  const handleFirstTab = (e: KeyboardEvent) => {
    if (e.key === 'Tab') {
      document.body.classList.add('user-is-tabbing');
      
      window.removeEventListener('keydown', handleFirstTab);
      window.addEventListener('mousedown', handleMouseDown);
    }
  };
  
  const handleMouseDown = () => {
    document.body.classList.remove('user-is-tabbing');
    
    window.removeEventListener('mousedown', handleMouseDown);
    window.addEventListener('keydown', handleFirstTab);
  };
  
  window.addEventListener('keydown', handleFirstTab);
  
  // Retorna função de cleanup para useEffect
  return () => {
    window.removeEventListener('keydown', handleFirstTab);
    window.removeEventListener('mousedown', handleMouseDown);
  };
}